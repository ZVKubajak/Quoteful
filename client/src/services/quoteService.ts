import axios from "axios";

export const getQuotes = async () => {
  try {
    const response = await axios.get(`/quote/`);

    return response.data;
  } catch (error) {
    console.error("Error fetching all quotes:", error);
    throw error;
  }
};

export const getQuotesByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`/quote/user/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching quotes by user ID:", error);
    throw error;
  }
};

export const getQuotesByTag = async (tag: string) => {
  try {
    const response = await axios.get(`/quote/tag/${tag}`);

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
    await axios.post(`/quote/`, {
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
  try {
    await axios.put(`/quote/${quoteId}`, {
      content,
      tag,
    });
  } catch (error) {
    console.error("Error updating quote:", error);
    throw error;
  }
};

export const deleteQuote = async (quoteId: string) => {
  try {
    await axios.delete(`/quote/${quoteId}`);
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw error;
  }
};
