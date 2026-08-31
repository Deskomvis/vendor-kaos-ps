import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/content';

const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`;

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 bg-neutral-950 bg-[url('/assets/imgi_6_login-bg.webp')] bg-cover bg-center opacity-80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/90 to-neutral-900/75" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-36 sm:px-6 md:pb-28 md:pt-44 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-neutral-200 backdrop-blur"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Planet Store · Custom Apparel</div>
          <h1 id="hero-title" className="text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-7xl">Bikin Kaos Kamu <span className="text-neutral-400">Naik Kelas.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-300 sm:text-lg">Jasa sablon kaos custom dengan DTF full color dan sablon manual untuk clothing brand, komunitas, event, dan kebutuhan personal.</p>
          <div className="mt-8"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#168a4a] px-6 text-sm font-bold text-white transition hover:bg-[#11713d] focus-visible:outline-white"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Konsultasi Gratis <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-300">{['Mulai 1 pcs', 'Proofing sebelum cetak', 'Garansi produksi'].map((item) => <span key={item} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-white" aria-hidden="true" />{item}</span>)}</div>
        </div>
        <div className="relative -mx-4 sm:-mx-8 lg:-mr-24 lg:ml-0" aria-hidden="true"><div className="absolute inset-8 rounded-full bg-white/10 blur-3xl" /><img src="/assets/hero-image-480.webp" alt="" width="480" height="320" fetchPriority="high" decoding="async" className="relative mx-auto w-full max-w-3xl scale-110 object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,.45)] sm:scale-105 lg:max-w-none lg:scale-110" /></div>
      </div>
    </section>
  );
}
