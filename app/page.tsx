import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <Hero />
        <Features />
        <Testimonials />
        <Partners />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}