
import { Loan } from "@/types/loan";
import { mockLoans } from "./mockData";
import { toast } from "sonner";
import { getBookById, updateBook } from "./bookService";
import { getMemberById, updateMember } from "./memberService";

// Local storage key
const LOANS_STORAGE_KEY = "library_loans";

// Initialize local storage with mock data if it doesn't exist
const initializeLoans = (): Loan[] => {
  const storedLoans = localStorage.getItem(LOANS_STORAGE_KEY);
  if (!storedLoans) {
    localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(mockLoans));
    return mockLoans;
  }
  return JSON.parse(storedLoans);
};

// Get all loans
export const getLoans = async (): Promise<Loan[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    return initializeLoans();
  } catch (error) {
    console.error("Error fetching loans:", error);
    toast.error("Failed to fetch loans");
    return [];
  }
};

// Get active and overdue loans
export const getActiveLoans = async (): Promise<Loan[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  try {
    const loans = initializeLoans();
    return loans.filter(loan => loan.status === "Active" || loan.status === "Overdue");
  } catch (error) {
    console.error("Error fetching active loans:", error);
    toast.error("Failed to fetch active loans");
    return [];
  }
};

// Get loans by member ID
export const getLoansByMemberId = async (memberId: string): Promise<Loan[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const loans = initializeLoans();
    return loans.filter(loan => loan.memberId === memberId);
  } catch (error) {
    console.error(`Error fetching loans for member ${memberId}:`, error);
    toast.error("Failed to fetch member's loans");
    return [];
  }
};

// Check out a book (create a loan)
export const checkoutBook = async (
  memberId: string, 
  bookId: string, 
  daysToReturn: number = 14
): Promise<Loan> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // Get book and member details
    const book = await getBookById(bookId);
    const member = await getMemberById(memberId);
    
    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }
    
    if (!member) {
      throw new Error(`Member with ID ${memberId} not found`);
    }
    
    if (!book.available || book.copies <= 0) {
      throw new Error(`Book "${book.title}" is not available for checkout`);
    }
    
    // Create checkout date and due date
    const checkoutDate = new Date().toISOString().split("T")[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysToReturn);
    const dueDateStr = dueDate.toISOString().split("T")[0];
    
    // Create new loan
    const loans = initializeLoans();
    const newLoan: Loan = {
      id: Date.now().toString(),
      memberId,
      memberName: `${member.firstName} ${member.lastName}`,
      bookId,
      bookTitle: book.title,
      checkoutDate,
      dueDate: dueDateStr,
      status: "Active"
    };
    
    // Update storage
    const updatedLoans = [...loans, newLoan];
    localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(updatedLoans));
    
    // Update book availability and member's active loans count
    await updateBook(bookId, { 
      available: book.copies > 1, 
      copies: book.copies - 1 
    });
    
    await updateMember(memberId, { 
      activeLoans: member.activeLoans + 1 
    });
    
    toast.success(`Book "${book.title}" checked out successfully`);
    return newLoan;
  } catch (error) {
    console.error("Error checking out book:", error);
    toast.error(error instanceof Error ? error.message : "Failed to check out book");
    throw error;
  }
};

// Return a book (update loan status)
export const returnBook = async (loanId: string): Promise<Loan> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  try {
    const loans = initializeLoans();
    const index = loans.findIndex(loan => loan.id === loanId);
    
    if (index === -1) {
      throw new Error(`Loan with ID ${loanId} not found`);
    }
    
    const loan = loans[index];
    
    if (loan.status === "Returned") {
      throw new Error(`Book "${loan.bookTitle}" has already been returned`);
    }
    
    // Update loan status
    const returnDate = new Date().toISOString().split("T")[0];
    const updatedLoan = { 
      ...loan, 
      status: "Returned", 
      returnDate 
    };
    
    loans[index] = updatedLoan;
    localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(loans));
    
    // Get book and member
    const book = await getBookById(loan.bookId);
    const member = await getMemberById(loan.memberId);
    
    if (book) {
      // Update book availability
      await updateBook(loan.bookId, { 
        available: true, 
        copies: book.copies + 1 
      });
    }
    
    if (member) {
      // Update member's active loans count
      await updateMember(loan.memberId, { 
        activeLoans: Math.max(0, member.activeLoans - 1) 
      });
    }
    
    toast.success(`Book "${loan.bookTitle}" returned successfully`);
    return updatedLoan;
  } catch (error) {
    console.error(`Error returning book for loan ${loanId}:`, error);
    toast.error(error instanceof Error ? error.message : "Failed to return book");
    throw error;
  }
};

// Get loan statistics
export const getLoanStatistics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const loans = initializeLoans();
    
    const totalLoans = loans.length;
    const activeLoans = loans.filter(loan => loan.status === "Active").length;
    const overdueLoans = loans.filter(loan => loan.status === "Overdue").length;
    const returnedLoans = loans.filter(loan => loan.status === "Returned").length;
    
    return {
      totalLoans,
      activeLoans,
      overdueLoans,
      returnedLoans
    };
  } catch (error) {
    console.error("Error calculating loan statistics:", error);
    toast.error("Failed to calculate loan statistics");
    throw error;
  }
};
