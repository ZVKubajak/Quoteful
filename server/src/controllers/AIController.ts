import { Request } from "express";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not configured.");
}

const model = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: apiKey,
  modelName: "gpt-4o",
});

const promptTemplate = new PromptTemplate({
  template:
    "You are exceptional at generating thoughtful quotes. Your goal is to generate a quote based on the given prompt included in the user's input. Sometimes a tag may be provided which contains a one-word adjective. If a tag is included along with the user's input, generate a quote that can be described with the given tag. Here is the user's input: {user_input}.",
  inputVariables: ["user_input"],
});

export const generateAIResponse = async (req: Request, res: any) => {
  const { prompt, tag } = req.body;

  try {
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    const userInput = tag
      ? `Prompt: ${prompt}. Tag: ${tag}.`
      : `Prompt: ${prompt}.`;

    const formattedPrompt = await promptTemplate.format({
      user_input: userInput,
    });

    const response = await model.invoke(formattedPrompt);

    res
      .status(200)
      .json({ message: "Quote generated successfully.", quote: response.lc_kwargs.content });
  } catch (error: any) {
    console.error("Error generating quote:", error);
    res.status(500).json({ message: error.message });
  }
};
