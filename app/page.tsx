import { RevealObserver } from "@/components/reveal-observer";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Work } from "@/components/home/work";
import { AskWidget } from "@/components/home/ask-widget";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Hero />
      <About />
      <Work />
      <AskWidget />
      <Contact />
    </>
  );
}
