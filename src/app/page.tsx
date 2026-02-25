import Hero from "@/components/Hero";
import ExploreTerritory from "@/components/ExploreTerritory";
import FeaturedTours from "@/components/FeaturedTours";
import UpcomingEvents from "@/components/UpcomingEvents";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ExploreTerritory />
      <FeaturedTours />
      <UpcomingEvents />
      <Testimonials />
      <CTASection />
    </>
  );
}
