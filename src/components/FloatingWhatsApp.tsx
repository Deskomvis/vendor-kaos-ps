import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/content';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSendMessage = () => {
    const messageToSend = customMsg.trim() || WHATSAPP_CONFIG.defaultMessage;
    const url = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(messageToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Chat Box */}
      {isOpen && (
        <div 
          className="mb-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
          role="dialog"
          aria-label="Konsultasi WhatsApp"
        >
          {/* Header */}
          <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white text-slate-900 font-bold text-xs flex items-center justify-center font-mono">
                SK
              </div>
              <div>
                <h3 className="font-bold text-xs text-white uppercase tracking-wider font-['Space_Grotesk']">Konsultasi Planet Store</h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <span>Online • Siap Membantu</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Tutup jendela chat"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body message preview */}
          <div className="p-4 bg-slate-50 text-xs space-y-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed shadow-2xs">
              <p className="font-bold text-slate-900 mb-1 flex items-center gap-1 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" /> Halo! Konsultasi Gratis
              </p>
              Tulis pertanyaan atau kirim file desain Anda untuk verifikasi teknis dan penawaran langsung.
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Pertanyaan Cepat:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setCustomMsg("Halo, saya mau tanya harga sablon DTF satuan untuk ukuran A3.")}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs transition-colors text-left shadow-2xs"
                >
                  DTF Satuan A3
                </button>
                <button
                  onClick={() => setCustomMsg("Halo, saya mau bikin kaos sablon manual untuk 50 pcs.")}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs transition-colors text-left shadow-2xs"
                >
                  Manual 50 pcs
                </button>
                <button
                  onClick={() => setCustomMsg("Halo, apakah bisa bawa kaos polos sendiri?")}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs transition-colors text-left shadow-2xs"
                >
                  Bawa Kaos Sendiri
                </button>
              </div>
            </div>

            {/* Input message */}
            <div className="pt-2">
              <label htmlFor="wa-custom-msg" className="sr-only">Tulis pesan konsultasi</label>
              <textarea
                id="wa-custom-msg"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Ketik rincian konsultasi Anda..."
                rows={2}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
              />
              <button
                onClick={handleSendMessage}
                className="mt-2 w-full min-h-[44px] py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Buka WhatsApp Sekarang</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Floating Sticky Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative min-h-[44px] px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 border border-slate-700"
        aria-label="Hubungi WhatsApp Planet Store"
      >
        <div className="relative">
          <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
        <span className="font-semibold hidden sm:inline text-xs">
          Konsultasi Pre-Order
        </span>
      </button>
    </div>
  );
}
