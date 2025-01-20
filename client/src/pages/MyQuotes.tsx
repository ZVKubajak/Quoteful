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
  const [tag, setTag] = useState<Tag | "">("");
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

  const onSubmit = async (values: z.infer<typeof quoteFormSchema>) => {
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

  useEffect(() => {
    getUserQuotes();
  }, []);

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
