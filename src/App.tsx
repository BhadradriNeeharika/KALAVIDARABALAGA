import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, loginWithGoogle, logout } from './services/firebase';
import { User as UserIcon, Home as HomeIcon, Search, Info, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import HomePage from './pages/Home';
import ArtistDirectory from './pages/ArtistDirectory';
import ArtistProfile from './pages/ArtistProfile';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Directory', path: '/artists', icon: Search },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        {/* Navigation */}
        <nav className="h-20 bg-heritage-amber sticky top-0 z-50 shadow-md flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-accent-amber rounded-full flex items-center justify-center border-2 border-white shadow-inner transition-transform group-hover:scale-105">
                  <span className="text-amber-900 font-black text-2xl">KB</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-white font-bold text-xl tracking-tight leading-tight">Kalavidara-Balaga</h1>
                  <p className="text-amber-200 text-[10px] uppercase tracking-[0.2em] font-semibold">Folk Artist Talent Hub</p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-amber-100 hover:text-white transition-colors font-medium text-sm tracking-wide"
                  >
                    {link.name}
                  </Link>
                ))}
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full" />
                      ) : (
                        <UserIcon className="w-4 h-4 text-white" />
                      )}
                      <span className="text-xs font-semibold text-white">{user.displayName?.split(' ')[0]}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-amber-200 hover:text-white transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={loginWithGoogle}
                    className="bg-accent-amber text-amber-900 px-6 py-2 rounded-full text-sm font-black hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    Login
                  </button>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
        </nav>

          {/* Mobile Nav */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden bg-white border-b border-stone-200"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-stone-600 hover:text-heritage-amber"
                    >
                      {link.name}
                    </Link>
                  ))}
                  {!user ? (
                    <button
                      onClick={() => {
                        loginWithGoogle();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-base font-bold text-heritage-amber"
                    >
                      Login with Google
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium text-red-600"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        {/* Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artists" element={<ArtistDirectory />} />
            <Route path="/artists/:id" element={<ArtistProfile />} />
            <Route path="/about" element={
              <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl mb-6">Our Mission</h1>
                <p className="text-xl text-stone-600 leading-relaxed italic">
                  "Kalavidara-Balaga" is a Folk Artist Talent Hub. We aim to preserve Karnataka's rich cultural heritage
                  by making traditional art a sustainable profession for rural troupes, connecting them directly with
                  the urban event market.
                </p>
              </div>
            } />
          </Routes>
        </main>

        <footer className="bg-stone-900 text-stone-400 py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div>
              <h3 className="text-white font-serif text-xl mb-4 italic">Kalavidara Balaga</h3>
              <p className="text-sm">Empowering folk artists of Karnataka through technology and recognition.</p>
            </div>
            <div>
              <h4 className="text-stone-200 font-bold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm italic">
                <Link to="/" className="block hover:text-heritage-amber">Home</Link>
                <Link to="/artists" className="block hover:text-heritage-amber">Directory</Link>
                <Link to="/about" className="block hover:text-heritage-amber">About Us</Link>
              </div>
            </div>
            <div>
              <h4 className="text-stone-200 font-bold text-xs uppercase tracking-widest mb-4">Contact</h4>
              <p className="text-sm">Email: heritage@kalavidara-balaga.in</p>
              <p className="text-sm">Location: Karnataka, India</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-800 text-center text-xs tracking-widest uppercase">
            &copy; 2026 Kalavidara Balaga • Preserving Traditional Art
          </div>
        </footer>
      </div>
    </Router>
  );
}
