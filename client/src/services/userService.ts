import axios from "axios";

export const updateUsername = async (userId: string, username: string) => {
  try {
    await axios.put(`http://localhost:3001/user/${userId}`, {
      username,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await axios.delete(`http://localhost:3001/user/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
