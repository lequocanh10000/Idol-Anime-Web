import { NumberNotRequired, StringNotRequired } from "src/common/decorators";

export class FilterUserDto {
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

    @NumberNotRequired('')
    roleId?: number;
}