import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, User, School, Phone, Clock, FileText, Heart, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { api } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useGameStore } from '../store/useGameStore';
import CoverHero from '../components/visual/CoverHero';

const JoinUs = () => {
  const { addPoints, unlockAchievement } = useGameStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [siteContent, setSiteContent] = useState<any>({});
  const [formData, setFormData] = useState({
    name: '',
    college_major: '',
    phone: '',
    available_time: '周末',
    object_code: '',
    reason: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const object_code = params.get('object');
    if (object_code) {
      setFormData(prev => ({ ...prev, object_code }));
    }
  }, [location]);

  useEffect(() => {
    api.getSiteContent().then(setSiteContent).catch(() => setSiteContent({}));
  }, []);

  const coverSrc = (() => {
    const direct = typeof siteContent?.hero_image === 'string' ? siteContent.hero_image.trim() : '';
    if (direct) return direct;
    const list = siteContent?.hero_images;
    if (Array.isArray(list) && list.length > 0 && typeof list[0] === 'string') return list[0].trim();
    return 'https://images.unsplash.com/photo-1508847154043-be13a0a245d2?q=80&w=1920&auto=format&fit=crop';
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('volunteer_applications')
        .insert([{
          name: formData.name,
          college_major: formData.college_major,
          phone: formData.phone,
          available_time: formData.available_time,
          object_code: formData.object_code,
          reason: formData.reason,
          status: 'pending'
        }]);

      if (error) throw error;
      
      addPoints(100);
      unlockAchievement('helper');
      setIsSubmitted(true);
      // 同时模拟发送邮件通知管理者的逻辑（实际需要后端支持）
      console.log('正在通知管理者：新志愿者申请来自', formData.name);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Failed to submit application:', err);
      alert('提交失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center px-4 font-sans text-white">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[40px] p-12 text-center animate-in fade-in zoom-in duration-500 shadow-2xl backdrop-blur-md">
          <div className="w-24 h-24 bg-[#D4AF37]/15 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg shadow-black/20 border border-white/10">
            <CheckCircle2 className="w-14 h-14" />
          </div>
          <h2 className="text-4xl font-bold mb-6">提交成功！</h2>
          <p className="text-white/50 mb-12 leading-relaxed text-lg">
            感谢您加入乡助桥！您的申请已收到。我们将在3个工作日内联系您进行面试，请保持手机畅通。
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-[#8B0000] to-[#722F37] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-black/20 text-lg border border-white/10"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-[#8B0000] selection:text-white">
      <Navbar />
      
      <CoverHero
        src={coverSrc}
        alt="封面图"
        eyebrow="加入我们"
        title="加入我们"
        subtitle="成为志愿者，为乡村留守者点亮一束光。您的每一分钟陪伴，对他们来说都是珍贵的礼物。"
      />

      <div className="pb-32 px-4 md:px-24 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-start">
          <div className="flex-1 space-y-16 animate-fade-in">
            <div className="space-y-12">
              <section className="space-y-8">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <div className="w-2 h-8 bg-[#8B0000] rounded-full shadow-lg shadow-black/20"></div>
                  志愿者要求
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-6 bg-white/5 p-8 rounded-[32px] border border-white/10 hover:bg-white/10 transition-colors group">
                    <div className="p-4 bg-[#D4AF37]/10 rounded-2xl group-hover:scale-110 transition-transform border border-white/10">
                      <Heart className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <div>
                      <div className="font-bold text-xl mb-2 text-white">有爱心、有耐心</div>
                      <p className="opacity-50 leading-relaxed text-sm">能够真诚对待每一位服务对象，倾听他们的心声。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 bg-white/5 p-8 rounded-[32px] border border-white/10 hover:bg-white/10 transition-colors group">
                    <div className="p-4 bg-[#D4AF37]/10 rounded-2xl group-hover:scale-110 transition-transform border border-white/10">
                      <Clock className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <div>
                      <div className="font-bold text-xl mb-2 text-white">稳定的服务时间</div>
                      <p className="opacity-50 leading-relaxed text-sm">每周能抽出至少1小时进行线上或线下陪伴。</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <div className="w-2 h-8 bg-[#8B0000] rounded-full shadow-lg shadow-black/20"></div>
                  志愿者权益
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    '志愿服务证明',
                    '社会实践经历',
                    '优秀志愿者证书',
                    '专业技能培训',
                    '团队拓展活动',
                    '心理健康指导'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 opacity-70 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm text-sm font-medium">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-lg shadow-black/30"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="lg:w-[500px] shrink-0 w-full animate-fade-in-right">
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#8B0000]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <h3 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
                <div className="w-10 h-10 bg-[#D4AF37] text-[#0A0505] rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
                  <Send className="w-5 h-5" />
                </div>
                报名表单
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                      <User className="w-3.5 h-3.5" /> 姓名
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="您的真实姓名"
                      className="w-full bg-[#0A0505]/60 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all text-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                      <School className="w-3.5 h-3.5" /> 学院/专业
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="如：人工智能"
                      className="w-full bg-[#0A0505]/60 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all text-sm"
                      value={formData.college_major}
                      onChange={(e) => setFormData({ ...formData, college_major: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                    <Phone className="w-3.5 h-3.5" /> 联系电话
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="请输入手机号"
                  className="w-full bg-[#0A0505]/60 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                      <Clock className="w-3.5 h-3.5" /> 可服务时间
                    </label>
                    <select
                      className="w-full bg-[#0A0505]/60 border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all appearance-none cursor-pointer text-sm"
                      value={formData.available_time}
                      onChange={(e) => setFormData({ ...formData, available_time: e.target.value })}
                    >
                      <option value="周末" className="bg-[#0A0505]">周末</option>
                      <option value="工作日晚上" className="bg-[#0A0505]">工作日晚上</option>
                      <option value="周一至周五" className="bg-[#0A0505]">周一至周五</option>
                      <option value="全天候" className="bg-[#0A0505]">全天候</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                      <FileText className="w-3.5 h-3.5" /> 认领对象编号
                    </label>
                    <input
                      type="text"
                      placeholder="选填，如 S001"
                      className="w-full bg-[#0A0505]/60 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all font-mono text-sm"
                      value={formData.object_code}
                      onChange={(e) => setFormData({ ...formData, object_code: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                    <Heart className="w-3.5 h-3.5" /> 申请初心
                  </label>
                  <textarea
                    rows={4}
                    placeholder="简单描述您为什么要加入我们..."
                    className="w-full bg-[#0A0505]/60 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all resize-none text-sm leading-relaxed"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#8B0000] to-[#722F37] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)] text-white font-black py-6 rounded-2xl transition-all flex items-center justify-center gap-4 text-lg shadow-xl shadow-black/20 mt-4 group disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                >
                  {loading ? '正在提交...' : '确认提交报名'}
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JoinUs;
