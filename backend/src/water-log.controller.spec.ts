import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogController } from './water-log.controller';
import { WaterLogService } from './water-log.service';

const mockWaterLogService = {
  upsertWaterLog: jest.fn().mockResolvedValue({ userId: 'user1', date: '2025-08-03', intakeMl: 1500 }),
  getWaterSummary: jest.fn().mockResolvedValue([
    { date: '2025-08-03', totalIntake: 1500, percentageOfGoal: 75 },
    { date: '2025-08-02', totalIntake: 2000, percentageOfGoal: 100 },
  ]),
};

describe('WaterLogController', () => {
  let controller: WaterLogController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterLogController],
      providers: [
        { provide: WaterLogService, useValue: mockWaterLogService },
      ],
    }).compile();

    controller = module.get<WaterLogController>(WaterLogController);
  });

  it('should upsert water log', async () => {
    const result = await controller.logWater({ userId: 'user1', date: '2025-08-03', intakeMl: 1500 });
    expect(result).toEqual({ userId: 'user1', date: '2025-08-03', intakeMl: 1500 });
    expect(mockWaterLogService.upsertWaterLog).toHaveBeenCalledWith('user1', '2025-08-03', 1500);
  });

  it('should get water summary', async () => {
    const result = await controller.getSummary('user1');
    expect(result).toEqual([
      { date: '2025-08-03', totalIntake: 1500, percentageOfGoal: 75 },
      { date: '2025-08-02', totalIntake: 2000, percentageOfGoal: 100 },
    ]);
    expect(mockWaterLogService.getWaterSummary).toHaveBeenCalledWith('user1');
  });
});
