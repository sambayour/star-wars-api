import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { MoviesService } from './movies.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddCommentDTO } from './dto/comment.dto';
import { Request } from 'express';
import * as requestIp from 'request-ip';
import { RealIP } from 'nestjs-real-ip';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  movies() {
    return this.moviesService.movies();
  }

  @Post('/:id/comments')
  addComment(
    @Body() payload: AddCommentDTO,
    @Param('id') movieId: number,
    @Ip() ip: string,
    @Req() request: Request,
    @RealIP() realip: string,
  ) {
    const ipAddress = requestIp.getClientIp(request);
    console.log('nest ip:', ip);
    console.log('request-ip:', ipAddress);
    console.log('realip IP:', realip);

    return this.moviesService.addComment(payload, movieId, ip);
  }

  @Get('/:id/comments')
  moviesComment(@Param('id') movieId: number) {
    return this.moviesService.moviesComment(movieId);
  }

  @Get('characters')
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'name:asc',
  })
  characters(@Query('sort') sort?: string, @Query('filter') filter?: string) {
    return this.moviesService.characters(sort, filter);
  }

  @Get('/:id/characters')
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'filter', required: false, type: String })
  moviesCharacters(
    @Param('id') movieId: number,
    @Query('sort') sort?: string,
    @Query('filter') filter?: string,
  ) {
    return this.moviesService.moviesCharacters(movieId, sort, filter);
  }
}
