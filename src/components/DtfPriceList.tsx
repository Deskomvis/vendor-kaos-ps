type PriceRow = { label: string; price: string };

const priceGroups: { title: string; rows: PriceRow[] }[] = [
  {
    title: 'Kaos 30s · Depan',
    rows: [
      { label: 'Logo', price: '36.000' }, { label: 'A6', price: '36.500' },
      { label: 'A5', price: '38.000' }, { label: 'A4', price: '43.000' }, { label: 'A3', price: '49.500' },
    ],
  },
  {
    title: 'Kaos 30s · Depan + Belakang',
    rows: [
      { label: 'Logo + A5', price: '41.500' }, { label: 'Logo + A4', price: '44.000' },
      { label: 'Logo + A3', price: '51.000' }, { label: 'A5 + A4', price: '47.000' }, { label: 'A5 + A3', price: '53.500' },
    ],
  },
  {
    title: 'Kaos 24s · Depan',
    rows: [
      { label: 'Logo', price: '40.500' }, { label: 'A6', price: '41.000' },
      { label: 'A5', price: '42.800' }, { label: 'A4', price: '47.800' }, { label: 'A3', price: '54.000' },
    ],
  },
  {
    title: 'Kaos 24s · Depan + Belakang',
    rows: [
      { label: 'Logo + A5', price: '44.000' }, { label: 'Logo + A4', price: '48.800' },
      { label: 'Logo + A3', price: '55.500' }, { label: 'A5 + A4', price: '51.800' }, { label: 'A5 + A3', price: '58.000' },
    ],
  },
];

export default function DtfPriceList() {
  return <section id="price-list" className="bg-white py-14 text-neutral-950 md:py-20" aria-labelledby="price-list-title">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-neutral-500">Price List DTF</p><h2 id="price-list-title" className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Kaos + DTF.</h2><p className="mt-4 text-sm leading-6 text-neutral-600">Harga per pcs, sudah termasuk kaos dan cetak DTF. Pilih kombinasi cetak yang sesuai kebutuhan Anda.</p></div>
      <div className="grid gap-4 sm:grid-cols-2">{priceGroups.map((group) => <article key={group.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"><h3 className="text-base font-black">{group.title}</h3><div className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">{group.rows.map((row) => <div key={row.label} className="flex items-center justify-between px-4 py-3 text-sm"><span className="text-neutral-600">{row.label}</span><span className="font-black">Rp {row.price}</span></div>)}</div></article>)}</div>
      <p className="mt-5 text-xs text-neutral-500">* Harga dapat menyesuaikan desain, warna kaos, dan jumlah pesanan. Konfirmasi harga final melalui WhatsApp.</p>
    </div>
  </section>;
}
