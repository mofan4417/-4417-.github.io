import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WhatWeDo = () => {
  return (
    <div className="min-h-screen bg-[#F6A9B6] text-[#333] font-sans">
      <Navbar />
      
      <div className="pt-24 pb-32 px-4 md:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <p className="text-lg opacity-60">我们做什么</p>
          <h2 className="text-4xl md:text-5xl font-bold">让做好事变得更加容易</h2>
        </div>

        <div className="space-y-10 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-[32px] p-12 shadow-xl border border-black/5 hover:scale-[1.01] transition-transform">
            <h3 className="text-2xl font-bold mb-8">对留守儿童的服务</h3>
            <ul className="space-y-6 text-xl opacity-80">
              <li className="flex items-start gap-4">
                <span className="font-bold">①</span>
                <span>情感陪伴（每周视频聊天）</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold">②</span>
                <span>学业辅导（数学、英语等）</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold">③</span>
                <span>视野拓展（分享大学生活）</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[32px] p-12 shadow-xl border border-black/5 hover:scale-[1.01] transition-transform">
            <h3 className="text-2xl font-bold mb-8">对留守老人的服务</h3>
            <ul className="space-y-6 text-xl opacity-80">
              <li className="flex items-start gap-4">
                <span className="font-bold">①</span>
                <span>数字助老（教用微信、医保）</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold">②</span>
                <span>生活关怀（定期电话问候）</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold">③</span>
                <span>健康提醒（提醒吃药、量血压）</span>
              </li>
              <li className="text-lg opacity-60 pt-4 border-t border-black/5">而积累。</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[32px] p-12 shadow-xl border border-black/5 hover:scale-[1.01] transition-transform">
            <h3 className="text-2xl font-bold mb-8">服务流程</h3>
            <p className="text-xl opacity-80 leading-relaxed">
              调研建档 → 线上匹配 → 志愿者服务 → 记录反馈 → 持续优化
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-[32px] p-12 shadow-xl border border-black/5 hover:scale-[1.01] transition-transform">
            <h3 className="text-2xl font-bold mb-8">服务承诺</h3>
            <p className="text-xl opacity-80">
              完全免费、隐私保护、长期陪伴
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link to="/service-objects" className="bg-[#2B0B0B] text-white hover:bg-black font-bold px-12 py-5 rounded-full transition-all inline-flex items-center gap-4 text-xl shadow-2xl">
            查看需要帮助的人 <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WhatWeDo;
