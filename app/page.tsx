import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import Projects from '@/components/sections/Projects';
import Process from '@/components/sections/Process';
import Studio from '@/components/sections/Studio';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Manifesto />
        <Projects />
        <Process />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
