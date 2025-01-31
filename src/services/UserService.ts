import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { UserData } from '../types/userTypes';
import bcrypt from 'bcrypt';

export class UserService {
    constructor(private userRepository: Repository<User>) {}
    async create({ firstName, lastName, email, password, role }: UserData) {
        try {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);
            return await this.userRepository.save({ firstName, lastName, email, password: hashPassword, role });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating user: ${error.message}`);
            } else {
                throw new Error('Unknown error occurred while creating user');
            }
        }
    }
}

