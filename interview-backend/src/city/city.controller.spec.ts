import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { City } from './interfaces/city.interface';
import { PageOptionsDto } from './dto/page-options.dto';
import { NotFoundException } from '@nestjs/common';

describe('CityController', () => {
  let controller: CityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService],
    }).compile();

    controller = module.get<CityController>(CityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCities', () => {
    it('should return an array of cities', async () => {
      const result: City[] = [{ uuid: 'id1', cityName: 'Test1', count: 1 }];
      jest
        .spyOn(CityService.prototype, 'getCities')
        .mockImplementation(() => result);
      const pageOptionsDto = {
        page: 1,
        limit: 10,
        order: 'asc',
      } as PageOptionsDto;
      expect(controller.getCities(pageOptionsDto)).toBe(result);
    });
  });

  describe('getCity', () => {
    it('should return a single city', async () => {
      const result: City = { uuid: 'id1', cityName: 'Test1', count: 1 };
      jest
        .spyOn(CityService.prototype, 'getCity')
        .mockImplementation(() => result);
      expect(await controller.getCity('Test1')).toBe(result);
    });

    it('should throw an error when a city is not found', () => {
      jest.spyOn(CityService.prototype, 'getCity').mockImplementation(() => {
        throw new NotFoundException();
      });
      expect(() => controller.getCity('Unknown')).toThrow(NotFoundException);
    });
  });
});
