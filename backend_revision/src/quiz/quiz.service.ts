import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepo: Repository<Quiz>,
    ) { }

    async create(dto: CreateQuizDto, auteurId: string) {
        const quiz = this.quizRepo.create({
            ...dto,
            auteur_id: auteurId,
        });
        return await this.quizRepo.save(quiz);
    }

    async findAll() {
        return await this.quizRepo.find();
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

    async remove(id: string) {
        await this.quizRepo.delete(id);
        return { message: 'Suppression réussie' };
    }
}
