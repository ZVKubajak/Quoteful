import { useState, useEffect } from "react";
import { getQuotes } from "@/services/quoteService";

import tagStyles from "@/lib/tagStyles";
import { Search } from "lucide-react";
import { Quote } from "lucide-react";
import { Frown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Tag = keyof typeof tagStyles;

interface Quote {
  id: string;
  tag: Tag;
  content: string;
  user: {
    username: string;
  };
}

const Explore = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [carouselQuotes, setCarouselQuotes] = useState<Quote[]>([]);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [tag, setTag] = useState<Tag | "">("");
  const [query, setQuery] = useState<string>("");

  const queryCharCount = 200;

  const getAllQuotes = async () => {
    const allQuotes = await getQuotes();
    setQuotes(allQuotes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
  };

  const filteredQuotes = quotes.filter((quote) => {
    const matchesQuery =
      quote.content.toLowerCase().includes(query) ||
      quote.user.username.toLowerCase().includes(query);

    const matchesTag = tag ? quote.tag === tag : true;

    return matchesQuery && matchesTag;
  });

  const getCarouselQuotes = () => {
    let quotesCopy = [...quotes];
    const result: Quote[] = [];

    for (let i = 0; i < 5; i++) {
      if (quotesCopy.length === 0) break;

      const quoteIndex = Math.floor(Math.random() * quotesCopy.length);
      result.push(quotesCopy[quoteIndex]);
      quotesCopy.splice(quoteIndex, 1);
    }

    setCarouselQuotes(result);
  };

  const getRandomQuote = () => {
    if (quotes.length === 0) return null;

    const quoteIndex = Math.floor(Math.random() * quotes.length);
    return quotes[quoteIndex];
  };

  useEffect(() => {
    getAllQuotes();
  }, []);

  useEffect(() => {
    getCarouselQuotes();
  }, [quotes]);

  useEffect(() => {
    const updateRandomQuote = () => {
      const newQuote = getRandomQuote();
      setRandomQuote(newQuote);
    };

    updateRandomQuote();

    const interval = setInterval(() => {
      updateRandomQuote();
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [quotes]);

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
            value={query}
            onChange={(e) => handleInputChange(e)}
            maxLength={queryCharCount}
            className="border-gray-500 transition duration-250 hover:shadow-md hover:shadow-gray-900 bg-zinc-950 text-white !text-xl h-10"
          />
        </div>
        <div id="search-button">
          <Search
            size={32}
            className="cursor-pointer mt-1 text-gray-400 transition duration-250 hover:text-white"
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
            <p className="text-4xl text-gray-500 p-4">
              Filter: <span className="text-white">{query}</span>
            </p>
          </div>
          <ScrollArea className="flex-grow px-20 bg-neutral-950/50 rounded-bl-xl">
            <div id="searched-quotes-container" className="space-y-20 py-12">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote, index) => (
                  <div
                    key={quote.id || index}
                    className="border rounded-2xl text-xl p-4"
                  >
                    <p className="text-clip overflow-hidden">{quote.content}</p>
                    <div className="flex mt-10 mx-4">
                      <div className="flex w-3/5">
                        <h2 className="text-2xl">– {quote.user.username}</h2>
                      </div>

                      {quote.tag && (
                        <div className="flex justify-end w-2/5">
                          <Badge
                            className={`border-2 rounded-lg text-lg ${
                              tagStyles[quote.tag]
                            }`}
                          >
                            {quote.tag}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400">
                  <p className="text-center text-5xl">No quotes found.</p>
                  <Frown size={80} className="mx-auto mt-8" />
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        <div id="container-right" className="w-1/2">
          <div
            id="container-right-top"
            className="flex flex-col h-1/2 border bg-neutral-950/50 rounded-r-xl p-20"
          >
            <Carousel className="flex-grow flex items-center">
              <CarouselContent>
                {carouselQuotes.length > 0 ? (
                  carouselQuotes.map((quote, index) => (
                    <CarouselItem
                      key={quote.id || index}
                      className="flex flex-col"
                    >
                      <div
                        id="carousel-quote-container"
                        className="flex-grow border rounded-2xl text-xl p-4"
                      >
                        <p className="text-clip overflow-hidden">
                          {quote.content}
                        </p>

                        <div className="flex mt-10 mx-4">
                          <div className="flex w-3/5">
                            <h2 className="text-2xl">
                              – {quote.user.username}
                            </h2>
                          </div>

                          {quote.tag && (
                            <div className="flex justify-end w-2/5">
                              <Badge
                                className={`border-2 rounded-lg text-lg ${
                                  tagStyles[quote.tag]
                                }`}
                              >
                                {quote.tag}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <p className="ml-36 text-5xl text-gray-400">
                    No quotes found.
                  </p>
                )}
              </CarouselContent>
              <CarouselPrevious className="bg-inherit" />
              <CarouselNext className="bg-inherit" />
            </Carousel>
          </div>
          <div id="container-right-bottom" className="flex h-1/2">
            <div
              id="container-right-bottom-left"
              className="flex flex-col w-1/2 border-x border-b bg-neutral-950/50 rounded-br-lg"
            >
              <div
                id="random-quote-container"
                className={`flex-grow text-xl p-6 ${
                  randomQuote ? "random-quote" : ""
                }`}
              >
                {randomQuote ? (
                  <>
                    <p className="text-clip overflow-hidden">
                      {randomQuote.content}
                    </p>
                    <div className="flex mt-10 mx-4">
                      <h2 className="text-xl">– {randomQuote.user.username}</h2>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-3xl text-gray-400 mt-28">
                    No quotes found.
                  </p>
                )}
              </div>
            </div>
            <div
              id="container-right-bottom-right"
              className="w-1/2 bg-[#02040D]"
            >
              <div
                id="logo-mark"
                className="flex flex-col items-center text-gray-700"
              >
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
