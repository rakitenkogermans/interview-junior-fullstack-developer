export interface PageOptionsDto {
  page: number;
  limit: number;
  order: 'asc' | 'desc';
  filter?: string;
}
