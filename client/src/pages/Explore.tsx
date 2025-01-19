import { useState } from "react";

import tagStyles from "@/lib/tagStyles";
import { Search } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Quote } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
            <SelectTrigger className="w-[150px] h-10 border-gray-500 rounded-sm bg-zinc-950 text-lg">
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

      <div
        id="explore-container"
        className="flex h-[700px] mx-40 my-16 bg-neutral-950/50"
      >
        <div
          id="container-left"
          className="flex flex-col w-1/2 border rounded-l-xl"
        >
          <div id="current-search" className="border-b border-gray-400">
            <p className="text-4xl p-4">Quotes by:</p>
          </div>
          <ScrollArea className="flex-grow px-20">
            <div className="space-y-20 py-12">
              <div
                id="searched-quote-container"
                className="border rounded-2xl text-xl p-4"
              >
                <p className="text-clip overflow-hidden">
                  "What's up guys, this is a quote."
                </p>
                <div className="flex mt-10 mx-4">
                  <div className="flex w-3/5">
                    <h2 className="text-2xl">– Username</h2>
                  </div>

                  {tag && (
                    <div className="flex justify-end w-2/5">
                      <Badge
                        className={`border-2 rounded-lg text-lg ${tagStyles[tag]}`}
                      >
                        {tag}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              <div
                id="searched-quote-container"
                className="border rounded-2xl text-xl p-4"
              >
                <p className="text-clip overflow-hidden">
                  "What's up guys, this is a quote."
                </p>
                <div className="flex mt-10 mx-4">
                  <div className="flex w-3/5">
                    <h2 className="text-2xl">– Username</h2>
                  </div>

                  {tag && (
                    <div className="flex justify-end w-2/5">
                      <Badge
                        className={`border-2 rounded-lg text-lg ${tagStyles[tag]}`}
                      >
                        {tag}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              <div
                id="searched-quote-container"
                className="border rounded-2xl text-xl p-4"
              >
                <p className="text-clip overflow-hidden">
                  "What's up guys, this is a quote."
                </p>
                <div className="flex mt-10 mx-4">
                  <div className="flex w-3/5">
                    <h2 className="text-2xl">– Username</h2>
                  </div>

                  {tag && (
                    <div className="flex justify-end w-2/5">
                      <Badge
                        className={`border-2 rounded-lg text-lg ${tagStyles[tag]}`}
                      >
                        {tag}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              <div
                id="searched-quote-container"
                className="border rounded-2xl text-xl p-4"
              >
                <p className="text-clip overflow-hidden">
                  "What's up guys, this is a quote."
                </p>
                <div className="flex mt-10 mx-4">
                  <div className="flex w-3/5">
                    <h2 className="text-2xl">– Username</h2>
                  </div>

                  {tag && (
                    <div className="flex justify-end w-2/5">
                      <Badge
                        className={`border-2 rounded-lg text-lg ${tagStyles[tag]}`}
                      >
                        {tag}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        <div id="container-right" className="w-1/2">
          <div
            id="container-right-top"
            className="flex flex-col h-1/2 border rounded-r-xl p-12"
          >
            <div className="flex-grow flex justify-between items-center">
              <ChevronLeft
                size={32}
                className="border-2 border-gray-500 transition duration-250 hover:border-gray-800 hover:text-gray-500 rounded-full pr-1"
              />
              <div
                id="carousel-quote-container"
                className="w-4/5 border rounded-2xl text-xl p-4"
              >
                <p className="text-clip overflow-hidden">
                  "What's up guys, this is a quote."
                </p>

                <div className="flex mt-10 mx-4">
                  <div className="flex w-3/5">
                    <h2 className="text-2xl">– Username</h2>
                  </div>

                  {tag && (
                    <div className="flex justify-end w-2/5">
                      <Badge
                        className={`border-2 rounded-lg text-lg ${tagStyles[tag]}`}
                      >
                        {tag}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              <ChevronRight
                size={32}
                className="border-2 border-gray-500 transition duration-250 hover:border-gray-800 hover:text-gray-500 rounded-full pl-1"
              />
            </div>
          </div>
          <div id="container-right-bottom" className="flex h-1/2">
            <div
              id="container-right-bottom-left"
              className="flex flex-col w-1/2 border-x border-b rounded-br-lg"
            >
              <div
                id="random-quote-container"
                className="flex-grow text-xl p-6"
              >
                <p className="text-clip overflow-hidden">
                  "Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry."
                </p>

                <div className="flex mt-10 mx-4">
                  <h2 className="text-xl">– Bryce John Berczik</h2>
                </div>
              </div>
            </div>
            <div
              id="container-right-bottom-right"
              className="w-1/2 bg-[#02040D]"
            >
              <div id="logo-mark" className="flex flex-col items-center text-gray-700">
                <Quote size={80} className="mt-24" />
                <h3 className="mt-4 font-montserrat text-6xl">Quoteful</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Explore;
