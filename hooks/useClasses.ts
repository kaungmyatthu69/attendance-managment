import { getClasses, getCurrentClasses } from "@/api/classes";
import { useQuery } from "@tanstack/react-query";

export function useGetAllClasses() {
  return useQuery({
    queryKey: ["all-class"],
    queryFn: getClasses,
    refetchOnMount: true,
    enabled: true,
    // staleTime: 60 * 1000,
  });
}


export function useGetCurrentClasses(){
  return useQuery({
    queryKey: ["current-class"],
    queryFn: () => getCurrentClasses(),
    refetchOnMount: true,
    enabled: true,

    // staleTime: 60 * 1000,
  });
}