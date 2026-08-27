import { useState } from 'react';
import { Calculator, MessageCircle, Sparkles, Check } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/content';

const FABRICS = [
  { id: 'combed30s', name: 'Cotton Combed 30s', desc: 'Standar Distro, Ringan, Adem & Menyerap Keringat', priceExtra: 0 },
  { id: 'combed24s', name: 'Cotton Combed 24s', desc: 'Lebih Tebal Sedikit, Tidak Menerawang, Sangat Awet', priceExtra: 5000 },
  { id: 'heavy20s', name: 'Heavyweight Cotton 20s', desc: 'Tebal & Kokoh, Streetwear Boxy Oversize Premium', priceExtra: 15000 },
];

const SIZES = [
  { id: 'logo', name: 'Logo Dada (10 x 10 cm)', dtfPrice: 55000, manualPrice: 42000 },
  { id: 'a4', name: 'Ukuran A4 (21 x 29.7 cm)', dtfPrice: 65000, manualPrice: 48000 },
  { id: 'a3', name: 'Ukuran A3 (29.7 x 42 cm)', dtfPrice: 75000, manualPrice: 55000 },
  { id: 'dual', name: 'Depan (Logo) + Belakang (A3)', dtfPrice: 88000, manualPrice: 62000 },
];

export default function PriceCalculator() {
  const [tech, setTech] = useState<'dtf' | 'manual'>('dtf');
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // A4
  const [quantity, setQuantity] = useState(tech === 'manual' ? 24 : 6);

  // Auto adjust quantity if manual selected (min 12 pcs)
  const handleTechChange = (newTech: 'dtf' | 'manual') => {
    setTech(newTech);
    if (newTech === 'manual' && quantity < 12) {
      setQuantity(24);
    }
  };

  // Tier Discount
  const getDiscountPerPiece = (qty: number, currentTech: 'dtf' | 'manual') => {
    if (currentTech === 'dtf') {
      if (qty >= 50) return 12000;
      if (qty >= 24) return 8000;
      if (qty >= 12) return 5000;
      if (qty >= 6) return 2000;
      return 0;
    } else {
      if (qty >= 100) return 9000;
      if (qty >= 50) return 6000;
      if (qty >= 24) return 3000;
      return 0;
    }
  };

  const basePrice = tech === 'dtf' ? selectedSize.dtfPrice : selectedSize.manualPrice;
  const fabricExtra = selectedFabric.priceExtra;
  const discount = getDiscountPerPiece(quantity, tech);
  const unitPrice = Math.max(35000, basePrice + fabricExtra - discount);
  const totalPrice = unitPrice * quantity;

  const handleSendToWhatsApp = () => {
    const techName = tech === 'dtf' ? 'DTF Digital Satuan' : 'Sablon Manual Screenprint';
    const msg = `Halo Planet Store, saya menghitung estimasi pre-order sablon kaos:%0A%0A` +
      `📊 *Rincian Estimasi Biaya:*%0A` +
      `- Teknik: ${techName}%0A` +
      `- Bahan Kaos: ${selectedFabric.name}%0A` +
      `- Area Sablon: ${selectedSize.name}%0A` +
      `- Jumlah: ${quantity} pcs%0A` +
      `- Harga Satuan: Rp ${unitPrice.toLocaleString('id-ID')} / pcs%0A` +
      `- *Total Estimasi:* Rp ${totalPrice.toLocaleString('id-ID')}%0A%0A` +
      `Mohon konfirmasi ketersediaan bahan dan waktu pengerjaannya. Terima kasih!`;

    window.open(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="kalkulator-harga" className="py-20 md:py-28 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>Kalkulator Otomatis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Space_Grotesk']">
            Simulasi Biaya Cetak
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hitung perkiraan biaya sablon kaos Anda secara transparan. Dapatkan potongan diskon volume otomatis untuk pesanan partai studio maupun event komunitas.
          </p>
        </div>

        {/* Calculator Interactive Box */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-start">
            
            {/* Left Options Controls */}
            <div className="space-y-6">
              
              {/* 1. Pilih Teknik */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5">
                  1. Pilih Metode Cetak:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => handleTechChange('dtf')}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                      tech === 'dtf'
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`font-bold ${tech === 'dtf' ? 'text-white' : 'text-slate-900'}`}>DTF Satuan</div>
                    <div className={`text-[11px] mt-0.5 ${tech === 'dtf' ? 'text-slate-300' : 'text-slate-500'}`}>Mulai 1 pcs (Full Color)</div>
                  </button>

                  <button
                    onClick={() => handleTechChange('manual')}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                      tech === 'manual'
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`font-bold ${tech === 'manual' ? 'text-white' : 'text-slate-900'}`}>Silkscreen Manual</div>
                    <div className={`text-[11px] mt-0.5 ${tech === 'manual' ? 'text-slate-300' : 'text-slate-500'}`}>Min. 12 pcs (Plastisol)</div>
                  </button>
                </div>
              </div>

              {/* 2. Pilih Bahan Kaos */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5">
                  2. Pilih Material Kain:
                </label>
                <div className="space-y-2">
                  {FABRICS.map((fabric) => (
                    <div
                      key={fabric.id}
                      onClick={() => setSelectedFabric(fabric)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedFabric.id === fabric.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className={`font-bold text-xs ${selectedFabric.id === fabric.id ? 'text-white' : 'text-slate-900'}`}>{fabric.name}</div>
                        <div className={`text-[11px] mt-0.5 ${selectedFabric.id === fabric.id ? 'text-slate-300' : 'text-slate-500'}`}>{fabric.desc}</div>
                      </div>
                      <div className="text-right pl-3 shrink-0">
                        {fabric.priceExtra > 0 ? (
                          <span className={`text-xs font-mono font-bold ${selectedFabric.id === fabric.id ? 'text-amber-400' : 'text-slate-900'}`}>
                            +Rp {fabric.priceExtra.toLocaleString('id-ID')}
                          </span>
                        ) : (
                          <span className={`text-xs font-bold ${selectedFabric.id === fabric.id ? 'text-emerald-300' : 'text-emerald-700'}`}>Include</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Ukuran Sablon */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5">
                  3. Dimensi Area Sablon:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SIZES.map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSize(sz)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        selectedSize.id === sz.id
                          ? 'border-slate-900 bg-slate-900 text-white font-bold shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="truncate font-medium">{sz.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Kuantiti Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="qty-slider" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    4. Volume Pemesanan:
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                    {quantity} Pcs
                  </span>
                </div>
                <input
                  id="qty-slider"
                  type="range"
                  min={tech === 'manual' ? 12 : 1}
                  max="300"
                  step="1"
                  aria-label="Volume jumlah pemesanan kaos"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <div className="flex justify-between text-xs font-mono text-slate-500 mt-1.5">
                  <span>{tech === 'manual' ? '12 pcs' : '1 pcs'}</span>
                  <span>50 pcs</span>
                  <span>100 pcs</span>
                  <span>300+ pcs</span>
                </div>
              </div>

            </div>

            {/* Right Summary Result Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5 pb-3 border-b border-slate-200 flex items-center justify-between">
                  <span>Rincian Kalkulasi</span>
                  <Sparkles className="w-4 h-4 text-amber-600" aria-hidden="true" />
                </h3>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Metode:</span>
                    <span className="font-semibold text-slate-900">{tech === 'dtf' ? 'DTF Full Color' : 'Silkscreen Manual'}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Bahan Kaos:</span>
                    <span className="font-semibold text-slate-900">{selectedFabric.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Dimensi Sablon:</span>
                    <span className="font-semibold text-slate-900">{selectedSize.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Kuantitas:</span>
                    <span className="font-mono font-bold text-slate-900">{quantity} Pcs</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-emerald-900 bg-emerald-100/70 border border-emerald-300 rounded-lg p-2.5 text-xs">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" /> Diskon Kuantitas:
                      </span>
                      <span className="font-mono font-bold">-Rp {discount.toLocaleString('id-ID')} / pcs</span>
                    </div>
                  )}
                </div>

                {/* Total Highlight */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="text-xs uppercase font-semibold text-slate-500 mb-1">Biaya Satuan:</div>
                  <div className="text-xl font-bold text-slate-900 font-['Space_Grotesk'] mb-3">
                    Rp {unitPrice.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-500">/ pcs</span>
                  </div>

                  <div className="text-xs uppercase font-semibold text-slate-500 mb-1">Estimasi Total:</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    *Harga sudah termasuk kaos berkualitas kurasi &amp; sablon siap pakai.
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full min-h-[44px] py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>Kirim Estimasi ke WhatsApp</span>
                </button>
                <a
                  href="#mockup-studio"
                  className="block text-center text-xs font-semibold text-slate-700 hover:text-slate-950 py-1 transition-colors"
                >
                  Coba Visualisasi di Mockup Studio &rarr;
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
