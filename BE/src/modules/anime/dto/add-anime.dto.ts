import { ArrayNotRequired, EnumRequired, NumberNotRequired, StringNotRequired, StringRequired } from "src/common/decorators";
import { AnimationFormat, IdolType, SongType } from "src/models";

export class IdolGroupDto {
    @StringRequired('Tên nhóm')
    name: string;

    @StringNotRequired()
    description?: string;
}

export class SongDto {
    @StringRequired('Tên bài hát')
    title: string;

    @StringRequired('Tác giả')
    artist: string;

    @EnumRequired(SongType, 'Loại bài hát')
    songType: SongType;

    @StringNotRequired()
    youtubeUrl?: string;
}

export class AddAnimeDto {
    @StringRequired('Tên anime')
    title: string;

    @StringNotRequired()
    description?: string;

    @EnumRequired(IdolType, 'Loại idol',)
    idolType: IdolType;

    @EnumRequired(AnimationFormat, 'Định dạng hoạt hình')
    animationFormat: AnimationFormat;

    @StringNotRequired()
    franchise?: string;

    @StringRequired('Studio')
    studio: string;

    @NumberNotRequired('Năm phát hành')
    releaseYear?: number;

    @StringNotRequired()
    posterUrl?: string;

    @ArrayNotRequired(IdolGroupDto)
    idolGroups?: IdolGroupDto[];

    @ArrayNotRequired(SongDto)
    songs?: SongDto[];
}