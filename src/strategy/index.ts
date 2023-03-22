import { ConfigService } from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('secret_jwt')
        });
    }

    async validate (payload: any) {
        return {...payload.user}
    }
}

/*
По сути, здесь мы расширяем класс PassportStrategy и указываем, что хотим расширить стратегию из пакета passport-jwt.

Далее мы инициализируем стратегию, передавая некоторые параметры в вызове super().

1)jwtFromRequest - Этот параметр определяет метод, с помощью которого мы будем извлекать JWT из запроса.
В основном мы используем метод fromAuthHeaderAsBearerToken() из пакета ExtractJwt. Это связано с тем,
что стандартной практикой является передача JWT-токена в качестве маркера предъявителя в заголовке авторизации
при выполнении API-запросов.

2)ignoreExpiration - Мы установили это свойство как false. Это означает, что мы хотим блокировать запросы с просроченными
токенами. Если вызов будет сделан с просроченным токеном, наше приложение вернет ответ 401 или Unauthorized.

3)secretOrKey - В основном это секретный ключ из файла констант.

Далее мы реализуем функцию validate(). В этой функции мы просто возвращаем объект пользователя. Это может показаться
непонятным, поскольку в функции мы ничего не обрабатываем. Это происходит потому, что для стратегии JWT паспорт сначала
проверяет подпись JWT и декодирует объект JSON. Только после этого он фактически вызывает функцию validate() и
передает декодированный JSON в качестве полезной нагрузки.
В принципе, это гарантирует, что если функция validate() вызвана, значит, JWT тоже действителен.
 */