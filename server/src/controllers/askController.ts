import { Request, Response } from "express";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
let model: OpenAI;

if (apiKey) {
  model = new OpenAI({
    temperature: 0,
    openAIApiKey: apiKey,
    modelName: "gpt-4o",
  });
} else {
  console.error("OPENAI_API_KEY is not configured.");
}
