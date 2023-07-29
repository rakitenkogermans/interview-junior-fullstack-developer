import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';

@Module({
  imports: [CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
