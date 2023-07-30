import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  UsePipes,
  Param,
} from '@nestjs/common';
import { CityService } from './city.service';
import { PageOptionsDto } from './dto/page-options.dto';
import { GetCitiesResponse } from './interfaces/get-cities-response';
import { City } from './interfaces/city';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  getCities(@Query() pageOptionsDto: PageOptionsDto): GetCitiesResponse {
    return this.cityService.getCities(pageOptionsDto);
  }

  @Get('/:name')
  getCity(@Param('name') name: string): City {
    return this.cityService.getCity(name);
  }
}
