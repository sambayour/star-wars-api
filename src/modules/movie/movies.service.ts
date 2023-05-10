import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import Http from 'src/helpers/Http.util';

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
      console.log('/movies service', moviesEndpoint);

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

  //sort movies by release date
  private async sortMoviesByReleaseDate(movies) {
    const sortedMovies = movies.sort((a, b) => {
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    });

    return sortedMovies;
  }

  private async formartMoviesResponse(movies) {
    const formartedMovies = movies.map((movie) => ({
      title: movie.title,
      opening_crawl: movie.opening_crawl,
      release_date: movie.release_date,
      comment_count: 0,
    }));

    return formartedMovies;
  }
}
