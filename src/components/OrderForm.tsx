import { FormEvent, useState } from 'react';
import { ArrowRight, MessageCircle, Send } from 'lucide-react';
import { TSHIRT_COLORS, WHATSAPP_CONFIG } from '../data/content';

const shirtOptions = [
  { id: 'cotton-30s', name: 'Cotton 30s', price: 36000 },
  { id: 'cotton-24s', name: 'Cotton 24s', price: 40500 },
  { id: 'long-sleeve', name: 'Lengan panjang tanpa rib lengan', price: 41000 },
];
const printOptions = [
  { id: 'logo', name: 'Sablon Logo', dimensions: '10 × 10 cm', image: '/assets/sablon%20logo.webp' },
  { id: 'a5', name: 'Sablon A5', dimensions: '15 × 21 cm', image: '/assets/sablon%20a5.webp' },
  { id: 'a4', name: 'Sablon A4', dimensions: '20 × 30 cm', image: '/assets/sablon%20a4.webp' },
  { id: 'a3', name: 'Sablon A3', dimensions: '28 × 40 cm', image: '/assets/sablon%20a3.webp' },
];

export default function OrderForm() {
  const [shirt, setShirt] = useState(shirtOptions[0].id);
  const [printSize, setPrintSize] = useState(printOptions[0].id);
  const [quantity, setQuantity] = useState(24);
  const [submitted, setSubmitted] = useState(false);
  const selectedShirt = shirtOptions.find((item) => item.id === shirt) || shirtOptions[0];
  const selectedPrint = printOptions.find((item) => item.id === printSize) || printOptions[0];
  const smallOrderFee = quantity < 24 ? 4000 : 0;
  const unitPrice = selectedShirt.price + smallOrderFee;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) || '-');
    const message = `Halo Planet Store, saya ingin order kaos + DTF.\n\nNama lengkap: ${get('name')}\nNomor WhatsApp: ${get('phone')}\nPilihan warna kaos: ${get('color')}\nPilihan bahan kaos: ${selectedShirt.name}\nPilihan sablon DTF: ${selectedPrint.name} (${selectedPrint.dimensions})\nJumlah kaos: ${quantity} pcs\nTarget selesai: ${get('deadline')}\n${smallOrderFee ? 'Biaya order di bawah 24 pcs: +Rp 4.000/pcs\n' : ''}Estimasi total: Rp ${(unitPrice * quantity).toLocaleString('id-ID')}\n\nMohon konfirmasi harga finalnya. Terima kasih.`;
    setSubmitted(true);
    window.open(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  const field = 'mt-2 min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm font-normal outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20';
  return <section id="order-form" className="bg-neutral-100 py-14 text-neutral-950 md:py-20" aria-labelledby="order-form-title"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="mb-8 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-neutral-500">Mulai Pesanan</p><h2 id="order-form-title" className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Isi spesifikasi kaos Anda.</h2><p className="mt-4 text-sm leading-6 text-neutral-600">Lengkapi data berikut dan kirim detail pesanan secara otomatis ke WhatsApp kami.</p></div><form onSubmit={handleSubmit} className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold">Nama lengkap<input required name="name" autoComplete="name" className={field} placeholder="Nama Anda" /></label><label className="text-sm font-bold">Nomor WhatsApp<input required name="phone" inputMode="tel" autoComplete="tel" className={field} placeholder="08xxxxxxxxxx" /></label><label className="text-sm font-bold">Pilihan warna kaos<select required name="color" className={field}>{TSHIRT_COLORS.map((color) => <option key={color.id}>{color.name}</option>)}</select></label><div className="sm:col-span-2"><p className="text-sm font-bold">Pilihan sablon kaos DTF</p><div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">{printOptions.map((item) => <button key={item.id} type="button" onClick={() => setPrintSize(item.id)} aria-pressed={printSize === item.id} className={`overflow-hidden rounded-2xl border-2 bg-white text-left transition hover:border-red-700 ${printSize === item.id ? 'border-red-700 ring-2 ring-red-700/20' : 'border-neutral-200'}`}><img src={item.image} alt={item.name} className="aspect-square w-full object-cover" /><span className="block p-3"><span className="block text-sm font-black">{item.name}</span><span className="mt-1 block text-xs text-neutral-500">{item.dimensions}</span></span></button>)}</div><p className="mt-2 text-xs text-neutral-500">Dipilih: <span className="font-bold text-neutral-950">{selectedPrint.name} · {selectedPrint.dimensions}</span></p></div><label className="text-sm font-bold sm:col-span-2">Pilihan bahan kaos<select required name="shirt" value={shirt} onChange={(e) => setShirt(e.target.value)} className={field}>{shirtOptions.map((item) => <option key={item.id} value={item.id}>{item.name} · Rp {item.price.toLocaleString('id-ID')}{item.id === 'long-sleeve' ? ' (+Rp 5.000)' : ''}</option>)}</select></label><label className="text-sm font-bold">Jumlah kaos<input required name="quantity" type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} className={field} /></label><label className="text-sm font-bold">Target selesai tanggal<input required name="deadline" type="date" className={field} /></label></div><div className="mt-6 rounded-2xl bg-neutral-950 p-4 text-white sm:flex sm:items-center sm:justify-between"><div><p className="text-xs text-neutral-400">Estimasi biaya</p><p className="mt-1 text-2xl font-black">Rp {(unitPrice * quantity).toLocaleString('id-ID')} <span className="text-xs font-normal text-neutral-400">({quantity} pcs × Rp {unitPrice.toLocaleString('id-ID')})</span></p></div><p className="mt-2 text-xs text-neutral-300 sm:mt-0">{smallOrderFee ? 'Termasuk +Rp 4.000/pcs untuk order di bawah 24 pcs.' : 'Minimal order 24 pcs.'}</p></div><div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center"><button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 text-sm font-bold text-white transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 sm:w-auto"><Send className="h-4 w-4" aria-hidden="true" /> Kirim ke WhatsApp <ArrowRight className="h-4 w-4" aria-hidden="true" /></button><span className="inline-flex items-center gap-2 text-xs text-neutral-500"><MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" /> {submitted ? 'Detail siap dikirim.' : 'Konsultasi dan estimasi gratis.'}</span></div></form></div></section>;
}
