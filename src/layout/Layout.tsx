import React, { useState, useEffect } from 'react';
import { FaSearch, FaHome, FaInfoCircle, FaFilm } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';

const Brand = () => (
  <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
    <span className="relative grid place-items-center h-10 w-10 rounded-xl bg-brand-gradient shadow-glow-soft transition-transform duration-300 group-hover:scale-105">
      <FaFilm className="text-white" size={18} />
    </span>
    <span className="leading-none">
      <span className="block font-display text-lg sm:text-xl font-extrabold tracking-tight text-white">
        Dunia<span className="text-gradient"> Hiburan</span>
      </span>
      <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-slate-400">
        Streaming Pribadi
      </span>
    </span>
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { showSearch } = useLayout();

  useEffect(() => {
    fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary')
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          const safeTitle = `${data.title} - HD Stream`;
          document.title = safeTitle;

          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          const extract = data.extract ? data.extract.substring(0, 150) + '...' : `Watch ${data.title} secure streaming.`;
          metaDesc.setAttribute('content', extract);

          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute('content', safeTitle);
        }
      })
      .catch(() => {
        document.title = `Dunia Hiburan - Streaming HD ${Math.floor(Math.random() * 999999)}`;
      });
  }, [location.pathname, location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      navigate(`/search?search=${trimmedSearch}`);
    } else {
      navigate('/search');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="glass fixed top-0 left-0 w-full z-50 border-b border-white/10">
        <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <Brand />

          <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end min-w-0">
            {showSearch && (
              <form onSubmit={handleSearch} className="relative flex-1 max-w-xs sm:max-w-sm">
                <input
                  type="text"
                  placeholder="Cari video..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-full py-2.5 pl-4 pr-11 text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40 transition"
                />
                <button
                  type="submit"
                  aria-label="Cari"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center h-8 w-8 rounded-full bg-brand-gradient text-white"
                >
                  <FaSearch size={13} />
                </button>
              </form>
            )}

            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive('/') ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <FaHome size={15} />
                <span className="hidden sm:inline">Beranda</span>
              </Link>
              <Link
                to="/about"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive('/about') ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <FaInfoCircle size={15} />
                <span className="hidden sm:inline">Tentang</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {children}
      </main>

      <footer className="mt-16 border-t border-white/10 bg-ink-900/60 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="space-y-4">
              <Brand />
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Ruang streaming pribadi yang sederhana dan anonim. Beranda tetap privat —
                tontonan hanya hadir melalui tautan pribadinya.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigasi</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/" className="text-slate-400 hover:text-brand-300 transition">Beranda</Link></li>
                <li><Link to="/about" className="text-slate-400 hover:text-brand-300 transition">Tentang</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Privasi</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Beranda tidak menampilkan katalog apa pun dan tidak menyimpan identitas
                pengunjung. Semua tetap anonim.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Dunia Hiburan. Seluruh hak cipta dilindungi.
            </p>
            <p className="text-xs text-slate-500">
              Dibuat dengan <span className="text-brand-400">♥</span> untuk para pecinta hiburan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
