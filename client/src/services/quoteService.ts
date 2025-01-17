import axios from "axios";

export const createQuote = async (
  userId: string,
  content: string,
  tag: string
) => {
  console.log(userId);
  console.log(content);
  console.log(tag);

  try {
    const response = await axios.post(`http://localhost:3001/quote/`, {
      userId,
      content,
      tag,
    });

    console.log(response.data);
    console.log(!!response);
  } catch (error) {
    console.error("Error creating quote:", error);
    throw error;
  }
};
