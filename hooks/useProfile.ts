import { getProfile } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 60 * 1000,
    refetchOnMount:true,
  });
}
