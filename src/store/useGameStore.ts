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

interface GameState {
  points: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  achievements: Achievement[];
  missions: Mission[];
  
  // Actions
  addPoints: (amount: number) => void;
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
      xp: 0,
      xpToNextLevel: 100,
      achievements: INITIAL_ACHIEVEMENTS,
      missions: INITIAL_MISSIONS,

      addPoints: (amount) => {
        set((state) => {
          let newXp = state.xp + amount;
          let newLevel = state.level;
          let newXpToNextLevel = state.xpToNextLevel;

          while (newXp >= newXpToNextLevel) {
            newXp -= newXpToNextLevel;
            newLevel += 1;
            newXpToNextLevel = Math.floor(newXpToNextLevel * 1.2);
            
            // Level up celebration
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 }
            });

            // Check for level achievements
            if (newLevel >= 5) {
              const achievements = state.achievements.map(a => 
                a.id === 'level_5' ? { ...a, unlocked: true } : a
              );
              return { ...state, level: newLevel, xp: newXp, xpToNextLevel: newXpToNextLevel, points: state.points + amount, achievements };
            }
          }

          return { points: state.points + amount, xp: newXp, level: newLevel, xpToNextLevel: newXpToNextLevel };
        });
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
