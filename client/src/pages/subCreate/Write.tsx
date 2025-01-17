import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MoveLeft } from "lucide-react";
import { CircleHelp } from "lucide-react";
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

const quoteFormSchema = z.object({
  quote: z
    .string()
    .min(8, {
      message: "Quote must be at least 8 characters long.",
    })
    .max(250, {
      message: "Quote can not be more than 250 characters.",
    }),
  tag: z.string().optional(),
});

const Write = () => {
  const form = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      quote: "",
      tag: "",
    },
  });

  const onSubmit = (values: z.infer<typeof quoteFormSchema>) => {
    // createQuote or return error.
    console.log(values);
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
        <section className="w-1/2 px-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-3xl">Quote</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your life is your own quote, so define it. – Shashidhar Sa"
                        className="resize-none bg-zinc-950 border-gray-800"
                        {...field}
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
                    <Select onValueChange={field.onChange}>
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

        <section className="border w-1/2"></section>
      </div>
    </main>
  );
};

export default Write;
