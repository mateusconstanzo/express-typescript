import { EntityRepository, Repository, EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    createAndSave(username: string, password: string) {
        let user = new User();
        user.username = username;
        user.password = password;
        user.active = true;
        return this.manager.save(user);
    }

    findByUsernameAndPassword(username: string, password: string) {
        return this.findOne({
            username: username,
            password: password,
            active: true
        });
    }

}