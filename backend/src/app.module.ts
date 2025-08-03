import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { WaterLogController } from './water-log.controller';
import { WaterLogService } from './water-log.service';

@Module({
  imports: [],
  controllers: [WaterLogController],
  providers: [PrismaService, WaterLogService],
})
export class AppModule {}
