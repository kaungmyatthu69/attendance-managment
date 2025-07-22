import { getAttendances } from "@/api/attendances";
import { useQuery } from "@tanstack/react-query";

export function useGetAllAttendances() {
  return useQuery({
    queryKey: ["attendances"],
    queryFn: getAttendances,
    refetchOnMount: true,
    enabled:true
    // staleTime: 60 * 1000,
  });
}
