export interface Book {
  id: string;
  title: string;
  author: string;
  firstPublishYear: number | null;
  editionCount: number;
  coverId: number | null;
  coverUrlMedium: string | null;
  coverUrlLarge: string | null;
  description: string;
}