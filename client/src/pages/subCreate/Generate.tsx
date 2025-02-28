import { useState, useEffect } from "react";
import auth from "@/auth/auth";
import { useNavigate } from "react-router-dom";
import { generateQuote } from "@/services/AIService";
import { createQuote } from "@/services/quoteService";

import Swal from "sweetalert2";
import tagStyles from "@/lib/tagStyles";
import IconBar from "@/components/IconBar";
import { Send } from "lucide-react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Tag = keyof typeof tagStyles;

const Generate = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<Tag | "">("");
  const [displayText, setDisplayText] = useState<string>("");

  const defaultMessage =
    "Welcome to Quoteful AI. What kind of quote or thought do you have in mind?";
  const promptCharCount = 150;

  const navigate = useNavigate();

  let userId = "";
  let username = "";
  if (!auth.guestLoggedIn()) {
    const profile = auth.getProfile();
    if (profile) {
      (userId = profile.id), (username = profile.username);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const onSend = async (prompt: string, tag: string) => {
    try {
      const response = await generateQuote(prompt, tag);

      setContent(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onSave = async () => {
    try {
      if (userId === "" || username === "") {
        Swal.fire({
          title: "Account Required",
          text: "You need an account to save a quote.",
          icon: "warning",
          confirmButtonText: "Create Account",
          confirmButtonColor: "#3085d6",
          background: "#333",
          color: "#fff",
          allowOutsideClick: true,
          allowEscapeKey: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signup");
          } else {
            return;
          }
        });
      }

      await createQuote(userId, content, tag || "");

      Swal.fire({
        title: "Quote Saved",
        text: "Check out your new quote or create another one.",
        icon: "success",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Go To Quote",
        cancelButtonText: "Create More",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#3ea381",
        background: "#333",
        color: "#fff",
        allowOutsideClick: true,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/my-quotes");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/create/generate");

          setPrompt("");
          setContent(defaultMessage);
          setTag("");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setContent(defaultMessage);
  }, []);

  useEffect(() => {
    let i = 0;
    setDisplayText("");

    const interval = setInterval(() => {
      if (i < content.length) {
        setDisplayText((prev) => prev + content[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <main className="bg-lime-950/15 h-screen">
      <IconBar />

      <div id="ai-response-field" className="mt-64 px-96">
        <p className="text-center text-2xl">{displayText}</p>
      </div>

      <div id="input-bar" className="flex justify-center mt-80 ml-20">
        <div id="tag-selector" className="w-1/5">
          <Select
            value={tag}
            onValueChange={(value) => {
              setTag(value as Tag);
            }}
          >
            <SelectTrigger className="w-[180px] h-12 border-gray-500 rounded-sm bg-zinc-950 text-lg ml-40">
              <SelectValue placeholder="Select Tag" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 text-white">
              <SelectGroup>
                <SelectLabel>Tags</SelectLabel>
                <SelectItem value="FUNNY">Funny</SelectItem>
                <SelectItem value="INTERESTING">Interesting</SelectItem>
                <SelectItem value="MEMORABLE">Memorable</SelectItem>
                <SelectItem value="MOTIVATIONAL">Motivational</SelectItem>
                <SelectItem value="POSITIVE">Positive</SelectItem>
                <SelectItem value="PROFOUND">Profound</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div id="input-area" className="w-1/3 rounded-lg">
          <Input
            type="text"
            placeholder="Write a quote about thoughtfulness."
            value={prompt}
            onChange={(e) => {
              handleInputChange(e);
            }}
            maxLength={promptCharCount}
            className="border-gray-500 transition duration-250 hover:shadow-md hover:shadow-gray-900 bg-zinc-950 text-white !text-xl h-12"
          />
        </div>
        <div id="send-prompt-button" className="flex w-1/5">
          <Button
            type="submit"
            onClick={() => onSend(prompt, tag)}
            variant="outline"
            className="bg-zinc-950 text-md mt-1 ml-4"
          >
            Send <Send />
          </Button>
          <Save
            size={40}
            onClick={onSave}
            className="cursor-pointer mt-1 ml-3"
          />
        </div>
      </div>

      <div className="flex justify-end mt-1">
        <p className="text-lg text-gray-500 mr-14">Tags are optional.</p>
        <p className="w-3/5 text-lg text-gray-500 mr-16">
          {prompt.length}/{promptCharCount}
        </p>
      </div>
    </main>
  );
};

export default Generate;
