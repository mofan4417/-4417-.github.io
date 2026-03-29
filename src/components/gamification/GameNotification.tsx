import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Star, Trophy, Zap } from 'lucide-react';

const GameNotification = () => {
  const { points, level, achievements } = useGameStore();
  const [notif, setNotif] = React.useState<{ id: string, type: 'points' | 'achievement' | 'level', text: string } | null>(null);

  // Monitor points change
  useEffect(() => {
    if (points > 0) {
      setNotif({ id: Math.random().toString(), type: 'points', text: `+${points} 积分` });
      const timer = setTimeout(() => setNotif(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [points]);

  // Monitor level change
  useEffect(() => {
    if (level > 1) {
      setNotif({ id: Math.random().toString(), type: 'level', text: `恭喜升级到 LV.${level}` });
      const timer = setTimeout(() => setNotif(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [level]);

  // Monitor achievements
  useEffect(() => {
    const unlocked = achievements.filter(a => a.unlocked);
    if (unlocked.length > 0) {
      const lastUnlocked = unlocked[unlocked.length - 1];
      setNotif({ id: Math.random().toString(), type: 'achievement', text: `解锁成就：${lastUnlocked.title}` });
      const timer = setTimeout(() => setNotif(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [achievements]);

  return (
    <AnimatePresence>
      {notif && (
        <motion.div
          key={notif.id}
          initial={{ y: -50, opacity: 0, x: '-50%' }}
          animate={{ y: 50, opacity: 1, x: '-50%' }}
          exit={{ y: -50, opacity: 0, x: '-50%' }}
          className="fixed top-0 left-1/2 z-[100] bg-gradient-to-r from-[#E84C4C] to-[#F9D8C6] p-[1px] rounded-full shadow-[0_0_20px_rgba(232,76,76,0.3)]"
        >
          <div className="bg-[#2B0B0B] px-8 py-3 rounded-full flex items-center gap-4">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              {notif.type === 'points' && <Star className="w-4 h-4 text-[#F9D8C6]" />}
              {notif.type === 'level' && <Zap className="w-4 h-4 text-[#F9D8C6]" />}
              {notif.type === 'achievement' && <Trophy className="w-4 h-4 text-[#F9D8C6]" />}
            </div>
            <span className="font-black text-sm tracking-widest text-white uppercase">{notif.text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameNotification;
