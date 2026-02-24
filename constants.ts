
import { Exercise, Language, ReadyWorkout } from './types';

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Home
  guideTitle: { pt: "Método Essence", en: "Essence Method" },
  guideSubtitle: { pt: "Personalizada", en: "Personalized" },
  homeDesc: { pt: "Resultados que cabem na sua rotina, com método e direção certa!", en: "Results that fit your routine, with the right method and direction!" },
  startBtn: { pt: "INICIAR MÉTODO", en: "START METHOD" },
  
  // Onboarding & Legal
  legalTitle: { pt: "AVISO IMPORTANTE ⚠️", en: "IMPORTANT NOTICE ⚠️" },
  legalDesc: { 
    pt: `Resultados incríveis exigem segurança!

Consulte um médico antes de iniciar este ou qualquer outro programa de exercícios. Sua saúde é prioridade máxima.

Este programa não é recomendado para gestantes ou pessoas com condições médicas pré-existentes sem autorização profissional.

Lembre-se: cada corpo é único e os resultados podem variar. Respeite seus limites e celebre cada conquista na sua jornada!`, 
    en: `Incredible results require safety!

Consult a doctor before starting this or any other exercise program. Your health is the top priority.

This program is not recommended for pregnant women or individuals with pre-existing medical conditions without professional clearance.

Remember: every body is unique and results may vary. Respect your limits and celebrate every achievement on your journey!` 
  },
  proceedBtn: { pt: "ENTENDI, VAMOS COMEÇAR!", en: "I UNDERSTAND, LET'S START!" },

  // Menu
  menuTitle: { pt: "PAINEL ESSENCE", en: "ESSENCE DASHBOARD" },
  mainWorkoutTitle: { pt: "MEUS TREINOS", en: "MY WORKOUTS" },
  mainWorkoutSub: { pt: "Selecione o treino de hoje", en: "Select today's workout" },
  foodGuideTitle: { pt: "GUIA DE NUTRIÇÃO", en: "NUTRITION GUIDE" },
  foodGuideSub: { pt: "Potencialize seus resultados", en: "Boost your results" },

  // Workout
  workoutName: { pt: "Método Essence", en: "Essence Method" },
  finishWorkout: { pt: "FINALIZAR TREINO", en: "FINISH WORKOUT" },

  // --- New Workout Flow Translations ---
  startRound1: { pt: "INICIAR 1º ROUND", en: "START 1st ROUND" },
  startRound2: { pt: "INICIAR 2º ROUND", en: "START 2nd ROUND" },
  startLastRound: { pt: "INICIAR ÚLTIMO ROUND", en: "START FINAL ROUND" },
  round1CompleteTitle: { pt: "Parabéns!", en: "Congratulations!" },
  round1CompleteDesc: { pt: "O primeiro round já foi! Você está mais forte do que imagina. Vamos para o próximo?", en: "The first round is done! You're stronger than you think. Ready for the next one?" },
  round2CompleteTitle: { pt: "Você é incrível!", en: "You are amazing!" },
  round2CompleteDesc: { pt: "Mais um round concluído! A persistência é o caminho do êxito. Falta só mais um para a vitória!", en: "Another round completed! Persistence is the path to success. Just one more to victory!" },
  
  exerciseAlmostDone: { pt: "Sinta o exercício. Se precisar pausar, fique à vontade.", en: "Feel the exercise. If you need to pause, feel free." },
  exerciseDone: { pt: "CONCLUÍDO", en: "COMPLETED" },
  
  intervalMessage: { pt: "Recupere o fôlego e se prepare para o próximo!", en: "Catch your breath and get ready for the next one!" },
  intervalPrepare: { pt: "Prepare-se!", en: "Get Ready!" },
  nextExerciseLabel: { pt: "Próximo exercício:", en: "Next exercise:" },
  nextExercise: { pt: "Avançar", en: "Next" },
  previousExercise: { pt: "Voltar", en: "Previous" },
  
  // Food
  foodTitle: { pt: "Guia de Nutrição", en: "Nutrition Guide" },
  foodIntro: { pt: "A alimentação é 70% do resultado. Vamos simplificar e focar no que funciona para você!", en: "Nutrition is 70% of the result. Let's simplify and focus on what works for you!" },
  
  foodPillar1: { pt: "Foque em Proteínas: Essencial para construir músculos firmes e aumentar a saciedade. Inclua ovos, frango, peixe ou leguminosas em suas refeições.", en: "Focus on Protein: Essential for building firm muscles and increasing satiety. Include eggs, chicken, fish, or legumes in your meals." },
  foodPillar2: { pt: "Reduza o Açúcar: O açúcar inflama o corpo e dificulta a queima de gordura. Opte por frutas quando sentir vontade de um doce.", en: "Reduce Sugar: Sugar causes inflammation and hinders fat burning. Opt for fruits when you crave something sweet." },
  foodPillar3: { pt: "Desembale Menos, Descasque Mais: Priorize comida de verdade. Frutas, vegetais, grãos integrais. Evite produtos com longas listas de ingredientes.", en: "Unpack Less, Peel More: Prioritize real food. Fruits, vegetables, whole grains. Avoid products with long ingredient lists." },
  foodPillar4: { pt: "Beba Muita Água: Hidratação é fundamental para o metabolismo e para a saúde da pele. Evite calorias líquidas como refrigerantes e sucos industrializados.", en: "Drink Plenty of Water: Hydration is key for metabolism and skin health. Avoid liquid calories like sodas and processed juices." },
  foodFinal: { pt: "Lembre-se: equilíbrio é a chave! Esta é uma orientação, adapte para sua realidade e, se possível, consulte uma nutricionista.", en: "Remember: balance is key! This is a guide, adapt it to your reality and, if possible, consult a nutritionist." },

  // Final
  congratsTitle: { pt: "TREINO CONCLUÍDO!", en: "WORKOUT COMPLETE!" },
  congratsDesc: { pt: "Parabéns por mais um passo na sua jornada. Sinta orgulho de você!", en: "Congratulations on another step in your journey. Be proud of yourself!" },
  backHome: { pt: "VOLTAR AO INÍCIO", en: "BACK TO START" },
  
  // Common
  loadingVideo: { pt: "Carregando Vídeo...", en: "Loading Video..." },
  demoVideo: { pt: "Vídeo Demonstrativo", en: "Demo Video" },
  insertSpace: { pt: "(Espaço para Inserção)", en: "(Placeholder Area)" },
};

// Generic exercise data to fill the structure
const genericExerciseData = {
  iconName: 'Dumbbell',
  category: 'basic' as 'basic' | 'stabilization',
  shortDescription: { pt: 'Execute com foco na contração muscular.', en: 'Execute focusing on muscle contraction.' },
  objective: { pt: 'Fortalecimento e tonificação muscular.', en: 'Muscle strengthening and toning.' },
  steps: { pt: ['Mantenha a postura.', 'Controle o movimento.', 'Respire corretamente.'], en: ['Maintain posture.', 'Control the movement.', 'Breathe correctly.'] },
  quickFix: { pt: 'Ajuste a carga se necessário.', en: 'Adjust the load if necessary.' },
  compareTip: { pt: '', en: '' },
};

export const EXERCISES: Exercise[] = [
  // TREINO A GAP
  {
    id: 'agachamento-duplo-extensao-bracos',
    name: { pt: 'Agachamento Duplo + Extensão de Braços', en: 'Double Squat + Arm Extension' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBNwrSwoQ/E5WT4c-Yx3lqrnF5T5GejA/edit?utm_content=DAHBNwrSwoQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'abdominal-rotacionado',
    name: { pt: 'Abdominal Rotacionado', en: 'Rotational Crunch' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN9ZB5EY/F66kafsYwuC5o_pPxMbViQ/edit?utm_content=DAHBN9ZB5EY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'deslocamento-lateral-agachamento',
    name: { pt: 'Deslocamento Lateral + Agachamento', en: 'Lateral Shuffle + Squat' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN6ufzhI/eAD1XalWS4Wk3RZT8g0neQ/edit?utm_content=DAHBN6ufzhI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'prancha-extendida',
    name: { pt: 'Prancha Extendida', en: 'Extended Plank' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN6Jf-3A/p86th7mYwINqvHgOa12RpA/edit?utm_content=DAHBN6Jf-3A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'recuo-alternado',
    name: { pt: 'Recuo Alternado', en: 'Alternating Reverse Lunge' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN-QPVHE/Ph3RxMD9zpMNs2s67DLdmg/edit?utm_content=DAHBN-QPVHE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'elevacao-quadril-sofa',
    name: { pt: 'Elevação de Quadril no Sofá', en: 'Sofa Hip Thrust' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN690ft0/vbf9fHuA4Y-rgbYPYZ0kyg/edit?utm_content=DAHBN690ft0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'stiff-adaptado',
    name: { pt: 'Stiff Adaptado', en: 'Adapted Stiff-Leg Deadlift' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN2KkWdQ/Wxyu1D4If8_qxYORd_L3NQ/edit?utm_content=DAHBN2KkWdQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  // TREINO B FULL BODY
  {
    id: 'policardio',
    name: { pt: 'Policardio', en: 'Polycardio' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN8AkjTc/GKcJNjZc6alIwEDk8DF6Sg/edit?utm_content=DAHBN8AkjTc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'agachamento-combinado',
    name: { pt: 'Agachamento Combinado', en: 'Combo Squat' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBNxGEx9o/gAyXNQ3xGDrwu-JLB9F2TQ/edit?utm_content=DAHBNxGEx9o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'flexoes',
    name: { pt: 'Flexões', en: 'Push-ups' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN7zcN3E/2yKu2aKd43nNQklfjxd63Q/edit?utm_content=DAHBN7zcN3E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'apoio-panturrilhas',
    name: { pt: 'Apoio + Panturrilhas', en: 'Support + Calf Raises' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN50B65E/og3CMjV0TwUcyZZGTb1NMQ/edit?utm_content=DAHBN50B65E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'afundo-pico-contracao',
    name: { pt: 'Afundo c/ Pico de Contração', en: 'Lunge w/ Peak Contraction' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN55wBxU/86sxFUcu6PDGeYAl6tE-Wg/edit?utm_content=DAHBN55wBxU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'gluteo-4-apoios',
    name: { pt: 'Glúteo 4 Apoios', en: 'Quadruped Glute Kickback' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN9gAoKM/Zcb3B5UTIBQSNZqDOoeq_A/edit?utm_content=DAHBN9gAoKM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'prancha-inclinada',
    name: { pt: 'Prancha Inclinada', en: 'Incline Plank' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBN9Ph8o8/YbT6JzCLmIA2oyOToqL-IA/edit?utm_content=DAHBN9Ph8o8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  // TREINO C FAT BURN
  {
    id: 'corrida-estacionada-1',
    name: { pt: 'Corrida Estacionada 1', en: 'Stationary Run 1' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBOxTB3yE/lmt25hpyLlZ93BhH-_uqcA/edit?utm_content=DAHBOxTB3yE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'corda',
    name: { pt: 'Corda', en: 'Jumping Rope' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBO_W2fE0/lOXa879iGWHTpYX4M1M5ww/edit?utm_content=DAHBO_W2fE0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'polichinelo-variado',
    name: { pt: 'Polichinelo Variado', en: 'Varied Jumping Jack' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBO6aO9sg/QEAHTRbWI73om7NdUEqiwQ/edit?utm_content=DAHBO6aO9sg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'agachamento-pico-contracao',
    name: { pt: 'Agachamento com Pico de Contração', en: 'Squat with Peak Contraction' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBO9TUz0Q/mvJ6ZWGZiJDX8SEfmgxORg/edit?utm_content=DAHBO9TUz0Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'grupado',
    name: { pt: 'Grupado', en: 'Tuck Jumps' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBO0h14V4/hRx7dWCpygXpd1g0BjHA_A/edit?utm_content=DAHBO0h14V4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'abs-curto',
    name: { pt: 'ABS Curto', en: 'Short Crunches' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBOwfufWk/7NSX6KA0S_DHY8L_kLq0vQ/edit?utm_content=DAHBOwfufWk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
  {
    id: 'corrida-estacionada-2',
    name: { pt: 'Corrida Estacionada 2', en: 'Stationary Run 2' },
    ...genericExerciseData,
    videoUrl: 'https://www.canva.com/design/DAHBO9uBRL0/tGLgyMdMjvePJ_53G7sh9A/edit?utm_content=DAHBO9uBRL0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
  },
];

export const PREDEFINED_WORKOUTS: ReadyWorkout[] = [
  {
    id: 'treino-a',
    title: { pt: 'TREINO A GAP', en: 'WORKOUT A GAP' },
    materials: { pt: 'Materiais: Colchonete, 2 marcações, peso (+5kg) e sofá.', en: 'Equipment: Mat, 2 markers, weight (+5kg), and a sofa.' },
    frequency: '3x',
    sets: 3,
    exercises: [
      'agachamento-duplo-extensao-bracos',
      'abdominal-rotacionado',
      'deslocamento-lateral-agachamento',
      'prancha-extendida',
      'recuo-alternado',
      'elevacao-quadril-sofa',
      'stiff-adaptado'
    ]
  },
  {
    id: 'treino-b',
    title: { pt: 'TREINO B FULL BODY', en: 'WORKOUT B FULL BODY' },
    materials: { pt: 'Materiais: Colchonete e uma cadeira.', en: 'Equipment: Mat and a chair.' },
    frequency: '3x',
    sets: 3,
    exercises: [
      'policardio',
      'agachamento-combinado',
      'flexoes',
      'apoio-panturrilhas',
      'afundo-pico-contracao',
      'gluteo-4-apoios',
      'prancha-inclinada'
    ]
  },
  {
    id: 'treino-c',
    title: { pt: 'TREINO C FAT BURN', en: 'WORKOUT C FAT BURN' },
    materials: { pt: 'Materiais: Corda e colchonete.', en: 'Equipment: Jumping rope and mat.' },
    frequency: '3x',
    sets: 3,
    exercises: [
      'corrida-estacionada-1',
      'corda',
      'polichinelo-variado',
      'agachamento-pico-contracao',
      'grupado',
      'abs-curto',
      'corrida-estacionada-2'
    ]
  }
];
