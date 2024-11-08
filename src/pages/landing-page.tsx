import BrandSlide from 'src/components/landing-page/BrandSlide';
import Footer from 'src/components/landing-page/Footer';
import Header from 'src/components/landing-page/Header';
import Hero from 'src/components/landing-page/Hero';
import ProductShowcase from 'src/components/landing-page/ProductShowcase';
import Testimonials from 'src/components/landing-page/Testimonials';
import FeedbackForm from 'src/components/landing-page/Feedback';
import FAQSection from 'src/components/landing-page/FAQ';

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <BrandSlide />
      <ProductShowcase />
      <Testimonials />
      <FAQSection />
      <FeedbackForm />
      <Footer />
    </>
  );
}
