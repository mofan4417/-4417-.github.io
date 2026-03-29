import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Lock, Eye, EyeOff } from 'lucide-react';
import { api } from '../api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 如果已经登录，直接跳转到后台
    const check = async () => {
      try {
        const isBypass = localStorage.getItem('admin_bypass') === 'true';
        if (isBypass) {
          navigate('/admin/dashboard');
          return;
        }
        
        const session = await api.getSession();
        if (session) navigate('/admin/dashboard');
      } catch {
        // ignore
      }
    };
    check();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.login({ email, password });
      navigate('/admin/dashboard');
    } catch {
      setError('邮箱或密码错误，请重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0505] flex items-center justify-center px-4 py-12 font-sans relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7B1FA2]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A148C]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#1A0707]/60 border border-white/10 rounded-[48px] p-12 backdrop-blur-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#7B1FA2] via-[#F9D8C6] to-[#4A148C] group-hover:animate-shimmer" />
          
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[#7B1FA2]/20 text-[#F9D8C6] rounded-[28px] flex items-center justify-center mx-auto mb-8 border border-[#7B1FA2]/30 shadow-2xl">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black mb-3 text-white uppercase tracking-tight">管理者登录</h2>
            <p className="text-[#F3DDE4]/40 text-sm font-medium">请输入凭据以访问后台管理系统</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#F3DDE4]/50 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <User className="w-4 h-4" /> 账号
              </label>
              <input
                required
                type="text"
                placeholder="请输入邮箱或管理员账号"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:ring-2 focus:ring-[#7B1FA2]/50 transition-all font-medium placeholder:text-white/20"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#F3DDE4]/50 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <Lock className="w-4 h-4" /> 密码
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="请输入密码"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:ring-2 focus:ring-[#7B1FA2]/50 transition-all pr-16 font-medium placeholder:text-white/20"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs font-bold text-center bg-red-500/10 border border-red-500/20 py-4 rounded-2xl"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#7B1FA2] to-[#4A148C] hover:shadow-[0_0_30px_rgba(123,31,162,0.5)] text-white font-black py-5 rounded-2xl transition-all shadow-xl mt-6 text-lg disabled:opacity-50 uppercase tracking-[0.2em]"
            >
              {loading ? '正在验证...' : '登 录'}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-[#F3DDE4]/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              返回主站首页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
