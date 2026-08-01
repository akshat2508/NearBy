import axiosClient from "@/api/axiosClient";

export async function fetchCurrentUser() {
  const { data } = await axiosClient.get("/users/me");
  return data;
}

export async function updateProfile({ bio }) {
  const { data } = await axiosClient.patch("/users/me", { bio });
  return data;
}
