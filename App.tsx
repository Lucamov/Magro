import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ActiveWorkout from './components/ActiveWorkout';
import BodySimulator from './components/BodySimulator';
import { UserStats, ViewState, WorkoutRoutine } from './types';
import { Dumbbell } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutRoutine | null>(null);
  const [stats, setStats] = useState<UserStats>({
    totalWorkouts: 0,
    streak: 0,
    lastWorkoutDate: null,
    history: []
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Load stats from local storage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('gymtracker_stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save stats whenever they change
  useEffect(() => {
    localStorage.setItem('gymtracker_stats', JSON.stringify(stats));
  }, [stats]);

  const handleSelectWorkout = (workout: WorkoutRoutine) => {
    setSelectedWorkout(workout);
    setView('WORKOUT');
    window.scrollTo(0, 0);
  };

  const handleOpenSimulator = () => {
    setView('SIMULATOR');
    window.scrollTo(0, 0);
  };

  const handleFinishWorkout = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = stats.lastWorkoutDate;
    
    let newStreak = stats.streak;
    
    // Logic for streak calculation
    if (lastDate) {
      const last = new Date(lastDate);
      const current = new Date(today);
      const diffTime = Math.abs(current.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1; // Consecutive day
      } else if (diffDays > 1) {
        newStreak = 1; // Streak broken
      }
      // If same day, streak doesn't increase, but total does
    } else {
      newStreak = 1; // First workout
    }

    const newStats: UserStats = {
      totalWorkouts: stats.totalWorkouts + 1,
      streak: newStreak,
      lastWorkoutDate: today,
      history: [...stats.history, new Date().toISOString()]
    };

    setStats(newStats);
    setShowSuccess(true);
    
    // Return to dashboard after a delay
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedWorkout(null);
      setView('DASHBOARD');
      window.scrollTo(0, 0);
    }, 2500);
  };

  const handleBack = () => {
    setView('DASHBOARD');
    setSelectedWorkout(null);
  };

  return (
    <div className="min-h-screen bg-dark text-slate-100 font-sans selection:bg-primary/30">
      
      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <Dumbbell className="w-24 h-24 text-secondary mb-6 relative z-10 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Treino Concluído!</h2>
          <p className="text-slate-400">Mais um passo rumo ao objetivo.</p>
          <div className="mt-8 px-6 py-2 bg-slate-800 rounded-full border border-slate-700 text-sm font-mono text-secondary">
            Total: {stats.totalWorkouts + 1}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto min-h-screen bg-dark shadow-2xl overflow-hidden relative">
        {view === 'DASHBOARD' && (
          <div className="p-4 pt-6">
            <Dashboard 
              stats={stats} 
              onSelectWorkout={handleSelectWorkout} 
              onOpenSimulator={handleOpenSimulator}
            />
          </div>
        )}

        {view === 'WORKOUT' && selectedWorkout && (
          <ActiveWorkout 
            workout={selectedWorkout} 
            onBack={handleBack} 
            onFinish={handleFinishWorkout} 
          />
        )}

        {view === 'SIMULATOR' && (
          <BodySimulator onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default App;