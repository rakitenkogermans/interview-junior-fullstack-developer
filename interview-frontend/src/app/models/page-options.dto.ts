export class PageOptionsDto {
  page: number = 1;
  limit: number = 5;
  order: 'asc' | 'desc' = 'asc';
  filter?: string;
}
