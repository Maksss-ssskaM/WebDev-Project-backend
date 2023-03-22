import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDTO} from "../users/dto";
import {AppError} from "../../common/constants/errors";
import {UserLoginDTO} from "./dto";
import * as bcrypt from "bcrypt"
import {AuthUserResponse} from "./responce";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly tokenService: TokenService) {}

    // Регистрация пользователя
    async registerUsers (dto: CreateUserDTO): Promise<CreateUserDTO>{
        try{
            const existUser = await this.userService.findUserByEmail(dto.email)
            if(existUser){
                throw new BadRequestException(AppError.USER_EXIST)
            }
            return this.userService.createUser(dto)
        }
        catch (e){
            throw new Error(e)
        }
    }

    // Аутентификация пользователя
    async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
        try{
            // Проверка есть ли пользователя в базе данных
            const existUser = await this.userService.findUserByEmail(dto.email)
            if(!existUser){
                throw new BadRequestException(AppError.USER_NOT_EXIST)
            }
            // Проверка идентичности пароля пользователя из бд и пароля, который ввёл пользователь
            const validatePassword = await bcrypt.compare(dto.password, existUser.password)
            if(!validatePassword){
                throw new BadRequestException(AppError.WRONG_DATA)
            }
            const userData = {
                name: existUser.firstName,
                email: existUser.email
            }
            const token = await this.tokenService.generateJwtToken(userData)
            const  user = await this.userService.publicUser(dto.email)
            return {user, token}
        }
        catch (e){
            throw new Error(e)
        }
    }
}