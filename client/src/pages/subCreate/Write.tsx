import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MoveLeft } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const quoteFormSchema = z.object({
  quote: z
    .string()
    .min(8, {
      message: "Quote must be at least 8 characters long.",
    })
    .max(250, {
      message: "Quote can not be more than 250 characters.",
    }),
  tag: z
    .enum([
      "FUNNY",
      "INTERESTING",
      "MEMORABLE",
      "MOTIVATIONAL",
      "POSITIVE",
      "PROFOUND",
    ])
    .optional(),
});

const Write = () => {
  const form = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      quote: "",
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
        <section className="border w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quote</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      What do you want your quote to say?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Post</Button>
            </form>
          </Form>
        </section>

        <section className="border w-1/2"></section>
      </div>
    </main>
  );
};

export default Write;
