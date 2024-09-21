import BrandSlide from "src/components/BrandSlide";
import CTA from "src/components/CTA";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Hero from "src/components/Hero";
import Pricing from "src/components/Pricing";
import ProductShowcase from "src/components/ProductShowcase";
import Testimonials from "src/components/Testimonials";
import FeedbackForm from "src/components/Feedback"

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero/>
      <BrandSlide/>
      <ProductShowcase/>
      <Pricing/>
      <Testimonials/>
      <CTA/>
      <FeedbackForm />
      <Footer/>
    </>
  );
}
