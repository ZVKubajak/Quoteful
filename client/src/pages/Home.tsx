import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main>
      <section id="heading" className="text-center">
        <h1 className="font-montserrat text-8xl py-20">Quoteful</h1>
        <p className="font-caveat text-6xl pb-10">
          Explore and create your own thoughtful quotes.
        </p>

        <div id="heading-cta-buttons" className="space-x-4">
          <Button variant="outline" className="bg-neutral-950">
            Explore
          </Button>
          <Button variant="outline" className="bg-neutral-950">
            Create a Quote
          </Button>
        </div>
      </section>

      <section
        id="home-page-quote-showcase"
        className="flex items-center justify-evenly h-96"
      >
        <div className="w-1/4 border-2 rounded-lg p-4">
          <p className="pb-8">
            "Be who you are and say what you feel, because those who mind don't
            matter, and those who matter don't mind."
          </p>
          <h2 className="pl-4">
            <span className="pr-1">―</span> Bernard Baruch
          </h2>
        </div>

        <div className="w-1/4 border-2 rounded-lg p-4">
          <p className="pb-8">“So many books, so little time.”</p>
          <h2 className="pl-4">
            <span className="pr-1">―</span> Frank Zappa
          </h2>
        </div>

        <div className="w-1/4 border-2 rounded-lg p-4">
          <p className="pb-8">
            “Here's to the crazy ones. The misfits. The rebels. The
            troublemakers. The round pegs in the square holes. The ones who see
            things differently. They're not fond of rules...”
          </p>
          <h2 className="pl-4">
            <span className="pr-1">―</span> Steve Jobs
          </h2>
        </div>
      </section>
    </main>
  );
};

export default Home;
