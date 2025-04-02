
import { BookOpen, Users, RotateCcw, BookMarked } from "lucide-react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import RecentBooks from "@/components/dashboard/RecentBooks";
import RecentLoans from "@/components/dashboard/RecentLoans";
import { useBooks } from "@/hooks/useBooks";
import { useMembers } from "@/hooks/useMembers";
import { useLoans } from "@/hooks/useLoans";

const Index = () => {
  // Fetch data using our hooks
  const { booksQuery } = useBooks();
  const { membersQuery } = useMembers();
  const { loansQuery, loanStatsQuery, activeLoansQuery } = useLoans();

  // Loading state
  const isLoading = booksQuery.isLoading || membersQuery.isLoading || 
                    loansQuery.isLoading || loanStatsQuery.isLoading;

  // Calculate statistics
  const totalBooks = booksQuery.data?.length || 0;
  const activeMembers = membersQuery.data?.filter(m => m.status === "Active").length || 0;
  const booksOnLoan = activeLoansQuery.data?.length || 0;
  const overdueBooks = activeLoansQuery.data?.filter(loan => loan.status === "Overdue").length || 0;

  // Get recent books and loans
  const recentBooks = booksQuery.data?.slice(0, 4) || [];
  const recentLoans = loansQuery.data?.slice(0, 4) || [];

  return (
    <Layout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Books"
          value={totalBooks}
          description={`${booksQuery.data?.filter(b => b.addedDate > (new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]).length || 0} this month`}
          icon={<BookOpen size={24} />}
          isLoading={isLoading}
        />
        <StatCard
          title="Active Members"
          value={activeMembers}
          description={`${membersQuery.data?.filter(m => m.joinDate > (new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]).length || 0} this month`}
          icon={<Users size={24} />}
          isLoading={isLoading}
        />
        <StatCard
          title="Books on Loan"
          value={booksOnLoan}
          description={`${activeLoansQuery.data?.filter(loan => {
            const dueDate = new Date(loan.dueDate);
            const now = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(now.getDate() + 7);
            return dueDate <= nextWeek && dueDate >= now;
          }).length || 0} due this week`}
          icon={<RotateCcw size={24} />}
          isLoading={isLoading}
        />
        <StatCard
          title="Overdue Books"
          value={overdueBooks}
          description={`${overdueBooks - (loansQuery.data?.filter(loan => 
            loan.status === "Overdue" && 
            new Date(loan.dueDate) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          ).length || 0)} more than last week`}
          icon={<BookMarked size={24} />}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecentLoans loans={recentLoans} isLoading={isLoading} />
        <RecentBooks books={recentBooks} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Index;
