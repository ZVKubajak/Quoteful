import axios from "axios";

export const generateQuote = async (prompt: string, tag: string) => {
  try {
    const response = await axios.post(`http://localhost:3001/ai`, {
      prompt,
      tag,
    });

    return response.data.quote;
  } catch (error) {
    console.error("Error generating quote:", error);
    throw error;
  }
};
