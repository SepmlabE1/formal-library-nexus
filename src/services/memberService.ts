
import { Member } from "@/types/member";
import { mockMembers } from "./mockData";
import { toast } from "sonner";

// Local storage key
const MEMBERS_STORAGE_KEY = "library_members";

// Initialize local storage with mock data if it doesn't exist
const initializeMembers = (): Member[] => {
  const storedMembers = localStorage.getItem(MEMBERS_STORAGE_KEY);
  if (!storedMembers) {
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(mockMembers));
    return mockMembers;
  }
  return JSON.parse(storedMembers);
};

// Get all members
export const getMembers = async (): Promise<Member[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    return initializeMembers();
  } catch (error) {
    console.error("Error fetching members:", error);
    toast.error("Failed to fetch members");
    return [];
  }
};

// Get a single member by ID
export const getMemberById = async (id: string): Promise<Member | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const members = initializeMembers();
    const member = members.find(member => member.id === id);
    return member || null;
  } catch (error) {
    console.error(`Error fetching member ${id}:`, error);
    toast.error("Failed to fetch member details");
    return null;
  }
};

// Add a new member
export const addMember = async (member: Omit<Member, "id" | "joinDate" | "activeLoans">): Promise<Member> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  try {
    const members = initializeMembers();
    const newMember = {
      ...member,
      id: `M${(members.length + 1).toString().padStart(3, '0')}`, // Format: M001, M002, etc.
      joinDate: new Date().toISOString().split("T")[0],
      activeLoans: 0
    };
    
    const updatedMembers = [...members, newMember];
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(updatedMembers));
    
    toast.success("Member added successfully");
    return newMember;
  } catch (error) {
    console.error("Error adding member:", error);
    toast.error("Failed to add member");
    throw error;
  }
};

// Update a member
export const updateMember = async (id: string, memberData: Partial<Member>): Promise<Member> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  try {
    const members = initializeMembers();
    const index = members.findIndex(member => member.id === id);
    
    if (index === -1) {
      throw new Error(`Member with ID ${id} not found`);
    }
    
    const updatedMember = { ...members[index], ...memberData };
    members[index] = updatedMember;
    
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
    toast.success("Member updated successfully");
    return updatedMember;
  } catch (error) {
    console.error(`Error updating member ${id}:`, error);
    toast.error("Failed to update member");
    throw error;
  }
};

// Delete a member
export const deleteMember = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const members = initializeMembers();
    const filteredMembers = members.filter(member => member.id !== id);
    
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(filteredMembers));
    toast.success("Member deleted successfully");
  } catch (error) {
    console.error(`Error deleting member ${id}:`, error);
    toast.error("Failed to delete member");
    throw error;
  }
};
