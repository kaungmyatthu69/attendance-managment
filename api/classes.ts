import api from "./axios";

export const getClasses = async () => {
  const { data } = await api.get("classes");
  return data.data;
};

export const getCurrentClasses = async()=>{
  const { data } = await api.get("classes?current=1");
  console.log('data',data.data)
  return data.data;
}