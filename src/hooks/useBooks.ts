import { useEffect, useState } from 'react';
import { fetchBooks } from '../api/openLibrary';
import type { Book } from '../types';

interface UseBooksResult {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export function useBooks(): UseBooksResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    fetchBooks()
      .then((data) => {
        if (!isCancelled) setBooks(data);
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return { books, loading, error };
}