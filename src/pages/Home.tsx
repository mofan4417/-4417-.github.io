import { useEffect, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Trophy, Zap, MessageSquare, Share2, Globe, MousePointer2 } from 'lucide-react';
import { api } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useGameStore } from '../store/useGameStore';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Recommender from '../components/gamification/Recommender';
import MissionsModal from '../components/gamification/MissionsModal';
import ActivityWall from '../components/gamification/ActivityWall';
import Leaderboard from '../components/gamification/Leaderboard';
import ShareCard from '../components/gamification/ShareCard';
import MagneticButton from '../components/visual/MagneticButton';
import VoiceSearch from '../components/visual/VoiceSearch';

import Lottie from 'lottie-react';
import statsAnimation from '../assets/stats-animation.json'; // We'll need to create or find this

const DataCard = ({ item, index, y }: { item: any, index: number, y: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1 }}
      className="bg-white/5 backdrop-blur-[40px] border border-white/10 p-8 rounded-[40px] group hover:bg-white/10 transition-all hover:border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.3)] relative overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform duration-500 shadow-inner" style={{ color: item.color }}>
            {item.icon}
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Live Sync</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-5xl font-black mb-1 tracking-tighter flex items-baseline gap-1">
            <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              {item.value}
            </span>
          </div>
          <div className="text-[11px] font-black text-[#F3DDE4]/40 uppercase tracking-[0.2em]">{item.label}</div>
        </div>

        {/* Mini Lottie/Visualizer */}
        <div className="mt-8 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Lottie 
            animationData={statsAnimation} 
            loop={true} 
            className="w-full h-full opacity-20 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [content, setContent] = useState<any>({});
  const [stats, setStats] = useState<any>({ total_served: 0, total_hours: 0, total_villages: 0, page_views: 0 });
  const [loading, setLoading] = useState(true);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Gamification states
  const { addPoints, unlockAchievement, completeMission, level, points, achievements, xp, xpToNextLevel } = useGameStore();
  const [showRecommender, setShowRecommender] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    // 首次访问成就
    unlockAchievement('first_visit');
    // 每日签到任务
    completeMission('daily_login');
  }, []);

  const handleVoiceResult = (text: string) => {
    console.log('Voice Search Result:', text);
    // 模拟搜索跳转
    if (text.includes('环境') || text.includes('环保')) {
      navigate('/service-objects?q=环保');
    } else {
      navigate(`/service-objects?q=${text}`);
    }
  };

  const formatViews = (value: number) => {
    if (!Number.isFinite(value) || value < 0) return '0';
    if (value >= 10000) {
      const wan = value / 10000;
      const text = wan >= 100 ? Math.round(wan).toString() : wan.toFixed(1);
      return `${text}万`;
    }
    return new Intl.NumberFormat('zh-CN').format(Math.floor(value));
  };

  const displayPageViews = (() => {
    const raw = Number(stats.page_views);
    const base = Number.isFinite(raw) ? raw : 0;
    const offset = Number(content.page_views_offset) || 0;
    return Math.max(0, base + offset);
  })();

  useEffect(() => {
    const initHome = async () => {
      try {
        setLoading(true);
        await api.incrementView().catch(err => console.error('Stats error:', err));
        const [contentData, statsData] = await Promise.all([
          api.getSiteContent().catch(() => ({})),
          api.getStats().catch(() => ({ total_served: 156, total_hours: 2340, total_villages: 12, page_views: 0 }))
        ]);
        setContent(contentData);
        setStats(statsData);
      } catch (err) {
        console.error('Failed to init home:', err);
      } finally {
        setLoading(false);
      }
    };
    initHome();
  }, []);

  const heroCoverSrc = (() => {
    const direct = typeof content?.hero_image === 'string' ? content.hero_image.trim() : '';
    if (direct) return direct;
    const list = content?.hero_images;
    if (Array.isArray(list) && list.length > 0 && typeof list[0] === 'string') return list[0].trim();
    return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920&auto=format&fit=crop';
  })();

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden selection:bg-[#8B0000] selection:text-white">
      <VoiceSearch onResult={handleVoiceResult} />
      
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section V3 */}
        <section className="relative h-screen flex items-center justify-center px-4 md:px-24 overflow-hidden">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full aspect-video max-h-[80vh] overflow-hidden">
            <img
              src={heroCoverSrc}
              alt="封面图"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0505]/70 via-transparent to-[#0A0505]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,0,0,0.25)_0%,_transparent_60%)]" />
          </div>

          <motion.div style={{ y: y1, opacity }} className="text-center space-y-12 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(139,0,0,0.2)]"
            >
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#F3DDE4]/60">{t('welcome')}</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-7xl md:text-9xl font-black tracking-tighter leading-none"
              >
                {t('welcome')} <br />
                <span className="bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#722F37] bg-clip-text text-transparent italic">{t('slogan')}</span>
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-[#F3DDE4]/40 font-medium max-w-2xl mx-auto leading-relaxed"
              >
                {t('hero_desc')}
              </motion.p>
            </div>

            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8"
            >
              <MagneticButton onClick={() => navigate('/register')}>
                {t('join_now')}
              </MagneticButton>
              
              <button 
                onClick={() => setShowRecommender(true)}
                className="group flex items-center gap-4 text-sm font-black uppercase tracking-widest text-[#F3DDE4]/60 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#8B0000] transition-colors">
                  <MousePointer2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                {t('ai_match')}
              </button>
            </motion.div>
          </motion.div>

          {/* Floating Glassmorphism Data Cards */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-24 left-0 right-0 px-4 md:px-24 hidden lg:grid grid-cols-3 gap-8"
          >
            {[
              { label: t('online_volunteers'), value: '1,284', icon: <Globe className="w-5 h-5" />, color: '#8B0000' },
              { label: t('total_hours'), value: '45,920h', icon: <Zap className="w-5 h-5" />, color: '#D4AF37' },
              { label: t('ongoing_tasks'), value: '342', icon: <Trophy className="w-5 h-5" />, color: '#722F37' }
            ].map((item, i) => (
              <DataCard key={i} item={item} index={i} y={y2} />
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Gamification Modals */}
      <AnimatePresence>
        {showRecommender && <Recommender onClose={() => setShowRecommender(false)} />}
        {showMissions && <MissionsModal onClose={() => setShowMissions(false)} />}
        {showShare && (
          <ShareCard 
            onClose={() => setShowShare(false)} 
            userData={{
              name: '志愿者',
              level: level,
              points: points,
              unlockedCount: achievements.filter(a => a.unlocked).length
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
