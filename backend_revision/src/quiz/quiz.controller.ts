import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROF, UserRole.PROFESSOR, UserRole.ADMIN)
  create(@Body() createQuizDto: CreateQuizDto, @Request() req: any) {
    return this.quizService.create(createQuizDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get('results')
  @UseGuards(JwtAuthGuard)
  getResults(@Request() req: any) {
    return this.quizService.getUserResults(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Post(':id/attempt')
  @UseGuards(JwtAuthGuard)
  submitAttempt(
    @Param('id') id: string,
    @Body() body: { answers: Record<string, string> },
    @Request() req: any,
  ) {
    return this.quizService.submitAttempt(id, req.user.id, body.answers);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROF, UserRole.PROFESSOR, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROF, UserRole.PROFESSOR, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
