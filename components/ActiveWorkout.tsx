import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Play, Brain, Sparkles, Check } from 'lucide-react';
import { WorkoutRoutine, Exercise } from '../types';
import { getAiCoachAdvice } from '../services/geminiService';

interface ActiveWorkoutProps {
  workout: WorkoutRoutine;
  onBack: () => void;
  onFinish: () => void;
}

const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({ workout, onBack, onFinish }) => {
  const [checkedExercises, setCheckedExercises] = useState<Set<string>>(new Set());
  const [loadingAi, setLoadingAi] = useState<string | null>(null);
  const [aiAdvice, setAiAdvice] = useState<{ id: string; text: string } | null>(null);

  const toggleExercise = (id: string) => {
    const newChecked = new Set(checkedExercises);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedExercises(newChecked);
  };

  const handleOpenVideo = (name: string) => {
    const query = encodeURIComponent(`${name} execução correta`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const handleAskAi = async (id: string, name: string) => {
    setAiAdvice(null);
    setLoadingAi(id);
    try {
      const advice = await getAiCoachAdvice(name);
      setAiAdvice({ id, text: advice });
    } finally {
      setLoadingAi(null);
    }
  };

  const progress = Math.round((checkedExercises.size / workout.exercises.length) * 100);

  return (
    <div className="flex flex-col h-full min-h-screen bg-dark">
      {/* Navbar */}
      <div className="sticky top-0 z-20 bg-dark/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center mx-2">
          <h2 className="font-bold text-white text-sm md:text-base truncate">{workout.title}</h2>
          <p className="text-xs text-slate-400">{workout.subtitle}</p>
        </div>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Progress Bar */}
      <div className="sticky top-[69px] z-20 bg-dark px-4 pb-4 pt-2">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Progresso</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${workout.color}`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex-1 p-4 space-y-4 pb-32">
        {workout.exercises.map((exercise) => {
          const isChecked = checkedExercises.has(exercise.id);
          const isAdviceVisible = aiAdvice?.id === exercise.id;

          return (
            <div 
              key={exercise.id} 
              className={`relative bg-card rounded-2xl border transition-all duration-300 ${
                isChecked ? 'border-secondary/30 bg-secondary/5' : 'border-slate-700'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button 
                    onClick={() => toggleExercise(exercise.id)}
                    className="mt-1 flex-shrink-0 focus:outline-none"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-7 h-7 text-secondary fill-secondary/20" />
                    ) : (
                      <Circle className="w-7 h-7 text-slate-500 hover:text-slate-300" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg transition-colors ${isChecked ? 'text-secondary line-through opacity-70' : 'text-slate-100'}`}>
                      {exercise.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-xs border border-slate-700">
                        {exercise.sets} Séries
                      </span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-xs border border-slate-700">
                        {exercise.reps} Reps
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => handleOpenVideo(exercise.name)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 py-2 px-3 rounded-lg text-xs font-medium text-white transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        Ver Vídeo
                      </button>
                      <button 
                        onClick={() => handleAskAi(exercise.id, exercise.name)}
                        disabled={loadingAi === exercise.id}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-900/40 hover:bg-indigo-900/60 active:bg-indigo-900 border border-indigo-500/30 py-2 px-3 rounded-lg text-xs font-medium text-indigo-300 transition-colors"
                      >
                        {loadingAi === exercise.id ? (
                          <span className="animate-spin h-3.5 w-3.5 border-2 border-indigo-400 border-t-transparent rounded-full" />
                        ) : (
                          <Brain className="w-3.5 h-3.5" />
                        )}
                        Dica IA
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Advice Section */}
                {isAdviceVisible && (
                  <div className="mt-4 p-3 bg-indigo-950/50 border border-indigo-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span className="text-xs font-bold text-indigo-200">Coach Virtual</span>
                    </div>
                    <p className="text-sm text-indigo-100 leading-relaxed">
                      {aiAdvice.text}
                    </p>
                    <button 
                      onClick={() => setAiAdvice(null)}
                      className="mt-2 text-xs text-indigo-400 underline"
                    >
                      Fechar
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button for Finish */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark via-dark to-transparent z-30">
        <button
          onClick={onFinish}
          disabled={checkedExercises.size === 0}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
            checkedExercises.size === 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-secondary to-emerald-600 text-white hover:shadow-emerald-500/25'
          }`}
        >
          <Check className="w-6 h-6" />
          Finalizar Treino
        </button>
      </div>
    </div>
  );
};

export default ActiveWorkout;