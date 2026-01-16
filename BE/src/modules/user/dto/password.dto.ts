import { StringRequired } from "src/common/decorators";

export class PasswordDto {
    @StringRequired('Mật khẩu mới ')
    newPassword: string;

    @StringRequired('Xác nhận mật khẩu')
    confirmedPassword: string;
}