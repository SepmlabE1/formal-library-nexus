
import { Book } from "@/types/book";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBooks, getBookById, addBook, updateBook, deleteBook } from "@/services/bookService";

export const useBooks = () => {
  const queryClient = useQueryClient();

  // Get all books
  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: getBooks
  });

  // Get book by ID
  const useBook = (id: string) => {
    return useQuery({
      queryKey: ["books", id],
      queryFn: () => getBookById(id),
      enabled: !!id
    });
  };

  // Add a new book
  const addBookMutation = useMutation({
    mutationFn: (book: Omit<Book, "id">) => addBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });

  // Update a book
  const updateBookMutation = useMutation({
    mutationFn: ({ id, bookData }: { id: string; bookData: Partial<Book> }) => 
      updateBook(id, bookData),
    onSuccess: (updatedBook) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["books", updatedBook.id] });
    }
  });

  // Delete a book
  const deleteBookMutation = useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });

  return {
    booksQuery,
    useBook,
    addBookMutation,
    updateBookMutation,
    deleteBookMutation
  };
};
