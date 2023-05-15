import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import Http from 'src/helpers/Http.util';
import { AddCommentDTO } from './dto/comment.dto';
import { Icomment } from './interface';

@Injectable()
export class MoviesService {
  private http: Http;

  constructor(
    @InjectRepository(Comment) private moviesRepository: Repository<Comment>,
  ) {
    this.http = new Http();
    this.moviesRepository = moviesRepository;
  }

  async movies() {
    const moviesEndpoint = `${process.env.SWAPI_BASE_URL}/films`;
    try {
      console.log('GET /movies service', moviesEndpoint);

      const response = await (
        await this.http.makeGetRequest(moviesEndpoint)
      ).data;

      const movieObj = response?.results;

      const res = this.formartMoviesResponse(movieObj);

      // const sortedMovies = this.sortMoviesByReleaseDate(res);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async addComment(payload: AddCommentDTO, movieId: number, ip: string) {
    console.log('POST /movies/:movieId/comments service');

    const commentPayload: Icomment = {
      movieId,
      ipAddress: ip,
      comment: payload.comment,
    };

    return this.moviesRepository.save(commentPayload);
  }

  async moviesComment(movieId: number) {
    console.log('GET /movies/:movieId/comments service');
    //find comments by movideid
    const moviesComment = await this.moviesRepository.find({
      where: { movieId },
    });

    return this.formartMoviesCommentResponse(moviesComment);
  }

  async moviesCharacters(movieId: number, sort: string, filter: string) {
    console.log('GET /movies/:movieId/characters service');

    //get movie characters by movie id
    const movieCharacters = await this.getMovieCharacters(movieId);

    let characters = movieCharacters;

    // Sort the characters by the specified parameter and order
    if (sort) {
      console.log('sort', sort);

      const [sortField, sortOrder] = sort.split(':');
      characters.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    if (filter) {
      console.log('filter', filter);
      characters = this.filterCharacters(characters, filter);
    }

    // Compute the metadata
    const totalCharacters = characters.length;
    const totalHeightCm = characters.reduce(
      (acc, cur) => acc + Number(cur.height),
      0,
    );

    // Format the metadata into a response object
    const metadata = {
      totalCharacters,
      totalHeightCm: `${totalHeightCm}cm`,
      totalHeightFt: this.convertCmToFeetInches(totalHeightCm),
    };

    // Send the response with the sorted characters and metadata
    return {
      characters: this.formartCharactersResponse(characters),
      metadata,
    };
  }

  //function to get movie characters
  private async getMovieCharacters(movieId: number) {
    const moviesEndpoint = `${process.env.SWAPI_BASE_URL}/films/${movieId}`;
    try {
      const response = await (
        await this.http.makeGetRequest(moviesEndpoint)
      ).data;

      const characters = response?.characters;

      const charactersObj = await this.getCharacters(characters);

      return charactersObj;
    } catch (error) {
      throw error;
    }
  }

  //function to get characters
  private async getCharacters(characters) {
    const charactersObj = [];
    const charactersIdArr = [];

    for (const character of characters) {
      const characterId = character.split('/')[5];

      const characterEndpoint = `${process.env.SWAPI_BASE_URL}/people/${characterId}`;

      const response = await (
        await this.http.makeGetRequest(characterEndpoint)
      ).data;

      charactersObj.push(response);
      charactersIdArr.push(characterId);
    }
    console.log('chaacteridarr', charactersIdArr);
    return charactersObj;
  }

  async characters(sort: string, filter: string) {
    const response = await (
      await this.http.makeGetRequest(`${process.env.SWAPI_BASE_URL}/people`)
    ).data;

    // Extract the list of characters from the response
    let characters = response?.results;
    // console.log('characters', characters);

    // Sort the characters by the specified parameter and order
    if (sort) {
      console.log('sort', sort);

      const [sortField, sortOrder] = sort.split(':');
      characters.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    if (filter) {
      console.log('filter', filter);
      characters = this.filterCharacters(characters, filter);
    }

    // Compute the metadata
    const totalCharacters = characters.length;
    const totalHeightCm = characters.reduce(
      (acc, cur) => acc + Number(cur.height),
      0,
    );

    // Format the metadata into a response object
    const metadata = {
      totalCharacters,
      totalHeightCm: `${totalHeightCm}cm`,
      totalHeightFt: this.convertCmToFeetInches(totalHeightCm),
    };

    // Send the response with the sorted characters and metadata
    return {
      characters: this.formartCharactersResponse(characters),
      metadata,
    };
  }

  //function to format characters response
  private formartCharactersResponse(characters) {
    const response = [];

    for (const value of characters) {
      const heightInCm = parseInt(value.height);

      const singleObj = {
        name: value.name,
        gender: value.gender ?? 'n/a',
        height: `${heightInCm}cm`,
        heightFeetInches: this.convertCmToFeetInches(heightInCm),
      };
      response.push(singleObj);
    }
    return response;
  }
  //create function to convert cm to feet and inches
  private convertCmToFeetInches(height) {
    const heightInCm = parseInt(height);

    const heightInInches = heightInCm * 0.3937;

    const feet = Math.floor(heightInInches / 12);

    const inches = Math.round((heightInInches % 12) * 100) / 100;

    return `${feet}ft ${inches.toFixed(2)} inches`;
  }

  private filterCharacters(characters, filter) {
    if (!filter) {
      return characters;
    }
    const filCharacters = characters.filter(
      (character) => character.gender.toLowerCase() === filter.toLowerCase(),
    );
    // console.log('filCharacters', filCharacters);
    return filCharacters;
  }

  //function to get getTotalHeight
  private async getTotalHeight(characters) {
    return characters.reduce((acc, cur) => acc + Number(cur.height), 0);
  }

  //create a function to sort characters
  private async sortCharacters(characters, sort) {
    const [sortField, sortOrder] = sort.split(':');
    const sortedCharacters = characters.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    // console.log('sortedCharacters', sortedCharacters);
    return sortedCharacters;
  }

  //count comments by movie id
  async countCommentsByMovieId(movieId: number) {
    return this.moviesRepository.count({
      where: {
        movieId,
      },
    });
  }

  //sort movies by release date
  private async sortMoviesByReleaseDate(movies) {
    const sortedMovies = movies.sort((a, b) => {
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    });

    return sortedMovies;
  }

  async formartMoviesResponse(movies) {
    const formartedMovies = [];
    for (const value of movies) {
      const singleFormartedMovies = {
        title: value.title,
        opening_crawl: value.opening_crawl,
        release_date: value.release_date,
        comment_count: await this.countCommentsByMovieId(value.episode_id),
      };
      formartedMovies.push(singleFormartedMovies);
    }
    return formartedMovies;
  }

  private async formartMoviesCommentResponse(moviesComment) {
    //map movies response to return comment,ipaddress and createdAt
    const responseData = [];
    for (const value of moviesComment) {
      const singleObj = {
        comments: value.comment,
        ipAddress: value.ipAddress,
        createdAt: value.createdAt,
      };
      responseData.push(singleObj);
    }

    return responseData;
  }
}
