import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: 'zh', name: '简体中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

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

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-24 py-8 flex items-center justify-between transition-all duration-500 ${
      isHome ? 'bg-transparent' : 'bg-[#0A0505]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
    }`}>
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8B0000] to-[#722F37] rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-110 transition-transform duration-500 border border-white/20">XZQ</div>
          <span className={`text-2xl font-black tracking-tighter ${isHome ? 'text-white' : 'text-white'} group-hover:bg-gradient-to-r group-hover:from-[#8B0000] group-hover:to-[#D4AF37] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500`}>乡助桥</span>
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#D4AF37] ${
              location.pathname === link.path ? 'text-[#D4AF37] border-b-2 border-[#8B0000] pb-1' : 'text-white/40'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6">
        {/* Language Selector */}
        <div className="relative hidden md:block">
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            {languages.find(l => l.code === i18n.language)?.name || 'ZH'}
            <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-4 right-0 bg-[#1A0707]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 w-40 shadow-2xl"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      i18n.language === lang.code ? 'bg-[#8B0000] text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link 
          to="/register" 
          className="bg-gradient-to-r from-[#8B0000] to-[#722F37] hover:shadow-[0_0_20px_rgba(139,0,0,0.45)] text-white font-black px-8 py-3 rounded-full transition-all text-[10px] uppercase tracking-[0.2em] border border-white/10"
        >
          {t('join_now')}
        </Link>
        
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-white/5 border border-white/10 text-white hover:bg-white/10"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[200] lg:hidden bg-[#0A0505] p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-16">
              <Link to="/" className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#8B0000] rounded-2xl flex items-center justify-center text-white font-black text-xs">XZQ</div>
                <span className="text-2xl font-black text-white tracking-tighter">乡助桥</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-3xl font-black transition-colors ${
                    location.pathname === link.path ? 'text-[#D4AF37]' : 'text-white/40'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-3 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`py-4 rounded-2xl border font-black text-xs ${
                    i18n.language === lang.code ? 'bg-[#8B0000] border-[#8B0000] text-white' : 'bg-white/5 border-white/10 text-white/40'
                  }`}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
