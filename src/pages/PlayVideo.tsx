import { useEffect, useState, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { FaCopy, FaDownload, FaPlay, FaExclamationTriangle, FaCheck, FaLock } from 'react-icons/fa';
import { useLayout } from '../context/LayoutContext';

declare global {
  interface Window {
    fluidPlayer?: (elementId: string, options?: any) => any;
  }
}

const LazyThumbnail = ({ url }: { url: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="w-full h-full object-cover"
      preload={inView ? 'metadata' : 'none'}
      muted
      playsInline
    >
      {inView && <source src={`${url}#t=0.1`} type="video/mp4" />}
    </video>
  );
};

const VideoCard = ({ video, onClick }: { video: any; onClick: (videoId: string) => void }) => (
  <div onClick={() => onClick(video.id)} className="group cursor-pointer animate-fade-in">
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 group-hover:border-brand-500/60 transition-all duration-300 group-hover:shadow-glow-soft">
      <LazyThumbnail url={video.Url} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="grid place-items-center h-12 w-12 rounded-full bg-brand-gradient shadow-glow">
          <FaPlay className="text-white ml-0.5" size={16} />
        </span>
      </div>
    </div>
    <h3 className="mt-2 text-sm font-medium text-slate-200 line-clamp-2 group-hover:text-white transition">
      {video.Judul}
    </h3>
  </div>
);

const RecentPostCard = ({ video, onClick }: { video: any; onClick: (videoId: string) => void }) => (
  <div onClick={() => onClick(video.id)} className="group w-56 sm:w-64 flex-shrink-0 cursor-pointer">
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 group-hover:border-brand-500/60 transition-all duration-300 group-hover:shadow-glow-soft">
      <LazyThumbnail url={video.Url} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="grid place-items-center h-12 w-12 rounded-full bg-brand-gradient shadow-glow">
          <FaPlay className="text-white ml-0.5" size={16} />
        </span>
      </div>
      <span className="absolute top-2 left-2 bg-brand-gradient text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
        BARU
      </span>
    </div>
    <h3 className="mt-2 text-sm font-medium text-slate-200 line-clamp-2 group-hover:text-white transition">
      {video.Judul}
    </h3>
  </div>
);

const RecentPostsView = ({ videos, onCardClick }: { videos: any[]; onCardClick: (videoId: string) => void }) => (
  <div className="mb-10">
    <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 text-white">Postingan Terbaru</h2>
    <div className="flex gap-4 overflow-x-auto pb-4 -mb-4 scrollbar-thin">
      {videos.map((video) => (
        <RecentPostCard key={video.id} video={video} onClick={onCardClick} />
      ))}
    </div>
  </div>
);

export function PlayVideo() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const { setShowSearch } = useLayout();

  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [videoFound, setVideoFound] = useState<boolean>(true);
  const [videos, setVideos] = useState<any[]>([]);
  const [recentVideos, setRecentVideos] = useState<any[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const videosPerPage = 12;

  const playerInstance = useRef<any>(null);

  const randomUrls = [
    'https://crn77.com/4/10251220',
  ];

  const shuffleArray = (array: any[]) => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  // PlayVideo hanya dirender pada pathname video/jelajah (bukan beranda),
  // jadi search bar & grid selalu aktif di sini.
  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      setVideoFound(true);

      try {
        const response = await fetch('https://raw.githubusercontent.com/AgungDevlop/Viral/refs/heads/main/Video.json');
        const data = await response.json();

        setRecentVideos(data.slice(-10).reverse());

        if (id) {
          const video = data.find((item: { id: string }) => item.id === id);
          if (video) {
            setVideoUrl(video.Url);
            setVideoTitle(video.Judul);
            sessionStorage.setItem('videoUrl', video.Url);
            sessionStorage.setItem('videoTitle', video.Judul);
          } else {
            setVideoFound(false);
          }
        }
        setVideos(shuffleArray(data));
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setLoading(false);
      }
    };

    setShowSearch(true);
    fetchVideoData();

    return () => {
      setShowSearch(false);
    };
  }, [id, query, setShowSearch]);

  useEffect(() => {
    if (!videoUrl) {
      return;
    }

    const handlePlayerEventRedirect = () => {
      const now = new Date().getTime();
      const lastRedirectTimestamp = sessionStorage.getItem('lastRedirectTimestamp');
      const fifteenSeconds = 15 * 1000;

      if (!lastRedirectTimestamp || (now - parseInt(lastRedirectTimestamp, 10)) > fifteenSeconds) {
        const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
        window.open(randomUrl, '_blank');
        sessionStorage.setItem('lastRedirectTimestamp', now.toString());
      }
    };

    const initPlayer = () => {
      if (playerInstance.current) {
        playerInstance.current.destroy();
      }
      if (typeof window.fluidPlayer === 'function') {
        playerInstance.current = window.fluidPlayer('video-player', {
          layoutControls: {
            controlBar: {
              autoHideTimeout: 3,
              animated: true,
              autoHide: true
            },
            htmlOnPauseBlock: {
              html: null,
              height: null,
              width: null
            },
            autoPlay: false,
            mute: true,
            allowTheatre: true,
            playPauseAnimation: false,
            playbackRateEnabled: false,
            allowDownload: false,
            playButtonShowing: true,
            fillToContainer: false,
            primaryColor: '#8b5cf6',
            posterImage: ''
          }
        });

        playerInstance.current.on('play', handlePlayerEventRedirect);
        playerInstance.current.on('pause', handlePlayerEventRedirect);
        playerInstance.current.on('seeked', handlePlayerEventRedirect);
      }
    };

    const checkInterval = setInterval(() => {
      if (typeof window.fluidPlayer === 'function') {
        clearInterval(checkInterval);
        initPlayer();
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      if (playerInstance.current) {
        playerInstance.current.destroy();
        playerInstance.current = null;
      }
    };
  }, [videoUrl]);

  const handleCardClick = (videoId: string) => {
    window.open(`/play/${videoId}`, '_blank');
    setTimeout(() => {
      const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
      window.location.href = randomUrl;
    }, 500);
  };

  const handleCopy = () => {
    if (id) {
      navigator.clipboard.writeText(`https://${window.location.hostname}/play/${id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadClick = () => {
    sessionStorage.setItem('videoUrl', videoUrl);
    sessionStorage.setItem('videoTitle', videoTitle);
    window.open('/download', '_blank');
    setTimeout(() => {
      const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
      window.location.href = randomUrl;
    }, 500);
  };

  useEffect(() => {
    const results = query
      ? videos.filter(video => video.Judul.toLowerCase().includes(query.toLowerCase()))
      : videos;
    setFilteredVideos(results);
    setCurrentPage(1);
  }, [query, videos]);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="h-12 w-12 rounded-full border-2 border-white/10 border-t-brand-400 animate-spin-slow" />
        <p className="text-slate-400 text-sm">Memuat tontonan...</p>
      </div>
    );
  }

  if (id && !videoFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <span className="grid place-items-center h-20 w-20 rounded-2xl bg-brand-gradient-soft border border-white/10 mb-6">
          <FaExclamationTriangle size={36} className="text-rose-400" />
        </span>
        <h1 className="font-display text-2xl font-bold text-white">Video Tidak Ditemukan</h1>
        <p className="mt-2 max-w-md text-slate-400">
          Maaf, video yang kamu cari tidak tersedia atau mungkin sudah dihapus.
        </p>
        <Link to="/" className="btn-gradient mt-6">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const PlayerView = () => (
    <div className="card-surface p-4 sm:p-6 mb-10 animate-fade-up">
      <h1 className="font-display text-xl sm:text-2xl font-bold mb-4 text-center break-words text-white">
        {videoTitle}
      </h1>
      <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-black">
        <video id="video-player" style={{ width: '100%', height: '100%' }} preload="metadata" playsInline key={videoUrl}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="flex mt-5 border border-white/10 rounded-xl overflow-hidden bg-ink-900/60">
        <input
          type="text"
          value={`https://${window.location.hostname}/play/${id}`}
          readOnly
          className="flex-1 px-4 py-3 bg-transparent text-slate-300 text-sm outline-none truncate"
        />
        <button
          onClick={handleCopy}
          className={`px-4 flex items-center gap-2 text-white font-medium transition-colors ${
            copied ? 'bg-emerald-600' : 'bg-brand-gradient'
          }`}
        >
          {copied ? <FaCheck /> : <FaCopy />}
          <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin'}</span>
        </button>
      </div>

      <button onClick={handleDownloadClick} className="btn-gradient w-full mt-4">
        <FaDownload />
        Unduh Video
      </button>

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
        <FaLock className="text-brand-400" />
        Tautan pribadi — bagikan hanya kepada orang yang kamu percaya.
      </p>
    </div>
  );

  const pageTitle = query
    ? `Hasil Pencarian untuk "${query}"`
    : id
      ? 'Video Lainnya'
      : 'Jelajahi Video';

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6 sm:py-8">
      {id && videoFound && <PlayerView />}

      {id && videoFound && recentVideos.length > 0 && (
        <RecentPostsView videos={recentVideos} onCardClick={handleCardClick} />
      )}

      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold mb-5 text-white">{pageTitle}</h2>

        {currentVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentVideos.map((video) => (
              <VideoCard key={video.id} video={video} onClick={handleCardClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            {query ? 'Tidak ada video yang cocok dengan pencarianmu.' : 'Belum ada video untuk ditampilkan.'}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-5 py-2.5 rounded-xl glass text-white text-sm font-medium hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <span className="text-sm text-slate-400">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-5 py-2.5 rounded-xl glass text-white text-sm font-medium hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Berikutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
