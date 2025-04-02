
import { BookOpen, Users, RotateCcw, BookMarked } from "lucide-react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import RecentBooks from "@/components/dashboard/RecentBooks";
import RecentLoans from "@/components/dashboard/RecentLoans";
import { Book } from "@/types/book";
import { Loan } from "@/types/loan";

const Index = () => {
  // Mock data for demonstration
  const recentBooks: Book[] = [
    {
      id: "1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0446310789",
      category: "Fiction",
      available: true,
      copies: 3,
      addedDate: "2023-06-15"
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      category: "Science Fiction",
      available: true,
      copies: 2,
      addedDate: "2023-06-10"
    },
    {
      id: "3",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      category: "Fiction",
      available: false,
      copies: 1,
      addedDate: "2023-06-05"
    },
    {
      id: "4",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-0141439518",
      category: "Classic",
      available: true,
      copies: 4,
      addedDate: "2023-06-01"
    }
  ];

  const recentLoans: Loan[] = [
    {
      id: "1",
      memberId: "M001",
      memberName: "John Smith",
      bookId: "1",
      bookTitle: "To Kill a Mockingbird",
      checkoutDate: "2023-06-20",
      dueDate: "2023-07-04",
      status: "Active"
    },
    {
      id: "2",
      memberId: "M002",
      memberName: "Emily Johnson",
      bookId: "3",
      bookTitle: "The Great Gatsby",
      checkoutDate: "2023-06-15",
      dueDate: "2023-06-29",
      status: "Overdue"
    },
    {
      id: "3",
      memberId: "M003",
      memberName: "Michael Brown",
      bookId: "2",
      bookTitle: "1984",
      checkoutDate: "2023-06-10",
      dueDate: "2023-06-24",
      returnDate: "2023-06-22",
      status: "Returned"
    },
    {
      id: "4",
      memberId: "M004",
      memberName: "Sarah Wilson",
      bookId: "4",
      bookTitle: "Pride and Prejudice",
      checkoutDate: "2023-06-05",
      dueDate: "2023-06-19",
      status: "Active"
    }
  ];

  return (
    <Layout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Books"
          value={1,248}
          description="+12 this month"
          icon={<BookOpen size={24} />}
        />
        <StatCard
          title="Active Members"
          value={342}
          description="+8 this month"
          icon={<Users size={24} />}
        />
        <StatCard
          title="Books on Loan"
          value={87}
          description="24 due this week"
          icon={<RotateCcw size={24} />}
        />
        <StatCard
          title="Overdue Books"
          value={13}
          description="5 more than last week"
          icon={<BookMarked size={24} />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecentLoans loans={recentLoans} />
        <RecentBooks books={recentBooks} />
      </div>
    </Layout>
  );
};

export default Index;
