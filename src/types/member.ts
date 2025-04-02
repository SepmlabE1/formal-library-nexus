
export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  membership_type: "Student" | "Faculty" | "Public";
  membership_id: string;
  join_date: string;
  active_loans: number;
  status: "Active" | "Suspended" | "Expired";
}
