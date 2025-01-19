import axios from "axios";

export const getQuotes = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/quote/`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all quotes:", error);
    throw error;
  }
};

export const getQuotesByUserId = async (userId: string) => {
  console.log(userId);

  try {
    const response = await axios.get(`http://localhost:3001/user/`, {
      params: { userId },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching quotes by user ID:", error);
    throw error;
  }
};

export const getQuotesByTag = async (tag: string) => {
  console.log(tag);

  try {
    const response = await axios.get(`http://localhost:3001/tag`, {
      params: { tag },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching quotes by tag", error);
    throw error;
  }
};

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
