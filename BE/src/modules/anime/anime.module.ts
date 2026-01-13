import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Anime, IdolGroup, Song } from 'src/models';

@Module({
  controllers: [AnimeController],
  providers: [AnimeService],
  imports: [SequelizeModule.forFeature([Anime, IdolGroup, Song])],
})
export class AnimeModule {}
