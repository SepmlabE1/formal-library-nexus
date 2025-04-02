
import { Member } from "@/types/member";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Get all members
export const getMembers = async (): Promise<Member[]> => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('join_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching members:", error);
    toast.error("Failed to fetch members");
    return [];
  }
};

// Get a single member by ID
export const getMemberById = async (id: string): Promise<Member | null> => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching member ${id}:`, error);
    toast.error("Failed to fetch member details");
    return null;
  }
};

// Add a new member
export const addMember = async (member: Omit<Member, "id" | "join_date">): Promise<Member> => {
  try {
    const { data, error } = await supabase
      .from('members')
      .insert([member])
      .select()
      .single();
    
    if (error) throw error;
    
    toast.success("Member added successfully");
    return data;
  } catch (error) {
    console.error("Error adding member:", error);
    toast.error("Failed to add member");
    throw error;
  }
};

// Update a member
export const updateMember = async (id: string, memberData: Partial<Member>): Promise<Member> => {
  try {
    const { data, error } = await supabase
      .from('members')
      .update(memberData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    toast.success("Member updated successfully");
    return data;
  } catch (error) {
    console.error(`Error updating member ${id}:`, error);
    toast.error("Failed to update member");
    throw error;
  }
};

// Delete a member
export const deleteMember = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    toast.success("Member deleted successfully");
  } catch (error) {
    console.error(`Error deleting member ${id}:`, error);
    toast.error("Failed to delete member");
    throw error;
  }
};
