import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scanQr } from "@/api/scan";

export function useScan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => scanQr(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
    },
  });
}
