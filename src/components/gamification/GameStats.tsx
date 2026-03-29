import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Trophy, Star, Zap, Target } from 'lucide-react';

import { LEVEL_HIERARCHY } from '../../store/useGameStore';

const GameStats = () => {
  const { points, level, xp, xpToNextLevel, achievements } = useGameStore();
  const currentLevelInfo = LEVEL_HIERARCHY[level] || LEVEL_HIERARCHY[1];
  const progress = (xp / xpToNextLevel) * 100;
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed top-24 right-8 z-40 hidden lg:flex flex-col gap-4">
      {/* XP & Level Card */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-[#2B0B0B]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl w-72"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={currentLevelInfo.effect ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`w-12 h-12 bg-gradient-to-br ${currentLevelInfo.color} text-[#2B0B0B] rounded-xl flex items-center justify-center font-black text-2xl shadow-lg relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              <span className="relative z-10">{currentLevelInfo.badge}</span>
            </motion.div>
            <div>
              <div className="text-[10px] text-[#F3DDE4]/40 uppercase tracking-widest font-bold">LV.{level}</div>
              <div className={`text-sm font-black bg-gradient-to-r ${currentLevelInfo.color} bg-clip-text text-transparent`}>
                {currentLevelInfo.title}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-[#F3DDE4]/40 uppercase tracking-widest font-bold">积分</div>
            <div className="text-xl font-black text-white">{points}</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-[#F3DDE4]/60">
            <span>经验值 (XP)</span>
            <span>{Math.floor(xp)} / {xpToNextLevel}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#E84C4C] to-[#F9D8C6] rounded-full shadow-[0_0_10px_rgba(232,76,76,0.5)]"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#F9D8C6]" />
            <span className="text-xs font-bold">{unlockedCount} 个成就</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#F9D8C6]" />
            <span className="text-xs font-bold">排名 128</span>
          </div>
        </div>
      </motion.div>

      {/* Daily Challenges Quick View */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-[#2B0B0B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-[#F9D8C6]" />
          <h3 className="text-xs font-bold uppercase tracking-widest">今日挑战</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#F3DDE4]/60">完成每日签到</span>
            <CheckCircle isCompleted={true} />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#F3DDE4]/60">了解服务成果</span>
            <CheckCircle isCompleted={false} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CheckCircle = ({ isCompleted }: { isCompleted: boolean }) => (
  <div className={`w-4 h-4 rounded-full border ${isCompleted ? 'bg-[#E84C4C] border-[#E84C4C] flex items-center justify-center' : 'border-white/20'}`}>
    {isCompleted && (
      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )}
  </div>
);

export default GameStats;
