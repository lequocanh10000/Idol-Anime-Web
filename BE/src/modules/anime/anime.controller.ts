import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AddAnimeDto } from './dto/add-anime.dto';
import { FilterAnimeDto } from './dto/filter-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post('create')
  async create(@Body() dto: AddAnimeDto) {
    return await this.animeService.createAnime(dto)
  }

  @Get('all')
  async findAll(@Query() filterAnimeDto: FilterAnimeDto) {
    return await this.animeService.findAll(filterAnimeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.animeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAnimeDto) {
    return await this.animeService.updateAnime(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.animeService.removeAnime(id);
  }
}
