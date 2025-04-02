
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserPlus, FileSearch } from "lucide-react";
import { useMembers } from "@/hooks/useMembers";
import { AddMemberDialog } from "@/components/members/AddMemberDialog";
import { Member } from "@/types/member";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Members = () => {
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const { membersQuery, deleteMemberMutation } = useMembers();

  const handleDeleteMember = (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      deleteMemberMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Member successfully deleted");
        },
        onError: () => {
          toast.error("Failed to delete member");
        }
      });
    }
  };

  return (
    <Layout title="Members">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Member Directory</h2>
        <div className="flex gap-2">
          <Button size="sm" className="gap-2" onClick={() => setAddMemberOpen(true)}>
            <UserPlus size={16} />
            <span>Add Member</span>
          </Button>
          <Button size="sm" variant="outline" className="gap-2">
            <FileSearch size={16} />
            <span>Advanced Search</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {membersQuery.isLoading ? (
          <div className="p-4">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-full h-12" />
              ))}
            </div>
          </div>
        ) : membersQuery.isError ? (
          <div className="p-8 text-center">
            <p className="text-red-500">Error loading members. Please try again later.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Active Loans</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membersQuery.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No members found. Add your first member by clicking "Add Member".
                  </TableCell>
                </TableRow>
              ) : (
                membersQuery.data?.map((member: Member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.membership_id}</TableCell>
                    <TableCell>{member.first_name} {member.last_name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.membership_type}</TableCell>
                    <TableCell>{new Date(member.join_date).toLocaleDateString()}</TableCell>
                    <TableCell>{member.active_loans}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        member.status === "Active" ? "bg-green-100 text-green-800" : 
                        member.status === "Suspended" ? "bg-red-100 text-red-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => toast.info("Edit functionality coming soon")}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => handleDeleteMember(member.id)}
                          disabled={deleteMemberMutation.isPending}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <AddMemberDialog 
        open={addMemberOpen} 
        onOpenChange={setAddMemberOpen}
      />
    </Layout>
  );
};

export default Members;
