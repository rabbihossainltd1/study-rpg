import type { ReactNode } from "react";
import {
  Award, BookOpen, Bot, Brain, Calculator, CalendarDays, CheckSquare2, HelpCircle,
  ClipboardCheck, CloudRain, Coffee, Coins, Crown, Dna, Flame, FlaskConical, Gem,
  Globe2, GraduationCap, Languages, Landmark, Medal, NotebookPen, Rocket, School,
  Sparkles, Star, Target, Trees, Trophy, UserRound, VolumeX, Waves, Zap, Atom,
  Play, FileImage, Send, MessageCircle, Swords, Users, Search, MapPin, Shield,
} from "lucide-react";

const ICONS = {
  award: Award,
  book: BookOpen,
  bot: Bot,
  brain: Brain,
  calculator: Calculator,
  calendar: CalendarDays,
  check: CheckSquare2,
  coins: Coins,
  crown: Crown,
  dna: Dna,
  fire: Flame,
  flask: FlaskConical,
  gem: Gem,
  globe: Globe2,
  graduation: GraduationCap,
  help: HelpCircle,
  language: Languages,
  landmark: Landmark,
  medal: Medal,
  notebook: NotebookPen,
  rocket: Rocket,
  school: School,
  sparkles: Sparkles,
  star: Star,
  target: Target,
  trees: Trees,
  trophy: Trophy,
  user: UserRound,
  volumeOff: VolumeX,
  waves: Waves,
  zap: Zap,
  atom: Atom,
  rain: CloudRain,
  coffee: Coffee,
  play: Play,
  proof: FileImage,
  send: Send,
  message: MessageCircle,
  swords: Swords,
  users: Users,
  search: Search,
  map: MapPin,
  shield: Shield,
  clipboard: ClipboardCheck,
} as const;

export type AppIconName = keyof typeof ICONS | string | undefined | null;

function normalizeIcon(name: AppIconName): keyof typeof ICONS {
  const key = String(name || "zap").trim();
  if (key in ICONS) return key as keyof typeof ICONS;
  return "zap";
}

export function AppIcon({ name, className = "w-5 h-5", color, strokeWidth = 2.2 }: { name?: AppIconName; className?: string; color?: string; strokeWidth?: number }) {
  const Icon = ICONS[normalizeIcon(name)];
  return <Icon className={className} style={color ? { color } : undefined} strokeWidth={strokeWidth} />;
}

export function IconBadge({ name, color = "#39FF14", className = "w-11 h-11 rounded-xl", iconClassName = "w-5 h-5" }: { name?: AppIconName; color?: string; className?: string; iconClassName?: string }) {
  return (
    <div className={`${className} flex items-center justify-center border`} style={{ background: `${color}14`, borderColor: `${color}30`, color }}>
      <AppIcon name={name} className={iconClassName} />
    </div>
  );
}

export function getPodiumColor(rank?: number) {
  if (rank === 1) return "#FFD700";
  if (rank === 2) return "#C0C0C0";
  if (rank === 3) return "#CD7F32";
  return "#39FF14";
}

export function CrownBadge({ rank, className = "w-6 h-6" }: { rank?: number; className?: string }) {
  const color = rank === 1 ? "#FFD700" : rank === 2 ? "#E5E7EB" : rank === 3 ? "#CD7F32" : "#39FF14";
  if (!rank || rank > 3) return null;
  return <Crown className={className} style={{ color, filter: `drop-shadow(0 0 8px ${color}AA)` }} strokeWidth={2.8} />;
}

export function UserAvatar({
  photoURL,
  avatar,
  name,
  sizeClass = "w-11 h-11",
  iconClassName = "w-5 h-5",
  rank,
  borderColor = "#39FF14",
  vipFrame,
}: {
  photoURL?: string;
  avatar?: string;
  name?: string;
  sizeClass?: string;
  iconClassName?: string;
  rank?: number;
  borderColor?: string;
  vipFrame?: boolean;
}) {
  const frameColor = getPodiumColor(rank);
  const isVip = Boolean(vipFrame || (rank && rank <= 3));
  return (
    <div className="relative inline-flex flex-shrink-0">
      {isVip && <div className="absolute -inset-1.5 rounded-full opacity-75 blur-sm" style={{ background: `linear-gradient(135deg, ${frameColor}, transparent 55%, ${frameColor})` }} />}
      <div className={`${sizeClass} rounded-full bg-primary/10 border-2 flex items-center justify-center overflow-hidden relative z-10`} style={{ borderColor: isVip ? frameColor : `${borderColor}70`, boxShadow: isVip ? `0 0 22px ${frameColor}55` : undefined }}>
        {photoURL ? <img src={photoURL} alt={name || "User"} className="w-full h-full object-cover" /> : <AppIcon name={avatar || "zap"} className={iconClassName} color={borderColor} />}
      </div>
      {rank && rank <= 3 && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 drop-shadow-lg">
          <CrownBadge rank={rank} className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}


export function VerifiedBadge({ className = "w-5 h-5", label = "App verified" }: { className?: string; label?: string }) {
  return (
    <span title={label} aria-label={label} className={`inline-flex items-center justify-center rounded-full bg-[#1D9BF0] text-white shadow-[0_0_10px_rgba(29,155,240,0.55)] ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-[2px]" aria-hidden="true">
        <path d="M9.4 16.7 5.8 13.1l1.6-1.6 2 2 7.2-7.2 1.6 1.6-8.8 8.8Z" fill="currentColor" />
      </svg>
    </span>
  );
}

export function InlineIconText({ icon, children, className = "" }: { icon: AppIconName; children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 ${className}`}><AppIcon name={icon} className="w-3.5 h-3.5" />{children}</span>;
}
