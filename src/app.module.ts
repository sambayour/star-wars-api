import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './modules/movie/movies.module';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
