import { Link } from 'react-router-dom';
import {
  FaFilm,
  FaUserSecret,
  FaLink,
  FaBolt,
  FaLock,
  FaArrowRight,
  FaPlayCircle,
} from 'react-icons/fa';

const features = [
  {
    icon: FaLink,
    title: 'Akses via Tautan',
    desc: 'Konten hanya terbuka melalui tautan pribadi yang dibagikan langsung kepadamu.',
  },
  {
    icon: FaUserSecret,
    title: 'Anonim',
    desc: 'Tanpa registrasi dan tanpa data pribadi. Privasimu sepenuhnya terjaga.',
  },
  {
    icon: FaFilm,
    title: 'Kualitas HD',
    desc: 'Pemutaran video jernih dengan pemutar modern di semua perangkat.',
  },
  {
    icon: FaBolt,
    title: 'Tanpa Ribet',
    desc: 'Buka tautan, langsung tonton. Ringan, cepat, dan tanpa hambatan.',
  },
];

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-grid-glow pointer-events-none" />
        <div className="container mx-auto max-w-4xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center relative">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-brand-200 animate-fade-in">
            <FaLock size={11} className="text-brand-300" />
            Platform Streaming Pribadi & Anonim
          </span>

          <h1 className="mt-6 font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white animate-fade-up">
            Selamat Datang di <br className="hidden sm:block" />
            <span className="text-gradient">Dunia Hiburan</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto animate-fade-up">
            Ruang menonton pribadi yang sederhana dan anonim. Tidak ada akun, tidak ada
            katalog publik — setiap tontonan hanya dapat diakses melalui tautan pribadinya.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-scale-in">
            <Link to="/about" className="btn-gradient">
              Pelajari Lebih Lanjut
              <FaArrowRight size={14} />
            </Link>
            <span className="inline-flex items-center gap-2 text-sm text-slate-400">
              <FaPlayCircle className="text-brand-400" />
              Punya tautan? Cukup buka untuk mulai menonton.
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Kenapa Dunia Hiburan?
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Dirancang untuk pengalaman menonton yang privat, ringan, dan tanpa gangguan.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-glow-soft group"
            >
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-brand-gradient-soft border border-white/10 text-brand-300 mb-4 group-hover:scale-105 transition-transform">
                <f.icon size={20} />
              </span>
              <h3 className="text-lg font-semibold text-white mb-1.5">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy callout */}
      <section className="container mx-auto max-w-4xl px-4 pb-16">
        <div className="card-surface p-7 sm:p-9 text-center">
          <span className="grid place-items-center h-14 w-14 mx-auto rounded-2xl bg-brand-gradient shadow-glow mb-5">
            <FaUserSecret className="text-white" size={22} />
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            Privasi Adalah Prioritas
          </h3>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto leading-relaxed">
            Kami tidak menampilkan daftar konten apa pun secara publik dan tidak meminta data
            pribadimu. Semua tetap anonim, dari awal hingga akhir.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-300 hover:text-brand-200 transition"
          >
            Selengkapnya tentang kami <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  );
}
