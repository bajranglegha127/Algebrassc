import React, { useRef, useState } from 'react';
import { Download, Upload, RotateCcw, Scissors, Eye, EyeOff } from 'lucide-react';
import { QuestionItem } from '../data';

interface CutQuestionImageProps {
  question: QuestionItem;
  showOptionsInCut: boolean;
  onToggleOptionsInCut: () => void;
  customCropUrl?: string;
  onSaveCustomCrop: (qId: number, dataUrl: string | undefined) => void;
}

export const CutQuestionImage: React.FC<CutQuestionImageProps> = ({
  question,
  showOptionsInCut,
  onToggleOptionsInCut,
  customCropUrl,
  onSaveCustomCrop,
}) => {
  const [isCropping, setIsCropping] = useState(false);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [cropRect, setCropRect] = useState({ x: 5, y: 10, w: 90, h: 45 }); // percentages
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Export the Cut Question Card to a downloadable high-DPI PNG image
  const handleDownloadCutPng = () => {
    const canvas = document.createElement('canvas');
    const scale = 2;
    const width = 920;
    const height = showOptionsInCut ? 360 : 270;
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(scale, scale);

    // Paper background
    ctx.fillStyle = '#FFFEFA';
    ctx.fillRect(0, 0, width, height);

    // Subtle border & crop marks
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Watermark mimicking the PDF sheet ("e1 / Maths by भूपेश सर")
    ctx.save();
    ctx.fillStyle = 'rgba(148, 163, 184, 0.13)';
    ctx.font = 'italic 700 54px Georgia, serif';
    ctx.fillText('e1   Maths by भूतेश सर', 220, height / 2 + 15);
    ctx.restore();

    // Header strip inside cut
    ctx.fillStyle = '#64748B';
    ctx.font = '500 12px "IBM Plex Mono", monospace';
    ctx.fillText(
      `ALGEBRA SHEET CUTOUT  ·  PAGE ${question.page} (COL ${question.col})  ·  ${question.examYearTag}`,
      28,
      36
    );

    // Question Number + English Statement
    ctx.fillStyle = '#0F172A';
    ctx.font = '700 19px "Plus Jakarta Sans", sans-serif';
    const enFull = `${question.id}. ${question.en}`;
    wrapText(ctx, enFull, 28, 72, width - 56, 28);

    // Hindi Statement
    ctx.fillStyle = '#1E293B';
    ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
    wrapText(ctx, question.hi, 28, 155, width - 56, 26);

    // Options row inside cut if enabled
    if (showOptionsInCut) {
      ctx.strokeStyle = '#E2E8F0';
      ctx.beginPath();
      ctx.moveTo(28, 235);
      ctx.lineTo(width - 28, 235);
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = '700 16px "IBM Plex Mono", monospace';
      const opts = [
        `a) ${question.options.A}`,
        `b) ${question.options.B}`,
        `c) ${question.options.C}`,
        `d) ${question.options.D}`,
      ];
      ctx.fillText(opts[0], 28, 272);
      ctx.fillText(opts[1], 460, 272);
      ctx.fillText(opts[2], 28, 314);
      ctx.fillText(opts[3], 460, 314);
    }

    const link = document.createElement('a');
    link.download = `Algebra_Q${question.id}_Cut.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSourceImage(reader.result);
        setIsCropping(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCrop = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    const sx = (cropRect.x / 100) * img.naturalWidth;
    const sy = (cropRect.y / 100) * img.naturalHeight;
    const sw = (cropRect.w / 100) * img.naturalWidth;
    const sh = (cropRect.h / 100) * img.naturalHeight;

    canvas.width = Math.max(1, sw);
    canvas.height = Math.max(1, sh);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    onSaveCustomCrop(question.id, canvas.toDataURL('image/png'));
    setIsCropping(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Top Cutout Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2 font-mono tabular-nums">
          <Scissors className="w-3.5 h-3.5 text-slate-700" />
          <span className="font-semibold text-slate-900">
            CUT QUESTION IMAGE #{question.id}
          </span>
          <span aria-hidden="true">·</span>
          <span>PDF Page {question.page}</span>
          <span aria-hidden="true">·</span>
          <span>Column {question.col}</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-700 font-medium">{question.topicTag}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleOptionsInCut}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            {showOptionsInCut ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide Options in Cut</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Show Options in Cut</span>
              </>
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Crop Page Image</span>
          </button>

          {customCropUrl && (
            <button
              type="button"
              onClick={() => onSaveCustomCrop(question.id, undefined)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 bg-white text-rose-700 hover:bg-rose-50 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Cut</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownloadCutPng}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 font-medium transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Cut PNG</span>
          </button>
        </div>
      </div>

      {/* Interactive Manual Image Cropper Modal/Area (if user uploads a page screenshot) */}
      {isCropping && sourceImage && (
        <div className="p-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <p className="text-xs text-slate-300">
              Adjust the crop sliders to cut Question #{question.id} from your uploaded page image:
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCropping(false)}
                className="px-3 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyCrop}
                className="px-3 py-1 text-xs font-semibold rounded bg-sky-600 hover:bg-sky-500"
              >
                Apply Cut Image
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 text-xs font-mono">
            <label className="flex flex-col gap-1">
              <span>Left (X: {cropRect.x}%)</span>
              <input
                type="range"
                min={0}
                max={90}
                value={cropRect.x}
                onChange={(e) => setCropRect({ ...cropRect, x: Number(e.target.value) })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>Top (Y: {cropRect.y}%)</span>
              <input
                type="range"
                min={0}
                max={90}
                value={cropRect.y}
                onChange={(e) => setCropRect({ ...cropRect, y: Number(e.target.value) })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>Width ({cropRect.w}%)</span>
              <input
                type="range"
                min={10}
                max={100 - cropRect.x}
                value={cropRect.w}
                onChange={(e) => setCropRect({ ...cropRect, w: Number(e.target.value) })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>Height ({cropRect.h}%)</span>
              <input
                type="range"
                min={5}
                max={100 - cropRect.y}
                value={cropRect.h}
                onChange={(e) => setCropRect({ ...cropRect, h: Number(e.target.value) })}
              />
            </label>
          </div>

          <div className="relative max-h-80 overflow-auto border border-slate-700 rounded bg-black">
            <img
              ref={imgRef}
              src={sourceImage}
              alt="Source Page for Cropping"
              referrerPolicy="no-referrer"
              className="w-full h-auto block select-none"
            />
            <div
              style={{
                left: `${cropRect.x}%`,
                top: `${cropRect.y}%`,
                width: `${cropRect.w}%`,
                height: `${cropRect.h}%`,
              }}
              className="absolute border-2 border-sky-400 bg-sky-400/15 pointer-events-none"
            />
          </div>
        </div>
      )}

      {/* Main Cut Question Image Viewport */}
      <div className="p-4 sm:p-6 bg-[#FAF8F5]">
        {customCropUrl ? (
          <div className="relative bg-white border-2 border-dashed border-slate-300 rounded-lg p-3 flex justify-center">
            <img
              src={customCropUrl}
              alt={`Question ${question.id} Cut Image`}
              referrerPolicy="no-referrer"
              className="max-h-72 w-auto object-contain rounded"
            />
          </div>
        ) : (
          /* Authentic High-DPI Exam Sheet Cutout Simulation */
          <div
            className="relative bg-[#FFFEFA] border border-slate-300 rounded-lg px-5 py-5 sm:px-7 sm:py-6 shadow-xs select-text overflow-hidden"
            aria-label={`Cut question image for Question ${question.id}`}
          >
            {/* Corner Crop Marks */}
            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-slate-400 pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-slate-400 pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-slate-400 pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-slate-400 pointer-events-none" />

            {/* Subtle Authentic Watermark from the PDF ("e1 Maths by भूतेश सर") */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 flex items-center justify-center opacity-[0.055]"
            >
              <div className="text-center font-serif italic font-bold text-3xl sm:text-5xl text-slate-900 tracking-wide">
                e1 · Maths by भूतेश सर
              </div>
            </div>

            {/* Question Content inside the Cut Snippet */}
            <div className="relative z-10 space-y-3.5">
              {/* English Question Statement */}
              <div className="flex items-baseline gap-2.5 text-slate-950">
                <span className="font-mono font-bold text-lg sm:text-xl tabular-nums shrink-0 text-slate-900">
                  {question.id}.
                </span>
                <p className="text-base sm:text-lg font-semibold leading-relaxed tracking-tight text-slate-900 font-sans">
                  {question.en}
                </p>
              </div>

              {/* Hindi Question Statement */}
              <div className="pl-6 sm:pl-8 border-l-2 border-slate-300/80">
                <p className="text-base sm:text-[17px] font-medium leading-relaxed text-slate-800">
                  {question.hi}
                </p>
              </div>

              {/* Cut Image Embedded Options (just like the original PDF cut) */}
              {showOptionsInCut && (
                <div className="pt-3 mt-2 border-t border-dashed border-slate-200 pl-6 sm:pl-8 grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 font-mono text-sm sm:text-[15px] font-semibold text-slate-900 tabular-nums">
                  <div>a) {question.options.A}</div>
                  <div>b) {question.options.B}</div>
                  <div>c) {question.options.C}</div>
                  <div>d) {question.options.D}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currY);
      line = words[n] + ' ';
      currY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currY);
}
