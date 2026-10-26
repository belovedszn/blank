import Hero from "@/components/Hero";
import Subscriptions from "@/components/sections/Subscriptions";
import Accounts from "@/components/sections/Accounts";
import HowItWorks from "@/components/sections/HowItWorks";
import NigeriaPays from "@/components/sections/NigeriaPays";
import UseCases from "@/components/sections/UseCases";
import Developers from "@/components/sections/Developers";
import Trust from "@/components/sections/Trust";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <main id="main">
      <Hero />
      <Subscriptions />
      <Accounts />
      <HowItWorks />
      <NigeriaPays />
      <UseCases />
      <Developers />
      <Trust />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
