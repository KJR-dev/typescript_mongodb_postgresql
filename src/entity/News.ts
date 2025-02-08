import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    authorName: string;

    @Column({ length: 150 })
    title: string;

    @Column({
        type: 'text'
    })
    content: string;

    @Column({
        type: 'enum',
        enum: ['Latest article', 'Feature article', 'General article']
    })
    articles: string;

    @Column()
    date: string;
}

