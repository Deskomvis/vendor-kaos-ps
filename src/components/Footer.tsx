import { MapPin, Clock, Phone, Mail, ShieldCheck, Instagram, Facebook } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-black text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/assets/logo-gudang-planet-produksi.webp" alt="Gudang Planet" width="128" height="64" loading="lazy" decoding="async" className="w-20 h-10 object-contain" />
              <span className="font-extrabold text-lg tracking-tight text-white font-['Space_Grotesk']">Produksi</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Layanan sablon kaos berkualitas tinggi. Melayani cetak presisi DTF satuan tanpa minimal order serta produksi sablon manual untuk brand, merchandise musisi, dan event.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Garansi Cetak Presisi
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Navigasi Cepat</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#order-form" className="hover:text-white transition-colors">
                  Form Spesifikasi Order
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">
                  DTF Digital Satuan
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">
                  Silkscreen Manual Komunitas
                </a>
              </li>
              <li>
                <a href="#order-form" className="hover:text-white transition-colors">
                  Form & Estimasi Biaya
                </a>
              </li>
              <li>
                <a href="#cara-order" className="hover:text-white transition-colors">
                  Alur 5 Langkah Pre-Order
                </a>
              </li>
              <li>
                <a href="#portofolio" className="hover:text-white transition-colors">
                  Galeri Karya
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Layanan & Spesifikasi */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Spesifikasi Kain &amp; Sablon</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Cotton Combed 30s Soft Premium</li>
              <li>• Cotton Combed 24s Heavy Distro</li>
              <li>• Heavyweight 20s Boxy Oversize</li>
              <li>• Sablon DTF Raster HD</li>
              <li>• Silkscreen Plastisol Premium</li>
              <li>• Sablon Discharge Cabut Warna</li>
              <li>• Digital Proofing &amp; QC Ketat</li>
            </ul>
          </div>

          {/* Contact & Workshop Address */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Kontak &amp; Alamat</h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Jl. Kreatif Sablon No. 88, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />
                <span>Senin - Sabtu: 08.00 - 21.00 WIB</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <a 
                  href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-medium font-mono"
                >
                  {WHATSAPP_CONFIG.formattedNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />
                <span>order@planetstore.id</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-3">
              <a href="#" aria-label="Instagram Planet Store" className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook Planet Store" className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Planet Store. Hak Cipta Dilindungi.</p>
          <p>
            Platform Pre-Order Sablon Kaos Custom
          </p>
        </div>
      </div>
    </footer>
  );
}
