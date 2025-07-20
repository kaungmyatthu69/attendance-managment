import { getTimeTable } from "@/api/timetable";
import { useQuery } from "@tanstack/react-query";

export function useTimeTable() {
  return useQuery({
    queryKey: ["time-table"],
    queryFn: getTimeTable,
    refetchOnMount:true,
    staleTime:60*1000,
    
  });
}
