import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string) {
        return this.userService.validateUser(username, password);
    }

    async login({id, roleId}) {
        // const plainUser = user.getUserWithoutPassword();
        const accessToken = await this.jwtService.signAsync({id, roleId})
        return { 
            message: 'Đăng nhập thành công',
            accessToken: accessToken
        }
    }
}
