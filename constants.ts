import { WorkoutRoutine } from './types';

export const WORKOUT_DATA: WorkoutRoutine[] = [
  {
    id: 1,
    title: "Treino 1: Empurrar",
    subtitle: "Peito e Tríceps",
    color: "bg-blue-600",
    exercises: [
      { id: "1-1", name: "Supino Reto (Barra ou Halter)", sets: "4", reps: "8-12" },
      { id: "1-2", name: "Supino Inclinado (Halter)", sets: "3", reps: "10-12" },
      { id: "1-3", name: "Crucifixo (Máquina ou Halter)", sets: "3", reps: "12-15" },
      { id: "1-4", name: "Tríceps Pulley (Corda)", sets: "4", reps: "12-15" },
      { id: "1-5", name: "Tríceps Testa", sets: "3", reps: "10-12" },
      { id: "1-6", name: "Mergulho no Banco ou Paralelas", sets: "3", reps: "Até a falha" },
    ]
  },
  {
    id: 2,
    title: "Treino 2: Puxar",
    subtitle: "Costas e Bíceps",
    color: "bg-emerald-600",
    exercises: [
      { id: "2-1", name: "Puxada Alta (Frente)", sets: "4", reps: "10-12" },
      { id: "2-2", name: "Remada Baixa (Triângulo)", sets: "4", reps: "10-12" },
      { id: "2-3", name: "Remada Curvada (Barra ou Halter)", sets: "3", reps: "10-12" },
      { id: "2-4", name: "Rosca Direta (Barra W)", sets: "4", reps: "10-12" },
      { id: "2-5", name: "Rosca Martelo (Halteres)", sets: "3", reps: "12-15" },
      { id: "2-6", name: "Rosca Concentrada", sets: "3", reps: "12-15" },
    ]
  },
  {
    id: 3,
    title: "Treino 3: Pernas A",
    subtitle: "Foco em Quadríceps",
    color: "bg-red-600",
    exercises: [
      { id: "3-1", name: "Agachamento Livre ou Smith", sets: "4", reps: "8-10" },
      { id: "3-2", name: "Leg Press 45º", sets: "4", reps: "10-12" },
      { id: "3-3", name: "Cadeira Extensora", sets: "4", reps: "12-15" },
      { id: "3-4", name: "Afundo (Halteres)", sets: "3", reps: "10-12 (cada perna)" },
      { id: "3-5", name: "Panturrilha no Leg Press", sets: "4", reps: "15-20" },
      { id: "3-6", name: "Panturrilha Sentado", sets: "3", reps: "15-20" },
    ]
  },
  {
    id: 4,
    title: "Treino 4: Ombros",
    subtitle: "Ombros e Abdômen",
    color: "bg-orange-600",
    exercises: [
      { id: "4-1", name: "Desenvolvimento (Halteres ou Máquina)", sets: "4", reps: "10-12" },
      { id: "4-2", name: "Elevação Lateral", sets: "4", reps: "12-15" },
      { id: "4-3", name: "Elevação Frontal", sets: "3", reps: "12-15" },
      { id: "4-4", name: "Crucifixo Inverso (Posterior de Ombro)", sets: "3", reps: "12-15" },
      { id: "4-5", name: "Abdominal Supra (Colchonete)", sets: "4", reps: "15-20" },
      { id: "4-6", name: "Prancha Isométrica", sets: "3", reps: "30-60 seg" },
    ]
  },
  {
    id: 5,
    title: "Treino 5: Pernas B",
    subtitle: "Posterior e Glúteo",
    color: "bg-pink-600",
    exercises: [
      { id: "5-1", name: "Levantamento Terra (ou Romeno)", sets: "4", reps: "8-10" },
      { id: "5-2", name: "Mesa Flexora", sets: "4", reps: "12-15" },
      { id: "5-3", name: "Elevação Pélvica", sets: "4", reps: "10-12" },
      { id: "5-4", name: "Cadeira Abdutora", sets: "3", reps: "15-20" },
      { id: "5-5", name: "Stiff com Halteres", sets: "3", reps: "10-12" },
      { id: "5-6", name: "Panturrilha em Pé", sets: "4", reps: "15-20" },
    ]
  },
  {
    id: 6,
    title: "Treino 6: Full Body",
    subtitle: "Corpo Inteiro",
    color: "bg-purple-600",
    exercises: [
      { id: "6-1", name: "Agachamento (Peso do corpo ou Halter)", sets: "3", reps: "12" },
      { id: "6-2", name: "Flexão de Braço", sets: "3", reps: "Até a falha" },
      { id: "6-3", name: "Remada Curvada", sets: "3", reps: "12" },
      { id: "6-4", name: "Desenvolvimento Militar", sets: "3", reps: "12" },
      { id: "6-5", name: "Passada (Avanço)", sets: "3", reps: "12" },
      { id: "6-6", name: "Burpees (Opcional)", sets: "3", reps: "10" },
    ]
  },
  {
    id: 7,
    title: "Treino 7: Cardio + Core",
    subtitle: "Resistência",
    color: "bg-cyan-600",
    exercises: [
      { id: "7-1", name: "Corrida/Caminhada (Esteira ou Rua)", sets: "1", reps: "30-40 min" },
      { id: "7-2", name: "Abdominal Infra (Elevação de pernas)", sets: "3", reps: "15" },
      { id: "7-3", name: "Abdominal Bicicleta", sets: "3", reps: "20 (total)" },
      { id: "7-4", name: "Prancha Lateral", sets: "3", reps: "30s cada lado" },
      { id: "7-5", name: "Mountain Climbers", sets: "3", reps: "30 seg" },
    ]
  },
  {
    id: 8,
    title: "Treino 8: Funcional",
    subtitle: "Mobilidade e Recuperação",
    color: "bg-teal-600",
    exercises: [
      { id: "8-1", name: "Alongamento Dinâmico de Ombros", sets: "2", reps: "30 seg" },
      { id: "8-2", name: "Agachamento Profundo (Segurar)", sets: "3", reps: "30 seg" },
      { id: "8-3", name: "Gato-Vaca (Mobilidade Coluna)", sets: "3", reps: "10 reps" },
      { id: "8-4", name: "Perdigueiro", sets: "3", reps: "12 reps" },
      { id: "8-5", name: "Polichinelos", sets: "3", reps: "50 reps" },
      { id: "8-6", name: "Caminhada Leve", sets: "1", reps: "20 min" },
    ]
  }
];