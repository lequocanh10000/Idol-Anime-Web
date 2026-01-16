import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AddAnimeDto } from './dto/add-anime.dto';
import { FilterAnimeDto } from './dto/filter-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @UseGuards(JwtGuard)
  @UseGuards(new RoleGuard([1]))
  @Post('create')
  async create(@Body() dto: AddAnimeDto) {
    return await this.animeService.createAnime(dto)
  }

  @UseGuards(JwtGuard)
  @UseGuards(new RoleGuard([1, 2]))
  @Get('all')
  async findAll(@Query() filterAnimeDto: FilterAnimeDto) {
    return await this.animeService.findAll(filterAnimeDto);
  }

  @UseGuards(JwtGuard)
  @UseGuards(new RoleGuard([1, 2]))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.animeService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @UseGuards(new RoleGuard([1]))
  async update(@Param('id') id: number, @Body() dto: UpdateAnimeDto) {
    return await this.animeService.updateAnime(id, dto);
  }

  @UseGuards(JwtGuard)
  @UseGuards(new RoleGuard([1]))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.animeService.removeAnime(id);
  }
}
