import { EnumNotRequired, NumberNotRequired, StringNotRequired } from "src/common/decorators";
import { AnimationFormat, IdolType } from "src/models";

export class FilterAnimeDto {
    @StringNotRequired()
    search?: string;

    @NumberNotRequired('')
    page?: number;

    @NumberNotRequired('')
    limit?: number;

    @StringNotRequired()
    sortBy?: string;

    @StringNotRequired()
    sortOrder?: string;

    @EnumNotRequired(IdolType)
    idolType?: IdolType;

    @EnumNotRequired(AnimationFormat)
    animationFormat: AnimationFormat;
}