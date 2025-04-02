
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Book, RotateCcw, FileCheck, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoans } from "@/hooks/useLoans";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBooks } from "@/hooks/useBooks";
import { useMembers } from "@/hooks/useMembers";

const Circulation = () => {
  const { activeLoansQuery, returnBookMutation, checkoutBookMutation } = useLoans();
  const { booksQuery } = useBooks();
  const { membersQuery } = useMembers();
  
  const [checkoutData, setCheckoutData] = useState({
    bookId: "",
    memberId: "",
    daysToReturn: "14"
  });

  const handleCheckout = async () => {
    try {
      await checkoutBookMutation.mutateAsync({
        bookId: checkoutData.bookId,
        memberId: checkoutData.memberId,
        daysToReturn: parseInt(checkoutData.daysToReturn)
      });
      
      // Reset form
      setCheckoutData({
        bookId: "",
        memberId: "",
        daysToReturn: "14"
      });
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const handleReturn = async (loanId: string) => {
    try {
      await returnBookMutation.mutateAsync(loanId);
    } catch (error) {
      console.error("Return error:", error);
    }
  };

  // Loading states
  const isLoading = activeLoansQuery.isLoading || booksQuery.isLoading || membersQuery.isLoading;
  const isCheckingOut = checkoutBookMutation.isPending;
  const isReturning = returnBookMutation.isPending;

  // Available books (those with copies > 0)
  const availableBooks = booksQuery.data?.filter(book => book.copies > 0) || [];
  // Active members
  const activeMembers = membersQuery.data?.filter(member => member.status === "Active") || [];

  return (
    <Layout title="Circulation">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Book Circulation</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Book size={16} />
                <span>Check Out</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Check Out Book</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="book">Select Book</Label>
                  <Select
                    value={checkoutData.bookId}
                    onValueChange={(value) => setCheckoutData({...checkoutData, bookId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a book" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBooks.map(book => (
                        <SelectItem key={book.id} value={book.id}>
                          {book.title} by {book.author}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="member">Select Member</Label>
                  <Select
                    value={checkoutData.memberId}
                    onValueChange={(value) => setCheckoutData({...checkoutData, memberId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a member" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeMembers.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.firstName} {member.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="days">Loan Period (days)</Label>
                  <Input
                    id="days"
                    type="number"
                    value={checkoutData.daysToReturn}
                    onChange={(e) => setCheckoutData({...checkoutData, daysToReturn: e.target.value})}
                    min="1"
                    max="60"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button 
                    onClick={handleCheckout}
                    disabled={!checkoutData.bookId || !checkoutData.memberId || isCheckingOut}
                  >
                    Check Out Book
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          
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
        
        {isLoading ? (
          <div className="p-8 text-center">Loading loans...</div>
        ) : activeLoansQuery.data && activeLoansQuery.data.length > 0 ? (
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
              {activeLoansQuery.data.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.memberName}</TableCell>
                  <TableCell>{loan.bookTitle}</TableCell>
                  <TableCell>{loan.checkoutDate}</TableCell>
                  <TableCell>{loan.dueDate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                      loan.status === "Active" ? "bg-green-100 text-green-800" : 
                      loan.status === "Overdue" ? "bg-red-100 text-red-800" : 
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {loan.status === "Active" ? <Check size={12} /> : 
                       loan.status === "Overdue" ? <AlertCircle size={12} /> : null}
                      {loan.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleReturn(loan.id)}
                      disabled={isReturning}
                    >
                      Check In
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No active loans found.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Circulation;
