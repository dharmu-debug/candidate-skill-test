import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionDifficulty, UserResponse } from './user-responses.entity';

@Injectable()
export class UserResponsesService {
    constructor(
        @InjectRepository(UserResponse)
        private userResponseRepository: Repository<UserResponse>) { }

    async getUserResponse(userId: string): Promise<UserResponse[]> {
        return this.userResponseRepository.find({
            where: {
                candidateId: userId
            }
        });
    }

    async rateUserResponse(userResponseId: string, rating: number): Promise<UserResponse> {
        const userResponse = await this.userResponseRepository.findOne({
            where: { id: userResponseId },
        });
        if (!userResponse) {
            throw new NotFoundException('No responses found for this candidate');
        }
        userResponse.rating = rating;
        return this.userResponseRepository.save(userResponse);
    }

    async getAggregatedSkillRatings(candidateId: string): Promise<{
        skillId: number;
        rating: string;
    }[]> {
        const responses = await this.userResponseRepository.find({
            where: { candidateId },
        });

        if (responses.length === 0) {
            return [];
        }

        const skillRatings = new Map<number, { sum: number, weight: number }>();

        for (const response of responses) {
            const weight = this.getWeight(response.difficulty);
            const skillRating = skillRatings.get(response.skillId) || { sum: 0, weight: 0 };
            skillRating.sum += weight * response.rating;
            skillRating.weight += weight;
            skillRatings.set(response.skillId, skillRating);
        }

        return Array.from(skillRatings.entries()).map(([skillId, ratingData]) => ({
            skillId,
            rating: (ratingData.sum / ratingData.weight).toFixed(1),
        }));
    }

    async getCandidateResponses(candidateId: string): Promise<UserResponse[]> {
        const responses = await this.userResponseRepository.find({ where: { candidateId } });
        if (!responses) {
            throw new NotFoundException('No responses found for this candidate');
        }
        return responses;
    }

    async getAllCandidateResponses(): Promise<UserResponse[]> {
        return await this.userResponseRepository.find();
    }

    private getWeight(difficulty: QuestionDifficulty): number {
        switch (difficulty) {
            case QuestionDifficulty.EASY:
                return 1;
            case QuestionDifficulty.MEDIIUM:
                return 2;
            case QuestionDifficulty.HARD:
                return 3;
            default:
                return 0;
        }
    }
}
