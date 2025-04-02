
import { Member } from "@/types/member";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMembers, getMemberById, addMember, updateMember, deleteMember } from "@/services/memberService";

export const useMembers = () => {
  const queryClient = useQueryClient();

  // Get all members
  const membersQuery = useQuery({
    queryKey: ["members"],
    queryFn: getMembers
  });

  // Get member by ID
  const useMember = (id: string) => {
    return useQuery({
      queryKey: ["members", id],
      queryFn: () => getMemberById(id),
      enabled: !!id
    });
  };

  // Add a new member
  const addMemberMutation = useMutation({
    mutationFn: (member: Omit<Member, "id" | "join_date">) => 
      addMember(member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    }
  });

  // Update a member
  const updateMemberMutation = useMutation({
    mutationFn: ({ id, memberData }: { id: string; memberData: Partial<Member> }) => 
      updateMember(id, memberData),
    onSuccess: (updatedMember) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["members", updatedMember.id] });
    }
  });

  // Delete a member
  const deleteMemberMutation = useMutation({
    mutationFn: (id: string) => deleteMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    }
  });

  return {
    membersQuery,
    useMember,
    addMemberMutation,
    updateMemberMutation,
    deleteMemberMutation
  };
};
