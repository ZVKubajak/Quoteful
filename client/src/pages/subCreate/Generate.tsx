import { MoveLeft } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const Generate = () => {
  return (
    <main className="bg-lime-950/15 h-screen">
      <div id="icon-bar" className="flex justify-between w-full p-8">
        {/* Redirects to /create. */}
        <MoveLeft
          size={40}
          className="cursor-pointer text-gray-300 hover:text-white"
        />
        {/* Opens a modal that explains how to generate a quote. */}
        <CircleHelp
          size={40}
          className="cursor-pointer text-gray-300 hover:text-white"
        />
      </div>

      <div id="ai-response-field" className="mt-40 px-96">
        {/* This is where AI's response will go. It will also have super cool typing animation. */}
        <p className="text-center text-2xl">
          Welcome to Quoteful AI. What kind of quote or thought do you have in
          mind?
        </p>
      </div>

      <div id="input-bar" className="flex justify-center mt-64">
        <div id="tag-selector"></div>
        <div id="input-area" className="w-1/3 rounded-lg">
          <Input
            type="text"
            placeholder="Write a quote about thoughtfulness."
            className="border-gray-500 transition duration-250 hover:shadow-md hover:shadow-gray-900 bg-zinc-950 text-white !text-xl h-12"
          />
        </div>
        <div id="send-prompt-button"></div>
      </div>
    </main>
  );
};

export default Generate;
