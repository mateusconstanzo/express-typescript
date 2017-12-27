import * as jsonwebtoken from 'jsonwebtoken'
import * as config from '../environment';

import { Router, Request, Response, NextFunction } from 'express';
import { getCustomRepository, getManager } from 'typeorm';
import { UserRepository } from '../repository/user.repository'
import { User } from '../entity/user.entity';
import { deserialize, JsonProperty } from 'json-typescript-mapper';
import { IsNotEmpty, Validator } from 'class-validator';

class Login {

    @IsNotEmpty()
    username: string = '';

    @IsNotEmpty()
    password: string = '';

}

export default class AuthResource {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public async login(req: Request, res: Response, next: NextFunction) {

        let login = deserialize(Login, req.body)

        let errors = new Validator().validateSync(login);

        if (errors.length > 0) {

            res.status(400)
                .json({ errors: errors })
                .end();

        } else {

            getCustomRepository(UserRepository)
                .findByUsernameAndPassword(login.username, login.password)
                .then((user) => {

                    if (user) {

                        let token = jsonwebtoken.sign(user, config.passport.secretOrKey);

                        res.send({ 'token': token });

                    } else {

                        res.send(400)

                    }

                });
        }

    }

    init() {

        this.router.post('/auth/login', this.login);

    }

}

