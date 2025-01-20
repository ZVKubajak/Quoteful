import { useState, useEffect } from "react";
import auth from "@/auth/auth";
import { useNavigate } from "react-router-dom";
import {
  getQuotesByUserId,
  updateQuote,
  deleteQuote,
} from "@/services/quoteService";

import Swal from "sweetalert2";
import tagStyles from "@/lib/tagStyles";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
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

const MyQuotes = () => {
  return (
    <main className="flex bg-red-950/25 h-screen">
      <div className="flex flex-col h-screen w-1/2 border">
        <div className="flex-grow mx-32 my-20 border rounded-2xl">
          <div
            id="search-bar"
            className="flex h-24 border rounded-t-2xl px-8 py-4"
          >
            <div
              id="tag-selector"
              className="flex flex-grow w-1/3 items-center"
            >
              <Select>
                <SelectTrigger className="w-[180px] h-12 border-gray-500 rounded-sm bg-zinc-950 text-lg">
                  <SelectValue placeholder="Search Tag" />
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
            <div id="input-area" className="flex flex-grow w-2/3 items-center">
              <Input
                type="search"
                placeholder="Search by quote content."
                className="border-gray-500 transition duartion-250 hover:shadow-md hover:shadow-gray-900 bg-zinc-950 text-white !text-xl h-12"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen w-1/2 border"></div>
    </main>
  );
};

export default MyQuotes;
