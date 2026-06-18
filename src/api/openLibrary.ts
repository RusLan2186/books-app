import type { Book } from '../types';

interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  edition_count?: number;
  cover_i?: number;
  cover_edition_key?: string;
  subject?: string[];
}

interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
}

const SEARCH_QUERY = 'fantasy';
const RESULTS_LIMIT = 60;
const FIELDS = 'key,title,author_name,first_publish_year,edition_count,cover_i,cover_edition_key,subject';

function buildCoverUrl(coverId: number | null, coverEditionKey: string | null, size: 'M' | 'L'): string | null {
  if (coverId) {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }
  if (coverEditionKey) {
    return `https://covers.openlibrary.org/b/olid/${coverEditionKey}-${size}.jpg`;
  }
  return null;
}

function mapDocToBook(doc: OpenLibraryDoc, index: number): Book {
  const coverId = doc.cover_i ?? null;
  const coverEditionKey = doc.cover_edition_key ?? null;
  const author = doc.author_name?.join(', ') ?? 'Unknown author';

  const allSubjectWords = (doc.subject ?? []).flatMap((phrase) =>
    phrase.split(',').map((word) => word.trim())
  );
  const uniqueSubjectWords = Array.from(new Set(allSubjectWords));
  const subjects =
    uniqueSubjectWords.length > 0
      ? uniqueSubjectWords.slice(0, 5).join(', ')
      : 'No subjects listed';

  return {
    id: doc.key ?? `book-${index}`,
    title: doc.title ?? 'Untitled',
    author,
    firstPublishYear: doc.first_publish_year ?? null,
    editionCount: doc.edition_count ?? 0,
    coverId,
    coverUrlMedium: buildCoverUrl(coverId, coverEditionKey, 'M'),
    coverUrlLarge: buildCoverUrl(coverId, coverEditionKey, 'L'),
    description: subjects,
  };
}


export async function fetchBooks(): Promise<Book[]> {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    SEARCH_QUERY
  )}&limit=${RESULTS_LIMIT}&fields=${FIELDS}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Open Library request failed: ${response.status}`);
  }

  const data: OpenLibraryResponse = await response.json();

  return data.docs.map(mapDocToBook);
}