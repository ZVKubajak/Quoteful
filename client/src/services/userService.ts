import axios from "axios";

export const updateUsername = async (userId: string, username: string) => {
  try {
    const response = await axios.put(`http://localhost:3001/user/${userId}`, {
      username,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
