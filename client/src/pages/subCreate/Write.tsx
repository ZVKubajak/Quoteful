import { useState } from "react";
import auth from "@/auth/auth";
import { useNavigate } from "react-router-dom";
import { createQuote } from "@/services/quoteService";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Swal from "sweetalert2";
import tagStyles from "@/lib/tagStyles";
import { MoveLeft } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Tag = keyof typeof tagStyles;

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

const Write = () => {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<Tag | "">("");

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
      text: "You need to create an account to write a quote.",
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

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: any
  ) => {
    field.onChange(e);
    setContent(e.target.value);
  };

  const onSubmit = async (values: z.infer<typeof quoteFormSchema>) => {
    try {
      await createQuote(userId, values.quote, values.tag || "");

      Swal.fire({
        title: "Quote Created",
        text: "Check out your new quote or create another one.",
        icon: "success",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Go To Quote",
        cancelButtonText: "Write More",
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
          navigate("/create/write");

          form.reset();
          setContent("");
          setTag("");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="bg-zinc-950 h-screen">
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

      <h1 className="text-center text-6xl pt-8">Write Your Quote</h1>

      <div className="flex h-96 mx-48 my-20">
        <section id="quote-form" className="w-1/2 px-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-3xl">
                      Quote
                      <span className="text-xl text-gray-400 ml-4">
                        {content.length}/{contentCharCount}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your life is your own quote, so define it. – Shashidhar Sa"
                        value={content}
                        onChange={(e) => handleTextareaChange(e, field)}
                        maxLength={contentCharCount}
                        className="resize-none bg-zinc-950 border-gray-800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem className="w-[180px] mt-8">
                    <FormLabel className="text-xl">
                      Tag <span className="text-gray-500">(optional)</span>
                    </FormLabel>
                    <Select
                      value={tag}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setTag(value as Tag);
                      }}
                    >
                      <FormControl className="bg-zinc-950 border-gray-800">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tag." />
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
                    <FormDescription>Leave blank for no tag.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="ghost"
                className="bg-white text-black text-xl mt-8 px-8"
              >
                Post
              </Button>
            </form>
          </Form>
        </section>

        <section id="quote-preview" className="w-1/2 px-32 py-20">
          <div className="w-full border rounded-2xl text-xl p-4">
            <p className="text-clip overflow-hidden">{content}</p>

            <div className="flex mt-10 mx-4">
              <div className="flex w-3/5">
                <h2 className="text-2xl">– {username}</h2>
                <ExternalLink size={20} className="ml-3" />
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
        </section>
      </div>
    </main>
  );
};

export default Write;
