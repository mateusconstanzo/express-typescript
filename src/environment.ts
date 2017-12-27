import { ConnectionOptions } from "typeorm";
import { User } from './entity/user.entity'
import { ExtractJwt, StrategyOptions } from 'passport-jwt'

export const authHeader = "jwt";

export const db: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "api",
    entities: [User],
    synchronize: true
}

export const passport: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(authHeader),
    secretOrKey: 'secret'
}