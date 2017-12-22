import { suite, test } from 'mocha-typescript';
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import Server from '../../../src/server';

chai.use(chaiHttp);
const expect = chai.expect;

@suite class User {

    @test('should return all users') getAll() {
        return chai.request(Server.express).get('/api/v1/user').then(res => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.not.empty;
        })
    }
}