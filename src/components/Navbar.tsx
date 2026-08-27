import { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Menu, X, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/content';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Layanan', href: '#layanan' },
    { label: 'Isi Order', href: '#order-form', highlight: true },
    { label: 'Estimasi Biaya', href: '#order-form' },
    { label: 'Cara Order', href: '#cara-order' },
    { label: 'Portofolio', href: '#portofolio' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-xs' 
        : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Beranda Planet Store">
            <img src="/assets/logo%20PS)%20(1).webp" alt="Planet Store" width="96" height="72" decoding="async" className="w-12 h-10 object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 font-['Space_Grotesk']">
                  Planet <span className="text-amber-600">Store</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" aria-hidden="true" /> Slot Open
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Jasa Sablon Kaos Satuan & Partai
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors py-1 ${
                  link.highlight 
                    ? 'text-slate-900 font-semibold flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200' 
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direct WhatsApp Call to Action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-lg bg-[#168a4a] hover:bg-[#11713d] text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-xs active:scale-98"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Chat WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button (Accessible 44px min target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-2 mt-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                link.highlight 
                  ? 'bg-slate-100 text-slate-900 font-semibold' 
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-lg bg-[#168a4a] hover:bg-[#11713d] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
