import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main>
      <section id="heading">
        <h1 className="font-mono">Quoteful</h1>
        <p className="font-caveat">
          Explore and create your own thoughtful quotes.
        </p>

        <div id="heading-cta-buttons">
          <Button>Explore</Button>
          <button className="bg-red-500 text-white p-4">Create a Quote</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
