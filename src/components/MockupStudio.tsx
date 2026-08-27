import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Upload, 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Move, 
  Maximize2, 
  Eye, 
  EyeOff, 
  Download, 
  MessageCircle, 
  Trash2, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  Sliders, 
  RefreshCw,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  TSHIRT_COLORS, 
  PRINT_SIZE_PRESETS, 
  WHATSAPP_CONFIG 
} from '../data/content';
import { PrintSide, DesignLayer } from '../types';

// Default initial sample logo for instant visualization
const INITIAL_DEMO_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23d97706" />
      <stop offset="100%" stop-color="%23b45309" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="none"/>
  <circle cx="200" cy="200" r="160" stroke="url(%23grad)" stroke-width="8" stroke-dasharray="16,8" fill="none"/>
  <text x="200" y="150" font-family="sans-serif" font-weight="900" font-size="30" fill="%23d97706" text-anchor="middle" letter-spacing="4">PLANET STORE</text>
  <text x="200" y="210" font-family="sans-serif" font-weight="800" font-size="46" fill="%231e293b" text-anchor="middle" letter-spacing="6">STUDIO</text>
  <text x="200" y="255" font-family="sans-serif" font-weight="700" font-size="18" fill="%2364748b" text-anchor="middle" letter-spacing="6">CUSTOM APPAREL</text>
  <polygon points="190,275 210,275 200,290" fill="%23d97706"/>
</svg>`;

type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se';

const FABRIC_SWATCH_IMAGES = [
  '/assets/imgi_36_bahan4.jpg', '/assets/imgi_35_bahan3.jpg', '/assets/imgi_28_bahan13.jpg',
  '/assets/imgi_33_bahan%201.jpg', '/assets/imgi_30_bahan15.jpg', '/assets/imgi_27_bahan12.jpg',
  '/assets/imgi_29_bahan14.jpg', '/assets/imgi_34_bahan2.jpg', '/assets/imgi_39_bahan7.jpg',
  '/assets/imgi_28_bahan13.jpg'
];

export default function MockupStudio() {
  const [selectedColor, setSelectedColor] = useState(TSHIRT_COLORS[0]);
  const [side, setSide] = useState<PrintSide>('front');
  const [selectedSizePreset, setSelectedSizePreset] = useState(PRINT_SIZE_PRESETS[1]); // A4 default
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [quantity, setQuantity] = useState(12);
  const [selectedTech, setSelectedTech] = useState<'dtf' | 'manual'>('dtf');

  // Layers for front & back
  const [layers, setLayers] = useState<DesignLayer[]>([
    {
      id: 'default-layer-front',
      type: 'image',
      content: INITIAL_DEMO_LOGO,
      x: 50,
      y: 45,
      scale: 0.85,
      rotation: 0,
      side: 'front'
    }
  ]);

  const [activeLayerId, setActiveLayerId] = useState<string | null>('default-layer-front');
  
  // Drag & Move state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Resize via corner handles state
  const [isResizing, setIsResizing] = useState(false);
  const [resizeState, setResizeState] = useState<{
    handle: ResizeHandle;
    initialScale: number;
    centerX: number;
    centerY: number;
    initialDistance: number;
  } | null>(null);

  const [isExporting, setIsExporting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active layer object
  const currentSideLayers = layers.filter(l => l.side === side);
  const activeLayer = layers.find(l => l.id === activeLayerId && l.side === side) || currentSideLayers[0] || null;

  // Sync active layer when side changes
  useEffect(() => {
    const sideLayers = layers.filter(l => l.side === side);
    if (sideLayers.length > 0) {
      if (!sideLayers.some(l => l.id === activeLayerId)) {
        setActiveLayerId(sideLayers[0].id);
      }
    } else {
      setActiveLayerId(null);
    }
  }, [side, layers, activeLayerId]);

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | DragEvent) => {
    let file: File | null = null;
    if ('dataTransfer' in e && e.dataTransfer?.files) {
      file = e.dataTransfer.files[0];
    } else if ('target' in e && e.target && 'files' in e.target && e.target.files) {
      file = e.target.files[0];
    }

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon upload file gambar yang valid (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newLayer: DesignLayer = {
        id: 'layer-' + Date.now(),
        type: 'image',
        content: dataUrl,
        x: 50,
        y: 45,
        scale: 0.85,
        rotation: 0,
        side: side
      };
      setLayers(prev => [...prev, newLayer]);
      setActiveLayerId(newLayer.id);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Update specific active layer attribute
  const updateActiveLayer = useCallback((updates: Partial<DesignLayer>) => {
    if (!activeLayer) return;
    setLayers(prev => prev.map(l => l.id === activeLayer.id ? { ...l, ...updates } : l));
  }, [activeLayer]);

  // Remove Layer
  const removeLayer = (id: string) => {
    setLayers(prev => prev.filter(l => l.id !== id));
    if (activeLayerId === id) {
      const remaining = layers.filter(l => l.id !== id && l.side === side);
      setActiveLayerId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Remove all layers on current side
  const removeAllCurrentSideLayers = () => {
    setLayers(prev => prev.filter(l => l.side !== side));
    setActiveLayerId(null);
  };

  // 1. Pointer Drag Move (Pan Position)
  const handleLayerPointerDown = (e: React.PointerEvent, layerId: string) => {
    // If clicking a resize handle or delete button, do not start layer dragging
    if ((e.target as HTMLElement).closest('.resize-handle') || (e.target as HTMLElement).closest('.delete-btn')) {
      return;
    }
    e.stopPropagation();
    setActiveLayerId(layerId);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // 2. Corner Resize Handle Down (Corner Scaling)
  const handleResizePointerDown = (e: React.PointerEvent, handle: ResizeHandle) => {
    e.stopPropagation();
    if (!activeLayer) return;

    // Get layer element center in viewport screen pixels
    const layerElement = document.getElementById(`layer-element-${activeLayer.id}`);
    if (!layerElement) return;

    const rect = layerElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const initialDistance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    setIsResizing(true);
    setResizeState({
      handle,
      initialScale: activeLayer.scale,
      centerX,
      centerY,
      initialDistance: Math.max(10, initialDistance)
    });

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  // 3. Pointer Move Handler (Handles both move dragging & corner resizing)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeLayer) return;

    // A. Corner Resizing Mode
    if (isResizing && resizeState) {
      e.preventDefault();
      const currentDist = Math.hypot(e.clientX - resizeState.centerX, e.clientY - resizeState.centerY);
      const ratio = currentDist / resizeState.initialDistance;
      const rawScale = resizeState.initialScale * ratio;
      const clampedScale = Math.max(0.15, Math.min(2.5, Number(rawScale.toFixed(2))));
      updateActiveLayer({ scale: clampedScale });
      return;
    }

    // B. Position Dragging Mode
    if (isDragging && printAreaRef.current) {
      e.preventDefault();
      const rect = printAreaRef.current.getBoundingClientRect();
      const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
      const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

      const newX = Math.max(5, Math.min(95, activeLayer.x + deltaX));
      const newY = Math.max(5, Math.min(95, activeLayer.y + deltaY));

      updateActiveLayer({ x: newX, y: newY });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // 4. Pointer Up End
  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe catch
      }
    }
    if (isResizing) {
      setIsResizing(false);
      setResizeState(null);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe catch
      }
    }
  };

  // Unit Price Calculation
  const unitPrice = selectedTech === 'dtf' 
    ? selectedSizePreset.priceDtf - (quantity >= 12 ? 8000 : quantity >= 6 ? 4000 : 0)
    : selectedSizePreset.priceManual - (quantity >= 50 ? 6000 : quantity >= 24 ? 3000 : 0);
  
  const totalPrice = unitPrice * quantity;

  // WhatsApp Order Handler
  const handleWhatsAppOrder = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const sideText = side === 'front' ? 'Depan (Front Side)' : 'Belakang (Back Side)';
    const techText = selectedTech === 'dtf' ? 'DTF (Satuan / Full Color)' : 'Sablon Manual (Plastisol/Rubber)';
    const textMsg = `Halo Planet Store, saya tertarik memesan kaos custom dengan spesifikasi:\n\n` +
      `👕 *Spesifikasi Mockup:*\n` +
      `- Warna Kaos: ${selectedColor.name}\n` +
      `- Posisi Desain: ${sideText}\n` +
      `- Ukuran Sablon: ${selectedSizePreset.name} (${selectedSizePreset.dimensions})\n` +
      `- Teknik Cetak: ${techText}\n` +
      `- Jumlah Estimasi: ${quantity} pcs\n` +
      `- Estimasi Total: Rp ${totalPrice.toLocaleString('id-ID')}\n\n` +
      `File desain siap saya lampirkan. Mohon info validasi layout dan estimasi waktu produksi. Terima kasih!`;

    const url = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(textMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Export Mockup Image using Canvas
  const handleDownloadMockup = async () => {
    setIsExporting(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1200;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Draw neutral studio background
      ctx.fillStyle = '#f3f2ee';
      ctx.fillRect(0, 0, 1200, 1200);

      // Draw Shirt base SVG to canvas
      const svgString = getShirtSvgString(selectedColor.hex, side);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const blobURL = URL.createObjectURL(svgBlob);

      const shirtImg = new Image();
      shirtImg.crossOrigin = 'anonymous';

      await new Promise((resolve) => {
        shirtImg.onload = () => {
          ctx.drawImage(shirtImg, 100, 60, 1000, 1080);
          resolve(true);
        };
        shirtImg.src = blobURL;
      });

      // Draw each layer on current side
      for (const layer of currentSideLayers) {
        ctx.save();
        // Area bounds in canvas coords corresponding to printable zone
        const areaX = 350;
        const areaY = 280;
        const areaW = 500;
        const areaH = 650;

        const posX = areaX + (layer.x / 100) * areaW;
        const posY = areaY + (layer.y / 100) * areaH;

        ctx.translate(posX, posY);
        ctx.rotate((layer.rotation * Math.PI) / 180);

        if (layer.type === 'image') {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          await new Promise((resolve) => {
            img.onload = () => {
              const baseW = 320 * layer.scale;
              const ratio = img.height / img.width;
              const baseH = baseW * ratio;
              ctx.drawImage(img, -baseW / 2, -baseH / 2, baseW, baseH);
              resolve(true);
            };
            img.src = layer.content;
          });
        }

        ctx.restore();
      }

      // Add clean branding watermark
      ctx.fillStyle = '#64748b';
      ctx.font = '600 20px sans-serif';
      ctx.fillText('Planet Store Mockup Studio', 600, 1160);

      // Download
      const link = document.createElement('a');
      link.download = `Mockup-Kaos-${selectedColor.id}-${side}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export error:', err);
      alert('Gagal mendownload mockup. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="mockup-studio" className="py-16 md:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3 border border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>Interactive Mockup Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3 font-['Space_Grotesk']">
            Visualisasi Desain Kaos Real-Time
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Upload file desain Anda, seret pojok gambar untuk memperbesar/memperkecil, 
            sesuaikan posisi dan warna kaos, serta dapatkan estimasi harga instan.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            
            {/* 1. Upload Desain Card (Simple & Clean) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-slate-700" aria-hidden="true" />
                  1. Upload File Desain
                </h3>
                <span className="text-xs font-medium text-slate-500">PNG / JPG / SVG / WebP</span>
              </div>

              {/* Upload Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e as unknown as DragEvent);
                }}
                className="border-2 border-dashed border-slate-300 hover:border-slate-800 bg-[#fbfbfa] hover:bg-slate-50 p-6 rounded-xl text-center cursor-pointer transition-colors group"
                role="button"
                tabIndex={0}
                aria-label="Upload file gambar desain kaos"
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/png,image/jpeg,image/svg+xml,image/webp" 
                  className="hidden" 
                />
                <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-slate-200 text-slate-700 group-hover:text-slate-950 flex items-center justify-center transition-colors mb-3 shadow-xs">
                  <ImageIcon className="w-6 h-6" aria-hidden="true" />
                </div>
                <p className="text-sm font-bold text-slate-900 mb-1">
                  Pilih Gambar atau Tarik File ke Sini
                </p>
                <p className="text-xs text-slate-500">
                  Mendukung PNG transparan, JPG, SVG, dan WebP (Maks. 25MB)
                </p>
              </div>

              {/* Quick action buttons if image exists */}
              {activeLayer && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-600" />
                    Ganti / Tambah Gambar
                  </button>
                  <button
                    onClick={() => removeLayer(activeLayer.id)}
                    className="py-2.5 px-3.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    title="Hapus gambar yang sedang aktif"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
              )}
            </div>

            {/* 2. Scale & Position Controls */}
            {activeLayer ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-slate-700" aria-hidden="true" />
                    2. Kontrol Ukuran &amp; Posisi
                  </h3>
                  <button 
                    onClick={() => removeLayer(activeLayer.id)}
                    className="text-xs font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                    aria-label="Hapus gambar desain aktif"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" /> Hapus Gambar
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                  <Move className="w-4 h-4 shrink-0 mt-0.5 text-slate-700" aria-hidden="true" />
                  <span>
                    <strong>Tips Interaktif:</strong> Seret sudut/pojok kotak gambar pada kaos untuk memperbesar/memperkecil secara langsung.
                  </span>
                </div>

                {/* Scale / Ukuran Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-800">
                    <span className="font-bold flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" /> Skala Ukuran Gambar:
                    </span>
                    <span className="font-bold font-mono px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900">
                      {Math.round(activeLayer.scale * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button 
                      onClick={() => updateActiveLayer({ scale: Math.max(0.15, Number((activeLayer.scale - 0.08).toFixed(2))) })}
                      className="w-9 h-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center transition-colors shadow-xs shrink-0"
                      aria-label="Perkecil ukuran desain"
                      title="Perkecil"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <input 
                      type="range" 
                      min="0.15" 
                      max="2.5" 
                      step="0.02"
                      aria-label="Slider ukuran skala gambar"
                      value={activeLayer.scale}
                      onChange={(e) => updateActiveLayer({ scale: parseFloat(e.target.value) })}
                      className="flex-1 accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <button 
                      onClick={() => updateActiveLayer({ scale: Math.min(2.5, Number((activeLayer.scale + 0.08).toFixed(2))) })}
                      className="w-9 h-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center transition-colors shadow-xs shrink-0"
                      aria-label="Perbesar ukuran desain"
                      title="Perbesar"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Preset Scale Quick Buttons */}
                  <div className="flex items-center justify-between gap-1.5 pt-1">
                    {[
                      { label: '50%', val: 0.5 },
                      { label: '75%', val: 0.75 },
                      { label: '100%', val: 1.0 },
                      { label: '125%', val: 1.25 },
                      { label: '150%', val: 1.5 }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => updateActiveLayer({ scale: preset.val })}
                        className={`flex-1 py-1 rounded-md text-[11px] font-semibold transition-colors border ${
                          Math.abs(activeLayer.scale - preset.val) < 0.05
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rotation Slider */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs text-slate-800">
                    <span className="font-bold flex items-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" /> Derajat Rotasi:
                    </span>
                    <span className="font-bold font-mono px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900">
                      {Math.round(activeLayer.rotation)}°
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button 
                      onClick={() => updateActiveLayer({ rotation: (activeLayer.rotation - 45 + 360) % 360 })}
                      className="w-9 h-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center transition-colors shadow-xs shrink-0"
                      aria-label="Putar kiri 45 derajat"
                      title="Putar -45°"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <input 
                      type="range" 
                      min="-180" 
                      max="180" 
                      step="5"
                      aria-label="Slider rotasi desain"
                      value={activeLayer.rotation}
                      onChange={(e) => updateActiveLayer({ rotation: parseInt(e.target.value) })}
                      className="flex-1 accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <button 
                      onClick={() => updateActiveLayer({ rotation: (activeLayer.rotation + 45) % 360 })}
                      className="w-9 h-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center transition-colors shadow-xs shrink-0"
                      aria-label="Putar kanan 45 derajat"
                      title="Putar +45°"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick alignment tools */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={() => updateActiveLayer({ x: 50 })}
                    className="py-2 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors"
                  >
                    Rata Tengah
                  </button>
                  <button
                    onClick={() => updateActiveLayer({ y: 38 })}
                    className="py-2 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors"
                  >
                    Dada Atas
                  </button>
                  <button
                    onClick={() => updateActiveLayer({ x: 50, y: 45, rotation: 0, scale: 0.85 })}
                    className="py-2 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-6 text-center shadow-xs">
                <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-800 mb-1">Belum Ada Desain di Sisi {side === 'front' ? 'Depan' : 'Belakang'}</h4>
                <p className="text-xs text-slate-500 mb-3">Upload gambar di atas untuk memvisualisasikan sablon.</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Upload Gambar Sekarang
                </button>
              </div>
            )}

            {/* 3. Color & Print Preset Selection */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                3. Pilihan Warna Kaos &amp; Area Cetak
              </h3>

              {/* Color Swatches */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2.5">
                  Warna Kaos: <span className="text-slate-900 font-bold">{selectedColor.name}</span>
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {TSHIRT_COLORS.map((c, colorIndex) => {
                    const isSelected = selectedColor.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c)}
                        title={`Pilih warna ${c.name}`}
                        aria-label={`Warna kaos ${c.name}`}
                        className={`relative h-14 overflow-hidden rounded-xl border transition-all flex items-center justify-center shadow-xs ${
                          isSelected 
                            ? 'ring-2 ring-slate-900 ring-offset-2 scale-105 border-slate-900' 
                            : 'border-slate-300 hover:scale-102'
                        }`}
                        style={{ backgroundColor: c.hex, backgroundImage: `url("${FABRIC_SWATCH_IMAGES[colorIndex]}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                      >
                        <span className="absolute inset-0 bg-black/10" aria-hidden="true" />
                        {isSelected && (
                          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-900 shadow"><Check className="h-4 w-4" /></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Print Size Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  Ukuran Area Sablon:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRINT_SIZE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedSizePreset(preset)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedSizePreset.id === preset.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="font-bold text-xs">{preset.name}</div>
                      <div className={`text-[11px] font-mono mt-0.5 ${selectedSizePreset.id === preset.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {preset.dimensions}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Guide Lines */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-600">Tampilkan Garis Batas Sablon</span>
                <button
                  onClick={() => setShowGuidelines(!showGuidelines)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
                    showGuidelines 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                  aria-pressed={showGuidelines}
                >
                  {showGuidelines ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {showGuidelines ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
            </div>

          </div>

          {/* Right Stage Canvas Card (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            
            {/* Main Stage Frame Container matching user's exact mockup reference */}
            <div className="bg-[#f2f2ee] border border-slate-300/80 rounded-3xl p-6 sm:p-10 shadow-sm relative">
              
              {/* Header Info & Download button */}
              <div className="flex items-center justify-between pb-3 mb-2 relative z-10">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-300/60 shadow-2xs">
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  <span>Area: {selectedSizePreset.dimensions}</span>
                </div>

                <button
                  onClick={handleDownloadMockup}
                  disabled={isExporting}
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-700" />
                  {isExporting ? 'Memproses...' : 'Unduh Mockup'}
                </button>
              </div>

              {/* Technical Flat T-Shirt Canvas Frame */}
              <div 
                ref={containerRef}
                className="relative w-full aspect-square max-w-[560px] mx-auto flex items-center justify-center select-none overflow-visible touch-none"
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
              >
                
                {/* Clean Flat Line-Art Technical Sketch T-Shirt SVG (Matching User's Reference) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <TechnicalTShirtSvg color={selectedColor.hex} side={side} />
                </div>

                {/* Dashed Rectangular Printable Area Box (Matching exact screenshot position) */}
                <div 
                  ref={printAreaRef}
                  className={`absolute w-[46%] h-[56%] top-[24%] left-[27%] transition-all ${
                    showGuidelines 
                      ? 'border-[1.5px] border-dashed border-black/80' 
                      : 'border-transparent'
                  }`}
                >
                  {/* Render Layers on Current Side */}
                  {currentSideLayers.map((layer) => {
                    const isSelected = activeLayer?.id === layer.id;
                    return (
                      <div
                        key={layer.id}
                        id={`layer-element-${layer.id}`}
                        onPointerDown={(e) => handleLayerPointerDown(e, layer.id)}
                        className={`absolute cursor-move touch-none select-none ${
                          isSelected 
                            ? 'ring-[1.5px] ring-blue-600 ring-offset-1 rounded-xs' 
                            : 'hover:ring-1 hover:ring-slate-400'
                        }`}
                        style={{
                          left: `${layer.x}%`,
                          top: `${layer.y}%`,
                          width: '180px',
                          transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) scale(${layer.scale})`,
                          transformOrigin: 'center center',
                        }}
                      >
                        <img 
                          src={layer.content} 
                          alt="Desain Kaos" 
                          className="w-full h-auto object-contain pointer-events-none drop-shadow-sm select-none"
                          draggable={false}
                        />

                        {/* Interactive Editor Controls: Corner Handles & Delete Button */}
                        {isSelected && (
                          <>
                            {/* Top-Right Delete Button Floating Badge */}
                            <button
                              onPointerDown={(e) => {
                                e.stopPropagation();
                                removeLayer(layer.id);
                              }}
                              className="delete-btn absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg border-2 border-white cursor-pointer transition-transform hover:scale-110 active:scale-95 z-30"
                              title="Hapus gambar ini"
                              aria-label="Hapus gambar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Corner Resize Handle: Top-Left (NW) */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, 'nw')}
                              className="resize-handle absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-xs shadow-md cursor-nwse-resize hover:scale-125 transition-transform z-20"
                              title="Tarik untuk zoom / perkecil"
                            />

                            {/* Corner Resize Handle: Top-Right (NE) */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, 'ne')}
                              className="resize-handle absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-xs shadow-md cursor-nesw-resize hover:scale-125 transition-transform z-20"
                              title="Tarik untuk zoom / perkecil"
                            />

                            {/* Corner Resize Handle: Bottom-Left (SW) */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, 'sw')}
                              className="resize-handle absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-xs shadow-md cursor-nesw-resize hover:scale-125 transition-transform z-20"
                              title="Tarik untuk zoom / perkecil"
                            />

                            {/* Corner Resize Handle: Bottom-Right (SE) */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, 'se')}
                              className="resize-handle absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-xs shadow-md cursor-nwse-resize hover:scale-125 transition-transform z-20"
                              title="Tarik untuk zoom / perkecil"
                            />
                          </>
                        )}
                      </div>
                    );
                  })}

                  {/* Empty state prompt on current side */}
                  {currentSideLayers.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-slate-400 bg-white/40 rounded-xl">
                      <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                      <p className="text-xs font-bold text-slate-700">Belum ada gambar di sisi {side === 'front' ? 'depan' : 'belakang'}.</p>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-xs transition-colors"
                      >
                        + Upload Gambar
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Exact Floating Switcher: [Front side] [Back side] below T-Shirt */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-2">
                <div className="inline-flex p-1 rounded-full bg-white/90 shadow-xs border border-slate-300/80">
                  <button
                    onClick={() => setSide('front')}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                      side === 'front'
                        ? 'bg-[#4d4e3d] text-white shadow-xs'
                        : 'bg-transparent text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    Front side
                  </button>
                  <button
                    onClick={() => setSide('back')}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                      side === 'back'
                        ? 'bg-[#4d4e3d] text-white shadow-xs'
                        : 'bg-transparent text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    Back side
                  </button>
                </div>
              </div>

              {/* Bottom Quick Bar: Instant Quote & WhatsApp Direct Order */}
              <div className="mt-8 p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
                
                {/* Tech & Qty Controls */}
                <div className="space-y-3 w-full md:w-auto">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold text-slate-700">Metode Sablon:</span>
                    <div className="inline-flex p-0.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
                      <button 
                        onClick={() => setSelectedTech('dtf')}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          selectedTech === 'dtf' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        DTF Satuan
                      </button>
                      <button 
                        onClick={() => setSelectedTech('manual')}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          selectedTech === 'manual' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Manual Silkscreen
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold text-slate-700">Jumlah Kaos:</span>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-sm font-bold flex items-center justify-center shadow-xs"
                        aria-label="Kurangi jumlah"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        max="5000"
                        aria-label="Jumlah kaos"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center py-1 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-900"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-sm font-bold flex items-center justify-center shadow-xs"
                        aria-label="Tambah jumlah"
                      >
                        +
                      </button>
                      <span className="text-xs text-slate-500 font-medium ml-1">pcs</span>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-center md:text-right w-full md:w-auto">
                  <div className="text-xs font-medium text-slate-500">Estimasi Total Biaya:</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-amber-700 font-semibold mt-0.5">
                    (Rp {unitPrice.toLocaleString('id-ID')} / pcs + Kaos Combed 30s)
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full md:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Pesan Mockup via WA</span>
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// Technical Flat Line-Art Vector matching the user's screenshot exactly
function TechnicalTShirtSvg({ color, side }: { color: string; side: PrintSide }) {
  const isDarkColor = color.toLowerCase() === '#141414' || color.toLowerCase() === '#1e293b' || color.toLowerCase() === '#22382b';
  const stitchColor = isDarkColor ? '#ffffff' : '#000000';
  const stitchOpacity = isDarkColor ? 0.35 : 0.35;

  return (
    <svg 
      viewBox="0 0 600 650" 
      className="w-full h-full max-h-[580px] transition-colors duration-200 select-none pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Main T-Shirt Body Outline & Fill */}
      <path 
        d="M 235 48
           C 255 42, 345 42, 365 48
           L 470 95
           L 570 145
           L 530 270
           L 468 226
           L 476 580
           L 124 580
           L 132 226
           L 70 270
           L 30 145
           L 130 95
           Z"
        fill={color}
        stroke="#111111"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 2. Shoulder Seams */}
      <line x1="235" y1="48" x2="130" y2="95" stroke="#111111" strokeWidth="2" />
      <line x1="235" y1="52" x2="132" y2="99" stroke={stitchColor} strokeWidth="1" strokeOpacity={stitchOpacity} strokeDasharray="3,2" />

      <line x1="365" y1="48" x2="470" y2="95" stroke="#111111" strokeWidth="2" />
      <line x1="365" y1="52" x2="468" y2="99" stroke={stitchColor} strokeWidth="1" strokeOpacity={stitchOpacity} strokeDasharray="3,2" />

      {/* 3. Armhole Sleeve Seams (Curved) */}
      <path 
        d="M 130 95 C 150 140, 150 190, 132 226" 
        fill="none" 
        stroke="#111111" 
        strokeWidth="2" 
      />
      <path 
        d="M 470 95 C 450 140, 450 190, 468 226" 
        fill="none" 
        stroke="#111111" 
        strokeWidth="2" 
      />

      {/* 4. Left Sleeve Hem Stitches */}
      <line x1="38" y1="152" x2="78" y2="265" stroke={stitchColor} strokeWidth="1.2" strokeOpacity={stitchOpacity} strokeDasharray="3,2" />
      <line x1="42" y1="154" x2="82" y2="263" stroke={stitchColor} strokeWidth="1.2" strokeOpacity={stitchOpacity} strokeDasharray="3,2" />

      {/* 5. Right Sleeve Hem Stitches */}
      <line x1="562" y1="152" x2="522" y2="265" stroke={stitchColor} strokeWidth="1.2" strokeOpacity={stitchOpacity} strokeDasharray="3,2" />
      <line x1="558" y1="154" x2="518" y2="263" stroke={stitchColor} strokeWidth="1.2" strokeOpacity={stitchOpacity} strokeDasharray="3,2" />

      {/* 6. Bottom Hem Double-Needle Stitches */}
      <line x1="126" y1="566" x2="474" y2="566" stroke={stitchColor} strokeWidth="1.2" strokeOpacity={stitchOpacity} strokeDasharray="3,2" />
      <line x1="126" y1="570" x2="474" y2="570" stroke={stitchColor} strokeWidth="1.2" strokeOpacity={stitchOpacity} strokeDasharray="3,2" />

      {/* 7. Collar Details: Front Side Scoop vs Back Side Higher Curve */}
      {side === 'front' ? (
        <g id="technicalFrontCollar">
          {/* Inner back neck drop (grey shading matching screenshot) */}
          <path 
            d="M 235 48 C 265 85, 335 85, 365 48 C 345 110, 255 110, 235 48 Z"
            fill="#b5b5b5"
            stroke="#111111"
            strokeWidth="1.5"
          />
          {/* Inner back neck tape arc */}
          <path 
            d="M 245 54 C 275 75, 325 75, 355 54"
            fill="none"
            stroke="#111111"
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeDasharray="3,2"
          />
          
          {/* Front Collar Rib Band */}
          <path 
            d="M 235 48 C 255 112, 345 112, 365 48 C 352 126, 248 126, 235 48 Z"
            fill={color}
            stroke="#111111"
            strokeWidth="2.2"
          />

          {/* Front Collar Topstitch Line */}
          <path 
            d="M 235 48 C 255 120, 345 120, 365 48"
            fill="none"
            stroke={stitchColor}
            strokeWidth="1"
            strokeOpacity={stitchOpacity}
            strokeDasharray="3,2"
          />
          <path 
            d="M 238 52 C 256 123, 344 123, 362 52"
            fill="none"
            stroke={stitchColor}
            strokeWidth="1"
            strokeOpacity={stitchOpacity}
            strokeDasharray="3,2"
          />
        </g>
      ) : (
        <g id="technicalBackCollar">
          {/* Back Collar Band (Higher arc) */}
          <path 
            d="M 235 48 C 270 70, 330 70, 365 48 C 345 56, 255 56, 235 48 Z"
            fill={color}
            stroke="#111111"
            strokeWidth="2.2"
          />
          {/* Back Collar Topstitch Lines */}
          <path 
            d="M 235 48 C 270 70, 330 70, 365 48"
            fill="none"
            stroke={stitchColor}
            strokeWidth="1"
            strokeOpacity={stitchOpacity}
            strokeDasharray="3,2"
          />
          <path 
            d="M 236 53 C 270 74, 330 74, 364 53"
            fill="none"
            stroke={stitchColor}
            strokeWidth="1"
            strokeOpacity={stitchOpacity}
            strokeDasharray="3,2"
          />
        </g>
      )}
    </svg>
  );
}

// Generate raw SVG string for canvas export
function getShirtSvgString(color: string, side: PrintSide): string {
  const isDarkColor = color.toLowerCase() === '#141414' || color.toLowerCase() === '#1e293b' || color.toLowerCase() === '#22382b';
  const stitchColor = isDarkColor ? '#ffffff' : '#000000';
  const stitchOpacity = isDarkColor ? 0.35 : 0.35;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 650" width="1000" height="1000">
    <path d="M 235 48 C 255 42, 345 42, 365 48 L 470 95 L 570 145 L 530 270 L 468 226 L 476 580 L 124 580 L 132 226 L 70 270 L 30 145 L 130 95 Z" fill="${color}" stroke="#111111" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" />
    <line x1="235" y1="48" x2="130" y2="95" stroke="#111111" stroke-width="2" />
    <line x1="365" y1="48" x2="470" y2="95" stroke="#111111" stroke-width="2" />
    <path d="M 130 95 C 150 140, 150 190, 132 226" fill="none" stroke="#111111" stroke-width="2" />
    <path d="M 470 95 C 450 140, 450 190, 468 226" fill="none" stroke="#111111" stroke-width="2" />
    <line x1="38" y1="152" x2="78" y2="265" stroke="${stitchColor}" stroke-width="1.2" stroke-opacity="${stitchOpacity}" stroke-dasharray="3,2" />
    <line x1="562" y1="152" x2="522" y2="265" stroke="${stitchColor}" stroke-width="1.2" stroke-opacity="${stitchOpacity}" stroke-dasharray="3,2" />
    <line x1="126" y1="566" x2="474" y2="566" stroke="${stitchColor}" stroke-width="1.2" stroke-opacity="${stitchOpacity}" stroke-dasharray="3,2" />
    ${side === 'front' ? `
      <path d="M 235 48 C 265 85, 335 85, 365 48 C 345 110, 255 110, 235 48 Z" fill="#b5b5b5" stroke="#111111" stroke-width="1.5" />
      <path d="M 235 48 C 255 112, 345 112, 365 48 C 352 126, 248 126, 235 48 Z" fill="${color}" stroke="#111111" stroke-width="2.2" />
    ` : `
      <path d="M 235 48 C 270 70, 330 70, 365 48 C 345 56, 255 56, 235 48 Z" fill="${color}" stroke="#111111" stroke-width="2.2" />
    `}
  </svg>`;
}
