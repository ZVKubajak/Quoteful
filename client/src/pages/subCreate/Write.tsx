import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const quoteForm = useForm<z.infer<typeof quoteFormSchema>>({
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
      <h1 className="text-center text-6xl pt-20">Write Your Quote</h1>
      <div className="flex h-96 m-32">
        <section className="border w-1/2"></section>
        <section className="border w-1/2"></section>
      </div>
    </main>
  );
};

export default Write;
