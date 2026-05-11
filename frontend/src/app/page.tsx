"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Zap, Trophy, Target, Bot, Star, ArrowRight, Play, Users, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";

const STATS = [
  { value: "50K+", label: "Active Students", labelBn: "সক্রিয় শিক্ষার্থী" },
  { value: "8", label: "Core Subjects", labelBn: "মূল বিষয়" },
  { value: "500+", label: "Quiz Questions", labelBn: "কুইজ প্রশ্ন" },
  { value: "99%", label: "Satisfaction", labelBn: "সন্তুষ্টি" },
];

const FEATURES = [
  {
    icon: <Zap className="w-7 h-7" />,
    title: "XP & Leveling",
    titleBn: "এক্সপি ও লেভেলিং",
    desc: "Earn XP for every lesson, quiz, and challenge. Level up your scholar rank from Novice to Legend.",
    color: "#39FF14",
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: "Daily Missions",
    titleBn: "দৈনিক মিশন",
    desc: "Complete daily and weekly missions to earn bonus XP, coins, and exclusive rewards.",
    color: "#00F0FF",
  },
  {
    icon: <Trophy className="w-7 h-7" />,
    title: "Leaderboard",
    titleBn: "লিডারবোর্ড",
    desc: "Compete globally, by district, and with friends. Rise to the top of the leaderboard.",
    color: "#FFD700",
  },
  {
    icon: <Bot className="w-7 h-7" />,
    title: "AI Study Tutor",
    titleBn: "এআই টিউটর",
    desc: "Get instant explanations in Bangla and English. Your personal AI tutor available 24/7.",
    color: "#BF5FFF",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "SSC/HSC Ready",
    titleBn: "SSC/HSC প্রস্তুতি",
    desc: "Comprehensive curriculum for SSC, HSC, and university admission with previous year questions.",
    color: "#FF003C",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Focus Mode",
    titleBn: "ফোকাস মোড",
    desc: "Pomodoro timer with XP bonuses. Block distractions and maximize your study sessions.",
    color: "#FF8C00",
  },
];

const LEADERBOARD_PREVIEW = [
  { rank: 1, name: "Rahima Sultana", district: "Dhaka", xp: 48750, level: 42 },
  { rank: 2, name: "Ariful Islam", district: "Chittagong", xp: 45200, level: 39 },
  { rank: 3, name: "Nusrat Jahan", district: "Sylhet", xp: 41800, level: 37 },
  { rank: 4, name: "Tanvir Ahmed", district: "Rajshahi", xp: 38500, level: 35 },
  { rank: 5, name: "Fatema Khanam", district: "Khulna", xp: 35100, level: 32 },
];

const TESTIMONIALS = [
  {
    name: "Rafiqul Islam",
    exam: "SSC 2024 - GPA 5.00",
    text: "Study RPG made learning addictive! I studied every single day because I didn't want to break my streak.",
    avatar: "R",
    color: "#39FF14",
  },
  {
    name: "Sumaiya Akter",
    exam: "HSC 2024 - GPA 5.00",
    text: "The AI tutor explained hard Chemistry concepts in Bangla so clearly. Got A+ in Chemistry!",
    avatar: "S",
    color: "#00F0FF",
  },
  {
    name: "Mehedi Hasan",
    exam: "Dhaka University - Admitted",
    text: "The competitive leaderboard kept me motivated to study more. Highly recommend for admission prep!",
    avatar: "M",
    color: "#BF5FFF",
  },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-neon-primary">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="font-black text-xl text-white">Study RPG</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started →</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10 py-20">
          {/* Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4 fill-primary" />
            Bangladesh&apos;s #1 Gamified Study Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 leading-none"
          >
            STUDY LIKE A{" "}
            <br />
            <span className="text-gradient">LEGEND</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-4"
          >
            পড়াশোনাকে গেমের মতো মজাদার করো। XP অর্জন করো, লেভেল আপ করো,
            বন্ধুদের সাথে প্রতিযোগিতা করো এবং SSC/HSC তে দুর্দান্ত ফলাফল করো।
          </motion.p>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-sm text-gray-600 mb-10"
          >
            Turn studying into an addictive RPG adventure. Earn XP, unlock achievements, defeat your rivals.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button size="lg" className="text-base px-8">
                <Zap className="w-5 h-5" />
                Start Your Journey — Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="lg" className="text-base">
                <Play className="w-5 h-5" />
                Continue as Guest
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass-card p-4 text-center"
              >
                <p className="text-3xl font-black text-gradient">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                <p className="text-xs text-gray-600">{stat.labelBn}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Everything You Need to
              <br />
              <span className="text-gradient">Dominate Your Exams</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Built for Bangladeshi students. Designed for results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-card p-6 group cursor-default border transition-all duration-300"
                style={{ borderColor: `${feature.color}15` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${feature.color}15`, color: feature.color, boxShadow: `0 0 20px ${feature.color}20` }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-sm font-medium mb-2" style={{ color: feature.color }}>{feature.titleBn}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-mono text-secondary tracking-widest uppercase mb-3">Leaderboard</p>
            <h2 className="text-4xl font-black text-white mb-3">
              <span className="text-gradient-purple">Who&apos;s on Top?</span>
            </h2>
            <p className="text-gray-500">Real-time rankings updated every hour</p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden"
          >
            <div className="p-4 border-b border-white/5 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="font-bold text-white">Global Leaderboard</span>
              <span className="ml-auto text-xs text-gray-500">This week</span>
            </div>
            {LEADERBOARD_PREVIEW.map((entry, i) => (
              <motion.div
                key={entry.rank}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                  entry.rank === 1 ? "bg-gold/20 text-gold" :
                  entry.rank === 2 ? "bg-gray-400/20 text-gray-400" :
                  entry.rank === 3 ? "bg-amber-600/20 text-amber-600" :
                  "bg-white/5 text-gray-500"
                }`}>
                  {entry.rank === 1 ? "👑" : entry.rank}
                </div>
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                  {entry.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{entry.name}</p>
                  <p className="text-xs text-gray-500">{entry.district} · LV.{entry.level}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{entry.xp.toLocaleString()} XP</p>
                </div>
              </motion.div>
            ))}
            <div className="p-4 text-center">
              <Link href="/signup">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Join & Compete
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-mono text-gold tracking-widest uppercase mb-3">Success Stories</p>
            <h2 className="text-4xl font-black text-white mb-3">
              Students Love <span className="text-gradient-gold">Study RPG</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 border"
                style={{ borderColor: `${t.color}20` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-black text-lg border-2"
                    style={{ borderColor: t.color, background: `${t.color}15`, color: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-xs" style={{ color: t.color }}>{t.exam}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">&quot;{t.text}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">⚡</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              Ready to Level Up?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto">
              তোমার পড়াশোনার যাত্রা শুরু করো আজই।
              <br />
              সম্পূর্ণ বিনামূল্যে!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-10">
                  <Zap className="w-6 h-6" />
                  শুরু করো — এখনই!
                </Button>
              </Link>
              <Link href="/login?guest=true">
                <Button variant="ghost" size="lg" className="text-lg px-10">
                  <Users className="w-5 h-5" />
                  Guest Mode
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 glass">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-primary" />
            <span className="font-black text-xl">Study RPG</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Built with ❤️ for Bangladeshi students · SSC · HSC · University
          </p>
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} Study RPG. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
