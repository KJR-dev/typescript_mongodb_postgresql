import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../constant';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ type: 'enum', enum: Object.values(Roles),default:Roles.CUSTOMER })
    role!: string;
}

