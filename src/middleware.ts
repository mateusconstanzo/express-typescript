import * as passport from 'passport';
import * as config from './environment'

import { Validator, ValidationError } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { deserialize, JsonProperty } from 'json-typescript-mapper';

export function authenticate() {
    return passport.authenticate(config.authHeader, {
        session: false
    });
}

type Constructor<T> = { new(): T };

export function validate<T>(type: Constructor<T>): RequestHandler {

    let validator = new Validator();

    return (req: Request, res: Response, next: NextFunction) => {

        let input = deserialize(type, req.body);

        let errors = validator.validateSync(input);

        if (errors.length > 0) {

            next(errors);

        } else {

            req.body = input;

            next();

        }
    }
}


export function validationError(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err instanceof Array && err[0] instanceof ValidationError) {

        console.log('validationError');

        res.send(400)
            .json({ errors: err })
            .end();

    } else {

        next(err);

    }
}