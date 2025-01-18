import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { UserData } from '../types/userTypes';

export class UserService {
    constructor(private userRepository: Repository<User>) {}
    async create({ firstName, lastName, email, password }: UserData) {
        try {
            return await this.userRepository.save({ firstName, lastName, email, password });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating user: ${error.message}`);
            } else {
                throw new Error('Unknown error occurred while creating user');
            }
        }
    }
}

