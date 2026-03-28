import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { name: '首页', path: '/' },
      { name: '我们做什么', path: '/what-we-do' },
      { name: '服务对象', path: '/service-objects' },
      { name: '服务成果', path: '/service-results' },
      { name: '报名', path: '/join-us' },
      { name: '关于我们', path: '/about-us' },
      { name: '管理者登录', path: '/admin/login' },
    ],
    []
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`sticky top-0 z-50 px-4 md:px-24 py-6 flex items-center justify-between transition-all ${
      isHome ? 'bg-transparent' : 'bg-white shadow-sm'
    }`}>
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#E84C4C] rounded-sm flex items-center justify-center text-white font-bold text-xs">CMO</div>
          <span className={`text-2xl font-bold tracking-tight ${isHome ? 'text-[#F3DDE4]' : 'text-[#333]'}`}>乡助桥</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-lg transition-all hover:opacity-100 ${
              isHome 
                ? (location.pathname === link.path ? 'text-white font-bold' : 'text-white/70')
                : (location.pathname === link.path ? 'text-[#333] font-bold underline decoration-[#E84C4C] decoration-4 underline-offset-8' : 'text-[#333]/60')
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link 
          to="/join-us" 
          className="bg-[#F9D8C6] hover:bg-[#f7cbb6] text-[#2B0B0B] font-bold px-6 md:px-8 py-3 rounded-full transition-all text-sm shadow-md"
        >
          志愿者申请
        </Link>
        <button
          type="button"
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
          onClick={() => setMobileOpen((v) => !v)}
          className={`md:hidden w-11 h-11 rounded-2xl flex items-center justify-center transition-all border ${
            isHome ? 'bg-white/10 border-white/20 text-white hover:bg-white/15' : 'bg-black/5 border-black/10 text-[#333] hover:bg-black/10'
          }`}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div
            className={`absolute top-0 right-0 h-full w-[360px] max-w-[88vw] shadow-2xl border-l ${
              isHome ? 'bg-[#2B0B0B] border-white/10 text-[#F3DDE4]' : 'bg-white border-black/10 text-[#333]'
            }`}
          >
            <div className={`p-6 flex items-center justify-between border-b ${isHome ? 'border-white/10' : 'border-black/10'}`}>
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#E84C4C] rounded-sm flex items-center justify-center text-white font-bold text-xs">CMO</div>
                <span className="text-xl font-bold tracking-tight">乡助桥</span>
              </Link>
              <button
                type="button"
                aria-label="关闭菜单"
                onClick={() => setMobileOpen(false)}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all border ${
                  isHome ? 'bg-white/10 border-white/20 text-white hover:bg-white/15' : 'bg-black/5 border-black/10 text-[#333] hover:bg-black/10'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid gap-2">
                {navLinks.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-5 py-4 rounded-2xl font-bold transition-all ${
                        isHome
                          ? active
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                          : active
                            ? 'bg-[#E84C4C]/10 text-[#E84C4C]'
                            : 'text-black/70 hover:bg-black/5 hover:text-[#333]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className={`mt-8 pt-6 border-t ${isHome ? 'border-white/10' : 'border-black/10'}`}>
                <Link
                  to="/join-us"
                  className="w-full inline-flex items-center justify-center bg-[#F9D8C6] hover:bg-[#f7cbb6] text-[#2B0B0B] font-black px-6 py-4 rounded-2xl transition-all shadow-lg"
                >
                  志愿者申请
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
