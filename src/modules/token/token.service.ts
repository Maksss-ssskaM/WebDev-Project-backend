import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config"

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    // Метод, который принимает данные пользователя и шифрует в токен, который можно расшифровать с помощью декода
    async generateJwtToken(user) {
        const payload = { user };
        return this.jwtService.sign(payload, { // данные, которые положатся в токен
            secret: this.configService.get('secret_jwt'), // секретная фраза для подписи токена
            expiresIn: this.configService.get('expire_jwt') // время жизни токена
        })
    }
}
