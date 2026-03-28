import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Heart, MapPin, User, ChevronRight } from 'lucide-react';
import { api } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'elderly' | 'child'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const data = await api.getObjects();
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

  return (
    <div className="min-h-screen bg-white text-[#333] font-sans">
      <Navbar />
      
      <div className="pt-24 pb-32 px-4 md:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-bold">服务对象</h2>
          <p className="text-xl text-black/50">实地走访确认的留守群体，期待您的暖心认领</p>
        </div>

        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 w-5 h-5 group-focus-within:text-[#E84C4C] transition-colors" />
            <input
              type="text"
              placeholder="搜索编号、村庄、需求..."
              className="w-full bg-black/5 border border-black/10 rounded-2xl py-5 pl-16 pr-8 text-black focus:outline-none focus:ring-2 focus:ring-[#E84C4C]/50 transition-all text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-black/5 p-2 rounded-2xl border border-black/5">
            {[
              { id: 'all', label: '全部' },
              { id: 'child', label: '儿童' },
              { id: 'elderly', label: '老人' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id as any)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                  filterType === type.id 
                    ? 'bg-[#E84C4C] text-white shadow-lg' 
                    : 'text-black/40 hover:text-black/60'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-4 border-[#E84C4C] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredObjects.map((obj) => (
              <div key={obj.id} className="bg-white border border-black/5 rounded-[32px] p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${obj.type === 'child' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-black/40 uppercase tracking-widest">{obj.code}</div>
                      <div className="font-bold text-xl">{obj.type === 'child' ? '留守儿童' : '留守老人'} · {obj.age}岁</div>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                    obj.status === 'pending' ? 'bg-green-50 text-green-600' : 'bg-black/5 text-black/40'
                  }`}>
                    {obj.status === 'pending' ? '待认领' : '已认领'}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-black/60">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{obj.village}</span>
                  </div>
                  <div className="p-4 bg-black/5 rounded-2xl">
                    <div className="text-xs font-bold text-black/40 uppercase tracking-widest mb-2">基本情况</div>
                    <p className="text-sm leading-relaxed line-clamp-2">{obj.situation}</p>
                  </div>
                  <div className="p-4 bg-[#E84C4C]/5 rounded-2xl">
                    <div className="text-xs font-bold text-[#E84C4C]/60 uppercase tracking-widest mb-2">主要需求</div>
                    <p className="text-sm font-bold text-[#E84C4C]">{obj.needs}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/join-us?object=${obj.code}`)}
                  disabled={obj.status !== 'pending'}
                  className="w-full bg-[#E84C4C] hover:bg-black text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:bg-black/10 disabled:text-black/40"
                >
                  {obj.status === 'pending' ? '我要认领' : '已被认领'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-24 p-12 bg-[#F6A9B6]/20 rounded-[40px] border border-[#F6A9B6]/40 text-center space-y-8">
          <div className="w-20 h-20 bg-[#F6A9B6] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <Plus className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-bold">添加需要帮助的人</h3>
            <p className="text-lg opacity-60 max-w-2xl mx-auto">
              如果您是乡政府工作人员或家属，发现身边有需要陪伴的留守老人或儿童，请联系我们进行信息录入。
            </p>
          </div>
          <button
            onClick={() => navigate('/submit-object')}
            className="inline-flex items-center gap-4 bg-[#2B0B0B] text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-black transition-all shadow-xl"
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
