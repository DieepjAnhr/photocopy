"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepositoryImpl {
    findUserById(id) {
        return `User `;
    }
    saveUser(user) {
        console.log(`Saving user: `);
    }
}
class RepositoryFactory {
    static getRepository(repositoryType) {
        switch (repositoryType) {
            case 'user':
                return new UserRepositoryImpl();
            default:
                return null;
        }
    }
}
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getUserById(id) {
        return this.userRepository.findUserById(id);
    }
    saveUser(user) {
        this.userRepository.saveUser(user);
    }
}
const userRepository = RepositoryFactory.getRepository('user');
if (userRepository) {
    const userService = new UserService(userRepository);
    console.log(userService.getUserById(1));
    userService.saveUser('John Doe');
}
else {
    console.error('Repository type not supported');
}
//# sourceMappingURL=test.js.map