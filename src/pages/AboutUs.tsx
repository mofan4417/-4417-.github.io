import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, GraduationCap, Heart, ShieldCheck } from 'lucide-react';

const AboutUs = () => {
  const team = [
    {
      name: '刘佳阳',
      role: '项目负责人 / 技术负责人',
      desc: '宜宾学院人工智能大一学生，负责平台整体规划、系统开发与技术架构。',
      icon: <GraduationCap className="w-8 h-8" />
    },
    {
      name: '黄友鑫',
      role: '运营负责人',
      desc: '宜宾学院人工智能大一学生，富有爱心，负责志愿者招募与社区运营。',
      icon: <Heart className="w-8 h-8" />
    },
    {
      name: '许涧',
      role: '指导老师',
      desc: '宜宾学院人工智能与大数据学部创新创业教研室主任，提供专业指导。',
      icon: <ShieldCheck className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#333] font-sans">
      <Navbar />
      
      <div className="pt-24 pb-32 px-4 md:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-5xl font-bold">关于我们</h2>
          <p className="text-xl text-black/50">来自宜宾学院的青年力量，用技术温暖乡村</p>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {team.map((member, index) => (
            <div key={index} className="bg-black/5 rounded-[40px] p-12 text-center space-y-6 hover:bg-[#F6A9B6]/10 transition-all border border-transparent hover:border-[#F6A9B6]/20 group">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform text-[#E84C4C]">
                {member.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-[#E84C4C] font-bold text-sm uppercase tracking-widest">{member.role}</p>
              </div>
              <p className="text-lg opacity-60 leading-relaxed">
                {member.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-[#2B0B0B] text-[#F3DDE4] rounded-[48px] p-12 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F9D8C6]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-4xl font-bold leading-tight">联系我们，<br />开启一段温暖的旅程</h3>
              <p className="text-xl opacity-60 font-light">
                无论您是想加入我们成为志愿者，还是有需要帮助的信息，欢迎通过以下方式与我们取得联系。
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#F9D8C6] group-hover:text-[#2B0B0B] transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-1">电子邮箱</p>
                  <p className="text-xl font-bold">2339832360@qq.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#F9D8C6] group-hover:text-[#2B0B0B] transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-1">联系电话</p>
                  <p className="text-xl font-bold">15228883259</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#F9D8C6] group-hover:text-[#2B0B0B] transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-1">联系地址</p>
                  <p className="text-xl font-bold">宜宾学院临港校区</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
