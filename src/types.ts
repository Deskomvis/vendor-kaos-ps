export type TShirtColor = {
  id: string;
  name: string;
  hex: string;
  textColor: string; // 'dark' | 'light' for contrast
  highlightHex?: string;
  shadowHex?: string;
};

export type PrintSide = 'front' | 'back';

export type PrintSizePreset = {
  id: string;
  name: string;
  dimensions: string; // e.g. "A3 (29.7 x 42 cm)"
  maxScalePct: number;
  priceDtf: number;
  priceManual: number;
};

export type DesignLayer = {
  id: string;
  type: 'image' | 'text';
  content: string; // image dataURL or text string
  x: number; // percentage of printable area (0 to 100)
  y: number; // percentage of printable area (0 to 100)
  scale: number; // multiplier (e.g. 0.3 to 2.0)
  rotation: number; // in degrees (-180 to 180)
  color?: string; // for text
  fontFamily?: string;
  side: PrintSide;
};

export type SampleArtwork = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  svgData: string;
};

export type ServiceDetail = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  minOrder: string;
  priceRange: string;
  productionTime: string;
  features: string[];
  bestFor: string[];
  recommended: boolean;
};

export type OrderStep = {
  stepNumber: number;
  title: string;
  description: string;
  tip: string;
  iconName: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: 'all' | 'dtf' | 'manual' | 'oversize' | 'event';
  client: string;
  material: string;
  printType: string;
  image: string;
  description: string;
  quantity: string;
};

export type FAQItem = {
  question: string;
  answer: string;
  category?: string;
};
