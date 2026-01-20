import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { AddCharactersDto } from './dto/add-charaacters.dto';
import { UpdateCharacterDto } from './dto/update-characters.dto';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @UseGuards(new RoleGuard([1]))
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() dto: AddCharactersDto) {
    return await this.charactersService.createCharacter(dto);
  }

  @UseGuards(new RoleGuard([1]))
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Body() dto: UpdateCharacterDto, @Param('id') id: number) {
    return await this.charactersService.updateCharacter(id, dto);
  }

  @UseGuards(new RoleGuard([1]))
  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.charactersService.deleteCharacter(id);
  }
}
