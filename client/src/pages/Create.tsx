import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Create = () => {
  return (
    <main className="flex pt-20 mb-32">
      <section
        id="left-container"
        className="flex flex-col items-center w-1/2 border-r border-gray-700 p-12"
      >
        <div
          id="left-card"
          className="flex flex-col w-3/4 border rounded-2xl mb-12 p-16 space-y-12"
        >
          <h2 className="text-center text-4xl">AI Quote Generator</h2>

          <p className="text-xl">
            Use our OpenAI-powered chat bot to create quotes. Quoteful AI can
            write quotes on any kind topic such as a hard day at work, the idea
            of luck, and much more. All you have to do is give it a prompt and a
            tag that describes what kind of quote you want.
          </p>

          <Button asChild className="text-lg bg-green-600 hover:bg-green-700">
            <Link to="/create/generate">Try it Now</Link>
          </Button>
        </div>

        <h1 className="font-montserrat text-6xl">Quotes tailored for you!</h1>
      </section>

      <section
        id="right-container"
        className="flex flex-col items-center w-1/2 border-l border-gray-700 p-12"
      >
        <h1 className="font-montserrat text-6xl">Have an Idea?</h1>
        <div
          id="right-card"
          className="flex flex-col w-3/4 border rounded-2xl mt-12 p-16 space-y-12"
        >
          <h2 className="text-center text-4xl">Create Your Own</h2>

          <p className="text-xl">
            Our website provides the place for you to write and post your own
            unique quotes. When you create a quote, you have the option to share
            it with other users on the explore page. You can also keep quotes
            that are personal to you private.
          </p>

          <Button asChild className="text-lg bg-yellow-700 hover:bg-yellow-800">
            <Link to="/create/write">Write a Quote</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Create;
