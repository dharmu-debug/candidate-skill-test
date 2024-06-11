import { User } from '../user/user.entity';
import { Base } from '../common/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Check } from 'typeorm';

export enum QuestionDifficulty {
    EASY = 'easy',
    MEDIIUM = 'medium',
    HARD = 'hard'
}

@Entity('user_responses')
// Checks for skillId and rating
@Check(`"skillId" >= 1 AND "skillId" <= 100`)
@Check(`"rating" >= 0 AND "rating" <= 5`)
export class UserResponse extends Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    question: string;

    @Column({ type: 'text', nullable: true })
    response: string;

    @Column({
        type: 'enum',
        enum: QuestionDifficulty,
    })
    difficulty: QuestionDifficulty;

    @Column({ type: 'int' })
    skillId: number;

    @Column({ type: 'int', nullable: true })
    rating: number;

    @ManyToOne(() => User, (user) => user.responses)
    @JoinColumn({ name: 'candidateId' })
    candidate: User;

    @Column({ type: 'uuid' })
    candidateId: string;
}
