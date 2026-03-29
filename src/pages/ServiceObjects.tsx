import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Heart, MapPin, User, ChevronRight } from 'lucide-react';
import { api } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CoverHero from '../components/visual/CoverHero';

export interface ServiceObject {
  id: string;
  code: string;
  type: 'elderly' | 'child';
  age: number;
  village: string;
  situation: string;
  needs: string;
  status: 'pending' | 'claimed' | 'completed';
}

const ServiceObjects = () => {
  const navigate = useNavigate();
  const [objects, setObjects] = useState<ServiceObject[]>([]);
  const [siteContent, setSiteContent] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'elderly' | 'child'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const [data, contentData] = await Promise.all([
          api.getObjects(),
          api.getSiteContent().catch(() => ({})),
        ]);
        setSiteContent(contentData);
        const verifiedOnly = (data || []).filter((x: any) => x && x.is_verified !== false);
        setObjects(verifiedOnly);
      } catch (err) {
        console.error('Failed to fetch objects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchObjects();
  }, []);

  const filteredObjects = objects.filter(obj => {
    const matchesSearch = obj.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obj.village.includes(searchTerm) ||
      obj.needs.includes(searchTerm);
    const matchesType = filterType === 'all' || obj.type === filterType;
    return matchesSearch && matchesType;
  });

  const coverSrc = (() => {
    const direct = typeof siteContent?.hero_image === 'string' ? siteContent.hero_image.trim() : '';
    if (direct) return direct;
    const list = siteContent?.hero_images;
    if (Array.isArray(list) && list.length > 0 && typeof list[0] === 'string') return list[0].trim();
    return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920&auto=format&fit=crop';
  })();

  return (
    <div className="min-h-screen bg-transparent text-white font-sans">
      <Navbar />

      <CoverHero
        src={coverSrc}
        alt="封面图"
        eyebrow="服务对象"
        title="服务对象"
        subtitle="实地走访确认的留守群体，期待您的暖心认领"
      />

      <div className="pb-32 px-4 md:px-24 max-w-7xl mx-auto -mt-20 relative z-10">

        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-[#D4AF37] transition-colors" />
            <input
              type="text"
              placeholder="搜索编号、村庄、需求..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all text-lg placeholder:text-white/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-[30px]">
            {[
              { id: 'all', label: '全部' },
              { id: 'child', label: '儿童' },
              { id: 'elderly', label: '老人' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id as any)}
                className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                  filterType === type.id 
                    ? 'bg-gradient-to-r from-[#8B0000] to-[#722F37] text-white shadow-lg border border-white/10' 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredObjects.map((obj) => (
              <div key={obj.id} className="bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[32px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.5)] hover:border-white/20 hover:bg-white/10 hover:-translate-y-1 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl border border-white/10 ${obj.type === 'child' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-[#8B0000]/15 text-[#8B0000]'}`}>
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white/30 uppercase tracking-[0.2em]">{obj.code}</div>
                      <div className="font-bold text-xl">{obj.type === 'child' ? '留守儿童' : '留守老人'} · {obj.age}岁</div>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${
                    obj.status === 'pending' ? 'bg-[#8B0000]/15 text-[#D4AF37] border-white/10' : 'bg-white/5 text-white/30 border-white/10'
                  }`}>
                    {obj.status === 'pending' ? '待认领' : '已认领'}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{obj.village}</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-2">基本情况</div>
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-2">{obj.situation}</p>
                  </div>
                  <div className="p-4 bg-[#8B0000]/10 rounded-2xl border border-white/10">
                    <div className="text-xs font-black text-[#D4AF37]/80 uppercase tracking-[0.2em] mb-2">主要需求</div>
                    <p className="text-sm font-black text-[#D4AF37]">{obj.needs}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/join-us?object=${obj.code}`)}
                  disabled={obj.status !== 'pending'}
                  className="w-full bg-gradient-to-r from-[#8B0000] to-[#722F37] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)] text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:bg-white/5 disabled:text-white/30 disabled:shadow-none"
                >
                  {obj.status === 'pending' ? '我要认领' : '已被认领'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-24 p-12 bg-white/5 backdrop-blur-[40px] rounded-[40px] border border-white/10 text-center space-y-8 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
          <div className="w-20 h-20 bg-gradient-to-br from-[#8B0000] to-[#722F37] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-white/10">
            <Plus className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-black">添加需要帮助的人</h3>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              如果您是乡政府工作人员或家属，发现身边有需要陪伴的留守老人或儿童，请联系我们进行信息录入。
            </p>
          </div>
          <button
            onClick={() => navigate('/submit-object')}
            className="inline-flex items-center gap-4 bg-white/5 border border-white/10 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-white/10 transition-all shadow-xl"
          >
            在线提交信息 <Heart className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceObjects;
