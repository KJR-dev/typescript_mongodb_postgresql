import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class News2 {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: '50' })
    authorName!: string;

    @Column({ length: '250' })
    title!: string;

    @Column({
        type: 'text'
    })
    content!: string;

    @Column({ type: 'enum', enum: ['Feature article', 'Latest article', 'General article'] })
    articles!: string;

    @Column()
    date!: string;
}

