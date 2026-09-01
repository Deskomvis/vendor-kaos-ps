export type SiteSettings = {
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroCta: string;
  whatsappNumber: string;
  whatsappLabel: string;
};

export const defaultSiteSettings: SiteSettings = {
  heroEyebrow: 'Gudang Planet · Produksi Apparel',
  heroTitle: 'Saatnya Punya',
  heroHighlight: 'Brand Sendiri.',
  heroDescription: 'Partner produksi terpercaya untuk clothing brand dan toko grosir. Wujudkan kaos berkualitas dengan harga yang ramah untuk modal usaha.',
  heroCta: 'Konsultasi Gratis',
  whatsappNumber: '6282113333354',
  whatsappLabel: 'Konsultasi via WhatsApp',
};

const STORAGE_KEY = 'gudang-planet-site-settings';

export function getSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return defaultSiteSettings;
  try { return { ...defaultSiteSettings, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { return defaultSiteSettings; }
}

export function saveSiteSettings(settings: SiteSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event('site-settings-updated'));
}

export function resetSiteSettings() { localStorage.removeItem(STORAGE_KEY); window.dispatchEvent(new Event('site-settings-updated')); }
