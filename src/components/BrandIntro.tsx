import { Clock3, Palette, ShieldCheck } from 'lucide-react';

const benefits = [
  { icon: Palette, title: 'Sablon berkualitas', text: 'Pilih teknik plastisol, raster, atau DTF sesuai karakter brand Anda.' },
  { icon: Clock3, title: 'Aksesoris lengkap gratis', text: 'Sudah termasuk hangtag, label pundak, dan label woven bawah.' },
  { icon: ShieldCheck, title: 'Produksi rapi & cepat', text: 'Dikerjakan tenaga ahli dengan proses jelas hingga siap dikirim.' },
];

export default function BrandIntro() {
  return <section className="bg-neutral-100 py-14 text-neutral-950 md:py-20" aria-labelledby="intro-title"><div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8"><div><h2 id="intro-title" className="max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">Vendor Sablon Kaos Custom untuk komunitas, brand, dan event Anda.</h2><div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">{benefits.map(({icon: Icon, title, text}) => <article key={title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"><Icon className="h-5 w-5 text-neutral-950" aria-hidden="true" /><h3 className="mt-4 text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-neutral-600">{text}</p></article>)}</div></div><div><img src="/assets/ChatGPT%20Image%20Aug%2027,%202026,%2009_30_28%20PM.webp" alt="Perbandingan proses sablon manual dan sablon digital" width="700" height="467" loading="lazy" decoding="async" className="w-full rounded-2xl object-cover shadow-lg" /><p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">Kami membantu mengubah ide menjadi kaos yang siap dipakai, dijual, atau dibagikan. Mulai dari satu kaos personal sampai produksi partai untuk komunitas dan event.</p></div></div></section>;
}
