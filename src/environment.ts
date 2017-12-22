import { ConnectionOptions } from "typeorm";
import { User } from './entity/user.entity'

export let db: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "api",
    entities: [User],
    synchronize: true
}