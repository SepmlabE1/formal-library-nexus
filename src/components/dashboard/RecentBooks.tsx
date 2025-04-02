
import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentBooksProps {
  books: Book[];
  isLoading?: boolean;
}

const RecentBooks = ({ books, isLoading = false }: RecentBooksProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recently Added Books</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-14 w-10" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="space-y-4">
            {books.map((book) => (
              <div key={book.id} className="flex items-start gap-3">
                <div className="h-14 w-10 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                  {book.coverImage ? (
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs text-center">No Cover</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-1">{book.title}</h4>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
                <Badge variant={book.available ? "outline" : "secondary"}>
                  {book.available ? "Available" : "Checked Out"}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No books found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBooks;
