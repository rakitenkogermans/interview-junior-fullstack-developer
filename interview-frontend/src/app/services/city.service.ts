import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import {PageOptionsDto} from "../models/page-options.dto";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseURL: string = environment.apiUrl;

  getCities(options: PageOptionsDto): Promise<any> {
    return axios.get(`${this.baseURL}/cities`, { params: options });
  }
}
