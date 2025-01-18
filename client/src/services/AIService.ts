import axios from "axios";

export const generateQuote = async (prompt: string, tag: string) => {
  console.log(prompt);
  console.log(tag);

  try {
    const response = await axios.post(`http://localhost:3001/ai`, {
      prompt,
      tag,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error generating quote:", error);
    throw error;
  }
};
