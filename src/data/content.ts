import { TShirtColor, PrintSizePreset, SampleArtwork, ServiceDetail, OrderStep, PortfolioItem, FAQItem } from '../types';

export const WHATSAPP_CONFIG = {
  phoneNumber: "6282113333354",
  formattedNumber: "+62 812-3456-7890",
  defaultMessage: "Halo Planet Store, saya ingin konsultasi tentang pre-order sablon kaos.\n\nSaya ingin mendapatkan informasi harga dan proses order.",
  studioMessageTemplate: (color: string, side: string, size: string, qty: number) => 
    `Halo Planet Store! Saya sudah membuat mockup di website:\n- Warna Kaos: ${color}\n- Posisi: ${side}\n- Ukuran Cetak: ${size}\n- Estimasi Jumlah: ${qty} pcs\n\nMohon info harga fix dan cara kirim file desain resolusi tingginya ya.`
};

export const WHATSAPP_ROTATOR_NUMBERS = ['6282113333354', '6285724603103', '6285793800383', '6287775121412', '6287740991337'];
const WHATSAPP_ROTATOR_KEY = 'gudang-planet-whatsapp-rotator-index';
export function getNextWhatsAppNumber() {
  const current = Number.parseInt(localStorage.getItem(WHATSAPP_ROTATOR_KEY) || '0', 10) || 0;
  localStorage.setItem(WHATSAPP_ROTATOR_KEY, String((current + 1) % WHATSAPP_ROTATOR_NUMBERS.length));
  const number = WHATSAPP_ROTATOR_NUMBERS[current % WHATSAPP_ROTATOR_NUMBERS.length];
  const hitKey = 'gudang-planet-whatsapp-rotator-hits';
  const hits = JSON.parse(localStorage.getItem(hitKey) || '{}');
  hits[number] = (hits[number] || 0) + 1;
  localStorage.setItem(hitKey, JSON.stringify(hits));
  return number;
}

export const TSHIRT_COLORS: TShirtColor[] = [
  { id: 'white', name: 'Putih Bersih (Solid White)', hex: '#F9FAFB', textColor: 'dark', highlightHex: '#FFFFFF', shadowHex: '#E5E7EB' },
  { id: 'black', name: 'Hitam Pekat (Jet Black)', hex: '#18181B', textColor: 'light', highlightHex: '#27272A', shadowHex: '#09090B' },
  { id: 'navy', name: 'Navy Blue (Biru Dongker)', hex: '#1E293B', textColor: 'light', highlightHex: '#334155', shadowHex: '#0F172A' },
  { id: 'charcoal', name: 'Charcoal Grey (Abu Tua)', hex: '#374151', textColor: 'light', highlightHex: '#4B5563', shadowHex: '#1F2937' },
  { id: 'maroon', name: 'Maroon Red (Merah Marun)', hex: '#581C28', textColor: 'light', highlightHex: '#702434', shadowHex: '#3F121C' },
  { id: 'forest', name: 'Forest Green (Hijau Botol)', hex: '#143628', textColor: 'light', highlightHex: '#1D4D3A', shadowHex: '#0B2017' },
  { id: 'sand', name: 'Sand Khaki (Krem Vintage)', hex: '#D6C7B2', textColor: 'dark', highlightHex: '#E5DACB', shadowHex: '#BFAD97' },
  { id: 'mustard', name: 'Mustard Gold (Kuning Kunyit)', hex: '#D97706', textColor: 'dark', highlightHex: '#F59E0B', shadowHex: '#B45309' },
  { id: 'lilac', name: 'Lilac Soft (Ungu Pastel)', hex: '#DDD6FE', textColor: 'dark', highlightHex: '#EDE9FE', shadowHex: '#C4B5FD' },
  { id: 'sage', name: 'Sage Green (Hijau Mint Pastel)', hex: '#A3B899', textColor: 'dark', highlightHex: '#B8CBB0', shadowHex: '#8C9F82' },
];

export const PRINT_SIZE_PRESETS: PrintSizePreset[] = [
  { id: 'logo', name: 'Logo Dada (Pocket Size)', dimensions: '10 x 10 cm', maxScalePct: 0.4, priceDtf: 55000, priceManual: 42000 },
  { id: 'a4', name: 'Ukuran Standar A4', dimensions: '21 x 29.7 cm', maxScalePct: 0.8, priceDtf: 65000, priceManual: 48000 },
  { id: 'a3', name: 'Ukuran Jumbo A3', dimensions: '29.7 x 42 cm', maxScalePct: 1.0, priceDtf: 75000, priceManual: 55000 },
  { id: 'dual', name: 'Depan (Logo) + Belakang (A3)', dimensions: 'Logo + A3 Back', maxScalePct: 1.0, priceDtf: 88000, priceManual: 62000 },
];

export const SAMPLE_ARTWORKS: SampleArtwork[] = [
  {
    id: 'sample-streetwear',
    title: 'Streetwear Typography',
    category: 'Typography',
    thumbnail: '⚡ TOKYO CLUB',
    svgData: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <rect width="400" height="400" fill="none"/>
      <circle cx="200" cy="200" r="160" stroke="%23f59e0b" stroke-width="8" stroke-dasharray="16,8" fill="none"/>
      <path d="M120,200 L280,200 M200,120 L200,280" stroke="%23ef4444" stroke-width="4" opacity="0.6"/>
      <text x="200" y="160" font-family="sans-serif" font-weight="900" font-size="34" fill="%23f43f5e" text-anchor="middle" letter-spacing="4">UNDERGROUND</text>
      <text x="200" y="210" font-family="sans-serif" font-weight="800" font-size="48" fill="%23ffffff" text-anchor="middle" letter-spacing="6" stroke="%23111827" stroke-width="4" paint-order="stroke fill">TOKYO 99</text>
      <text x="200" y="250" font-family="sans-serif" font-weight="700" font-size="20" fill="%23fbbf24" text-anchor="middle" letter-spacing="8">RAW %26 UNFILTERED</text>
      <polygon points="190,265 210,265 200,280" fill="%23f59e0b"/>
    </svg>`
  },
  {
    id: 'sample-vintage',
    title: 'Vintage Coffee Badge',
    category: 'Emblem',
    thumbnail: '☕ COFFEE LAB',
    svgData: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <rect width="400" height="400" fill="none"/>
      <circle cx="200" cy="200" r="150" fill="%231e293b" stroke="%23d97706" stroke-width="6"/>
      <circle cx="200" cy="200" r="135" fill="none" stroke="%23f8fafc" stroke-width="2" stroke-dasharray="6,4"/>
      <path d="M150,190 C150,150 250,150 250,190 L240,230 C240,245 220,255 200,255 C180,255 160,245 160,230 Z" fill="%23d97706"/>
      <path d="M240,190 C260,190 265,210 240,220" fill="none" stroke="%23d97706" stroke-width="6" stroke-linecap="round"/>
      <path d="M180,140 Q185,120 180,105 M200,140 Q205,120 200,105 M220,140 Q225,120 220,105" fill="none" stroke="%23fbbf24" stroke-width="3" stroke-linecap="round"/>
      <text x="200" y="80" font-family="sans-serif" font-weight="900" font-size="20" fill="%23fbbf24" text-anchor="middle" letter-spacing="4">ROASTERY %26 CO</text>
      <text x="200" y="300" font-family="sans-serif" font-weight="800" font-size="24" fill="%23ffffff" text-anchor="middle" letter-spacing="4">ARTISAN BREW</text>
      <text x="200" y="325" font-family="sans-serif" font-weight="600" font-size="14" fill="%2394a3b8" text-anchor="middle">EST. 2024</text>
    </svg>`
  },
  {
    id: 'sample-cyber',
    title: 'Cyberpunk Mecha Tiger',
    category: 'Graphic',
    thumbnail: '🐯 CYBER MECHA',
    svgData: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <rect width="400" height="400" fill="none"/>
      <polygon points="200,40 340,120 340,280 200,360 60,280 60,120" fill="%230f172a" stroke="%2306b6d4" stroke-width="6"/>
      <path d="M120,160 L200,100 L280,160 L240,250 L200,280 L160,250 Z" fill="%2306b6d4" opacity="0.2"/>
      <circle cx="160" cy="190" r="14" fill="%23ec4899"/>
      <circle cx="240" cy="190" r="14" fill="%23ec4899"/>
      <polygon points="200,210 180,240 220,240" fill="%2338bdf8"/>
      <line x1="140" y1="270" x2="260" y2="270" stroke="%23ec4899" stroke-width="6"/>
      <line x1="160" y1="285" x2="240" y2="285" stroke="%2306b6d4" stroke-width="4"/>
      <text x="200" y="335" font-family="monospace" font-weight="900" font-size="22" fill="%2338bdf8" text-anchor="middle" letter-spacing="4">NEO PROTOCOL</text>
    </svg>`
  },
  {
    id: 'sample-minimal',
    title: 'Outdoor Mountain Club',
    category: 'Minimal',
    thumbnail: '🏔️ MOUNTAIN PEAK',
    svgData: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <rect width="400" height="400" fill="none"/>
      <circle cx="200" cy="160" r="70" fill="%23f97316" opacity="0.85"/>
      <polygon points="200,110 310,270 90,270" fill="%231e293b"/>
      <polygon points="200,110 240,170 210,160 190,170" fill="%23ffffff"/>
      <polygon points="140,210 220,270 80,270" fill="%23334155" opacity="0.7"/>
      <text x="200" y="315" font-family="sans-serif" font-weight="800" font-size="28" fill="%230f172a" text-anchor="middle" letter-spacing="6">WANDERLUST</text>
      <text x="200" y="340" font-family="sans-serif" font-weight="600" font-size="14" fill="%2364748b" text-anchor="middle" letter-spacing="3">EXPLORE THE UNKNOWN</text>
    </svg>`
  }
];

export const SERVICES: ServiceDetail[] = [
  {
    id: 'dtf',
    title: 'Sablon DTF Satuan',
    subtitle: 'Direct to Film Digital Print',
    tag: 'Cocok untuk sample & custom satuan',
    badge: 'Paling Populer untuk Satuan & Sample',
    minOrder: 'Mulai 1 Pcs',
    priceRange: 'Rp 36.000 - Rp 75.000 / pcs',
    productionTime: '1 - 3 Hari Kerja (Kilat)',
    features: [
      'Bebas full color, foto, gradasi kompleks tanpa batas warna',
      'Detail super tajam hingga 1440 DPI (raster & teks mikro terbaca)',
      'Tekstur elastis, fleksibel mengikuti tarikan kain & tidak kaku',
      'Tersedia untuk berbagai jenis warna kaos gelap maupun terang',
      'Bisa pesan 1 pcs untuk prototype, kado, atau koleksi pribadi'
    ],
    bestFor: [
      'Pecinta custom satuan / kado personal',
      'Desain dengan banyak gradasi & foto',
      'Sample pre-order clothing line',
      'Acara mendesak / butuh cepat 1-2 hari'
    ],
    recommended: true
  },
  {
    id: 'manual',
    title: 'Sablon Manual Screen Printing',
    subtitle: 'Plastisol / Rubber / Discharge Screenprint',
    tag: 'Spesialis produksi clothing brand & grosir',
    badge: 'Ekonomis & Tahan Bertahun-tahun',
    minOrder: 'Minimal 60 pcs',
    priceRange: '40 ribuan / pcs',
    productionTime: '',
    features: [
      'Untuk merchandise event, atribut komunitas, seragam, dan apparel brand sendiri',
      'Material 100% katun yang adem dan lembut',
      'Pilihan teknik Plastisol, Rubber, Discharge, atau Waterbase',
      'Warna super pekat, awet bertahun-tahun tahan cuci berkali-kali',
      'Bisa finishing custom: Efek Timbul (High Density), Glow in Dark, Gold Foil'
    ],
    bestFor: [
      'Kaos komunitas motor / mobil / hobi',
      'Seragam kepanitiaan event & gathering kantor',
      'Produksi massal clothing brand / distro',
      'Merchandise konser musik & kampus'
    ],
    recommended: false
  }
];

export const ORDER_STEPS: OrderStep[] = [
  {
    stepNumber: 1,
    title: 'Siapkan File Desain',
    description: 'Kirim desain atau referensi yang ingin diproduksi.',
    tip: 'Belum punya desain fix? Tim kami siap bantu layout gratis!',
    iconName: 'Sparkles'
  },
  {
    stepNumber: 2,
    title: 'Pilih Bahan Kaos & Jenis Sablon',
    description: 'Pilih bahan kaos dan teknik sablon sesuai kebutuhan.',
    tip: 'Bisa bawa kaos sendiri jika hanya ingin press cetak.',
    iconName: 'Shirt'
  },
  {
    stepNumber: 3,
    title: 'Konsultasi WhatsApp & Pembayaran DP',
    description: 'Konfirmasi detail pesanan dan lakukan pembayaran DP.',
    tip: 'Fast response setiap hari pkl 08.00 - 22.00 WIB.',
    iconName: 'MessageCircle'
  },
  {
    stepNumber: 4,
    title: 'Digital Proofing & Proses Produksi',
    description: 'Setujui preview desain sebelum proses produksi dimulai.',
    tip: 'Pengerjaan transparan dengan update foto proses produksi.',
    iconName: 'Layers'
  },
  {
    stepNumber: 5,
    title: 'Quality Check & Pengiriman Aman',
    description: 'Pesanan dicek, dikemas rapi, lalu dikirim ke seluruh Indonesia.',
    tip: 'Tersedia garansi 100% cetak ulang bila ada cacat produksi.',
    iconName: 'Truck'
  },
  {
    stepNumber: 6,
    title: 'Pesanan Diterima',
    description: 'Pesanan tiba dengan aman dan siap digunakan atau dijual.',
    tip: 'Simpan kontak kami untuk repeat order berikutnya.',
    iconName: 'CheckCircle2'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Streetwear Oversize Cyberpunk Tour',
    category: 'manual',
    client: 'Tokyo Neon Project',
    material: 'Heavyweight Cotton 20s Boxy Fit',
    printType: 'DTF Raster 1440 DPI + Neon Glow',
    image: '/assets/Porto/konveksi-sablon.webp',
    description: 'Gradasi tajam warna neon pada kain hitam pekat dengan tekstur lembut.',
    quantity: '24 Pcs'
  },
  {
    id: 'port-2',
    title: 'Official Gathering Motor Club Indonesia',
    category: 'manual',
    client: 'Riders Brotherhood Chapter JKT',
    material: 'Cotton Combed 24s Jet Black',
    printType: 'Plastisol High Density (Timbul) 3D',
    image: '/assets/Porto/20250719_1129562827902937119878363745.jpg',
    description: 'Sablon manual plastisol gold & white dengan ketahanan cuci ekstra tinggi.',
    quantity: '150 Pcs'
  },
  {
    id: 'port-3',
    title: 'Merchandise Festival Musik Indie',
    category: 'manual',
    client: 'Soundwave Fest 2024',
    material: 'Cotton Combed 30s Charcoal Grey',
    printType: 'Discharge (Cabut Warna Lembut)',
    image: '/assets/Porto/images%20(8).jpeg',
    description: 'Sablon terasa langsung menyatu dengan serat kain tanpa ada lapisan keras.',
    quantity: '300 Pcs'
  },
  {
    id: 'port-4',
    title: 'Coffee Roastery Vintage Uniform',
    category: 'manual',
    client: 'Senja Coffee & Eatery',
    material: 'Cotton Combed 24s Sand Khaki',
    printType: 'DTF Full Color Dada Kiri + Punggung A3',
    image: '/assets/Porto/images%20(7).jpeg',
    description: 'Pengerjaan kilat 2 hari untuk seragam barista pembukaan outlet baru.',
    quantity: '12 Pcs'
  },
  {
    id: 'port-5',
    title: 'Custom Artwork Satuan Gift Spesial',
    category: 'manual',
    client: 'Personal Custom Order',
    material: 'Cotton Combed 30s Putih Bersih',
    printType: 'DTF Premium Ultra Vivid A3',
    image: '/assets/Porto/Kelebihan-sablon-manual.jpg',
    description: 'Cetak foto ilustrasi kucing kesayangan dengan detail helai bulu yang presisi.',
    quantity: '1 Pcs'
  },
  {
    id: 'port-6',
    title: 'Alumni Reunion & Charity Run T-Shirt',
    category: 'manual',
    client: 'Universitas Indonesia Alumni 2014',
    material: 'Cotton Combed 30s Navy Blue',
    printType: 'Sablon Rubber Quik Anti Pecah',
    image: '/assets/Porto/Jasa-Sablon.jpg',
    description: 'Produksi tepat waktu dengan packaging rapi per size dan stiker merchandise.',
    quantity: '200 Pcs'
  },
  {
    id: 'dtf-1', title: 'Press DTF Custom', category: 'dtf', client: 'Planet Store Production', material: 'Cotton Combed Premium', printType: 'DTF Full Color', image: '/assets/Porto/DTF/images%20(12).jpeg', description: 'Proses press DTF dengan hasil detail dan warna tajam.', quantity: '1 Pcs'
  },
  {
    id: 'dtf-2', title: 'DTF Kaos Biru', category: 'dtf', client: 'Custom Order', material: 'Cotton Combed Premium', printType: 'DTF Full Color', image: '/assets/Porto/DTF/images%20(11).jpeg', description: 'Transfer desain full color pada kaos warna gelap.', quantity: '12 Pcs'
  },
  {
    id: 'dtf-3', title: 'Contoh Hasil Sablon DTF', category: 'dtf', client: 'Custom Order', material: 'Cotton Combed Premium', printType: 'DTF Detail Tinggi', image: '/assets/Porto/DTF/Proses-Dtf-Contoh-Hasil-Sablon-DTF.jpg', description: 'Hasil transfer desain dengan detail grafis yang presisi.', quantity: '24 Pcs'
  },
  {
    id: 'dtf-4', title: 'DTF Artwork Full Color', category: 'dtf', client: 'Custom Order', material: 'Cotton Combed Premium', printType: 'DTF Full Color', image: '/assets/Porto/DTF/images%20(10).jpeg', description: 'Desain ilustrasi penuh warna untuk kaos custom.', quantity: '12 Pcs'
  },
  {
    id: 'dtf-5', title: 'Press DTF Premium', category: 'dtf', client: 'Custom Order', material: 'Cotton Combed Premium', printType: 'DTF Premium', image: '/assets/Porto/DTF/images%20(9).jpeg', description: 'Proses pressing DTF yang rapi dan siap dipakai.', quantity: '6 Pcs'
  },
  {
    id: 'dtf-6', title: 'DTF Transfer Lettering', category: 'dtf', client: 'Custom Order', material: 'Cotton Combed Premium', printType: 'DTF Full Color', image: '/assets/Porto/DTF/Cover.png', description: 'Hasil cetak lettering dengan warna cerah dan bersih.', quantity: '24 Pcs'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Apakah saya bisa bawa kaos sendiri?",
    answer: "Bisa banget! Kami menyediakan jasa sablon press saja (DTF maupun manual). Biaya disesuaikan dengan ukuran area cetak mulai dari Rp 15.000 untuk logo dada hingga Rp 35.000 untuk ukuran A3.",
    category: "Layanan"
  },
  {
    question: "Apa perbedaan utama Sablon DTF dan Sablon Manual?",
    answer: "Sablon DTF sangat cocok untuk pesanan satuan (1-11 pcs) atau desain yang memiliki banyak gradasi foto full color. Sedangkan Sablon Manual (Plastisol/Rubber) sangat direkomendasikan untuk pesanan partai/komunitas (>12 pcs) karena harga per pcs jauh lebih murah dan daya tahannya legendaris.",
    category: "Teknis"
  },
  {
    question: "Format file apa yang terbaik untuk dikirimkan?",
    answer: "Format terbaik adalah PNG transparan dengan resolusi minimal 300 DPI agar hasil cetak tidak pecah/buram. Kami juga menerima file vektor seperti Adobe Illustrator (.AI), Photoshop (.PSD), CorelDraw (.CDR), atau PDF.",
    category: "Desain"
  },
  {
    question: "Berapa lama estimasi pengerjaan pesanan?",
    answer: "Untuk sablon DTF satuan berkisar 1 - 3 hari kerja. Untuk sablon manual kuantiti 12 - 50 pcs sekitar 4 - 7 hari kerja. Kuantiti di atas 100 pcs akan diinformasikan sesuai jadwal antrean workshop. Kami juga melayani layanan kilat (same day/next day) dengan syarat tertentu.",
    category: "Produksi"
  },
  {
    question: "Bagaimana jika hasil cetak salah atau cacat?",
    answer: "Kami memberikan Garansi 100% Cetak Ulang Gratis jika terdapat cacat produksi, sablon mengelupas saat unboxing, atau salah ukuran dari rincian order yang telah disetujui bersama.",
    category: "Garansi"
  },
  {
    question: "Apakah melayani pengiriman ke seluruh Indonesia?",
    answer: "Ya! Kami bekerjasama dengan ekspedisi reguler (JNE, J&T, SiCepat) dan kargo hemat (Indah Cargo, Baraka, Dakota) untuk pengiriman pesanan partai besar ke seluruh wilayah Nusantara.",
    category: "Pengiriman"
  }
];
