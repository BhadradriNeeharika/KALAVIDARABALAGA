import { Troupe } from '../types';
import { Link } from 'react-router-dom';
import { MapPin, Users, Music } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  troupe: Troupe;
  key?: string;
}

export default function TroupeCard({ troupe }: Props) {
  const photo = troupe.performancePhotos?.[0] || 'https://images.unsplash.com/photo-1549419163-cf9d84e27f00?q=80&w=600';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200 transition-all hover:shadow-md h-full flex flex-col group"
    >
      <Link to={`/artists/${troupe.id}`} className="flex flex-col h-full">
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-5">
          <img
            src={photo}
            alt={troupe.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500 px-2 py-0.5 rounded shadow-sm">
              {troupe.district}
            </span>
          </div>
        </div>
        
        <div className="flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 pr-4">
              <h4 className="font-bold text-xl text-stone-800 leading-tight group-hover:text-heritage-amber transition-colors">
                {troupe.name}
              </h4>
              <p className="text-sm text-amber-700 font-medium italic mt-1">{troupe.artForm}</p>
            </div>
            <div className="bg-stone-50 p-2 rounded-xl text-center border border-stone-100 min-w-[60px]">
              <span className="block text-xs font-black text-stone-800">
                {Math.floor(Math.random() * 10) + 8}
              </span>
              <span className="block text-[8px] text-stone-400 uppercase font-black">Artists</span>
            </div>
          </div>
          
          <div className="mt-auto pt-4 flex items-center gap-3">
            <div className="flex-1 bg-stone-50 rounded-xl p-3 border border-stone-100">
              <span className="text-[9px] block text-stone-400 uppercase font-black tracking-wider mb-1">Equipment</span>
              <span className="text-[11px] text-stone-600 line-clamp-1 italic">
                {troupe.equipment?.[0] || 'Traditional Setup'}
              </span>
            </div>
            <button className="bg-heritage-amber hover:bg-amber-700 text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-lg shadow-amber-900/10">
              View Info
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
