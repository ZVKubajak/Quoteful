import axios from "axios";

export const updateUsername = async (userId: string, username: string) => {
  try {
    await axios.put(`/user/${userId}`, {
      username,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await axios.delete(`/user/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
