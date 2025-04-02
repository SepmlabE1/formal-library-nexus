
import { Book } from "@/types/book";
import { mockBooks } from "./mockData";
import { toast } from "sonner";

// Local storage key
const BOOKS_STORAGE_KEY = "library_books";

// Initialize local storage with mock data if it doesn't exist
const initializeBooks = (): Book[] => {
  const storedBooks = localStorage.getItem(BOOKS_STORAGE_KEY);
  if (!storedBooks) {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(mockBooks));
    return mockBooks;
  }
  return JSON.parse(storedBooks);
};

// Get all books
export const getBooks = async (): Promise<Book[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    return initializeBooks();
  } catch (error) {
    console.error("Error fetching books:", error);
    toast.error("Failed to fetch books");
    return [];
  }
};

// Get a single book by ID
export const getBookById = async (id: string): Promise<Book | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const books = initializeBooks();
    const book = books.find(book => book.id === id);
    return book || null;
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
    toast.error("Failed to fetch book details");
    return null;
  }
};

// Add a new book
export const addBook = async (book: Omit<Book, "id">): Promise<Book> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  try {
    const books = initializeBooks();
    const newBook = {
      ...book,
      id: Date.now().toString(), // Simple ID generation
      addedDate: new Date().toISOString().split("T")[0]
    };
    
    const updatedBooks = [...books, newBook];
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));
    
    toast.success("Book added successfully");
    return newBook;
  } catch (error) {
    console.error("Error adding book:", error);
    toast.error("Failed to add book");
    throw error;
  }
};

// Update a book
export const updateBook = async (id: string, bookData: Partial<Book>): Promise<Book> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  try {
    const books = initializeBooks();
    const index = books.findIndex(book => book.id === id);
    
    if (index === -1) {
      throw new Error(`Book with ID ${id} not found`);
    }
    
    const updatedBook = { ...books[index], ...bookData };
    books[index] = updatedBook;
    
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
    toast.success("Book updated successfully");
    return updatedBook;
  } catch (error) {
    console.error(`Error updating book ${id}:`, error);
    toast.error("Failed to update book");
    throw error;
  }
};

// Delete a book
export const deleteBook = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const books = initializeBooks();
    const filteredBooks = books.filter(book => book.id !== id);
    
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(filteredBooks));
    toast.success("Book deleted successfully");
  } catch (error) {
    console.error(`Error deleting book ${id}:`, error);
    toast.error("Failed to delete book");
    throw error;
  }
};
