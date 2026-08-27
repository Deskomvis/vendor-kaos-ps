import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/content';

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>Pusat Bantuan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Space_Grotesk']">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Jawaban seputar standar bahan, spesifikasi cetak, minimal order, dan jaminan pengerjaan pre-order.
          </p>
        </div>

        {/* HTML <details> & <summary> Native Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="group bg-slate-50 border border-slate-200 open:border-slate-300 open:bg-white rounded-xl shadow-2xs transition-all"
            >
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer select-none font-bold text-slate-900 text-sm sm:text-base hover:text-slate-700 transition-colors list-none">
                <span className="flex items-center gap-3.5 pr-4">
                  <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-['Space_Grotesk']">{faq.question}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform duration-200 shrink-0" aria-hidden="true" />
              </summary>
              
              <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mt-1">
                <p>{faq.answer}</p>
                {faq.category && (
                  <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600">
                    Kategori: {faq.category}
                  </span>
                )}
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
