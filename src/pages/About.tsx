import {
  FaUserSecret,
  FaLink,
  FaFilm,
  FaBolt,
  FaLock,
  FaCheckCircle,
} from 'react-icons/fa';

const principles = [
  {
    icon: FaUserSecret,
    title: 'Sepenuhnya Anonim',
    desc: 'Tanpa registrasi, tanpa data pribadi, tanpa pelacakan identitas pengunjung.',
  },
  {
    icon: FaLink,
    title: 'Akses via Tautan',
    desc: 'Konten hanya dapat dibuka melalui tautan pribadi yang dibagikan langsung.',
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

const faqs = [
  {
    q: 'Bagaimana cara mengakses video?',
    a: 'Video hanya dapat diakses melalui tautan pribadi. Tidak ada daftar atau pencarian publik di platform ini.',
  },
  {
    q: 'Apakah saya perlu mendaftar?',
    a: 'Tidak. Dunia Hiburan tidak meminta pendaftaran maupun informasi pribadi apa pun.',
  },
  {
    q: 'Apakah data saya disimpan?',
    a: 'Platform ini dirancang untuk anonim. Kami tidak mengumpulkan identitas pengunjung.',
  },
];

export function About() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-grid-glow pointer-events-none" />
        <div className="container mx-auto max-w-3xl px-4 pt-16 pb-10 sm:pt-24 text-center relative">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-brand-200 animate-fade-in">
            <FaLock size={11} className="text-brand-300" />
            Platform Pribadi & Anonim
          </span>
          <h1 className="mt-6 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white animate-fade-up">
            Tentang <span className="text-gradient">Dunia Hiburan</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-400 animate-fade-up">
            Dunia Hiburan adalah ruang streaming pribadi yang mengutamakan kesederhanaan dan
            anonimitas. Tidak ada akun, tidak ada data pribadi — cukup tautan, lalu nikmati
            tontonanmu.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((p) => (
            <div
              key={p.title}
              className="card-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-glow-soft group"
            >
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-brand-gradient-soft border border-white/10 text-brand-300 mb-4 group-hover:scale-105 transition-transform">
                <p.icon size={20} />
              </span>
              <h3 className="text-lg font-semibold text-white mb-1.5">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="container mx-auto max-w-3xl px-4 py-10">
        <div className="card-surface p-7 sm:p-9">
          <h2 className="font-display text-2xl font-bold text-white mb-4">Komitmen Privasi</h2>
          <p className="text-slate-400 leading-relaxed">
            Kami percaya hiburan seharusnya sederhana dan bebas dari kerumitan. Karena itu,
            Dunia Hiburan tidak menampilkan katalog publik, tidak memerlukan pendaftaran, dan
            tidak mengaitkan tontonan dengan identitas siapa pun. Setiap konten hanya hidup di
            balik tautan pribadinya masing-masing.
          </p>
          <ul className="mt-5 space-y-3">
            {[
              'Tanpa akun dan tanpa kata sandi.',
              'Tanpa katalog atau pencarian publik.',
              'Akses konten hanya melalui tautan langsung.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <FaCheckCircle className="text-brand-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto max-w-3xl px-4 py-10">
        <h2 className="font-display text-2xl font-bold text-white mb-6 text-center">
          Pertanyaan Umum
        </h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="card-surface p-5">
              <h3 className="font-semibold text-white">{f.q}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
