
import React, { useState, useEffect, createContext, useContext, useMemo, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Heart, CheckCircle, Info, Activity, ClipboardList, ChevronRight, ChevronLeft, Search, X, Dumbbell, ShieldCheck, ListChecks, Play, Pause, ChevronDown, ChevronUp, Flame, Calendar, ArrowRight, AlertCircle, Clock, Utensils, ShieldAlert, Calculator, Trophy } from 'lucide-react';
import { EXERCISES, TRANSLATIONS, PREDEFINED_WORKOUTS } from './constants';
import { Exercise, UserData, Language, ReadyWorkout } from './types';
import { Button, VideoPlayer, ScreenWrapper, Header, getIcon } from './components';

// --- Language Context ---
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const t = (key: string): string => TRANSLATIONS[key]?.[language] || key;
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

// --- App State & Hooks ---
const useUserData = () => {
  const [data, setData] = useState<UserData>(() => {
    const saved = localStorage.getItem('chestDefData');
    return saved ? JSON.parse(saved) : { favorites: [], notes: {}, customPlans: {}, activeWorkout: [] };
  });
  useEffect(() => { localStorage.setItem('chestDefData', JSON.stringify(data)); }, [data]);
  const clearActiveWorkout = () => setData(prev => ({ ...prev, activeWorkout: [] }));
  return { clearActiveWorkout };
};
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// --- UI Components ---
const BrandLogo = () => (
    <div className="flex flex-col items-center justify-center mb-8">
      <svg viewBox="0 0 100 100" className="w-24 h-24 mb-4">
          <defs>
            <linearGradient id="logo_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" /> 
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path
            d="M 75 85 A 40 40 0 1 1 85 25"
            fill="none"
            stroke="url(#logo_gradient)"
            strokeWidth="18"
            strokeLinecap="round"
          />
      </svg>
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-primary-500 tracking-tighter leading-none font-sans drop-shadow-md uppercase">Método Essence</h2>
        <h2 className="text-xl font-bold text-white tracking-tight leading-none font-sans drop-shadow-md uppercase mt-2">Funcional Feminino em casa</h2>
      </div>
    </div>
);

const ExerciseItem: React.FC<{
  exercise: Exercise;
  isActive: boolean;
  isCompleted: boolean;
  timeLeft: number;
  onVideoLoaded: () => void;
  t: (key: string) => string;
}> = ({ exercise, isActive, isCompleted, timeLeft, onVideoLoaded, t }) => {
    const videoLabels = { loading: t('loadingVideo'), demo: t('demoVideo'), placeholder: t('insertSpace') };
    const showAlmostDoneMsg = isActive && timeLeft > 0 && timeLeft <= 10;
    
    const containerClasses = isActive 
      ? 'bg-surface border-primary-500 shadow-lg shadow-primary-500/20 opacity-100' 
      : 'bg-black border-neutral-800 opacity-30 brightness-50';

    return (
      <div className={`rounded-2xl border-2 transition-all duration-500 overflow-hidden ${containerClasses}`}>
        <div className="p-4 flex items-center justify-between bg-surface">
          <div className="flex items-center gap-4">
            {isCompleted ? <CheckCircle className="w-8 h-8 text-primary-500" /> : <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isActive ? 'bg-primary-500 text-white' : 'bg-neutral-800 text-neutral-600'}`}>{isActive ? <Dumbbell className="w-4 h-4 animate-pulse"/> : null}</div>}
            <h3 className={`text-lg font-bold text-left ${isActive ? 'text-white' : 'text-neutral-500'}`}>{exercise.name.pt}</h3>
          </div>
          {isActive && <div className="text-2xl font-mono font-bold text-primary-500 tabular-nums">{timeLeft}s</div>}
        </div>
        
        <div className="aspect-video bg-black relative">
          <VideoPlayer videoUrl={exercise.videoUrl} isPlaying={isActive} onLoaded={onVideoLoaded} labels={videoLabels} />
          {isCompleted && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-2xl font-black text-white uppercase tracking-widest">{t('exerciseDone')}</span>
            </div>
          )}
          {showAlmostDoneMsg && (
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 p-2 rounded-lg text-center animate-in fade-in">
              <p className="text-white text-xs font-semibold">{t('exerciseAlmostDone')}</p>
            </div>
          )}
        </div>
      </div>
    );
};

const IntervalTimer: React.FC<{ timeLeft: number; t: (key: string) => string; nextExerciseName?: string }> = ({ timeLeft, t, nextExerciseName }) => {
  const message = timeLeft > 5 ? t('intervalMessage') : t('intervalPrepare');
  return (
    <div className="my-6 p-6 bg-surface rounded-2xl border-2 border-dashed border-primary-500 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 text-center">
      <span className="text-primary-500 font-bold uppercase text-sm tracking-wider">{message}</span>
      <div className="text-5xl font-mono font-bold text-white tabular-nums my-2">{timeLeft}</div>
      {nextExerciseName && (
        <div className="mt-2">
            <span className="text-xs text-neutral-400 uppercase font-bold tracking-wider">{t('nextExerciseLabel')}</span>
            <p className="text-white font-bold">{nextExerciseName}</p>
        </div>
      )}
    </div>
  );
};

// --- Screens ---
const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t, setLanguage, language } = useLanguage();
  return (
    <ScreenWrapper className="justify-between bg-black relative">
      <div className="absolute top-4 right-4 z-50 flex gap-4">
         <button onClick={() => setLanguage('pt')} className={`font-bold text-sm uppercase tracking-wider transition-opacity ${language === 'pt' ? 'text-white opacity-100' : 'text-neutral-500 opacity-70 hover:opacity-100'}`}>BR</button>
         <button onClick={() => setLanguage('en')} className={`font-bold text-sm uppercase tracking-wider transition-opacity ${language === 'en' ? 'text-white opacity-100' : 'text-neutral-500 opacity-70 hover:opacity-100'}`}>US</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <BrandLogo />
        <p className="text-lg text-neutral-400 max-w-xs mx-auto leading-relaxed font-medium">{t('homeDesc')}</p>
      </div>
      <div className="p-6 pb-12"><Button fullWidth onClick={() => navigate('/legal')} className="h-16 text-xl">{t('startBtn')}</Button></div>
    </ScreenWrapper>
  );
};
const LegalScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <ScreenWrapper className="bg-black"><Header onBack={() => navigate('/')} />
      <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center text-center space-y-6">
        <div className="p-4 bg-primary-500/10 rounded-full border border-primary-500/30"><ShieldAlert className="w-12 h-12 text-primary-500" /></div>
        <h2 className="text-xl font-bold text-white uppercase tracking-tighter">{t('legalTitle')}</h2>
        <div className="bg-surface p-6 rounded-2xl border border-neutral-800 text-neutral-300 leading-relaxed text-sm whitespace-pre-line text-left w-full">{t('legalDesc')}</div>
        <Button fullWidth onClick={() => navigate('/menu')} className="mt-4">{t('proceedBtn')}</Button>
      </div>
    </ScreenWrapper>
  );
};

const MenuScreen: React.FC = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    type MenuButtonProps = { title: string; subtitle: string; icon: any; onClick: () => void; colorClass?: string; materials?: string; };
    const MenuButton: React.FC<MenuButtonProps> = ({ title, icon: Icon, onClick, subtitle, materials, colorClass = "text-white" }) => (
        <button onClick={onClick} className="flex flex-row items-center p-6 bg-surface border-2 border-neutral-700 rounded-2xl shadow-[0_0_15px_rgba(255,81,7,0.1)] hover:border-primary-500 transition-all duration-300 active:scale-95 group w-full text-left gap-6">
            <div className="p-4 bg-black rounded-full border border-neutral-800 group-hover:border-primary-500/50 shrink-0"><Icon className="w-8 h-8 text-neutral-400 group-hover:text-white" /></div>
            <div className="flex-1">
                <h3 className={`text-xl font-bold mb-1 uppercase ${colorClass}`}>{title}</h3>
                <p className="text-sm text-neutral-500 uppercase tracking-wider">{subtitle}</p>
                {materials && <p className="text-xs text-neutral-300 mt-2 font-semibold">{materials}</p>}
            </div>
            <ChevronRight className="w-6 h-6 text-neutral-600 group-hover:text-primary-500" />
        </button>
    );
    return (
        <ScreenWrapper>
            <Header title={t('menuTitle')} onBack={() => navigate('/')} />
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="mb-4 text-center"><h2 className="text-2xl font-black text-primary-500 uppercase tracking-widest drop-shadow-lg">{t('menuTitle')}</h2><div className="w-16 h-1 bg-neutral-800 mx-auto mt-2 rounded-full"></div></div>
                    <div className="space-y-4">
                        {PREDEFINED_WORKOUTS.map(workout => (
                            <MenuButton 
                                key={workout.id} 
                                title={workout.title[language]} 
                                subtitle={t('mainWorkoutSub')} 
                                icon={Dumbbell} 
                                onClick={() => navigate(`/ready-workout/${workout.id}`)}
                                materials={workout.materials[language]}
                            />
                        ))}
                        <MenuButton title={t('foodGuideTitle')} subtitle={t('foodGuideSub')} icon={Utensils} onClick={() => navigate('/food-guide')} />
                    </div>
                </div>
                <div className="mt-8">
                    <a href="https://pay.kiwify.com.br/pEuZtba" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 focus:ring-primary-500 text-center">
                        Quero novos treinos!
                    </a>
                </div>
            </div>
        </ScreenWrapper>
    );
};

const FoodGuideScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <ScreenWrapper>
      <Header title={t('foodGuideTitle')} onBack={() => navigate('/menu')} /><div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-12"><div className="text-center mb-8"><Utensils className="w-16 h-16 text-primary-500 mx-auto mb-4" /><h2 className="text-2xl font-bold text-white uppercase">{t('foodTitle')}</h2><p className="text-neutral-400 mt-2">{t('foodIntro')}</p></div><div className="space-y-4">{[1, 2, 3, 4].map(i => (<div key={i} className="bg-surface p-5 rounded-xl border border-neutral-800 flex gap-4 animate-in fade-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${i * 100}ms` }}><span className="text-primary-500 font-bold text-xl">{i}.</span><p className="text-neutral-200 font-medium">{t(`foodPillar${i}`)}</p></div>))}</div><div className="mt-8 p-6 bg-primary-500/10 border border-primary-500/20 rounded-xl"><p className="text-white font-bold text-center italic">{t('foodFinal')}</p></div></div>
    </ScreenWrapper>
  );
};

const ReadyWorkoutExecutionScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  
  const [round, setRound] = useState(1);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'exercising' | 'resting' | 'round-complete'>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const exerciseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const workout = useMemo(() => PREDEFINED_WORKOUTS.find(w => w.id === id), [id]);
  
  const exercises = useMemo(() => 
    workout?.exercises.map(exId => EXERCISES.find(e => e.id === exId)).filter((e): e is Exercise => !!e) || [],
    [workout]
  );
  
  useEffect(() => {
    exerciseRefs.current = exerciseRefs.current.slice(0, exercises.length);
  }, [exercises]);

  // Combined timer and state machine logic
  useEffect(() => {
    // PAUSA O TIMER:
    // 1. Se estiver idle ou round complete
    // 2. Se for o PRIMEIRO exercício do round (index 0) E o vídeo ainda estiver carregando
    const isFirstExerciseOfRound = currentExerciseIndex === 0;
    const shouldPauseForLoading = isFirstExerciseOfRound && status === 'exercising' && isVideoLoading;

    if (status === 'idle' || status === 'round-complete' || shouldPauseForLoading) {
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 1) {
          return prevTime - 1;
        }

        // Transições quando o timer chega a 0
        if (status === 'exercising') {
          const isLastExercise = currentExerciseIndex === exercises.length - 1;
          
          if (isLastExercise) {
            if (round >= 3) {
              navigate('/final');
              return 0;
            } else {
              setStatus('round-complete');
              return 0;
            }
          } else {
            setStatus('resting');
            return 30; // 30 segundos de intervalo
          }
        }

        if (status === 'resting') {
          const nextIndex = currentExerciseIndex + 1;
          if (nextIndex >= exercises.length) {
            if (round >= 3) {
              navigate('/final');
            } else {
              setStatus('round-complete');
            }
            return 0;
          } else {
            // ATIVAÇÃO AUTOMÁTICA APÓS INTERVALO (2º exercício em diante)
            setCurrentExerciseIndex(nextIndex);
            setStatus('exercising');
            setIsVideoLoading(true); // O vídeo carrega enquanto o tempo já corre (pois index > 0)
            return 40; // 40 segundos de execução
          }
        }
        
        return 0;
      });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [status, timeLeft, currentExerciseIndex, round, exercises.length, navigate, isVideoLoading]);
  
  useEffect(() => {
      if (status === 'exercising' && exerciseRefs.current[currentExerciseIndex]) {
        exerciseRefs.current[currentExerciseIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
  }, [currentExerciseIndex, status]);

  const startRound = () => {
    setCurrentExerciseIndex(0);
    setStatus('exercising');
    setTimeLeft(40);
    setIsVideoLoading(true);
  };

  const startNextRound = () => {
    setRound(prev => prev + 1);
    startRound();
  };

  const goToNextExercise = () => {
    if (status === 'resting') {
      const nextIndex = currentExerciseIndex + 1;
      if (nextIndex < exercises.length) {
        setCurrentExerciseIndex(nextIndex);
        setStatus('exercising');
        setTimeLeft(40);
        setIsVideoLoading(true);
      } else {
        if (round >= 3) navigate('/final');
        else setStatus('round-complete');
      }
    } else {
      const isLastExercise = currentExerciseIndex === exercises.length - 1;
      if (isLastExercise) {
        if (round >= 3) navigate('/final');
        else setStatus('round-complete');
      } else {
        const nextIndex = currentExerciseIndex + 1;
        setCurrentExerciseIndex(nextIndex);
        setStatus('exercising');
        setTimeLeft(40);
        setIsVideoLoading(true);
      }
    }
  };

  const goToPreviousExercise = () => {
    if (status === 'resting') {
      setStatus('exercising');
      setTimeLeft(40);
      // If we are at the first exercise, it's already loaded
      if (currentExerciseIndex === 0) setIsVideoLoading(false);
      else setIsVideoLoading(true);
    } else {
      if (currentExerciseIndex > 0) {
        const prevIndex = currentExerciseIndex - 1;
        setCurrentExerciseIndex(prevIndex);
        setStatus('exercising');
        setTimeLeft(40);
        // If going back to the first exercise, we know it's already loaded from the start
        if (prevIndex === 0) setIsVideoLoading(false);
        else setIsVideoLoading(true);
      } else {
        // Restart current exercise if it's the first one
        setTimeLeft(40);
        setIsVideoLoading(false);
      }
    }
  };
  
  if (!workout) {
    useEffect(() => { navigate('/menu'); }, [navigate]);
    return null;
  }

  if (status === 'idle' || status === 'round-complete') {
    const isFirstRound = round === 1 && status === 'idle';
    const isSecondRound = round === 1 && status === 'round-complete';
    const isThirdRound = round === 2 && status === 'round-complete';

    return (
      <ScreenWrapper className="justify-center items-center p-8 text-center">
        <Trophy className="w-24 h-24 text-primary-500 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">
          {isFirstRound ? workout.title[language] : (isSecondRound ? t('round1CompleteTitle') : t('round2CompleteTitle'))}
        </h2>
        <p className="text-neutral-400 text-lg mb-8">
          {isFirstRound ? "Pronta para começar?" : (isSecondRound ? t('round1CompleteDesc') : t('round2CompleteDesc'))}
        </p>
        <Button onClick={isFirstRound ? startRound : startNextRound}>
          {isFirstRound ? t('startRound1') : (isSecondRound ? t('startRound2') : t('startLastRound'))}
        </Button>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <Header title={`${workout.title[language]} - ROUND ${round}`} onBack={() => navigate('/menu')} />
      <div className="flex-1 overflow-y-auto p-4 pb-24 no-scrollbar">
        {exercises.map((exercise, index) => {
          const isPast = index < currentExerciseIndex;
          const isCurrent = index === currentExerciseIndex;
          const shouldHideExerciseItem = isPast || (isCurrent && status === 'resting');

          return (
            <div 
              key={exercise.id + round} 
              ref={el => { exerciseRefs.current[index] = el; }}
              className="transition-all duration-500"
            >
              <div className={`transition-all duration-500 overflow-hidden ${shouldHideExerciseItem ? 'max-h-0 opacity-0 mb-0 !m-0 !p-0 border-none pointer-events-none' : 'max-h-[1000px] opacity-100 mb-4'}`}>
                <ExerciseItem
                  exercise={exercise}
                  isActive={isCurrent && status === 'exercising'}
                  isCompleted={isPast}
                  timeLeft={isCurrent ? timeLeft : 0}
                  onVideoLoaded={() => setIsVideoLoading(false)}
                  t={t}
                />
              </div>
              
              {isCurrent && status === 'resting' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <IntervalTimer 
                    timeLeft={timeLeft} 
                    t={t} 
                    nextExerciseName={exercises[index + 1]?.name[language]} 
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <button 
          onClick={goToPreviousExercise} 
          className="w-14 h-14 rounded-full bg-surface/90 backdrop-blur-md border-2 border-neutral-700 flex items-center justify-center text-white hover:border-primary-500 hover:text-primary-500 transition-all shadow-xl active:scale-90"
          title={t('previousExercise')}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={goToNextExercise}
          className="w-14 h-14 rounded-full bg-surface/90 backdrop-blur-md border-2 border-neutral-700 flex items-center justify-center text-white hover:border-primary-500 hover:text-primary-500 transition-all shadow-xl active:scale-90"
          title={t('nextExercise')}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </ScreenWrapper>
  );
};

const FinalScreen: React.FC<{ clearWorkout: () => void }> = ({ clearWorkout }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <ScreenWrapper className="justify-center bg-black text-white p-8">
      <div className="text-center space-y-10">
        <div className="w-28 h-28 bg-surface rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-primary-500/20 mb-6 border border-neutral-800">
          <CheckCircle className="w-16 h-16 text-primary-500" />
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 uppercase tracking-tighter">{t('congratsTitle')}</h2>
          <p className="text-neutral-400 text-xl leading-relaxed">{t('congratsDesc')}</p>
        </div>
        <div className="space-y-6 pt-8">
          <Button fullWidth onClick={() => { clearWorkout(); navigate('/'); }}>{t('backHome')}</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

const App: React.FC = () => {
  const { clearActiveWorkout } = useUserData();
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/legal" element={<LegalScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/food-guide" element={<FoodGuideScreen />} />
          <Route path="/ready-workout/:id" element={<ReadyWorkoutExecutionScreen />} />
          <Route path="/final" element={<FinalScreen clearWorkout={clearActiveWorkout} />} />
        </Routes>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
