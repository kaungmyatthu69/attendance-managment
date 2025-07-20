import { fetchApi } from ".";
import api from "./axios";

export const signInApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try{
    const {data} = await api.post('login',{email,password});
    return data;
  }catch(error:any){
     if (error.response && error.response.data) {
       console.log("API error message:", error.response.data.message);
       // Optionally, you can throw a custom error to your UI
       throw new Error(error.response.data.message || "Login failed");
     }
     throw error;
  }
  
};

export const signOutApi = async () => {
  // Optionally call a signout endpoint
  // await api.post('/auth/signout')
  return true;
};

export const signUpApi = async ({
  name,
  email,
  password,
  password_confirmation,
  registration_code,
}: {
  name:string
  email: string;
  password: string;
  password_confirmation:string;
  registration_code:string;
}) => {
  const { data } = await api.post("register", {
    name,
    email,
    password,
    password_confirmation,
    registration_code,
  });
  return data;
};
