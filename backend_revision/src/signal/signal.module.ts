import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signal } from './entities/signal.entity';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Signal])],
  controllers: [SignalController],
  providers: [SignalService],
  exports: [SignalService],
})
export class SignalModule {}
