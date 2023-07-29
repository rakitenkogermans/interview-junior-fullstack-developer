import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CityService } from './city.service';
import { PageOptionsDto } from './dto/page-options.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  getCities(@Query() pageOptionsDto: PageOptionsDto) {
    return this.cityService.getCities(pageOptionsDto);
  }
}
