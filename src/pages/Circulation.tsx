
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loan } from "@/types/loan";
import { Book, RotateCcw, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Circulation = () => {
  // Mock data for demonstration
  const activeLoans: Loan[] = [
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

  return (
    <Layout title="Circulation">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Book Circulation</h2>
        <div className="flex gap-2">
          <Button size="sm" className="gap-2">
            <Book size={16} />
            <span>Check Out</span>
          </Button>
          <Button size="sm" variant="outline" className="gap-2">
            <RotateCcw size={16} />
            <span>Check In</span>
          </Button>
          <Button size="sm" variant="outline" className="gap-2">
            <FileCheck size={16} />
            <span>Reservation</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b">
          <h3 className="font-medium">Active & Overdue Loans</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Checkout Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeLoans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="font-medium">{loan.memberName}</TableCell>
                <TableCell>{loan.bookTitle}</TableCell>
                <TableCell>{loan.checkoutDate}</TableCell>
                <TableCell>{loan.dueDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    loan.status === "Active" ? "bg-green-100 text-green-800" : 
                    loan.status === "Overdue" ? "bg-red-100 text-red-800" : 
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {loan.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">Check In</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Circulation;
