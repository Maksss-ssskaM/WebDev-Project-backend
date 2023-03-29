import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import {CreateUserDTO, UpdateUserDTO} from "./dto";
import {AppError} from "../../common/constants/errors";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    }

    // ищет юзера по email, который уже есть в БД
    async findUserByEmail (email: string): Promise<User>{
        try{
            return this.userRepository.findOne({
                where: { email: email }
            })
        }
        catch (e){
            throw new Error(e)
        }
    }

    // хеширование пароля с помощью bcrypt
    async hashPassword (password: string): Promise<string> {
        try{
            return bcrypt.hash(password, 10)
        }
        catch (e){
            throw new Error(e)
        }
    }
    // добавление нового пользователя в БД
    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            if(dto.email !== '' || dto.username !== '' || dto.firstName !== '' || dto.password !== '')
            {
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
            else{
                throw new BadRequestException(AppError.EMPTY_DATA)
            }
        }
        catch (e) {
            throw new Error(e)
        }
    }

    // ищет юзера по email, который уже есть в БД, но исключаем пароль из данных, которые возвраащем
    async publicUser (email: string): Promise<User> {
        try{
            return this.userRepository.findOne({
                where: { email: email },
                attributes: {exclude: ['password']}
            })
        }
        catch (e) {
            throw new Error(e)
        }
    }

    // метод, обновляющий пользователя
    async updateUser (email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO>{
        try{
            await this.userRepository.update(dto, {where: {email}})
            return dto
        }
        catch (e) {
            throw new Error(e)
        }
    }
    // метод, удаляющий пользователя
    async  deleteUser(email: string) {
        try{
            await this.userRepository.destroy({where: {email}})
            return true
        }
        catch (e) {
            throw new Error(e)
        }
    }

    // Когда пользователь авторизован, у него есть токен доступа.
    // По данному токену доступа будет определён объект пользователя.
    // Из этого объекта доступа будет получен электронный адрес.
    // С помощью этого электронного адреса будет удалена запись из бд
}
