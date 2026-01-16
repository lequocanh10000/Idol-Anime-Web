import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Character, IdolGroup } from 'src/models';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService],
  imports: [SequelizeModule.forFeature([Character, IdolGroup])],
})
export class CharactersModule {}
