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

export function CrownBadge({ rank, className = "w-6 h-6" }: { rank?: number; className?: string }) {
  if (rank === 1) return <Crown className={className} style={{ color: "#FFD700" }} />;
  if (rank === 2) return <Crown className={className} style={{ color: "#C0C0C0" }} />;
  if (rank === 3) return <Crown className={className} style={{ color: "#CD7F32" }} />;
  return null;
}

export function UserAvatar({
  photoURL,
  avatar,
  name,
  sizeClass = "w-11 h-11",
  iconClassName = "w-5 h-5",
  rank,
  borderColor = "#39FF14",
}: {
  photoURL?: string;
  avatar?: string;
  name?: string;
  sizeClass?: string;
  iconClassName?: string;
  rank?: number;
  borderColor?: string;
}) {
  return (
    <div className="relative inline-flex flex-shrink-0">
      <div className={`${sizeClass} rounded-full bg-primary/10 border flex items-center justify-center overflow-hidden`} style={{ borderColor: `${borderColor}70` }}>
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

export function InlineIconText({ icon, children, className = "" }: { icon: AppIconName; children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 ${className}`}><AppIcon name={icon} className="w-3.5 h-3.5" />{children}</span>;
}
