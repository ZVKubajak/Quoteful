import axios from "axios";

export const getQuotes = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/quote/`);

    return response.data;
  } catch (error) {
    console.error("Error fetching all quotes:", error);
    throw error;
  }
};

export const getQuotesByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/user/`, {
      params: { userId },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching quotes by user ID:", error);
    throw error;
  }
};

export const getQuotesByTag = async (tag: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/tag`, {
      params: { tag },
    });

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

export const updateQuote = async (
  quoteId: string,
  content: string,
  tag: string
) => {
  console.log(quoteId);
  console.log(content);
  console.log(tag);

  try {
    const response = await axios.put(`http://localhost:3001/quote/`, {
      params: { quoteId },
      content,
      tag,
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error updating quote:", error);
    throw error;
  }
};

export const deleteQuote = async (quoteId: string) => {
  console.log(deleteQuote);

  try {
    const response = await axios.delete(`http://localhost:3001/quote/`, {
      params: { quoteId },
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw error;
  }
};
