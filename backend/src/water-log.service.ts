import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class WaterLogService {
  constructor(private prisma: PrismaService) {}

  async upsertWaterLog(userId: string, date: string, intakeMl: number) {
    // Parse 'YYYY-MM-DD' as midnight UTC to avoid timezone issues
    const isoDate = new Date(date + 'T00:00:00.000Z').toISOString();
    return this.prisma.waterLog.upsert({
      where: { userId_date: { userId, date: isoDate } },
      update: { intakeMl },
      create: { userId, date: isoDate, intakeMl },
    });
  }

  async getWaterSummary(userId: string) {
    // Get last 7 days, fill missing days with 0
    const result = await this.prisma.$queryRaw<any[]>`
      WITH days AS (
        SELECT date('now', '-' || value || ' days') AS date
        FROM (SELECT 0 AS value UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6)
      )
      SELECT
        days.date as date,
        COALESCE(SUM(wl.intakeMl), 0) as totalIntake,
        ROUND(COALESCE(SUM(wl.intakeMl), 0) * 100.0 / 2000) as percentageOfGoal
      FROM days
      LEFT JOIN WaterLog wl ON wl.userId = ${userId} AND substr(wl.date, 1, 10) = days.date
      GROUP BY days.date
      ORDER BY days.date DESC
    `;
    // Convert BigInt fields to Number
    return result.map(row => ({
      ...row,
      totalIntake: typeof row.totalIntake === 'bigint' ? Number(row.totalIntake) : row.totalIntake,
      percentageOfGoal: typeof row.percentageOfGoal === 'bigint' ? Number(row.percentageOfGoal) : row.percentageOfGoal,
    }));
  }
}
