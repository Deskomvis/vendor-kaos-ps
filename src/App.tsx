import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandIntro from './components/BrandIntro';
import ClientProof from './components/ClientProof';
import OrderForm from './components/OrderForm';
import DtfPriceList from './components/DtfPriceList';
import ServiceComparison from './components/ServiceComparison';
import HowToOrder from './components/HowToOrder';
import PortfolioGallery from './components/PortfolioGallery';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-slate-900 selection:text-white">
      {/* Fixed Sticky Header Navigation */}
      <Navbar />

      {/* Main Landing Page Flow */}
      <main className="flex-grow">
        {/* 1. Hero Section with Strong Headline & CTAs */}
        <Hero />

        <BrandIntro />
        <ClientProof />

        <DtfPriceList />

        {/* 2. Short order specification form */}
        <OrderForm />

        {/* 3. Service Comparison: Sablon DTF vs Sablon Manual */}
        <ServiceComparison />

        {/* 4. Interactive Instant Price & Discount Calculator */}

        {/* 5. How to Order: 5-Step Process Timeline */}
        <HowToOrder />

        {/* 6. Portfolio & Client Production Gallery */}
        <PortfolioGallery />

        {/* 7. FAQ Section using native <details> & <summary> accordion */}
        <FAQ />
      </main>

      {/* WhatsApp CTA tersedia melalui navbar, hero, dan form order */}

      {/* Footer & Workshop Info */}
      <Footer />
    </div>
  );
}
