
import { useState } from "react";
import { Search, Filter, BookPlus } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data for demonstration
  const books: Book[] = [
    {
      id: "1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0446310789",
      publisher: "Grand Central Publishing",
      publicationYear: 1960,
      category: "Fiction",
      description: "A classic novel about racism and injustice in the American South.",
      pageCount: 336,
      available: true,
      copies: 3,
      coverImage: "https://example.com/mockingbird.jpg",
      addedDate: "2023-06-15",
      location: "Fiction Section, Shelf 3"
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      publisher: "Signet Classic",
      publicationYear: 1949,
      category: "Science Fiction",
      description: "A dystopian novel about totalitarianism and mass surveillance.",
      pageCount: 328,
      available: true,
      copies: 2,
      coverImage: "https://example.com/1984.jpg",
      addedDate: "2023-06-10",
      location: "Science Fiction Section, Shelf 2"
    },
    {
      id: "3",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      publisher: "Scribner",
      publicationYear: 1925,
      category: "Fiction",
      description: "A novel about the American Dream during the Roaring Twenties.",
      pageCount: 180,
      available: false,
      copies: 1,
      coverImage: "https://example.com/gatsby.jpg",
      addedDate: "2023-06-05",
      location: "Fiction Section, Shelf 1"
    },
    {
      id: "4",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-0141439518",
      publisher: "Penguin Classics",
      publicationYear: 1813,
      category: "Classic",
      description: "A romantic novel about societal expectations and personal growth.",
      pageCount: 432,
      available: true,
      copies: 4,
      coverImage: "https://example.com/pride.jpg",
      addedDate: "2023-06-01",
      location: "Classics Section, Shelf 4"
    },
    {
      id: "5",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "978-0547928227",
      publisher: "Houghton Mifflin Harcourt",
      publicationYear: 1937,
      category: "Fantasy",
      description: "A fantasy novel about the journey of Bilbo Baggins.",
      pageCount: 300,
      available: true,
      copies: 2,
      coverImage: "https://example.com/hobbit.jpg",
      addedDate: "2023-05-20",
      location: "Fantasy Section, Shelf 5"
    },
    {
      id: "6",
      title: "Moby Dick",
      author: "Herman Melville",
      isbn: "978-1503280786",
      publisher: "Harper & Brothers",
      publicationYear: 1851,
      category: "Classic",
      description: "A novel about Captain Ahab's quest for revenge against the white whale.",
      pageCount: 585,
      available: true,
      copies: 1,
      coverImage: "https://example.com/mobydick.jpg",
      addedDate: "2023-05-15",
      location: "Classics Section, Shelf 3"
    }
  ];

  // Filter books based on search term and category
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.isbn.includes(searchTerm);
    
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(books.map(book => book.category))];

  return (
    <Layout title="Book Catalog">
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Search Books</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by title, author, or ISBN..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-60">
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button className="mt-4 md:mt-0">
              <Filter size={18} className="mr-2" />
              More Filters
            </Button>
            
            <Button className="mt-4 md:mt-0 bg-library-blue hover:bg-library-blue/90">
              <BookPlus size={18} className="mr-2" />
              Add New Book
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                    <TableCell>{book.copies}</TableCell>
                    <TableCell>
                      <Badge variant={book.available ? "outline" : "secondary"}>
                        {book.available ? "Available" : "Checked Out"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{book.location}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No books found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Catalog;
