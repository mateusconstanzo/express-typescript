import { Router, Request, Response, NextFunction } from 'express';
import { getCustomRepository, getManager } from "typeorm";
import { UserRepository } from '../repository/user.repository'
import { User } from '../entity/user.entity';
import Server from '../server';

export default class UserResource {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public async getAll(req: Request, res: Response) {

        let userRepository = getCustomRepository(UserRepository);

        userRepository.find().then(users => res.send(users));

    }

    init() {
        this.router.get('/user', this.getAll);
    }

}

