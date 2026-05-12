import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FEATURED_TROUPES } from '../constants';
import TroupeCard from '../components/TroupeCard';
import { ChevronRight, Sparkles, Globe, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-heritage-amber text-soft-orange">
        {/* Background Image / Texture */}
        <div className="absolute inset-0 opacity-20 grayscale mix-blend-overlay">
           <img 
             src="https://images.unsplash.com/photo-1549419163-cf9d84e27f00?q=80&w=2000&auto=format&fit=crop" 
             className="w-full h-full object-cover"
             alt="Folk dance"
           />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-1 bg-accent-amber text-amber-900 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 shadow-sm">
              Empowering Tradition
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 tracking-tighter">
              Connecting <br />
              <span className="italic text-accent-amber">Folk Artists</span> <br />
              to the World.
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 font-light mb-10 max-w-2xl leading-relaxed">
              Moving beyond seasonal labor. A professional marketplace for 
              Karnataka's authentic musical troupes (Dollu Kunitha, Pooja Kunitha, and more).
            </p>
            <div className="flex flex-wrap gap-4 font-bold">
              <Link
                to="/artists"
                className="bg-accent-amber text-amber-900 px-8 py-4 rounded-full flex items-center gap-2 hover:translate-y-[-4px] transition-all shadow-xl shadow-amber-900/40"
              >
                Explore Troupes <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="border border-white/20 text-white px-8 py-4 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all font-medium"
              >
                Our Mission
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Vertical Rail Text */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.5em] text-amber-500/50 font-bold">
           Karnataka Heritage • Traditional Performing Arts • Creative Economy
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold text-heritage-amber uppercase tracking-widest mb-2">Editor's Picks</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-800">Featured Performers</h3>
          </div>
          <Link to="/artists" className="flex items-center gap-2 text-heritage-amber font-bold hover:text-amber-600 transition-colors underline underline-offset-8 decoration-accent-amber">
            View All Directory <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_TROUPES.map((troupe, index) => (
            <motion.div
              key={troupe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TroupeCard troupe={troupe} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values / Mission Section */}
      <section className="bg-white border-t border-stone-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent-amber/10 rounded-2xl flex items-center justify-center text-heritage-amber">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-serif font-bold italic">Cultural Preservation</h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Making folk arts financially viable ensures that youth stay connected to their roots and continue the legacy.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent-amber/10 rounded-2xl flex items-center justify-center text-heritage-amber">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-serif font-bold italic">Creative Economy</h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Connecting rural talent with the growing urban event markets—from corporate gigs to boutique weddings.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent-amber/10 rounded-2xl flex items-center justify-center text-heritage-amber">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-serif font-bold italic">Soft Power</h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Showcasing the incredible diversity of Karnataka's performing arts to a global audience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
