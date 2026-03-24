import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/remove-duplicates', label: 'Remove Duplicates' },
  { path: '/reverse-string', label: 'Reverse String' },
  { path: '/even-odd', label: 'Even/Odd' },
  { path: '/largest-number', label: 'Largest Number' },
  { path: '/count-vowels', label: 'Count Vowels' },
  { path: '/capitalize-first', label: 'Capitalize First' },
  { path: '/remove-falsy', label: 'Remove Falsy' },
  { path: '/array-sum', label: 'Array Sum' },
  { path: '/missing-number', label: 'Missing Number' },
  { path: '/task-manager', label: 'Task Manager' },
];

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
      });
      gsap.fromTo(
        menuRef.current,
        { x: '-100%' },
        {
          x: '0%',
          duration: 0.5,
          ease: 'power3.out',
        }
      );
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: '-100%',
        duration: 0.4,
        ease: 'power3.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
      });
    }
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-gray-900/70 border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2 group">
                <Code2 className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Okasha’s Coding Arena
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-800/50 border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-cyan-400" />
                ) : (
                  <Menu className="w-6 h-6 text-cyan-400" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* OVERLAY */}
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 opacity-0 pointer-events-none"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* SIDEBAR */}
        <div
          ref={menuRef}
          className="fixed left-0 top-0 bottom-0 w-80 bg-gray-900/95 backdrop-blur-lg border-r border-cyan-500/20 z-50 -translate-x-full overflow-y-auto scroll-smooth"
        >
          <div className="p-6 pt-24">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Navigation</h2>
            <nav className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-cyan-300'
                      : 'bg-gray-800/30 border border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:border-cyan-500/30'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main ref={contentRef} className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        {/* FOOTER */}
        <footer className="relative">
          <div className="h-px w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-gradient-x" />
          <div className="backdrop-blur-md bg-gray-900/70 border-t border-cyan-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2 group">
                <Code2 className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Okasha’s Coding Arena
                </span>
              </Link>
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} Smooth, dark, and modern
              </div>
            </div>
          </div>
        </footer>

    </div>
  );
}
