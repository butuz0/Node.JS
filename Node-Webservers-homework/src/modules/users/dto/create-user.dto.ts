import { IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(5, 255)
    username = "";

    @IsString()
    name = "";
}
