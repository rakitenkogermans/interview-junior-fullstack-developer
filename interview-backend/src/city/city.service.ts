import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import * as data from '../data/cities.json';
import { City } from './interfaces/city';
import { PageOptionsDto } from './dto/page-options.dto';
import { GetCitiesResponse } from './interfaces/get-cities-response';

@Injectable()
export class CityService {
  private cities: City[] = data;

  getCities(pageOptionsDto: PageOptionsDto): GetCitiesResponse {
    const { page = 1, limit = 5, order, filter } = pageOptionsDto;

    if (page < 1 || limit < 1) {
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

    if (order) {
      cities.sort(
        (a, b) =>
          a.cityName.localeCompare(b.cityName) * (order === 'asc' ? 1 : -1),
      );
    }

    const itemCount = cities.length;
    const pageCount = Math.ceil(itemCount / limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < pageCount;

    const metadata = {
      page,
      limit,
      itemCount,
      pageCount,
      hasPreviousPage,
      hasNextPage,
    };

    const resultCities = cities.slice((page - 1) * limit, page * limit);

    return { data: resultCities, metadata };
  }

  getCity(name: string): City {
    const city = this.cities.find(
      (city) => city.cityName.toLowerCase() === name.toLowerCase(),
    );

    if (!city) {
      throw new NotFoundException(`City with name ${name} not found`);
    }

    return city;
  }

  public setCities(cities: City[]): void {
    this.cities = cities;
  }
}
