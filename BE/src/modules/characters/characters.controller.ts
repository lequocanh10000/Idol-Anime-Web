import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { AddCharactersDto } from './dto/add-charaacters.dto';
import { UpdateCharacterDto } from './dto/update-characters.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post('create')
  async create(@Body() dto: AddCharactersDto) {
    return await this.charactersService.createCharacter(dto);
  }

  @Patch(':id')
  async update(@Body() dto: UpdateCharacterDto, @Param('id') id: number) {
    return await this.charactersService.updateCharacter(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.charactersService.deleteCharacter(id);
  }
}
