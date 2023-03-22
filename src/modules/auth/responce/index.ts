import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";
import {CreateUserDTO} from "../../users/dto";

export class AuthUserResponse {

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsString()
    token: string
}