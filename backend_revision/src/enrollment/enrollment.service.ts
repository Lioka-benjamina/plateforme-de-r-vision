import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,
  ) {}

  async enroll(coursId: string, userId: string) {
    const existing = await this.enrollmentRepo.findOneBy({
      cours_id: coursId,
      user_id: userId,
    });
    if (existing) {
      throw new ConflictException('Déjà inscrit à ce cours');
    }
    const totalLessons = await this.lessonRepo.count({
      where: { cours_id: coursId },
    });
    const enrollment = this.enrollmentRepo.create({
      cours_id: coursId,
      user_id: userId,
      totalLessons,
    });
    return await this.enrollmentRepo.save(enrollment);
  }

  async findByUser(userId: string) {
    return await this.enrollmentRepo.find({
      where: { user_id: userId },
      relations: ['cours', 'cours.auteur'],
      order: { enrolledAt: 'DESC' },
    });
  }

  async findByCourse(coursId: string) {
    return await this.enrollmentRepo.find({
      where: { cours_id: coursId },
      relations: ['user'],
      order: { enrolledAt: 'DESC' },
    });
  }

  async updateProgress(coursId: string, userId: string, lessonId?: string) {
    const enrollment = await this.enrollmentRepo.findOneBy({
      cours_id: coursId,
      user_id: userId,
    });
    if (!enrollment) {
      throw new NotFoundException('Inscription non trouvée');
    }
    if (enrollment.totalLessons === 0) {
      enrollment.totalLessons = await this.lessonRepo.count({
        where: { cours_id: coursId },
      });
    }
    if (lessonId) {
      if (enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons = enrollment.completedLessons.filter((id) => id !== lessonId);
      } else {
        enrollment.completedLessons = [...enrollment.completedLessons, lessonId];
      }
    }
    enrollment.lessonsCompleted = enrollment.completedLessons.length;
    enrollment.progress =
      enrollment.totalLessons > 0
        ? Math.round(
            (enrollment.lessonsCompleted / enrollment.totalLessons) * 100,
          )
        : 0;
    return await this.enrollmentRepo.save(enrollment);
  }
}
