import axiosClient from "@/api/axiosClient";

export async function updateLocation({ latitude, longitude, isDiscoverable }) {
  const { data } = await axiosClient.put("/discovery/location", {
    latitude,
    longitude,
    isDiscoverable,
  });
  return data;
}

export async function updateVisibility(isDiscoverable) {
  const { data } = await axiosClient.patch("/discovery/visibility", { isDiscoverable });
  return data;
}

export async function fetchNearby(radiusKm) {
  const { data } = await axiosClient.get("/discovery/nearby", { params: { radiusKm } });
  return data;
}
