import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,
    @InjectRepository(QuizAttempt)
    private attemptRepo: Repository<QuizAttempt>,
  ) {}

  async create(dto: CreateQuizDto, auteurId: string) {
    const quiz = this.quizRepo.create({
      ...dto,
      status: 'en_attente',
      auteur_id: auteurId,
    });
    return await this.quizRepo.save(quiz);
  }

  async findAll(status?: string) {
    const where: any = {};
    if (status) where.status = status;
    return await this.quizRepo.find({ where });
  }

  async findByCourse(coursId: string, status?: string) {
    const where: any = { cours_id: coursId };
    if (status) where.status = status;
    return await this.quizRepo.find({ where });
  }

  async findOne(id: string) {
    const quiz = await this.quizRepo.findOneBy({ id });
    if (!quiz) {
      throw new NotFoundException('Quiz non trouvé');
    }
    return quiz;
  }

  async update(id: string, dto: UpdateQuizDto) {
    const quiz = await this.quizRepo.findOneBy({ id });
    if (!quiz) {
      throw new NotFoundException('Quiz non trouvé');
    }
    await this.quizRepo.update(id, dto as any);
    return await this.quizRepo.findOneBy({ id });
  }

  async approve(id: string) {
    const quiz = await this.quizRepo.findOneBy({ id });
    if (!quiz) throw new NotFoundException('Quiz non trouvé');
    quiz.status = 'publié';
    return await this.quizRepo.save(quiz);
  }

  async reject(id: string) {
    const quiz = await this.quizRepo.findOneBy({ id });
    if (!quiz) throw new NotFoundException('Quiz non trouvé');
    quiz.status = 'rejeté';
    return await this.quizRepo.save(quiz);
  }

  async remove(id: string) {
    await this.quizRepo.delete(id);
    return { message: 'Suppression réussie' };
  }

  async submitAttempt(
    quizId: string,
    userId: string,
    answers: Record<string, string>,
  ) {
    const quiz = await this.quizRepo.findOneBy({ id: quizId });
    if (!quiz) {
      throw new NotFoundException('Quiz non trouvé');
    }
    if (!quiz.questions || quiz.questions.length === 0) {
      throw new BadRequestException('Ce quiz ne contient pas de questions');
    }

    let score = 0;
    const total = quiz.questions.length;

    for (const question of quiz.questions) {
      const selectedOptionId = answers[question.id];
      if (!selectedOptionId) continue;

      const correctOption = question.options.find((o) => o.correct);
      if (correctOption && correctOption.id === selectedOptionId) {
        score++;
      }
    }

    const attempt = this.attemptRepo.create({
      quiz_id: quizId,
      user_id: userId,
      answers,
      score,
      total,
    });

    await this.attemptRepo.save(attempt);

    return {
      id: attempt.id,
      score: attempt.score,
      total: attempt.total,
      quizTitre: quiz.titre,
      date: attempt.createdAt,
    };
  }

  async getUserResults(userId: string) {
    const attempts = await this.attemptRepo.find({
      where: { user_id: userId },
      order: { createdAt: 'DESC' },
    });

    const quizIds = [...new Set(attempts.map((a) => a.quiz_id))];
    const quizzes = await this.quizRepo.findBy({ id: In(quizIds) });
    const quizMap = new Map(quizzes.map((q) => [q.id, q.titre]));

    return attempts.map((a) => ({
      id: a.id,
      quizId: a.quiz_id,
      quizTitre: quizMap.get(a.quiz_id) || 'Quiz',
      score: a.score,
      total: a.total,
      date: a.createdAt,
    }));
  }
}
