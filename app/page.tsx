import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Destinations } from "@/components/destinations";
import { HowItWorks } from "@/components/how-it-works";
import { Chatbot } from "@/components/chatbot";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white scroll-smooth">
      <Header />

      <main className="relative">
        {/* HERO */}
        <section id="hero" className="relative">
          <Hero />
        </section>

        {/* SECTION DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent my-16" />

        {/* DESTINATIONS */}
        <section id="destinations" className="py-20 px-6 md:px-12">
          <Destinations />
        </section>

        {/* SECTION DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent my-16" />

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-6 md:px-12">
          <HowItWorks />
        </section>
      </main>

      <Footer />

      {/* FLOATING CHATBOT */}
      <Chatbot />
    </div>
  );
}
