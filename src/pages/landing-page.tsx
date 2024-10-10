import BrandSlide from "src/components/BrandSlide";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Hero from "src/components/Hero";
import ProductShowcase from "src/components/ProductShowcase";
import Testimonials from "src/components/Testimonials";
import FeedbackForm from "src/components/Feedback"
import FAQSection from "src/components/FAQ";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero/>
      <BrandSlide/>
      <ProductShowcase/>
      <Testimonials/>
      <FAQSection />
      <FeedbackForm />
      <Footer/>
    </>
  );
}
