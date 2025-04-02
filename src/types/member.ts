
export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  membershipType: "Student" | "Faculty" | "Public";
  membershipId: string;
  joinDate: string;
  activeLoans: number;
  status: "Active" | "Suspended" | "Expired";
}
