
import { Book } from "@/types/book";
import { Loan } from "@/types/loan";
import { Member } from "@/types/member";

// Mock Books Data
export const mockBooks: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0446310789",
    publisher: "Grand Central Publishing",
    publicationYear: 1960,
    category: "Fiction",
    description: "A classic novel about racial injustice in the American South.",
    pageCount: 336,
    available: true,
    copies: 3,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop",
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
    description: "A dystopian novel set in a totalitarian society.",
    pageCount: 328,
    available: true,
    copies: 2,
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop",
    addedDate: "2023-06-10",
    location: "Science Fiction Section, Shelf 1"
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    publisher: "Scribner",
    publicationYear: 1925,
    category: "Fiction",
    description: "A novel about the American Dream in the Jazz Age.",
    pageCount: 180,
    available: false,
    copies: 1,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop",
    addedDate: "2023-06-05",
    location: "Fiction Section, Shelf 2"
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0141439518",
    publisher: "Penguin Classics",
    publicationYear: 1813,
    category: "Classic",
    description: "A romantic novel of manners set in early 19th-century England.",
    pageCount: 432,
    available: true,
    copies: 4,
    coverImage: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=372&auto=format&fit=crop",
    addedDate: "2023-06-01",
    location: "Classics Section, Shelf 1"
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0316769488",
    publisher: "Little, Brown and Company",
    publicationYear: 1951,
    category: "Fiction",
    description: "A novel about teenage alienation and loss of innocence.",
    pageCount: 224,
    available: true,
    copies: 2,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop",
    addedDate: "2023-05-25",
    location: "Fiction Section, Shelf 4"
  }
];

// Mock Members Data
export const mockMembers: Member[] = [
  {
    id: "M001",
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@email.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown, AT 12345",
    membershipType: "Student",
    membershipId: "STU001",
    joinDate: "2023-01-15",
    activeLoans: 2,
    status: "Active"
  },
  {
    id: "M002",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@email.com",
    phone: "555-234-5678",
    address: "456 Oak Ave, Somecity, SC 23456",
    membershipType: "Faculty",
    membershipId: "FAC001",
    joinDate: "2023-02-10",
    activeLoans: 1,
    status: "Active"
  },
  {
    id: "M003",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    phone: "555-345-6789",
    address: "789 Pine Rd, Othertown, OT 34567",
    membershipType: "Public",
    membershipId: "PUB001",
    joinDate: "2023-03-05",
    activeLoans: 0,
    status: "Active"
  },
  {
    id: "M004",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@email.com",
    phone: "555-456-7890",
    address: "101 Elm St, Newcity, NC 45678",
    membershipType: "Student",
    membershipId: "STU002",
    joinDate: "2023-04-20",
    activeLoans: 1,
    status: "Active"
  },
  {
    id: "M005",
    firstName: "David",
    lastName: "Taylor",
    email: "david.taylor@email.com",
    phone: "555-567-8901",
    address: "202 Maple Dr, Oldtown, OT 56789",
    membershipType: "Public",
    membershipId: "PUB002",
    joinDate: "2023-05-12",
    activeLoans: 0,
    status: "Suspended"
  }
];

// Mock Loans Data
export const mockLoans: Loan[] = [
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
  },
  {
    id: "5",
    memberId: "M001",
    memberName: "John Smith",
    bookId: "5",
    bookTitle: "The Catcher in the Rye",
    checkoutDate: "2023-06-25",
    dueDate: "2023-07-09",
    status: "Active"
  }
];
