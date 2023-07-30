import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { PageOptionsDto } from '../models/page-options.dto';
import { City } from '../models/city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: City[] = [];
  loading: boolean = false;
  totalPages: number = 0;
  pageOptions: PageOptionsDto = { page: 1, limit: 5, order: 'asc', filter: '' };
  debounce: ReturnType<typeof setTimeout> | null = null;
  totalCities: number = 0;
  pagesArray: number[] = [];

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.getCities(this.pageOptions);
  }

  onKey(): void {
    if(this.debounce) {
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => {
      this.pageOptions.page = 1;
      this.getCities(this.pageOptions);
    }, 600);
  }

  getCities(options: PageOptionsDto): void {
    this.loading = true;
    this.cityService.getCities(options).then(response => {
      this.cities = response.data.data;
      this.totalCities = response.data.metadata.itemCount;
      this.loading = false;
      this.pagesArray = Array.from({length: Math.ceil(this.totalCities / this.pageOptions.limit)}, (_, i) => i + 1);
      this.totalPages = this.pagesArray.length;
    }).catch(error => {
      console.error(error);
      this.loading = false;
    });
  }

  setPage(page: number): void {
    this.pageOptions.page = page;
    this.getCities(this.pageOptions);
  }

  getDisplayedPages() {
    let startPage: number, endPage: number;
    if (this.pagesArray.length <= 10) {
      startPage = 1;
      endPage = this.pagesArray.length;
    } else {
      if (this.pageOptions.page <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (this.pageOptions.page + 4 >= this.pagesArray.length) {
        startPage = this.pagesArray.length - 9;
        endPage = this.pagesArray.length;
      } else {
        startPage = this.pageOptions.page - 5;
        endPage = this.pageOptions.page + 4;
      }
    }

    return this.pagesArray.slice(startPage - 1, endPage);
  }

}
