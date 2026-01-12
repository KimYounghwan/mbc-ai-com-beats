
import React, { useState, useEffect, useCallback } from 'react';
import { getCommuteMusic } from './services/geminiService';
import { Song } from './types';
import MusicItem from './components/MusicItem';
import SkeletonLoader from './components/SkeletonLoader';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const fetchRecommendations = useCallback(async (currentTheme: string) => {
    if (!currentTheme.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await getCommuteMusic(currentTheme);
      setSongs(result);
      setHasStarted(true);
    } catch (err) {
      setError('음악을 가져오는 중에 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecommendations(theme);
  };

  const handleRetry = () => {
    fetchRecommendations(theme);
  };

  const clearResults = () => {
    setSongs([]);
    setHasStarted(false);
    setTheme('');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={clearResults} style={{ cursor: 'pointer' }}>
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">Commute Beats</h1>
          </div>
          <div className="text-xs font-medium text-gray-400">DAILY CURATION</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Intro Section */}
        {!hasStarted && !isLoading && (
          <div className="text-center space-y-6 py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              당신의 출퇴근길을<br />완성할 오늘의 음악 7곡
            </h2>
            <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
              장르나 오늘의 기분을 입력해 주세요.<br />
              한국 음악 5곡, 해외 음악 2곡의 황금 비율로 추천해 드립니다.
            </p>
          </div>
        )}

        {/* Input Form */}
        <div className={`transition-all duration-500 ${hasStarted ? 'mb-12' : 'max-w-md mx-auto mt-8'}`}>
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="예: 비오는 날의 차분한 재즈, 상쾌한 아침의 시티팝"
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all shadow-sm group-hover:shadow-md outline-none pr-16"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !theme.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-200 transition-colors shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-center mb-8 font-medium">
            {error}
          </div>
        )}

        {/* Content Section */}
        <div className="space-y-4">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {songs.length > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Today's List (7 Songs)
                    </h3>
                    <button 
                      onClick={handleRetry}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      다시 추천받기
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {songs.map((song, index) => (
                      <MusicItem key={`${song.title}-${index}`} song={song} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        {hasStarted && !isLoading && (
          <footer className="mt-16 py-8 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">Commute Beats Ratio</p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="text-sm font-semibold">K-POP (5)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                <span className="text-sm font-semibold">Global (2)</span>
              </div>
            </div>
          </footer>
        )}
      </main>

      {/* Floating Action for Re-recommend (Mobile optimized visibility) */}
      {hasStarted && !isLoading && (
        <div className="fixed bottom-6 right-6 md:hidden">
           <button 
            onClick={handleRetry}
            className="w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
