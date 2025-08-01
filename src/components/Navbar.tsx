import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' }
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('/')) {
      // Route navigation
      window.location.href = href;
    } else {
      // Scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-luxury-black/95 backdrop-blur-md border-b border-luxury-dark-gray'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 ${isScrolled ? 'bg-luxury-crimson' : 'bg-luxury-light-gray'} rounded transition-colors duration-300`} />
                <span className={`text-xl font-bold tracking-wide ${isScrolled ? 'text-luxury-crimson' : 'text-luxury-light-gray'} transition-colors duration-300`}>
                  LUXURY AUTO
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => handleNavigation(item.href)}
                  className="relative group text-luxury-light-gray hover:text-luxury-crimson transition-colors duration-300 font-medium tracking-wide"
                >
                  {item.name}
                  {isScrolled && (
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-luxury-crimson origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-luxury-light-gray hover:text-luxury-crimson transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-luxury-dark-gray/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => handleNavigation(item.href)}
                  className="text-2xl font-bold text-luxury-light-gray hover:text-luxury-crimson transition-colors duration-300 tracking-wide"
                >
                  {item.name}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 0 }}
                whileTap={{ rotate: 90 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-luxury-crimson hover:text-luxury-light-gray transition-colors duration-300"
              >
                <X size={32} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;