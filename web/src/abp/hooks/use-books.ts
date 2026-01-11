/**
 * React Query hooks for Books
 * Provides data fetching and mutation hooks for the Books API
 */

import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { bookService, BookDto, CreateUpdateBookDto, BookType, BookTypeLabels } from '../services/book-service';
import { PagedResultDto, PagedAndSortedResultRequestDto } from '../http-client';

// Query key factory
export const bookKeys = {
  all: ['books'] as const,
  lists: () => [...bookKeys.all, 'list'] as const,
  list: (params: PagedAndSortedResultRequestDto) => [...bookKeys.lists(), params] as const,
  details: () => [...bookKeys.all, 'detail'] as const,
  detail: (id: string) => [...bookKeys.details(), id] as const,
};

/**
 * Hook to fetch a paged list of books
 */
export function useBooks(
  params: PagedAndSortedResultRequestDto = { skipCount: 0, maxResultCount: 10 }
): UseQueryResult<PagedResultDto<BookDto>, Error> {
  return useQuery({
    queryKey: bookKeys.list(params),
    queryFn: () => bookService.getList(params),
  });
}

/**
 * Hook to fetch a single book by ID
 */
export function useBook(id: string): UseQueryResult<BookDto, Error> {
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => bookService.get(id),
    enabled: !!id,
  });
}

/**
 * Hook to create a new book
 */
export function useCreateBook(): UseMutationResult<BookDto, Error, CreateUpdateBookDto> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUpdateBookDto) => bookService.create(input),
    onSuccess: () => {
      // Invalidate all book lists to refetch
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
}

/**
 * Hook to update an existing book
 */
export function useUpdateBook(): UseMutationResult<BookDto, Error, { id: string; input: CreateUpdateBookDto }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }) => bookService.update(id, input),
    onSuccess: (_, { id }) => {
      // Invalidate the specific book and all lists
      queryClient.invalidateQueries({ queryKey: bookKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
}

/**
 * Hook to delete a book
 */
export function useDeleteBook(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookService.delete(id),
    onSuccess: () => {
      // Invalidate all book lists
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
}

// Re-export types and enums for convenience
export { BookType, BookTypeLabels };
export type { BookDto, CreateUpdateBookDto };
