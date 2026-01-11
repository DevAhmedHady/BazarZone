/**
 * Book App Service
 * ABP API client for Books CRUD operations
 */

import abpHttpClient, { PagedResultDto, PagedAndSortedResultRequestDto, AuditedEntityDto } from '../http-client';

// Book Type enum matching the backend
export enum BookType {
  Undefined = 0,
  Adventure = 1,
  Biography = 2,
  Dystopia = 3,
  Fantastic = 4,
  Horror = 5,
  Science = 6,
  ScienceFiction = 7,
  Poetry = 8,
}

// Book type labels for display
export const BookTypeLabels: Record<BookType, string> = {
  [BookType.Undefined]: 'Undefined',
  [BookType.Adventure]: 'Adventure',
  [BookType.Biography]: 'Biography',
  [BookType.Dystopia]: 'Dystopia',
  [BookType.Fantastic]: 'Fantastic',
  [BookType.Horror]: 'Horror',
  [BookType.Science]: 'Science',
  [BookType.ScienceFiction]: 'Science Fiction',
  [BookType.Poetry]: 'Poetry',
};

// BookDto matching the backend
export interface BookDto extends AuditedEntityDto<string> {
  name: string;
  type: BookType;
  publishDate: string;
  price: number;
}

// CreateUpdateBookDto matching the backend
export interface CreateUpdateBookDto {
  name: string;
  type: BookType;
  publishDate: string;
  price: number;
}

// API endpoint
const API_ENDPOINT = '/api/app/book';

/**
 * Book Service - provides CRUD operations for books
 */
export const bookService = {
  /**
   * Get a single book by ID
   */
  async get(id: string): Promise<BookDto> {
    const response = await abpHttpClient.get<BookDto>(`${API_ENDPOINT}/${id}`);
    return response.data;
  },

  /**
   * Get a paged list of books
   */
  async getList(input?: PagedAndSortedResultRequestDto): Promise<PagedResultDto<BookDto>> {
    const params = {
      skipCount: input?.skipCount || 0,
      maxResultCount: input?.maxResultCount || 10,
      sorting: input?.sorting || '',
    };
    const response = await abpHttpClient.get<PagedResultDto<BookDto>>(API_ENDPOINT, { params });
    return response.data;
  },

  /**
   * Create a new book
   */
  async create(input: CreateUpdateBookDto): Promise<BookDto> {
    const response = await abpHttpClient.post<BookDto>(API_ENDPOINT, input);
    return response.data;
  },

  /**
   * Update an existing book
   */
  async update(id: string, input: CreateUpdateBookDto): Promise<BookDto> {
    const response = await abpHttpClient.put<BookDto>(`${API_ENDPOINT}/${id}`, input);
    return response.data;
  },

  /**
   * Delete a book
   */
  async delete(id: string): Promise<void> {
    await abpHttpClient.delete(`${API_ENDPOINT}/${id}`);
  },
};

export default bookService;
