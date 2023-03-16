import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import {CreateUserDTO} from "./dto";
import {AppError} from "../../common/errors";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    }

    // ищет юзера по email, который уже есть в БД
    async findUserByEmail (email: string){
        return this.userRepository.findOne({
            where: { email: email }
        })
    }

    // хеширование пароля с помощью bcrypt
    async hashPassword (password) {
        return bcrypt.hash(password, 10)
    }
    // добавление нового пользователя в БД
    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {

        // Если пользователь уже существует
        const existUser = await this.findUserByEmail(dto.email)
        if(existUser) {
            throw new BadRequestException(AppError.USER_EXIST)
        }

        dto.password = await this.hashPassword(dto.password)
        const newUser = {
            firstName: dto.firstName,
            username: dto.username,
            email: dto.email,
            password: dto.password
        }
        await this.userRepository.create(newUser)
        return dto
    }
}
