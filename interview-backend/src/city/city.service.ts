import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as data from '../data/cities.json';
import { City } from './interfaces/city.interface';
import { PageOptionsDto } from './dto/page-options.dto';

@Injectable()
export class CityService {
  private cities: City[] = data;

  getCities(pageOptionsDto: PageOptionsDto): City[] {
    const { page = 1, limit = 5, sort, filter } = pageOptionsDto;

    if (page < 0 || limit < 1) {
      throw new HttpException(
        'Invalid page or limit parameters.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let cities = this.cities;

    if (filter) {
      cities = cities.filter((city) =>
        city.cityName.toLowerCase().includes(filter.toLowerCase()),
      );
    }

    if (sort) {
      cities.sort(
        (a, b) =>
          a.cityName.localeCompare(b.cityName) * (sort === 'asc' ? 1 : -1),
      );
    }

    return cities.slice((page - 1) * limit, page * limit);
  }
}
