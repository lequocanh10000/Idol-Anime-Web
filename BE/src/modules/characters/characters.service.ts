import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Character, IdolGroup } from 'src/models';
import { AddCharactersDto } from './dto/add-charaacters.dto';
import { UpdateCharacterDto } from './dto/update-characters.dto';

@Injectable()
export class CharactersService {
    constructor(
        @InjectModel(Character) private readonly characterModel: typeof Character,
        @InjectModel(IdolGroup) private readonly idolGroupModel: typeof IdolGroup,
    ) {}

    async createCharacter(dto: AddCharactersDto)  {
        const idolGroup = await this.idolGroupModel.findByPk(dto.idolGroupId);
        if (!idolGroup) {
            throw new BadRequestException('Nhóm thần tượng không tồn tại');
        }
        const newClass = await this.characterModel.create(dto as any);
        return {
            message: 'Tạo nhân vật thành công',
            data: newClass,
        };
    }

    async updateCharacter(id: number, dto: UpdateCharacterDto) {
        const character = await this.characterModel.findByPk(id);
        if (!character) {
            throw new BadRequestException('Nhân vật không tồn tại');
        }
        await character.update(dto);
        return {
            message: 'Cập nhật nhân vật thành công',
            data: character,
        };
    }

    async deleteCharacter(id: number) {
        const character = await this.characterModel.findByPk(id);
        if (!character) {
            throw new BadRequestException('Nhân vật không tồn tại');
        }
        await character.destroy();
        return {
            message: 'Xóa nhân vật thành công',
        };
    }
}