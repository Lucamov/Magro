import React, { useState } from 'react';
import { Dumbbell, Trophy, Calendar as CalendarIcon, Flame, ChevronLeft, ChevronRight, Star, Medal, Wand2 } from 'lucide-react';
import { WORKOUT_DATA } from '../constants';
import { UserStats, WorkoutRoutine } from '../types';

interface DashboardProps {
  stats: UserStats;
  onSelectWorkout: (workout: WorkoutRoutine) => void;
  onOpenSimulator: () => void;
}

// Gamification Configuration
const RANKS = [
  { name: 'Iniciante', min: 0, color: 'text-slate-400', bg: 'bg-slate-500', icon: '🌱' },
  { name: 'Em Evolução', min: 10, color: 'text-emerald-400', bg: 'bg-emerald-500', icon: '🚀' },
  { name: 'Focado', min: 25, color: 'text-blue-400', bg: 'bg-blue-500', icon: '⚡' },
  { name: 'Marombeiro', min: 50, color: 'text-purple-400', bg: 'bg-purple-500', icon: '💪' },
  { name: 'Monstro', min: 100, color: 'text-red-400', bg: 'bg-red-500', icon: '🦍' },
  { name: 'Lenda', min: 200, color: 'text-yellow-400', bg: 'bg-yellow-500', icon: '👑' },
];

const Dashboard: React.FC<DashboardProps> = ({ stats, onSelectWorkout, onOpenSimulator }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // --- Rank Logic ---
  const currentRankIndex = RANKS.findIndex((rank, i) => {
    const nextRank = RANKS[i + 1];
    return stats.totalWorkouts >= rank.min && (!nextRank || stats.totalWorkouts < nextRank.min);
  });
  const currentRank = RANKS[currentRankIndex];
  const nextRank = RANKS[currentRankIndex + 1];
  
  const xpCurrent = stats.totalWorkouts;
  const xpStart = currentRank.min;
  const xpEnd = nextRank ? nextRank.min : xpStart + 100; // Cap if max level
  const progressPercent = Math.min(100, Math.max(0, ((xpCurrent - xpStart) / (xpEnd - xpStart)) * 100));

  // --- Calendar Logic ---
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    return { days, firstDay };
  };

  const { days: totalDays, firstDay } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isWorkoutDay = (day: number) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return stats.history.some(isoString => {
      const hDate = new Date(isoString);
      return hDate.getDate() === day && 
             hDate.getMonth() === currentDate.getMonth() && 
             hDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const workoutsThisMonth = stats.history.filter(isoString => {
    const hDate = new Date(isoString);
    return hDate.getMonth() === currentDate.getMonth() && 
           hDate.getFullYear() === currentDate.getFullYear();
  }).length;

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  return (
    <div className="space-y-6 pb-24">
      
      {/* 1. Gamification Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-card to-slate-900 border border-slate-700 rounded-3xl p-6 shadow-xl">
        {/* Background glow */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${currentRank.bg} opacity-10 blur-3xl rounded-full -mr-10 -mt-10`}></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Seu Nível Atual</p>
              <h1 className={`text-2xl font-black italic tracking-wide ${currentRank.color} flex items-center gap-2`}>
                <span className="text-3xl">{currentRank.icon}</span> {currentRank.name}
              </h1>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-md p-2 rounded-xl border border-slate-700 flex flex-col items-center min-w-[70px]">
              <span className="text-2xl font-bold text-white">{stats.streak}</span>
              <div className="flex items-center gap-1 text-[10px] text-orange-400 uppercase font-bold">
                <Flame className="w-3 h-3 fill-orange-400" /> Dias
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mb-2 flex justify-between text-xs font-medium text-slate-400">
            <span>XP: {xpCurrent}</span>
            {nextRank && <span>Próx: {nextRank.name} ({nextRank.min})</span>}
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
            <div 
              className={`h-full ${currentRank.bg} transition-all duration-1000 ease-out relative`}
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Simulator Widget (New) */}
      <button 
        onClick={onOpenSimulator}
        className="w-full relative overflow-hidden bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-3xl p-4 shadow-lg flex items-center gap-4 transition-transform active:scale-95 group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50"></div>
        <div className="bg-purple-500/20 p-3 rounded-2xl border border-purple-500/20">
          <Wand2 className="w-6 h-6 text-purple-300" />
        </div>
        <div className="text-left relative z-10">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            Simulador de Shape
            <span className="bg-purple-500 text-[10px] px-1.5 rounded text-white font-bold">IA</span>
          </h3>
          <p className="text-purple-200/70 text-xs">Visualize sua evolução de 3 a 12 meses.</p>
        </div>
        <ChevronRight className="w-5 h-5 text-purple-400 ml-auto group-hover:translate-x-1 transition-transform" />
      </button>

      {/* 3. Monthly Calendar Widget */}
      <section className="bg-card border border-slate-700/50 rounded-3xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-1 hover:bg-slate-700 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div className="text-center">
            <h2 className="text-white font-bold text-lg">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <p className="text-xs text-secondary font-medium">{workoutsThisMonth} treinos este mês</p>
          </div>
          <button onClick={nextMonth} className="p-1 hover:bg-slate-700 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => (
            <div key={day} className="text-center text-[10px] text-slate-500 font-bold py-1">
              {day}
            </div>
          ))}
          
          {/* Empty slots for start of month */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {Array.from({ length: totalDays }).map((_, i) => {
            const day = i + 1;
            const workedOut = isWorkoutDay(day);
            const isToday = 
              day === new Date().getDate() && 
              currentDate.getMonth() === new Date().getMonth() && 
              currentDate.getFullYear() === new Date().getFullYear();

            return (
              <div key={day} className="aspect-square flex items-center justify-center relative">
                {workedOut ? (
                  <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-secondary/20 scale-100 transition-transform">
                    {day}
                  </div>
                ) : (
                  <div className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-full ${isToday ? 'border-2 border-primary text-primary' : 'text-slate-500'}`}>
                    {day}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Workout Selection */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-4 px-2 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-indigo-400" />
          Menu de Treinos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORKOUT_DATA.map((workout) => (
            <button
              key={workout.id}
              onClick={() => onSelectWorkout(workout)}
              className="group relative overflow-hidden bg-card border border-slate-700 p-5 rounded-2xl text-left transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${workout.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center p-2 rounded-lg ${workout.color} bg-opacity-20 text-white mb-3`}>
                  <Dumbbell className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">{workout.title}</h3>
                <p className="text-slate-400 text-sm">{workout.subtitle}</p>
                <div className="mt-3 flex items-center text-xs text-slate-500 font-medium">
                  {workout.exercises.length} Exercícios
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;