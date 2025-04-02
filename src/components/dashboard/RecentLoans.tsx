
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loan } from "@/types/loan";

interface RecentLoansProps {
  loans: Loan[];
}

const RecentLoans = ({ loans }: RecentLoansProps) => {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-serif text-lg font-semibold text-library-navy">Recent Loans</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Checkout Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell className="font-medium">{loan.memberName}</TableCell>
              <TableCell>{loan.bookTitle}</TableCell>
              <TableCell>{loan.checkoutDate}</TableCell>
              <TableCell>{loan.dueDate}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    loan.status === "Overdue"
                      ? "destructive"
                      : loan.status === "Returned"
                      ? "outline"
                      : "default"
                  }
                >
                  {loan.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentLoans;
