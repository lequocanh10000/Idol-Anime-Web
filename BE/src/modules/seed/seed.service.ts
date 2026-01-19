import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Anime, Character, IdolGroup, Role, Song, User } from 'src/models';
import { animes, characters, idolGroups, roles, songs, users } from './data';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        @InjectModel(Anime) private readonly animeModel: typeof Anime,
        @InjectModel(Character) private readonly characterModel: typeof Character,
        @InjectModel(IdolGroup) private readonly idolGroupModel: typeof IdolGroup,
        @InjectModel(Role) private readonly roleModel: typeof Role,
        @InjectModel(Song) private readonly songModel: typeof Song,
        private readonly sequelize: Sequelize,
    ) {}

    private async seedRoles(transaction: Transaction) {
        return await this.roleModel.bulkCreate(roles as any, { transaction});
    }

    private async seedUsers(transaction: Transaction) {
        const userWithHashedPassword = users.map((user) => {
            const hashedPassword = bcrypt.hashSync(user.password, 10);
            return { ...user, password: hashedPassword };
        })
        return await this.userModel.bulkCreate(userWithHashedPassword as any, { transaction });
    } 

    private async seedAnime(transaction: Transaction) {
        return await this.animeModel.bulkCreate(animes as any, { transaction});
    }

    private async seedSong(transaction: Transaction) {
        return await this.songModel.bulkCreate(songs as any, { transaction});
    }

    private async seedIdolGroup(transaction: Transaction) {
        return await this.idolGroupModel.bulkCreate(idolGroups as any, { transaction });
    }

    private async seedCharacters(transaction: Transaction) {
        return await this.characterModel.bulkCreate(characters as any, { transaction });
    }

    async initSeedData() {
        const transaction = await this.sequelize.transaction();
        try {
            await this.seedRoles(transaction);
            await this.seedUsers(transaction);
            await this.seedAnime(transaction);
            await this.seedSong(transaction);
            await this.seedIdolGroup(transaction);
            await this.seedCharacters(transaction);

            await transaction.commit();
            return { message: 'Seed dữ liệu thành công' };
        } catch (error) {
            await transaction.rollback();
            throw new BadRequestException('Seed dữ liệu thất bại');
        }
    }
}
