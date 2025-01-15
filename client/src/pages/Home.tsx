import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main>
      <section id="heading" className="text-center">
        <h1 className="font-mono text-8xl py-20">Quoteful</h1>
        <p className="font-caveat text-7xl pb-40">
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
    </main>
  );
};

export default Home;
