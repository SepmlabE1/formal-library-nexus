
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Member } from "@/types/member";
import { UserPlus, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

const Members = () => {
  // Mock data for demonstration
  const members: Member[] = [
    {
      id: "M001",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      phone: "555-123-4567",
      membershipType: "Student",
      membershipId: "STU-1001",
      joinDate: "2023-01-15",
      activeLoans: 2,
      status: "Active"
    },
    {
      id: "M002",
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.j@example.com",
      phone: "555-234-5678",
      membershipType: "Faculty",
      membershipId: "FAC-2034",
      joinDate: "2022-09-10",
      activeLoans: 1,
      status: "Active"
    },
    {
      id: "M003",
      firstName: "Michael",
      lastName: "Brown",
      email: "m.brown@example.com",
      phone: "555-345-6789",
      membershipType: "Public",
      membershipId: "PUB-3045",
      joinDate: "2023-02-22",
      activeLoans: 0,
      status: "Active"
    },
    {
      id: "M004",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.w@example.com",
      phone: "555-456-7890",
      membershipType: "Student",
      membershipId: "STU-1042",
      joinDate: "2022-11-05",
      activeLoans: 3,
      status: "Active"
    },
    {
      id: "M005",
      firstName: "David",
      lastName: "Lee",
      email: "d.lee@example.com",
      phone: "555-567-8901",
      membershipType: "Faculty",
      membershipId: "FAC-2067",
      joinDate: "2022-08-18",
      activeLoans: 0,
      status: "Suspended"
    }
  ];

  return (
    <Layout title="Members">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Member Directory</h2>
        <div className="flex gap-2">
          <Button size="sm" className="gap-2">
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.membershipId}</TableCell>
                <TableCell>{member.firstName} {member.lastName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.membershipType}</TableCell>
                <TableCell>{member.joinDate}</TableCell>
                <TableCell>{member.activeLoans}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    member.status === "Active" ? "bg-green-100 text-green-800" : 
                    member.status === "Suspended" ? "bg-red-100 text-red-800" : 
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {member.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Members;
