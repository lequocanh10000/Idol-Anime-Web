import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Anime, Character, IdolGroup, Song } from 'src/models';
import { AddAnimeDto, IdolGroupDto, SongDto } from './dto/add-anime.dto';
import { FilterAnimeDto } from './dto/filter-anime.dto';
import { Op, Transaction, where } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { UpdateAnimeDto, UpdateIdolGroupDto, UpdateSongDto } from './dto/update-anime.dto';

@Injectable()
export class AnimeService {
    constructor(
        private readonly sequelize: Sequelize,
        @InjectModel(Anime) private readonly animeModel: typeof Anime,
        @InjectModel(IdolGroup) private readonly idolGroupModel: typeof IdolGroup,
        @InjectModel(Song) private readonly songModel: typeof Song,
        private readonly configService: ConfigService,
    ) { }

    private async syncSongs(animeId: number, songs: UpdateSongDto[], t: Transaction) {
        const existingSongs = await this.songModel.findAll({
            where: { animeId },
            attributes: ['id'],
            transaction: t,
        });

        const existingIds = existingSongs.map(s => s.id);
        const incomingIds = songs.filter(s => s.id).map(s => s.id!);


        const deleteIds = existingIds.filter(id => !incomingIds.includes(id));
        if (deleteIds.length) {
            await this.songModel.destroy({
                where: { id: deleteIds },
                transaction: t,
            });
        }


        const upsertData = songs.map(song => ({
            id: song.id,
            title: song.title!,
            artist: song.artist!,
            songType: song.songType,
            youtubeUrl: song.youtubeUrl,
            animeId,
        }));


        if (upsertData.length) {
            await this.songModel.bulkCreate(upsertData as any, {
                updateOnDuplicate: ['title', 'artist', 'songType', 'youtubeUrl'],
                transaction: t,
            });
        }
    }


    private async syncIdolGroups(animeId: number, groups: UpdateIdolGroupDto[], t: Transaction) {
        const existingGroups = await this.idolGroupModel.findAll({
            where: { animeId },
            attributes: ['id'],
        });

        const existingIds = existingGroups.map(g => g.id);
        const incomingIds = groups.filter(g => g.id).map(g => g.id!);


        const deleteIds = existingIds.filter(id => !incomingIds.includes(id));
        if (deleteIds.length) {
            await this.idolGroupModel.destroy({
                where: { id: deleteIds },
                transaction: t,
            });
        }

        const upsertData = groups.map(group => ({
            id: group.id,
            name: group.name!,
            description: group.description,
            animeId,
        }));

        if (upsertData.length) {
            await this.idolGroupModel.bulkCreate(upsertData as any, {
                updateOnDuplicate: ['name', 'description'],
                transaction: t,
            });
        }
    }

    private async validateSongOwnership(animeId: number, songs: UpdateSongDto[], t: Transaction) {
        const ids = songs.filter(s => s.id).map(s => s.id!);
        if (!ids.length) return;

        const count = await this.songModel.count({
            where: {
                id: ids,
                animeId,
            },
            transaction: t,
        });

        if (count !== ids.length) {
            throw new BadRequestException('Có bài hát không thuộc anime này');
        }
    }

    private async validateIdolGroupOwnership(animeId: number, groups: UpdateIdolGroupDto[], t: Transaction) {
        const ids = groups.filter(g => g.id).map(g => g.id!);
        if (!ids.length) return;

        const count = await this.idolGroupModel.count({
            where: {
                id: ids,
                animeId,
            },
            transaction: t,
        });

        if (count !== ids.length) {
            throw new BadRequestException('Có idol group không thuộc anime này');
        }
    }
    async createAnime(addAnimeDto: AddAnimeDto) {
        const t = await this.sequelize.transaction();
        try {
            const newAnime = await this.animeModel.create(addAnimeDto as any, { transaction: t });

            // Tạo nhpm idol nếu có
            if (addAnimeDto.idolGroups && addAnimeDto.idolGroups.length > 0 && newAnime) {
                const animeId = newAnime.id || newAnime.dataValues.id;
                const idolGroups = addAnimeDto.idolGroups.map((idolGroup: IdolGroupDto) => ({
                    ...idolGroup,
                    animeId
                }))
                await this.idolGroupModel.bulkCreate(idolGroups as any, { transaction: t });
            }

            // Tạo bài hát nếu có
            if (addAnimeDto.songs && addAnimeDto.songs.length > 0 && newAnime) {
                const animeId = newAnime.id || newAnime.dataValues.id;
                const songs = addAnimeDto.songs.map((song: SongDto) => ({
                    ...song,
                    animeId
                }))
                await this.songModel.bulkCreate(songs as any, { transaction: t });
            }

            await t.commit();
            return {
                message: 'Tạo anime thành công',
                data: newAnime,
            }
        } catch (error) {
            const message = error.message || 'Tạo anime thất bại.';
            await t.rollback();
            throw new BadRequestException(message);
        }
    }

    async findAll(filterAnimeDto: FilterAnimeDto) {
        const {
            search,
            idolType,
            animationFormat,
            page,
            limit,
            sortBy,
            sortOrder,
        } = filterAnimeDto;

        const whereClause: any = {}
        if (search !== undefined) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
            ]
        }

        if (idolType !== undefined) whereClause.idolType = idolType;
        if (animationFormat !== undefined) whereClause.animationFormat = animationFormat;

        const limitPage = Number(limit || this.configService.get<number>('LIMIT_DEFAULTS'));
        const currentPage = Number(page || 1);
        const offset = (currentPage - 1) * limitPage;

        let orderClause: any[] = [];
        if (sortBy && sortOrder) {
            orderClause = [[sortBy, sortOrder]];
        } else {
            orderClause = [['releaseYear', 'DESC']];
        }

        const { rows, count } = await this.animeModel.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: limitPage,
            offset,
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
        const anime = await this.animeModel.findOne({
            include: [
                {
                    model: this.idolGroupModel,
                    as: 'idolGroups',
                    include: [
                        {
                            model: Character,
                            as: 'characters',
                            attributes: { exclude: ['createdAt', 'updatedAt', 'animeId', 'idolGroupId'] }
                        }
                    ],
                    attributes: { exclude: ['createdAt', 'updatedAt', 'animeId'] }
                },
                {
                    model: this.songModel,
                    as: 'songs',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'animeId'] }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: { id }
        })
        if (!anime) {
            throw new BadRequestException('Anime không tồn tại');
        }
        return anime;
    }

    async updateAnime(id: number, updateAnimeDto: UpdateAnimeDto) {
        const t = await this.sequelize.transaction();
        try {
            const anime = await this.animeModel.findByPk(id, {
                include: [
                    { model: this.idolGroupModel, as: 'idolGroups' },
                    { model: this.songModel, as: 'songs' },
                ],
                transaction: t,
            });
            if (!anime) {
                throw new BadRequestException('Anime không tồn tại');
            }
            await anime.update(
                {
                    title: updateAnimeDto.title,
                    idolType: updateAnimeDto.idolType,
                    animationFormat: updateAnimeDto.animationFormat,
                    franchise: updateAnimeDto.franchise,
                    studio: updateAnimeDto.studio,
                    releaseYear: updateAnimeDto.releaseYear,
                    posterUrl: updateAnimeDto.posterUrl,
                    description: updateAnimeDto.description,
                },
                { transaction: t }
            );
            if (updateAnimeDto.idolGroups) {
                await this.validateIdolGroupOwnership(anime.id, updateAnimeDto.idolGroups, t);
                await this.syncIdolGroups(anime.id, updateAnimeDto.idolGroups, t);
            }
            if (updateAnimeDto.songs) {
                await this.validateSongOwnership(anime.id, updateAnimeDto.songs, t);
                await this.syncSongs(anime.id, updateAnimeDto.songs, t);
            }
            await t.commit();
            return { message: 'Cập nhật thông tin anime thành công' };
        } catch (error) {
            await t.rollback();
            throw new BadRequestException(error.message || 'Cập nhật anime thất bại');
        }
    }

    async removeAnime(id: number) {
        const t = await this.sequelize.transaction();
        try {
            const anime = await this.animeModel.findByPk(id, { transaction: t });
            if (!anime) {
                throw new BadRequestException('Anime không tồn tại');
            }
            await Promise.all([
                anime.destroy({ transaction: t }),
                this.songModel.destroy({ where: { animeId: id }, transaction: t }),
                this.idolGroupModel.destroy({ where: { animeId: id }, cascade: true, transaction: t }),
            ]);
            await t.commit();
            return { message: 'Xóa anime thành công' };
        } catch (e) {
            await t.rollback();
            throw e;
        }
    }

}
