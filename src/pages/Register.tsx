import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Heart, Sparkles, Trophy, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useGameStore } from '../store/useGameStore';
import Navbar from '../components/Navbar';

const Register = () => {
  const navigate = useNavigate();
  const { addPoints, unlockAchievement } = useGameStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return false;
    }
    if (formData.password.length < 6) {
      setError('密码长度至少为 6 位');
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            phone: formData.phone,
            level: 1,
            role: 'volunteer'
          }
        }
      });

      if (signUpError) throw signUpError;

      // 注册奖励
      addPoints(50);
      unlockAchievement('first_visit');
      
      navigate('/login?registered=true');
    } catch (err: any) {
      setError(err.message || '注册失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex flex-col selection:bg-[#8B0000] selection:text-white">
      <Navbar />
      
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A0707] via-[#0A0505] to-black opacity-90" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8B0000]/12 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" 
        />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#722F37]/8 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Illustration & Text Side */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:block space-y-12"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#8B0000]/15 px-4 py-2 rounded-full border border-white/10 text-[#D4AF37] text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-4 h-4" /> 加入乡助桥
              </div>
              <h1 className="text-6xl font-black text-white leading-tight">
                开启您的<br />
                <span className="bg-gradient-to-r from-[#8B0000] to-[#D4AF37] bg-clip-text text-transparent">公益元宇宙</span>
              </h1>
              <p className="text-xl text-[#F3DDE4]/60 font-medium leading-relaxed max-w-md">
                通过游戏化的方式参与乡村振兴，让每一份爱心都能被看见、被记录、被奖赏。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                  <Heart className="w-6 h-6 text-[#8B0000]" />
                </div>
                <h3 className="font-black text-white uppercase tracking-tight">爱心认领</h3>
                <p className="text-sm text-[#F3DDE4]/40 leading-relaxed">一对一精准匹配，陪伴留守老人与儿童。</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                  <Trophy className="w-6 h-6 text-[#FFD700]" />
                </div>
                <h3 className="font-black text-white uppercase tracking-tight">荣誉体系</h3>
                <p className="text-sm text-[#F3DDE4]/40 leading-relaxed">9级志愿者成长体系，解锁专属勋章与头衔。</p>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1A0707]/60 backdrop-blur-[40px] border border-white/10 rounded-[48px] p-10 md:p-16 shadow-[0_32px_64px_rgba(0,0,0,0.5)] relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#722F37] group-hover:animate-shimmer" />
            
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">注册新账号</h2>
              <p className="text-[#F3DDE4]/40 text-sm font-medium">即刻加入，开启您的 LV.1 萤火初现之旅</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#F3DDE4]/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <User className="w-3 h-3" /> 用户名
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="您的昵称"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all font-medium placeholder:text-white/20"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#F3DDE4]/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Mail className="w-3 h-3" /> 电子邮箱
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all font-medium placeholder:text-white/20"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#F3DDE4]/40 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Phone className="w-3 h-3" /> 手机号码
                </label>
                <input
                  required
                  type="tel"
                  placeholder="138xxxx8888"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all font-medium placeholder:text-white/20"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#F3DDE4]/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Lock className="w-3 h-3" /> 登录密码
                  </label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="至少 6 位"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all font-medium pr-14 placeholder:text-white/20"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#F3DDE4]/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> 确认密码
                  </label>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="重复输入密码"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all font-medium placeholder:text-white/20"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl font-bold flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-[#8B0000] to-[#722F37] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)] text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed group border border-white/10"
              >
                {loading ? '正在注册...' : '立即开启志愿之旅'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[#F3DDE4]/30 text-xs font-bold uppercase tracking-widest">
                已经有账号了？ 
                <Link to="/login" className="text-[#D4AF37] hover:text-white transition-colors ml-2">立即登录</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Register;
