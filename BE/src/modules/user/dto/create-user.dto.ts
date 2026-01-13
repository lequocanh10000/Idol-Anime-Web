import { StringRequired } from "src/common/decorators";

export class CreateUserDto {
    @StringRequired('Tên đăng nhập ')
    username: string;

    @StringRequired('Email ')
    email: string;

    @StringRequired('Mật khẩu ')
    password: string;   
}