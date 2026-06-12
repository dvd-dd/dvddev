import { Hero } from "@/components/sections/Hero";
import { TrustMarquee } from "@/components/ui/TrustMarquee";
import { UseCases } from "@/components/sections/UseCases";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/**
 * Page architecture per reference/dvddev-redesign-brief.md §5.
 * Skills section was rolled into the TrustMarquee — stack icons
 * scroll alongside client wordmarks + flags, matching David's call
 * ("minhas skills poderiam rodar aqui nessa faixa carrossel").
 */
export default function HomePage() {
  return (
    <main className="relative w-full">
      <Hero />
      <TrustMarquee />
      <UseCases />
      <Projects />
      <Process />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
