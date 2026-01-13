import { ArrayNotRequired, EnumNotRequired, NumberNotRequired, StringNotRequired } from 'src/common/decorators';
import { AnimationFormat, IdolType, SongType } from 'src/models';

export class UpdateIdolGroupDto {
  @NumberNotRequired('')
  id?: number;

  @StringNotRequired()
  name?: string;

  @StringNotRequired()
  description?: string;
}

export class UpdateSongDto {
  @NumberNotRequired('')
  id?: number;

  @StringNotRequired()
  title?: string;

  @StringNotRequired()
  artist?: string;

  @EnumNotRequired(SongType)
  songType?: SongType;

  @StringNotRequired()
  youtubeUrl?: string;
}

export class UpdateAnimeDto {
  @StringNotRequired()
  title?: string;

  @EnumNotRequired(IdolType)
  idolType?: IdolType;

  @EnumNotRequired(AnimationFormat)
  animationFormat?: AnimationFormat;

  @StringNotRequired()
  franchise?: string;

  @StringNotRequired()
  studio?: string;

  @NumberNotRequired('')
  releaseYear?: number;

  @StringNotRequired()
  posterUrl?: string;

  @StringNotRequired()
  description?: string;

  @ArrayNotRequired(UpdateIdolGroupDto)
  idolGroups?: UpdateIdolGroupDto[];

  @ArrayNotRequired(UpdateSongDto)
  songs?: UpdateSongDto[];
}
