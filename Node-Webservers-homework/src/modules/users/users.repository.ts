import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./users.entity";
import * as uuid from "uuid";

const users: UserEntity[] = [];

class UsersRepository {
    createUser(dto: CreateUserDto) {
        const user: UserEntity = { id: uuid.v4(), ...dto };
        users.push(user);

        return user;
    }

    getUserById(id: string): UserEntity | undefined {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                return users[i];
            }
        }
        return undefined;
    }

    getUsersList(): UserEntity[] {
        return users;
    }

    updateUser(id: string, dto: CreateUserDto): UserEntity | undefined {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                users[i] = { id: uuid.v4(), ...dto };
                return users[i];
            }
        }
        return undefined;
    }

    deleteUser(id: string): Boolean | undefined {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                users.splice(i, 1);
                return true;
            }
        }
        return undefined;
    }
}

export const usersRepository = new UsersRepository();
