import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { PageOptionsDto } from '../models/page-options.dto';
import { City } from '../models/city.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: City[] = [];
  loading: boolean = false;
  pageOptions: PageOptionsDto = { page: 1, limit: 5, order: 'asc', filter: '' };
  debounce: ReturnType<typeof setTimeout> | null = null;

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.getCities(this.pageOptions);
  }

  onKey(value: string): void {
    if(this.debounce) {
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => {
      this.getCities(this.pageOptions);
    }, 600);
  }

  getCities(options: PageOptionsDto): void {
    this.loading = true;
    this.cityService.getCities(options).then(response => {
      this.cities = response.data;
      this.loading = false;
    }).catch(error => {
      console.error(error);
      this.loading = false;
    });
  }
}
