
import { Loan } from "@/types/loan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentLoansProps {
  loans: Loan[];
  isLoading?: boolean;
}

const RecentLoans = ({ loans, isLoading = false }: RecentLoansProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Loans</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        ) : loans.length > 0 ? (
          <div className="space-y-4">
            {loans.map((loan) => (
              <div key={loan.id} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-white">
                  {loan.status === "Active" && (
                    <Clock className="h-8 w-8 text-blue-500" />
                  )}
                  {loan.status === "Overdue" && (
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  )}
                  {loan.status === "Returned" && (
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-1">{loan.bookTitle}</h4>
                  <p className="text-xs text-muted-foreground">{loan.memberName}</p>
                </div>
                <div className="text-xs whitespace-nowrap">
                  <p className="font-medium">Due: {loan.dueDate}</p>
                  <p className={`text-right ${
                    loan.status === "Overdue" ? "text-red-600" : 
                    loan.status === "Returned" ? "text-green-600" : ""
                  }`}>
                    {loan.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No loans found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentLoans;
