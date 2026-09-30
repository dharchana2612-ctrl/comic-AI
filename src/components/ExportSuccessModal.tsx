import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Download, Sparkles, CheckCircle2, FileText, ArrowRight, X } from 'lucide-react';

interface ExportSuccessModalProps {
  filename: string;
  pdfUrl: string;
  onClose: () => void;
  onCreateAnother: () => void;
}

export const ExportSuccessModal: React.FC<ExportSuccessModalProps> = ({
  filename,
  pdfUrl,
  onClose,
  onCreateAnother
}) => {
  useEffect(() => {
    // Trigger celebratory confetti burst on launch
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn('Confetti animation error:', e);
    }
  }, []);

  const handleDownloadAgain = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-900 border-4 border-gray-950 rounded-3xl p-6 sm:p-8 max-w-lg w-full comic-shadow-lg relative overflow-hidden text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Icon & Badge */}
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 comic-shadow rotate-3">
            <div className="w-full h-full bg-gray-950 rounded-[22px] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
          </div>
          <span className="absolute -bottom-2 -right-4 bg-yellow-400 text-gray-950 font-bangers text-xs px-2.5 py-0.5 rounded-md border border-gray-950 comic-shadow-sm rotate-6">
            SUCCESS!
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide mb-2">
          🎉 YOUR COMIC IS READY!
        </h2>
        <p className="text-sm font-comic text-purple-200 max-w-md mx-auto mb-6">
          Your AI-generated comic has been successfully exported as a PDF.
        </p>

        {/* File Details Card */}
        <div className="mb-6 p-4 rounded-2xl bg-gray-950 border-2 border-purple-900/60 text-left flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-900/60 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-pink-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bangers text-sm text-yellow-300 tracking-wide truncate">
              {filename}
            </p>
            <p className="text-[11px] font-comic text-gray-400">
              5-Panel Comic Book Document • Print & Mobile Ready
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadAgain}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 text-gray-950 font-bangers text-xl tracking-wider border-3 border-gray-950 comic-shadow hover:comic-shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-5 h-5 text-gray-950" />
            <span>⬇ DOWNLOAD PDF AGAIN</span>
          </button>

          <button
            onClick={onCreateAnother}
            className="w-full py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-white font-comic font-bold text-sm border-2 border-purple-700/60 comic-shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>✨ Create Another Comic</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Credit */}
        <div className="mt-6 pt-4 border-t border-purple-900/40">
          <p className="text-xs font-comic text-purple-300/80">
            Created with <span className="text-yellow-400 font-bold">ComicCraft AI</span>
          </p>
        </div>

      </div>
    </div>
  );
};
