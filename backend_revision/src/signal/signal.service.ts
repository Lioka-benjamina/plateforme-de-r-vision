import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signal, SignalStatus } from './entities/signal.entity';
import { CreateSignalDto } from './dto/create-signal.dto';

@Injectable()
export class SignalService {
  constructor(
    @InjectRepository(Signal)
    private signalRepo: Repository<Signal>,
  ) {}

  async create(dto: CreateSignalDto) {
    const signal = this.signalRepo.create({
      ...dto,
      status: SignalStatus.PENDING,
    });
    return await this.signalRepo.save(signal);
  }

  async findAll(status?: string) {
    const where: any = {};
    if (status) where.status = status;
    return await this.signalRepo.find({ where, order: { date: 'DESC' } });
  }

  async findOne(id: string) {
    const signal = await this.signalRepo.findOneBy({ id });
    if (!signal) throw new NotFoundException('Signalement non trouvé');
    return signal;
  }

  async approve(id: string) {
    const signal = await this.signalRepo.findOneBy({ id });
    if (!signal) throw new NotFoundException('Signalement non trouvé');
    signal.status = SignalStatus.APPROVED;
    return await this.signalRepo.save(signal);
  }

  async reject(id: string) {
    const signal = await this.signalRepo.findOneBy({ id });
    if (!signal) throw new NotFoundException('Signalement non trouvé');
    signal.status = SignalStatus.REJECTED;
    return await this.signalRepo.save(signal);
  }

  async escalate(id: string) {
    const signal = await this.signalRepo.findOneBy({ id });
    if (!signal) throw new NotFoundException('Signalement non trouvé');
    signal.status = SignalStatus.ESCALATED;
    return await this.signalRepo.save(signal);
  }

  async remove(id: string) {
    await this.signalRepo.delete(id);
    return { message: 'Suppression réussie' };
  }
}
