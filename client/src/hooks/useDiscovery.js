import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNearby, updateLocation, updateVisibility } from "@/services/discoveryService";

export function useUpdateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLocation,
    onSuccess: (updated) => {
      queryClient.setQueryData(["currentUser"], updated);
      queryClient.invalidateQueries({ queryKey: ["nearby"] });
    },
  });
}

export function useUpdateVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVisibility,
    onSuccess: (updated) => {
      queryClient.setQueryData(["currentUser"], updated);
    },
  });
}

export function useNearbyUsers(radiusKm, { enabled = true } = {}) {
  return useQuery({
    queryKey: ["nearby", radiusKm],
    queryFn: () => fetchNearby(radiusKm),
    enabled,
    refetchInterval: 30_000,
  });
}
