import { NumberRequired, StringNotRequired, StringRequired } from "src/common/decorators";

export class AddCharactersDto {
    @NumberRequired('')
    idolGroupId: number;

    @StringRequired('Tên nhân vật ')
    name: string;

    @StringNotRequired()
    seiyuu?: string;

    @StringNotRequired()
    role?: string;

    @StringNotRequired()
    imageUrl?: string;
}