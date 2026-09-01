import { ReactNode } from 'react';
import { Sparkles, Shirt, MessageCircle, Layers, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { ORDER_STEPS, WHATSAPP_CONFIG } from '../data/content';

const ICONS_MAP: Record<string, ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4 text-slate-900" aria-hidden="true" />,
  Shirt: <Shirt className="w-4 h-4 text-slate-900" aria-hidden="true" />,
  MessageCircle: <MessageCircle className="w-4 h-4 text-slate-900" aria-hidden="true" />,
  Layers: <Layers className="w-4 h-4 text-slate-900" aria-hidden="true" />,
  Truck: <Truck className="w-4 h-4 text-slate-900" aria-hidden="true" />,
  CheckCircle2: <CheckCircle2 className="w-4 h-4 text-slate-900" aria-hidden="true" />,
};

export default function HowToOrder() {
  return (
    <section id="cara-order" className="py-12 md:py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>Alur Pemesanan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Space_Grotesk']">
            Cara Order 6 Langkah Praktis
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Alur singkat, jelas, dan siap membantu Anda mulai produksi.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ORDER_STEPS.map((step, idx) => {
              return (
                <article 
                  key={step.stepNumber}
                  className="group relative"
                >
                    <div className="flex h-full flex-col bg-slate-50 border border-slate-200 hover:border-slate-400 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Tahap {step.stepNumber}
                        </span>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          {ICONS_MAP[step.iconName] || <Sparkles className="w-4 h-4 text-slate-900" aria-hidden="true" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-1 font-['Space_Grotesk']">
                        {step.title}
                      </h3>
                      
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {step.description}
                      </p>

                    </div>
                    {idx < ORDER_STEPS.length - 1 && idx !== 2 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-white p-1 text-slate-500 shadow md:block" aria-hidden="true" />}
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
