import { Router, Request, Response, NextFunction } from 'express';
import { getCustomRepository, getManager } from 'typeorm';
import { authenticate } from '../middleware';
import { UserRepository } from '../repository/user.repository'
import { User } from '../entity/user.entity';

export default class UserResource {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response) {

        getCustomRepository(UserRepository)
            .find()
            .then(users => res.send(users));

    }

    init() {

        this.router.use(authenticate())

        this.router.get('/user', this.getAll);

    }

}

