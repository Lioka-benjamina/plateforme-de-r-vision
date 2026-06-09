import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,
  ) {}

  async findAll(coursId?: string, status?: string) {
    const where: any = {};
    if (coursId) where.cours_id = coursId;
    if (status) where.status = status;
    return await this.lessonRepo.find({
      where,
      order: { ordre: 'ASC' },
    });
  }

  async findOne(id: string) {
    const lesson = await this.lessonRepo.findOneBy({ id });
    if (!lesson) throw new NotFoundException('Leçon non trouvée');
    return lesson;
  }

  async create(data: Partial<Lesson>) {
    const maxOrdre = await this.lessonRepo.maximum('ordre', { cours_id: data.cours_id });
    const lesson = this.lessonRepo.create({
      ...data,
      status: 'en_attente',
      ordre: (maxOrdre ?? 0) + 1,
    });
    return await this.lessonRepo.save(lesson);
  }

  async update(id: string, data: Partial<Lesson>) {
    const lesson = await this.lessonRepo.findOneBy({ id });
    if (!lesson) throw new NotFoundException('Leçon non trouvée');
    await this.lessonRepo.update(id, data);
    return await this.lessonRepo.findOneBy({ id });
  }

  async approve(id: string) {
    const lesson = await this.lessonRepo.findOneBy({ id });
    if (!lesson) throw new NotFoundException('Leçon non trouvée');
    lesson.status = 'publié';
    return await this.lessonRepo.save(lesson);
  }

  async reject(id: string) {
    const lesson = await this.lessonRepo.findOneBy({ id });
    if (!lesson) throw new NotFoundException('Leçon non trouvée');
    lesson.status = 'rejeté';
    return await this.lessonRepo.save(lesson);
  }

  async remove(id: string) {
    await this.lessonRepo.delete(id);
    return { message: 'Suppression réussie' };
  }
}
