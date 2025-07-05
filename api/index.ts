// import { API_URL } from "@/config";
const API_URL = "http://localhost:1234";
export const fetchApi = async ({
  endPoint = "",
  method = "POST",
  data = {},
  headers = { "Content-Type": "application/json", accept: "application/json" },
}) => {
  const url = API_URL + endPoint;
  const options = {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(data) : undefined,
  };
  console.log("url", url);
  console.log("options", options);

  try {
    console.log("trying fetch api");
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = "An error occurred please try again";
      try {
        let res = await response.json();
        errorMessage = res.message || errorMessage;
      } catch (error) {
        console.log("Error:", error);
      }
    }
    return response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};
