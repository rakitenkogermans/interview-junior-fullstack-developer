import { City } from './city';
import { PaginationMetadata } from './pagination-metadata';

export interface GetCitiesResponse {
  data: City[];
  metadata: PaginationMetadata;
}
