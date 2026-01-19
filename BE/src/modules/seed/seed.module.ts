import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Anime, Character, IdolGroup, Role, Song, User } from 'src/models';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SequelizeModule.forFeature([User, Anime, Character, IdolGroup, Role, Song])]
})
export class SeedModule {}
