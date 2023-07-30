import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import {PageOptionsDto} from "../models/page-options.dto";
import {City} from "../models/city";
import {GetCitiesResponseMetadata} from "../models/metadata";

interface GetCitiesResponse {
  data: City[],
  metadata: GetCitiesResponseMetadata
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseURL: string = environment.apiUrl;

  getCities(options: PageOptionsDto) {
    return axios.get<GetCitiesResponse>(`${this.baseURL}/cities`, { params: options });
  }
}
