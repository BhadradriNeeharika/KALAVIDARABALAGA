import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTroupeById } from '../services/firebase';
import { FEATURED_TROUPES } from '../constants';
import { Troupe } from '../types';
import { Phone, MapPin, Users, Music, Package, Video, ArrowLeft, Share2, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>();
  const [troupe, setTroupe] = useState<Troupe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      // Check local seed data first
      const seed = FEATURED_TROUPES.find(t => t.id === id);
      if (seed) {
        setTroupe(seed);
        setLoading(false);
      } else {
        const fetched = await getTroupeById(id);
        if (fetched) setTroupe(fetched as Troupe);
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-96 bg-stone-200 rounded-3xl mb-8"></div>
        <div className="h-8 w-1/3 bg-stone-200 mb-4"></div>
        <div className="h-4 w-2/3 bg-stone-200"></div>
      </div>
    );
  }

  if (!troupe) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center">
        <h1 className="text-4xl font-serif mb-4 italic">Troupe Not Found</h1>
        <Link to="/artists" className="text-heritage-amber font-bold uppercase tracking-widest text-xs">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="bg-soft-orange min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/artists" className="inline-flex items-center gap-2 text-stone-400 hover:text-heritage-amber mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Directory</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <header>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-accent-amber text-amber-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                  {troupe.artForm}
                </span>
                <span className="px-3 py-1 bg-white text-stone-500 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 border border-stone-200">
                  <MapPin className="w-3 h-3 text-heritage-amber" /> {troupe.district}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-black text-stone-800 mb-8 leading-tight">
                {troupe.name}
              </h1>
              <p className="text-xl text-stone-500 italic leading-relaxed max-w-3xl">
                {troupe.bio}
              </p>
            </header>

            {/* Gallery Section */}
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8 flex items-center gap-4">
                Portfolio Gallery <span className="flex-1 h-[1px] bg-stone-200"></span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {troupe.performancePhotos?.map((photo, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-3xl overflow-hidden shadow-sm border border-stone-100 ${i === 0 ? 'col-span-2 row-span-2 h-[500px]' : 'h-56'}`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Simulated Video Links */}
            <section className="bg-white p-10 rounded-[3rem] border border-stone-200 shadow-sm">
               <h3 className="font-serif text-3xl font-black italic mb-8 text-stone-800">Performance Highlights</h3>
               <div className="space-y-4">
                 {troupe.videoLinks?.map((link, i) => (
                   <a 
                     key={i} 
                     href={link} 
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center justify-between p-5 bg-stone-50 rounded-2xl hover:bg-accent-amber/5 transition-all border border-transparent hover:border-accent-amber/20 group"
                   >
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shadow-inner">
                          <Video className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-base italic text-stone-700">2024 Festival Performance - Clip {i+1}</span>
                     </div>
                     <ArrowLeft className="w-5 h-5 rotate-180 text-stone-300 group-hover:text-heritage-amber transition-colors" />
                   </a>
                 ))}
               </div>
            </section>
          </div>

          {/* Sidebar / Booking */}
          <div className="space-y-8">
            <div className="bg-stone-800 text-soft-orange p-10 rounded-[3rem] sticky top-28 shadow-2xl shadow-stone-900/30 border border-stone-700 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent-amber/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <h3 className="text-4xl font-serif mb-8 leading-tight italic relative z-10">Direct <br />Inquiry</h3>
               
               <div className="space-y-8 mb-12 relative z-10">
                 <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Users className="w-5 h-5 text-accent-amber" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-stone-500">Lead Contact</p>
                      <p className="font-serif italic text-xl text-white">{troupe.leadContact}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Music className="w-5 h-5 text-accent-amber" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-stone-500">Instruments</p>
                      <p className="text-sm text-stone-300 italic">{troupe.instruments?.join(', ') || 'Traditional Ensemble'}</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Package className="w-5 h-5 text-accent-amber" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-stone-500">Equipment</p>
                      <ul className="text-[11px] text-stone-400 space-y-2 mt-2 list-disc pl-4 italic">
                        {troupe.equipment?.map((item, i) => <li key={i}>{item}</li>) || <li>Standard setup provided</li>}
                      </ul>
                    </div>
                 </div>
               </div>

               <div className="space-y-4 relative z-10">
                 <a 
                   href={`tel:${troupe.contactPhone}`}
                   className="flex items-center justify-center gap-3 w-full py-5 bg-accent-amber text-amber-900 rounded-2xl font-black transition-all hover:scale-[1.02] shadow-xl shadow-amber-400/10 text-sm uppercase tracking-widest"
                 >
                   <Phone className="w-5 h-5" /> Call Lead
                 </a>
                 <div className="flex gap-4">
                    <button className="flex-1 py-4 border border-stone-600 rounded-2xl flex items-center justify-center text-stone-500 hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="flex-1 py-4 border border-stone-600 rounded-2xl flex items-center justify-center text-stone-500 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                 </div>
               </div>

               <p className="mt-10 text-[9px] text-center text-stone-500 uppercase tracking-[0.2em] relative z-10">
                  Every booking helps preserve traditional art forms.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
