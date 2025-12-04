import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Wand2, RefreshCw, AlertCircle } from 'lucide-react';
import { simulateBodyProgress } from '../services/geminiService';

interface BodySimulatorProps {
  onBack: () => void;
}

const BodySimulator: React.FC<BodySimulatorProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'3_MONTHS' | '1_YEAR'>('3_MONTHS');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        setGeneratedImage(null); // Reset result
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const result = await simulateBodyProgress(selectedImage, timeframe);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError("Não foi possível gerar a imagem. Tente uma foto com iluminação melhor.");
      }
    } catch (err) {
      setError("Erro ao conectar com a IA. Verifique sua conexão ou tente outra foto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark pb-20">
      {/* Navbar */}
      <div className="sticky top-0 z-20 bg-dark/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="font-bold text-white text-lg flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-400" />
          Simulador de Shape
        </h2>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-sm text-slate-300">
          <p>📸 <strong>Como usar:</strong> Envie uma foto de corpo inteiro (preferencialmente em roupas de treino) e veja como a IA projeta seus resultados baseados na hipertrofia muscular.</p>
        </div>

        {/* Image Selection Area */}
        <div className="space-y-4">
          {!selectedImage ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-600 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <Upload className="w-10 h-10 text-slate-400 mb-3" />
              <p className="text-slate-300 font-medium">Toque para enviar foto</p>
              <p className="text-xs text-slate-500 mt-1">JPG ou PNG (Máx 5MB)</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                 {/* Before/After View */}
                 {generatedImage ? (
                    <div className="grid grid-cols-2 h-64">
                       <div className="relative h-full border-r border-slate-700">
                          <img src={selectedImage} alt="Antes" className="w-full h-full object-cover" />
                          <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-bold backdrop-blur-sm">HOJE</div>
                       </div>
                       <div className="relative h-full">
                          <img src={generatedImage} alt="Depois" className="w-full h-full object-cover" />
                          <div className="absolute bottom-2 right-2 bg-purple-600/80 px-2 py-1 rounded text-[10px] text-white font-bold backdrop-blur-sm">
                             {timeframe === '3_MONTHS' ? '+3 MESES' : '+1 ANO'}
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="h-64 relative">
                       <img src={selectedImage} alt="Original" className="w-full h-full object-cover" />
                       <button 
                         onClick={() => { setSelectedImage(null); setGeneratedImage(null); }}
                         className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/80 transition-colors"
                       >
                         <RefreshCw className="w-4 h-4" />
                       </button>
                    </div>
                 )}
              </div>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Controls */}
        {selectedImage && !generatedImage && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <label className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-3 block">Escolha a Meta</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTimeframe('3_MONTHS')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    timeframe === '3_MONTHS' 
                      ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/50' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-bold text-lg">3 Meses</span>
                  <span className="text-[10px] opacity-80">Evolução Realista</span>
                </button>
                <button
                  onClick={() => setTimeframe('1_YEAR')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    timeframe === '1_YEAR' 
                      ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/50' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-bold text-lg">1 Ano</span>
                  <span className="text-[10px] opacity-80">Transformação</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl font-bold text-white shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Gerando Shape...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Visualizar Futuro
                </>
              )}
            </button>
            
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg flex items-center gap-2 text-red-200 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>
        )}

        {/* Result Actions */}
        {generatedImage && (
           <div className="space-y-3">
              <button 
                onClick={() => setGeneratedImage(null)}
                className="w-full py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 font-medium hover:bg-slate-700 transition-colors"
              >
                Tentar Outra Simulação
              </button>
              <p className="text-center text-xs text-slate-500 italic">
                *Resultados gerados por IA. A evolução real depende de dieta, treino e genética.
              </p>
           </div>
        )}
      </div>
    </div>
  );
};

export default BodySimulator;