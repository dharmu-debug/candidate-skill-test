import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserResponsesService } from './user-responses.service';
import { CreateRatingDto } from './dto/create-rating.dto';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('user-responses')
export class UserResponsesController {
  constructor(private readonly userResponseService: UserResponsesService) { }
  // @UseGuards(JwtAuthGuard)
  @Get('aggregate/:candidateId')
  async getAggregatedSkillRatings(@Param('candidateId') candidateId: string) {
    return this.userResponseService.getAggregatedSkillRatings(candidateId);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('rate/:id')
  async rateUserResponse(
    @Param('id') userResponseId: string,
    @Body() createRatingDto: CreateRatingDto
  ) {
    return this.userResponseService.rateUserResponse(userResponseId, createRatingDto.rating);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('candidate/:candidateId')
  async getCandidateResponses(@Param('candidateId') candidateId: string) {
    return this.userResponseService.getCandidateResponses(candidateId);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCandidateResponses() {
    return this.userResponseService.getAllCandidateResponses();
  }
}
