import { useState, useEffect } from 'react';
import { getTroupes } from '../services/firebase';
import { Troupe } from '../types';
import { FEATURED_TROUPES, ART_FORMS, DISTRICTS } from '../constants';
import TroupeCard from '../components/TroupeCard';
import { Search, SlidersHorizontal, FilterX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ArtistDirectory() {
  const [troupes, setTroupes] = useState<Troupe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtForm, setSelectedArtForm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const fetched = await getTroupes();
        // Combine with seed data for better visual initial experience
        const combined = [...FEATURED_TROUPES, ...fetched.filter(f => !FEATURED_TROUPES.find(t => t.id === f.id))];
        setTroupes(combined as Troupe[]);
      } catch (e) {
        setTroupes(FEATURED_TROUPES);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredTroupes = troupes.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.artForm.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArt = !selectedArtForm || t.artForm === selectedArtForm;
    const matchesDistrict = !selectedDistrict || t.district === selectedDistrict;
    return matchesSearch && matchesArt && matchesDistrict;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedArtForm('');
    setSelectedDistrict('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-10">
        <div>
          <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-6">Search</h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Artist name..." 
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-stone-200 focus:ring-2 focus:ring-accent-amber/20 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-6">Art Form</h3>
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => setSelectedArtForm('')}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left text-sm font-bold ${!selectedArtForm ? 'bg-accent-amber text-amber-900 shadow-sm' : 'hover:bg-stone-100 text-stone-500'}`}
            >
              All Forms
            </button>
            {ART_FORMS.map(form => (
              <button 
                key={form}
                onClick={() => setSelectedArtForm(form)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left text-sm font-bold ${selectedArtForm === form ? 'bg-accent-amber text-amber-900 shadow-sm' : 'hover:bg-stone-100 text-stone-500'}`}
              >
                {form}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-6">District</h3>
          <div className="flex flex-wrap gap-2">
            {DISTRICTS.map(d => (
              <button 
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${selectedDistrict === d ? 'bg-heritage-amber border-heritage-amber text-white' : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-accent-amber/10 rounded-3xl border border-accent-amber/20">
          <p className="text-xs text-amber-900 font-black mb-2">Empower Rural Artists</p>
          <p className="text-[10px] text-amber-700 leading-relaxed font-medium">Every booking helps preserve a thousand-year-old tradition.</p>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-800 italic">Authentic Troupes</h2>
            <p className="text-stone-500 text-sm mt-1">Discover professional folk performers near you</p>
          </div>
          <div className="flex gap-4 text-[10px] font-black tracking-widest text-stone-400 uppercase">
            <span>SORT BY:</span>
            <button className="text-heritage-amber underline underline-offset-4 decoration-accent-amber">Experience</button>
            <button className="hover:text-stone-600 transition-colors">Availability</button>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {[1,2,3,4].map(i => (
               <div key={i} className="h-64 bg-stone-200 animate-pulse rounded-3xl"></div>
             ))}
          </div>
        ) : (
          <>
            {filteredTroupes.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatePresence>
                  {filteredTroupes.map(troupe => (
                    <TroupeCard key={troupe.id} troupe={troupe} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-stone-200 shadow-sm">
                 <SlidersHorizontal className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                 <h3 className="text-xl font-serif italic text-stone-400">No troupes found</h3>
                 <button onClick={clearFilters} className="mt-4 text-heritage-amber font-black hover:underline text-xs uppercase tracking-widest">Clear all filters</button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
