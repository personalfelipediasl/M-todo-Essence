
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  MoveVertical, 
  Activity, 
  Archive, 
  TrendingUp, 
  AlignHorizontalSpaceAround, 
  ChevronsUp, 
  MoveHorizontal, 
  Layers, 
  ArrowDownUp,
  PlayCircle,
  PauseCircle,
  ChevronLeft,
  Heart,
  FileText,
  CheckCircle,
  Info,
  Loader2,
  AlertCircle,
  Clock,
  RotateCcw,
  Flame,
  ShieldCheck,
  Trophy,
  Play,
  User,
  Scale,
  Ruler,
  X
} from 'lucide-react';

// --- Icon Mapping ---
export const getIcon = (iconName: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (iconName) {
    case 'MoveVertical': return <MoveVertical {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'Archive': return <Archive {...props} />;
    case 'TrendingUp': return <TrendingUp {...props} />;
    case 'AlignHorizontalSpaceAround': return <AlignHorizontalSpaceAround {...props} />;
    case 'ChevronsUp': return <ChevronsUp {...props} />;
    case 'MoveHorizontal': return <MoveHorizontal {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'ArrowDownUp': return <ArrowDownUp {...props} />;
    case 'Flame': return <Flame {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    default: return <Activity {...props} />;
  }
};

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 focus:ring-primary-500",
    secondary: "bg-surface hover:bg-neutral-800 text-white border border-neutral-700 shadow-lg shadow-black/30 focus:ring-neutral-700",
    outline: "border-2 border-neutral-700 hover:border-primary-500 hover:text-primary-500 text-neutral-400 bg-transparent",
    ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- Video Player ---
interface VideoPlayerProps {
  videoUrl?: string;
  isPlaying: boolean;
  onLoaded?: () => void;
  labels?: {
    loading: string;
    demo: string;
    placeholder: string;
  };
}

export const VideoPlayer: React.FC<VideoPlayerProps> = React.memo(({ videoUrl, isPlaying, onLoaded, labels }) => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const text = useMemo(() => ({
    loading: labels?.loading || "Carregando...",
    demo: labels?.demo || "Vídeo Demonstrativo",
    placeholder: labels?.placeholder || "(Espaço para Inserção)",
  }), [labels]);

  useEffect(() => {
    if (videoUrl) setLoading(true);
  }, [videoUrl]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
        if (isPlaying) {
            video.play().catch(e => console.error("Video play failed", e));
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }
  }, [isPlaying]);
  
  const handleOnLoad = useCallback(() => {
    setLoading(false);
    onLoaded?.();
  }, [onLoaded]);

  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-surface rounded-xl flex flex-col items-center justify-center text-neutral-500 border-2 border-dashed border-neutral-700">
        <PlayCircle className="w-12 h-12 mb-2 text-neutral-600" />
        <span className="text-xs font-medium text-neutral-400">{text.demo}</span>
      </div>
    );
  }

  const getDriveId = (url: string) => {
    const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };
  const isDrive = videoUrl.includes('drive.google.com');
  const driveId = isDrive ? getDriveId(videoUrl) : null;
  const isCanva = videoUrl.includes('canva.com');
  const isYoutube = videoUrl.includes('youtube') || videoUrl.includes('youtu.be');

  const embedUrl = (() => {
    if (isYoutube) {
        const match = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (match) {
            const videoId = match[1];
            return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
        }
    } else if (isCanva) {
        // Transform Canva /edit or /watch URLs into the correct /view?embed format
        let baseUrl = videoUrl.split('?')[0];
        baseUrl = baseUrl.replace('/edit', '/view').replace('/watch', '/view');
        
        // Add required parameters for seamless looping playback
        const params = "embed&autoplay=1&muted=1&loop=1&controls=0";
        
        return `${baseUrl}?${params}`;
    } else if (driveId) {
        return `https://drive.google.com/file/d/${driveId}/preview`;
    }
    return null;
  })();

  if (embedUrl) {
    return (
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
        <iframe 
          width="100%" 
          height="100%" 
          src={embedUrl} 
          title="Exercise Content"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          className="w-full h-full object-cover scale-[1.01]"
          onLoad={handleOnLoad}
        ></iframe>
        {loading && (
             <div className="absolute inset-0 z-30 flex items-center justify-center bg-surface pointer-events-none">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                  <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">{text.loading}</span>
                </div>
             </div>
        )}
      </div>
    );
  }
  
  const videoSrc = driveId ? `https://drive.google.com/uc?export=download&id=${driveId}` : videoUrl;
  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
      <video 
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain bg-black"
          muted
          loop
          playsInline
          onLoadedData={handleOnLoad}
      />
      {loading && (
           <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50">
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
           </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => prevProps.videoUrl === nextProps.videoUrl && prevProps.isPlaying === nextProps.isPlaying);


// --- Layout Wrapper ---
export const ScreenWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`min-h-screen max-w-md mx-auto bg-black shadow-2xl overflow-hidden flex flex-col relative ${className}`}>
    {children}
  </div>
);

// --- Header ---
export const Header: React.FC<{ title?: string; onBack?: () => void }> = ({ title, onBack }) => (
  <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800 px-4 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-neutral-900 rounded-full transition-colors text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {title && <h1 className="text-xl font-bold text-white truncate">{title}</h1>}
    </div>
  </div>
);
