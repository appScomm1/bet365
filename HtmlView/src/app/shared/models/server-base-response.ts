
// interfacce per risposte a chiamate HTTP

export interface ServerBaseResponse<T> {
  message: string | Array<any>;
  data: T | Array<T>;
  errors: string | Array<any>;
  filters: object;
  pagination: object;
}

/*
export interface ServerHeader {
  errors: Array<ServerError>;
  message: string;
  filters: Filters;
  pagination: Pagination;

}

export interface ServerError {
  code: number;
  title: string;
  message: string;
}

export interface Filters extends BasePagination {
  params: any;
}

export interface Pagination extends BasePagination {
  totalItems: number;
  totalPages: number;
}

interface BasePagination {
  itemsPerPage: number;
  currentPage: number;
  dati: any;
}

export interface Stats {
  count:  {};
}*/
