import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { City } from './interfaces/city.interface';
import { PageOptionsDto } from './dto/page-options.dto';
import { NotFoundException } from '@nestjs/common';

describe('CityService', () => {
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);

    service.setCities([
      { uuid: 'id1', cityName: 'Test1', count: 1 },
      { uuid: 'id2', cityName: 'Test2', count: 2 },
      { uuid: 'id3', cityName: 'Test3', count: 3 },
    ] as City[]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCities', () => {
    it('should return the correct number of cities with default parameters', () => {
      const pageOptionsDto: PageOptionsDto = new PageOptionsDto();
      expect(service.getCities(pageOptionsDto)).toHaveLength(3);
    });

    it('should return the correct number of cities with custom limit', () => {
      const pageOptionsDto = { page: 1, limit: 2 } as PageOptionsDto;
      expect(service.getCities(pageOptionsDto)).toHaveLength(2);
    });

    it('should throw error when page is less than 1', () => {
      const pageOptionsDto = { page: 0 } as PageOptionsDto;
      expect(() => service.getCities(pageOptionsDto)).toThrowError();
    });

    it('should throw error when limit is less than 1', () => {
      const pageOptionsDto = { limit: 0 } as PageOptionsDto;
      expect(() => service.getCities(pageOptionsDto)).toThrowError();
    });

    it('should filter cities correctly', () => {
      const pageOptionsDto = { filter: 'Test1' } as PageOptionsDto;
      const cities = service.getCities(pageOptionsDto);
      expect(cities).toHaveLength(1);
      expect(cities[0].cityName).toEqual('Test1');
    });

    it('should order cities correctly in descending order', () => {
      const pageOptionsDto = { order: 'desc' } as PageOptionsDto;
      const cities = service.getCities(pageOptionsDto);
      expect(cities[0].cityName).toEqual('Test3');
      expect(cities[1].cityName).toEqual('Test2');
    });

    it('should order cities correctly in ascending order', () => {
      const pageOptionsDto = { order: 'asc' } as PageOptionsDto;
      const cities = service.getCities(pageOptionsDto);
      expect(cities[0].cityName).toEqual('Test1');
      expect(cities[1].cityName).toEqual('Test2');
    });
  });

  describe('getCity', () => {
    it('should return a city by name', () => {
      expect(service.getCity('Test1')).toEqual({
        uuid: 'id1',
        cityName: 'Test1',
        count: 1,
      });
    });

    it('should throw an error when a city is not found', () => {
      expect(() => service.getCity('Unknown')).toThrowError(NotFoundException);
    });
  });
});
