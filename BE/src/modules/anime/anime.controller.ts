import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AddAnimeDto } from './dto/add-anime.dto';
import { FilterAnimeDto } from './dto/filter-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() dto: AddAnimeDto) {
    return await this.animeService.createAnime(dto)
  }

  @UseGuards(JwtGuard)
  @Get('all')
  async findAll(@Query() filterAnimeDto: FilterAnimeDto) {
    return await this.animeService.findAll(filterAnimeDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.animeService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAnimeDto) {
    return await this.animeService.updateAnime(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.animeService.removeAnime(id);
  }
}
