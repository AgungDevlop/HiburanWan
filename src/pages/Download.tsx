import { FaDownload, FaShieldAlt } from 'react-icons/fa';

export function Download() {
  const videoUrl = sessionStorage.getItem('videoUrl');
  const videoTitle = sessionStorage.getItem('videoTitle');

  const randomUrls = [
    'https://crn77.com/4/10251220',
  ];

  const handleDownload = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');

      setTimeout(() => {
        const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
        window.location.href = randomUrl;
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="card-surface w-full max-w-md p-8 text-center animate-scale-in">
        <span className="grid place-items-center h-16 w-16 mx-auto rounded-2xl bg-brand-gradient shadow-glow mb-6">
          <FaDownload className="text-white" size={24} />
        </span>

        <h1 className="font-display text-2xl font-bold text-white">Unduhan Aman</h1>
        <p className="mt-2 text-sm text-slate-400">
          {videoTitle
            ? `Siap mengunduh: “${videoTitle}”`
            : 'Unduh video pilihanmu dengan aman dan cepat.'}
        </p>

        {videoUrl ? (
          <button onClick={handleDownload} className="btn-gradient w-full mt-7">
            <FaDownload />
            Unduh Sekarang
          </button>
        ) : (
          <p className="mt-7 text-slate-500 text-sm">
            Tidak ada video yang tersedia untuk diunduh.
          </p>
        )}

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <FaShieldAlt className="text-brand-400" />
          Tautan unduhan diproses dengan aman.
        </p>
      </div>
    </div>
  );
}
