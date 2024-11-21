export interface IPaginationStore<T = unknown> {
  data: T[];
  pages: number | null;
  perPage: number;
  currentPage: number;
  goToPage: (page: number) => void;
}
