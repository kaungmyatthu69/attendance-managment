import api from "./axios";

export const getTimeTable = async () => {
  const { data } = await api.get("timetable");
  return data;
};
