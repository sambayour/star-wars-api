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
    this.moviesRepository = moviesRepository;
  }

  async movies() {
    try {
      console.log('/movies service');
      return await (
        await this.http.makeGetRequest(`${process.env.SWAPI_BASE_URL}/films`)
      ).data;
    } catch (error) {
      throw error;
    }
  }
}
