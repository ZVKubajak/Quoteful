import axios from "axios";

export const createQuote = async (
  userId: string,
  content: string,
  tag: string
) => {
  try {
    await axios.post(`http://localhost:3001/quote/`, {
      userId,
      content,
      tag,
    });
  } catch (error) {
    console.error("Error creating quote:", error);
    throw error;
  }
};
