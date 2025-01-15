import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main>
      <section className="heading">
        <h1>Quoteful</h1>
        <p>Explore and create your own thoughtful quotes.</p>

        <div className="heading-cta-buttons">
          <Button>Explore</Button>
          <button className="bg-red-500 text-white p-4">Create a Quote</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
