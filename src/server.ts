import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as config from './environment';

import { Strategy, ExtractJwt } from 'passport-jwt'
import { getCustomRepository, getManager, createConnection, Connection } from 'typeorm';
import { UserRepository } from './repository/user.repository'

import AuthResource from './resource/auth.resource';
import UserResource from './resource/user.resource';

class Server {

    public express: express.Application;
    public connection: Connection;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.createConnection();
        this.security();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
        this.express.use(morgan('combined'));
    }

    private createConnection() {

        createConnection(config.db)
            .then(connection => {
                console.log('Connected to DB')
                this.connection = connection;
            })
            .catch(error => console.log('TypeORM connection error: ', error));

    }

    private security() {

        passport.use(new Strategy(config.passport, async (jwtPayload, done) => {

            getCustomRepository(UserRepository)
                .findOneById(jwtPayload.userId)
                .then((user) => done(null, user))
                .catch((err) => done(null, false));

        }))

    }

    private routes(): void {

        let prefix = '/api/v1';

        let router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        this.express.use('/', router);

        this.express.use(prefix, new AuthResource().router);

        this.express.use(prefix, new UserResource().router);
    }

}

export default new Server();