export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  category?: string;
}

export interface WorkoutRoutine {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  exercises: Exercise[];
}

export interface UserStats {
  totalWorkouts: number;
  streak: number;
  lastWorkoutDate: string | null;
  history: string[]; // Array of ISO dates
}

export type ViewState = 'DASHBOARD' | 'WORKOUT' | 'SUCCESS' | 'SIMULATOR';