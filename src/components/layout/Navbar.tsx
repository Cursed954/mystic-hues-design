
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../theme/ThemeToggle';
import useMobile from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'States', path: '/#states' },
  { name: 'Gallery', path: '/#gallery' },
  { name: 'Cuisine', path: '/#cuisine' },
  { name: 'Virtual Tours', path: '/#virtual-tours' },
  { name: 'Experience', path: '/#experience' },
  { name: 'Contact', path: '/#contact' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'py-3 bg-background/90 backdrop-blur-md shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="z-10">
          <Logo className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="nav-item"
              >
                {item.name}
              </a>
            ))}

            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <div className="flex items-center">
            <ThemeToggle />
            <button
              className="ml-2 p-2 text-foreground"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col items-center">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  className="py-3 text-lg font-medium text-foreground hover:text-spice-500 transition-colors"
                  onClick={toggleMobileMenu}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.05 + 0.1 } 
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
