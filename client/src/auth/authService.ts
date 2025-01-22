import axios from "axios";
import TypeLogin from "@/interfaces/login";

export const signUp = async (userInfo: TypeLogin) => {
  try {
    const response = await axios.post("/auth/signup", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error from user sign up:", error);
    const errorMessage =
      error.response?.data?.message || "Could not fetch use info.";
    return Promise.reject(errorMessage);
  }
};

export const login = async (userInfo: TypeLogin) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/login",
      userInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error from user login:", error);

    const errorMessage =
      error.response?.data?.message || "Could not fetch use info.";
    return Promise.reject(errorMessage);
  }
};
