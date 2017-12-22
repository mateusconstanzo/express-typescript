import { suite, test } from 'mocha-typescript';
import * as mocha from 'mocha';
import * as chai from 'chai';

import { db } from '../environment';

const expect = chai.expect;

@suite class Environment {

    @test('should check database credentials') checkDatabase() {
        expect(db.type).to.be.equal('mysql');
    }
}