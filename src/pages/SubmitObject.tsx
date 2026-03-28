import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Heart, MapPin, Phone, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../api';

const SubmitObject = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'child' as 'child' | 'elderly',
    age: 10,
    village: '',
    situation: '',
    needs: '',
    contact_name: '',
    contact_phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitObjectRequest({
        type: formData.type,
        age: formData.age,
        village: formData.village,
        situation: formData.situation,
        needs: formData.needs,
        contact_name: formData.contact_name || null,
        contact_phone: formData.contact_phone || null,
      });
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Failed to submit object request:', err);
      alert('提交失败，请检查网络连接后重试');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#2B0B0B] flex items-center justify-center px-4 font-sans text-[#F3DDE4]">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[40px] p-12 text-center shadow-2xl backdrop-blur-md">
          <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-500/10">
            <CheckCircle2 className="w-14 h-14" />
          </div>
          <h2 className="text-4xl font-bold mb-6">提交成功！</h2>
          <p className="opacity-60 mb-12 leading-relaxed text-lg">
            感谢您提供信息，我们会在后台进行审核，审核通过后将展示到“服务对象”列表。
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/service-objects')}
              className="w-full bg-[#F9D8C6] hover:bg-white text-[#2B0B0B] font-bold py-5 rounded-2xl transition-all shadow-xl shadow-black/20 text-lg"
            >
              返回服务对象
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-white/10 hover:bg-white/20 text-[#F3DDE4] font-bold py-5 rounded-2xl transition-all border border-white/20 text-lg"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2B0B0B] text-[#F3DDE4] font-sans selection:bg-[#F9D8C6] selection:text-[#2B0B0B]">
      <Navbar />

      <div className="pt-24 pb-32 px-4 md:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">添加需要帮助的人</h2>
            <p className="text-lg md:text-xl opacity-60 leading-relaxed max-w-3xl mx-auto">
              如果您是乡政府工作人员或家属，欢迎提交留守儿童/老人信息。所有信息仅用于审核与匹配服务，展示时会做匿名化处理。
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[48px] p-8 md:p-12 shadow-2xl backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold opacity-40 uppercase tracking-widest px-1">对象类型</label>
                  <select
                    className="w-full bg-[#1A0707] border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#F9D8C6]/50 transition-all appearance-none cursor-pointer"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  >
                    <option value="child" className="bg-[#1A0707]">留守儿童</option>
                    <option value="elderly" className="bg-[#1A0707]">留守老人</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold opacity-40 uppercase tracking-widest px-1">年龄</label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={149}
                    className="w-full bg-[#1A0707] border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#F9D8C6]/50 transition-all"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value || '0', 10) })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                  <MapPin className="w-3.5 h-3.5" /> 所在村庄
                </label>
                <input
                  required
                  type="text"
                  placeholder="如：XX镇XX村"
                  className="w-full bg-[#1A0707] border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#F9D8C6]/50 transition-all"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Heart className="w-3.5 h-3.5" /> 基本情况
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="如：父母常年外出务工，由爷爷奶奶照顾..."
                  className="w-full bg-[#1A0707] border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#F9D8C6]/50 transition-all resize-none"
                  value={formData.situation}
                  onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Heart className="w-3.5 h-3.5" /> 主要需求
                </label>
                <input
                  required
                  type="text"
                  placeholder="如：情感陪伴、学业辅导、数字助老..."
                  className="w-full bg-[#1A0707] border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#F9D8C6]/50 transition-all"
                  value={formData.needs}
                  onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                    <User className="w-3.5 h-3.5" /> 联系人（选填）
                  </label>
                  <input
                    type="text"
                    placeholder="如：家属/村干部姓名"
                    className="w-full bg-[#1A0707] border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#F9D8C6]/50 transition-all"
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold opacity-40 uppercase tracking-widest flex items-center gap-2 px-1">
                    <Phone className="w-3.5 h-3.5" /> 联系电话（选填）
                  </label>
                  <input
                    type="tel"
                    placeholder="用于审核沟通，不公开展示"
                    className="w-full bg-[#1A0707] border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#F9D8C6]/50 transition-all"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-[#F9D8C6] hover:bg-white text-[#2B0B0B] font-bold py-6 rounded-2xl transition-all shadow-xl shadow-black/20 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '正在提交...' : '提交审核'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitObject;

