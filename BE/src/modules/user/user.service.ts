import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
    ) {}

    async findByEmail(email: string) {
        return this.userModel.findOne(
            { 
                where: {email},
            }
        );
    }

    async findByUsername(username: string) {
        return this.userModel.findOne(
            { 
                where: {username},
            }
        );
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.findByEmail(createUserDto.email) 
                || await this.findByUsername(createUserDto.username);
        if (user) {
            throw new Error('Tài khoản đã tồn tại');
        }

        const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
        const payload = {
            ...createUserDto,
            password: hashedPassword,
        }
        await this.userModel.create(payload as any);
        return { message: 'Đăng ký thành công' };
    }

    async validateUser(username: string, password: string) {
        const user = await this.findByUsername(username);

        if(!user) {
            throw new BadRequestException('Tài khoản chưa được đăng ký');
        }

        const isCorrectPassword = user.comparePassword(password);
        if(!isCorrectPassword) {
            throw new BadRequestException('Mật khẩu không chính xác.');
        }
        const { password: _, ...rest} = user;

        return user;
    }
}
