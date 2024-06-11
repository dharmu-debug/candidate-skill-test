import { IsInt, IsUUID, Min, Max } from 'class-validator';

export class CreateRatingDto {
    @IsUUID()
    userResponseId: string;

    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;
}
