const cards = [
  { image: '/assets/bikin-brand-minimal-5-roll-bahan.jpeg', title: 'Mulai brand kaosmu', text: 'Cocok untuk brand lokal pemula maupun pro.', alt: 'Promosi produksi brand kaos minimal lima roll bahan' },
  { image: '/assets/bikin-brand-punya-brand-sendiri.jpeg', title: 'Punya brand sendiri', text: 'Bahan berkualitas, sablon rapi, dan aksesoris gratis.', alt: 'Promosi pembuatan brand pakaian sendiri' },
];

export default function BrandProductionCards() {
  return <section className="border-b border-neutral-200 bg-neutral-100 py-10 md:py-14" aria-labelledby="brand-production-title"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[.25em] text-neutral-500">Produksi Clothing Brand</p><h2 id="brand-production-title" className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Bangun brand kaosmu bersama Gudang Planet.</h2></div><div className="grid gap-5 md:grid-cols-2">{cards.map((card) => <article key={card.image} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"><div className="flex aspect-[4/3] items-center justify-center bg-neutral-100"><img src={card.image} alt={card.alt} loading="lazy" decoding="async" className="h-full w-full object-contain" /></div><div className="p-5"><h3 className="text-lg font-black">{card.title}</h3><p className="mt-1 text-sm text-neutral-600">{card.text}</p></div></article>)}</div></div></section>;
}
