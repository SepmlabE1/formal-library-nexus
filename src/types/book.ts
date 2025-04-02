
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  publicationYear?: number;
  category: string;
  description?: string;
  pageCount?: number;
  available: boolean;
  copies: number;
  coverImage?: string;
  addedDate: string;
  location?: string;
}
