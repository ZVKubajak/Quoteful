import { useState, useEffect } from "react";
import auth from "@/auth/auth";
import { useNavigate } from "react-router-dom";
import {
  getQuotesByUserId,
  updateQuote,
  deleteQuote,
} from "@/services/quoteService";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Swal from "sweetalert2";
import tagStyles from "@/lib/tagStyles";
import { Frown } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type Tag = keyof typeof tagStyles;

interface Quote {
  id: string;
  tag: Tag;
  content: string;
  user: {
    username: string;
  };
}

const quoteFormSchema = z.object({
  quote: z
    .string()
    .min(8, {
      message: "Quote must be at least 8 characters long.",
    })
    .max(200, {
      message: "Quote can not be more than 200 characters.",
    }),
  tag: z.string().optional(),
});

const MyQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quoteId, setQuoteId] = useState<string>("");
  const [content, setContent] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [tag, setTag] = useState<Tag | "">("");
  const [tagEdit, setTagEdit] = useState<Tag | "">("");
  const [query, setQuery] = useState<string>("");

  const queryCharCount = 200;
  const contentCharCount = 200;

  const navigate = useNavigate();

  let userId = "";
  let username = "";
  if (!auth.guestLoggedIn()) {
    const profile = auth.getProfile();
    if (profile) {
      (userId = profile.id), (username = profile.username);
    }
  } else {
    Swal.fire({
      title: "Account Required",
      text: "You need an account to write a quote.",
      icon: "warning",
      confirmButtonText: "Create Account",
      confirmButtonColor: "#3085d6",
      background: "#333",
      color: "#fff",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/signup");
      }
    });
  }

  const form = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      quote: "",
      tag: "",
    },
  });

  const getUserQuotes = async () => {
    const userQuotes = await getQuotesByUserId(userId);
    setQuotes(userQuotes);
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

  const toggleEdit = (
    quoteId: string,
    quoteTag: string,
    quoteContent: string
  ) => {
    setQuoteId(quoteId);
    if (quoteTag) setTagEdit(quoteTag as Tag);
    setContentEdit(quoteContent.slice(1, -1));
  };

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: any
  ) => {
    field.onChange(e);
    setContentEdit(e.target.value);
  };

  const onUpdate = async (values: z.infer<typeof quoteFormSchema>) => {
    try {
      await updateQuote(quoteId, `"${values.quote}"`, values.tag || "");

      Swal.fire({
        title: "Quote Updated",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3085d6",
        background: "#333",
        color: "#fff",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          getUserQuotes();

          form.reset();
          setQuoteId("");
          setContent("");
          setTag("");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (quoteId: string) => {
    try {
      await deleteQuote(quoteId);

      Swal.fire({
        title: "Quote Deleted",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3085d6",
        background: "#333",
        color: "#fff",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) getUserQuotes();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserQuotes();
  }, []);

  return (
    <main className="flex bg-zinc-950 h-screen">
      <div className="flex flex-col h-screen w-1/2">
        <div className="flex flex-col h-[750px] mx-32 my-20 border rounded-2xl">
          <div
            id="search-bar"
            className="flex h-24 border-b border-gray-400 px-8 py-4"
          >
            <div
              id="tag-selector"
              className="flex flex-grow w-1/3 items-center"
            >
              <Select
                value={tag}
                onValueChange={(value) => {
                  setTag(value as Tag);
                }}
              >
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
                value={query}
                onChange={(e) => handleInputChange(e)}
                maxLength={queryCharCount}
                className="border-gray-500 transition duartion-250 hover:shadow-md hover:shadow-gray-900 bg-zinc-950 text-white !text-xl h-12"
              />
            </div>
          </div>
          <ScrollArea className="flex-grow px-20">
            <div id="searched-quotes-container" className="space-y-20 py-12">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote, index) => (
                  <div
                    key={quote.id || index}
                    className="relative border rounded-2xl text-xl p-4"
                  >
                    <div className="absolute -bottom-[39px] right-5 flex space-x-3 px-3 py-2 bg-neutral-950 border border-gray-500 rounded-b-2xl">
                      <Pencil
                        size={20}
                        onClick={() =>
                          toggleEdit(quote.id, quote.tag, quote.content)
                        }
                        className="text-green-400 hover:text-green-500"
                      />
                      <Trash2
                        size={20}
                        onClick={() => onDelete(quote.id)}
                        className="text-red-400 hover:text-red-500"
                      />
                    </div>
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
      </div>
      <div className="flex flex-col h-screen w-1/2 border">
        <section id="quote-edit-form" className="flex-grow mt-16 p-20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onUpdate)}>
              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-center text-2xl text-gray-500">
                      Change the quote's content here.
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        value={contentEdit}
                        onChange={(e) => handleTextareaChange(e, field)}
                        maxLength={contentCharCount}
                        className="resize-none w-3/4 h-44 mx-auto !text-xl bg-zinc-950 border rounded-2xl p-4"
                      />
                    </FormControl>
                    <div className="ml-28">
                      <div className="flex">
                        <FormDescription>
                          Quotation marks will automatically be added.
                        </FormDescription>
                        <p className="text-sm text-gray-400 ml-56">
                          {contentEdit.length}/{contentCharCount}
                        </p>
                      </div>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem className="w-[180px] mt-8">
                    <FormLabel className="text-xl">Tag</FormLabel>
                    <Select
                      value={tagEdit}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setTagEdit(value as Tag);
                      }}
                    >
                      <FormControl className="bg-zinc-950 border-gray-800">
                        <SelectTrigger>
                          <SelectValue placeholder="Change Tag" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-950 text-white">
                        <SelectItem value="FUNNY">Funny</SelectItem>
                        <SelectItem value="INTERESTING">Interesting</SelectItem>
                        <SelectItem value="MEMORABLE">Memorable</SelectItem>
                        <SelectItem value="MOTIVATIONAL">
                          Motivational
                        </SelectItem>
                        <SelectItem value="POSITIVE">Positive</SelectItem>
                        <SelectItem value="PROFOUND">Profound</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="ghost"
                className="bg-white text-black text-xl mt-8 px-8"
              >
                Update
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default MyQuotes;
