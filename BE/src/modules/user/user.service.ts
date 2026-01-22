import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, User } from 'src/models';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { FilterUserDto } from './dto/filter-user.dto';
import { PasswordDto } from './dto/password.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private readonly configService: ConfigService,
    ) { }

    async findByEmail(email: string) {
        return this.userModel.findOne(
            {
                where: { email },
            }
        );
    }

    async findByUsername(username: string) {
        return this.userModel.findOne(
            {
                where: { username },
            }
        );
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.findByEmail(createUserDto.email)
            || await this.findByUsername(createUserDto.username);
        if (user) {
            throw new BadRequestException('Tài khoản đã tồn tại');
        }

        await this.userModel.create(createUserDto as any);
        return { message: 'Đăng ký thành công' };
    }

    async validateUser(username: string, password: string) {
        const user = await this.findByUsername(username);

        if (!user) {
            throw new BadRequestException('Tài khoản chưa được đăng ký');
        }

        if (!user.dataValues.isActive) {
            throw new BadRequestException('Tài khoản đã bị khóa.');
        }
        const isCorrectPassword = await user.comparePassword(password);
        if (!isCorrectPassword) {
            throw new BadRequestException('Mật khẩu không chính xác.');
        }
        const { password: _, ...rest } = user.dataValues;

        return user;
    }

    async findAll(filterUserDto: FilterUserDto) {
        const {
            search,
            roleId,
            page,
            limit,
            sortBy,
            sortOrder,
        } = filterUserDto;

        const whereClause: any = {}
        if (search !== undefined) {
            whereClause[Op.or] = [
                { username: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
            ]
        }

        if (roleId !== undefined) whereClause['roleId'] = roleId;

        const limitPage = Number(limit || this.configService.get<number>('LIMIT_DEFAULTS'));
        const currentPage = Number(page || 1);
        const offset = (currentPage - 1) * limitPage;

        let orderClause: any[] = [];
        if (sortBy && sortOrder) {
            orderClause = [[sortBy, sortOrder]];
        } else {
            orderClause = [['username', 'DESC']];
        }

        const { rows, count } = await this.userModel.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: limitPage,
            offset,
            attributes: { exclude: ['password'] },
            raw: true,
        });

        const totalItems = Array.isArray(count) ? count.length : count;

        return {
            items: rows,
            paginationMeta: {
                totalItems,
                currentPage,
                limit: limitPage,
                totalPages: Math.ceil(totalItems / limitPage),
            }
        }
    }

    async findOne(id: number) {
        const user = await this.userModel.findOne({
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
                },
            ],
            attributes: { exclude: ['password', 'roleId'] },
            where: { id }
        })
        if (!user) {
            throw new BadRequestException('User không tồn tại');
        }
        return user;
    }

    async changePassword(id: number, passwordDto: PasswordDto) {
        const {
            newPassword,
            confirmedPassword
        } = passwordDto;

        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new BadRequestException('Tài khoản không tồn tại');
        }
        if (newPassword !== confirmedPassword) {
            throw new BadRequestException('Mật khẩu xác nhận không khớp');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userModel.update(
            { password: hashedPassword },
            { where: { id } }
        );
        return { message: 'Đổi mật khẩu thành công' };
    }

    async deleteSoft(id: number) {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new BadRequestException('User không tồn tại');
        }
        await this.userModel.update(
            { isActive: false },
            { where: { id } }
        );
        return { message: 'Xoá user thành công' };
    }
}
