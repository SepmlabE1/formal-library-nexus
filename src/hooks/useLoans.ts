
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getLoans, 
  getActiveLoans, 
  getLoansByMemberId, 
  checkoutBook, 
  returnBook, 
  getLoanStatistics 
} from "@/services/loanService";

export const useLoans = () => {
  const queryClient = useQueryClient();

  // Get all loans
  const loansQuery = useQuery({
    queryKey: ["loans"],
    queryFn: getLoans
  });

  // Get active loans
  const activeLoansQuery = useQuery({
    queryKey: ["loans", "active"],
    queryFn: getActiveLoans
  });

  // Get loans by member ID
  const useMemberLoans = (memberId: string) => {
    return useQuery({
      queryKey: ["loans", "member", memberId],
      queryFn: () => getLoansByMemberId(memberId),
      enabled: !!memberId
    });
  };

  // Get loan statistics
  const loanStatsQuery = useQuery({
    queryKey: ["loans", "statistics"],
    queryFn: getLoanStatistics
  });

  // Checkout a book
  const checkoutBookMutation = useMutation({
    mutationFn: ({ 
      memberId, 
      bookId, 
      daysToReturn 
    }: { 
      memberId: string; 
      bookId: string; 
      daysToReturn?: number 
    }) => checkoutBook(memberId, bookId, daysToReturn),
    onSuccess: () => {
      // Invalidate affected queries
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["loans", "statistics"] });
    }
  });

  // Return a book
  const returnBookMutation = useMutation({
    mutationFn: (loanId: string) => returnBook(loanId),
    onSuccess: () => {
      // Invalidate affected queries
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["loans", "statistics"] });
    }
  });

  return {
    loansQuery,
    activeLoansQuery,
    useMemberLoans,
    loanStatsQuery,
    checkoutBookMutation,
    returnBookMutation
  };
};
