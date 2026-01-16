import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordDto } from './dto/password.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  @UseGuards(new RoleGuard([1]))
  @UseGuards(JwtGuard)
  @Get('all')
  async findAll() {
    return await this.userService.findAll({});
  }

  @UseGuards(new RoleGuard([1]))
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @UseGuards(new RoleGuard([1, 2]))
  @UseGuards(JwtGuard)
  @Patch(':id/change-password')
  async changePassword(@Param('id') id: number, @Body() dto: PasswordDto) {
    return this.userService.changePassword(id, dto);
  }

  @Delete(':id')
  async deleteSoft(@Param('id') id: number) {
    return await this.userService.deleteSoft(id);
  }
}
