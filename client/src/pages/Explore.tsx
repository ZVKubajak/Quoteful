import { useState } from "react";

import tagStyles from "@/lib/tagStyles";
import { Search } from "lucide-react";
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

const Explore = () => {
  const [tag, setTag] = useState<Tag | "">("");

  return (
    <main className="bg-slate-950/50 h-screen">
      <div id="search-bar" className="flex justify-center pt-20 ml-4 space-x-4">
        <div id="tag-selector">
          <Select
            value={tag}
            onValueChange={(value) => {
              setTag(value as Tag);
            }}
          >
            <SelectTrigger className="w-[150px] h-10 border-gray-500 rounded-sm bg-transparent text-lg">
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
        <div id="input-area" className="rounded-lg">
          <Input
            type="search"
            placeholder="Search by username."
            className="border-gray-500 transition duration-250 hover:shadow-md hover:shadow-gray-900 bg-zinc-950 text-white !text-xl h-10"
          />
        </div>
        <div id="search-button">
          <Search
            size={32}
            className="mt-1 text-gray-400 transition duration-250 hover:text-white"
          />
        </div>
      </div>
    </main>
  );
};

export default Explore;
