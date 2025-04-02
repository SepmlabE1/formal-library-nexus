
export interface Loan {
  id: string;
  memberId: string;
  memberName: string;
  bookId: string;
  bookTitle: string;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
  status: "Active" | "Overdue" | "Returned";
  notes?: string;
}
