import api from "./axios";

export const getProfile = async () => {
  const { data } = await api.get("user");
  return data;
};
