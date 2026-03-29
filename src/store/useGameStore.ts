import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import confetti from 'canvas-confetti';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  type: 'visit' | 'action' | 'level';
}

export interface Mission {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  type: 'daily' | 'once';
}

export interface LevelInfo {
  level: number;
  title: string;
  color: string;
  badge: string;
  effect?: string;
}

export const LEVEL_HIERARCHY: Record<number, LevelInfo> = {
  1: { level: 1, title: '萤火初现', color: 'from-gray-400 to-slate-500', badge: '🕯️' },
  2: { level: 2, title: '溪涧微光', color: 'from-blue-300 to-cyan-500', badge: '💧' },
  3: { level: 3, title: '晨曦之愿', color: 'from-yellow-200 to-orange-400', badge: '🌅' },
  4: { level: 4, title: '星河守护', color: 'from-indigo-400 to-purple-600', badge: '🌌' },
  5: { level: 5, title: '月辉信使', color: 'from-emerald-300 to-teal-600', badge: '🌙' },
  6: { level: 6, title: '暖阳先驱', color: 'from-amber-300 to-orange-600', badge: '☀️' },
  7: { level: 7, title: '炽焰导师', color: 'from-red-400 to-rose-700', badge: '🔥' },
  8: { level: 8, title: '极光统领', color: 'from-cyan-300 via-purple-400 to-pink-500', badge: '🌈', effect: 'animate-pulse' },
  9: { level: 9, title: '永恒光冕', color: 'from-yellow-400 via-amber-500 to-yellow-600', badge: '👑', effect: 'animate-bounce shadow-[0_0_20px_rgba(255,215,0,0.6)]' },
};

interface GameState {
  points: number;
  level: number;
  isAdmin: boolean;
  xp: number;
  xpToNextLevel: number;
  achievements: Achievement[];
  missions: Mission[];
  
  // Actions
  addPoints: (amount: number) => void;
  setAdminStatus: (status: boolean) => void;
  unlockAchievement: (id: string) => void;
  completeMission: (id: string) => void;
  resetDailyMissions: () => void;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_visit', title: '初来乍到', description: '第一次访问乡助桥', icon: '🌟', unlocked: false, type: 'visit' },
  { id: 'reader', title: '博学多才', description: '查看了服务成果', icon: '📖', unlocked: false, type: 'action' },
  { id: 'helper', title: '热心肠', description: '提交了志愿者申请', icon: '❤️', unlocked: false, type: 'action' },
  { id: 'level_5', title: '进阶志愿者', description: '达到5级', icon: '🏆', unlocked: false, type: 'level' },
];

const INITIAL_MISSIONS: Mission[] = [
  { id: 'daily_login', title: '每日签到', points: 10, completed: false, type: 'daily' },
  { id: 'explore_objects', title: '浏览服务对象', points: 20, completed: false, type: 'daily' },
  { id: 'read_results', title: '了解服务成果', points: 15, completed: false, type: 'daily' },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      points: 0,
      level: 1,
      isAdmin: false,
      xp: 0,
      xpToNextLevel: 100,
      achievements: INITIAL_ACHIEVEMENTS,
      missions: INITIAL_MISSIONS,

      addPoints: (amount) => {
        set((state) => {
          let newXp = state.xp + amount;
          let newLevel = state.level;
          let newXpToNextLevel = state.xpToNextLevel;

          while (newXp >= newXpToNextLevel && newLevel < 9) {
            newXp -= newXpToNextLevel;
            newLevel += 1;
            newXpToNextLevel = Math.floor(newXpToNextLevel * 1.5);
            
            // Level up celebration
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#FFD700', '#FFA500', '#FFFFFF']
            });
          }

          // Admin override
          if (state.isAdmin) newLevel = 9;

          return { points: state.points + amount, xp: newXp, level: newLevel, xpToNextLevel: newXpToNextLevel };
        });
      },

      setAdminStatus: (status) => {
        set({ isAdmin: status, level: status ? 9 : get().level });
      },

      unlockAchievement: (id) => {
        const state = get();
        const achievement = state.achievements.find(a => a.id === id);
        if (achievement && !achievement.unlocked) {
          set({
            achievements: state.achievements.map(a => 
              a.id === id ? { ...a, unlocked: true } : a
            )
          });
          // Achievement celebration
          confetti({
            particleCount: 100,
            spread: 160,
            colors: ['#F9D8C6', '#E84C4C']
          });
        }
      },

      completeMission: (id) => {
        const state = get();
        const mission = state.missions.find(m => m.id === id);
        if (mission && !mission.completed) {
          state.addPoints(mission.points);
          set({
            missions: state.missions.map(m => 
              m.id === id ? { ...m, completed: true } : m
            )
          });
        }
      },

      resetDailyMissions: () => {
        set({
          missions: INITIAL_MISSIONS
        });
      }
    }),
    {
      name: 'xiangzhuqiao-game-storage',
    }
  )
);
