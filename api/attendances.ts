import api from "./axios";

export const getAttendances = async () => {
  const { data } = await api.get("attendance");
  return data;
};
