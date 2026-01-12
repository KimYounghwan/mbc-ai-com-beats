
import React from 'react';
import { Song } from '../types';

interface MusicItemProps {
  song: Song;
  index: number;
}

const MusicItem: React.FC<MusicItemProps> = ({ song, index }) => {
  return (
    <a 
      href={song.youtubeUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex flex-col md:flex-row items-start md:items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-gray-400 group-hover:text-red-500 transition-colors">
        <span className="text-xl font-bold">{index + 1}</span>
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {song.title}
          </h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
            song.category === 'Korean' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
          }`}>
            {song.category}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-500 mb-2">{song.artist}</p>
        <p className="text-xs text-gray-400 leading-relaxed italic">
          "{song.reason}"
        </p>
      </div>

      <div className="hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 group-hover:text-red-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
      </div>
    </a>
  );
};

export default MusicItem;
