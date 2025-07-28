import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BrandMarquee from '@/components/BrandMarquee';
import FeaturedInventory from '@/components/FeaturedInventory';
import USPSection from '@/components/USPSection';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has seen preloader before
    const hasSeenPreloader = localStorage.getItem('hasSeenPreloader');
    if (hasSeenPreloader) {
      setShowPreloader(false);
      setIsLoaded(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setTimeout(() => setIsLoaded(true), 100);
  };

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-luxury-black text-luxury-light-gray"
    >
      <Navbar />
      
      <main>
        <HeroSection />
        <BrandMarquee />
        <FeaturedInventory />
        <USPSection />
        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="bg-luxury-dark-gray border-t border-luxury-light-gray/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-luxury-crimson rounded" />
                <span className="text-2xl font-bold tracking-wide text-luxury-light-gray">
                  LUXURY AUTO
                </span>
              </div>
              <p className="text-luxury-light-gray/70 max-w-md leading-relaxed">
                Crafting automotive excellence since 1985. We specialize in the world's 
                finest luxury vehicles, providing unmatched service and expertise.
              </p>
            </div>
            
            <div>
              <h4 className="text-luxury-light-gray font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-luxury-light-gray/70">
                <li><a href="#home" className="hover:text-luxury-crimson transition-colors">Home</a></li>
                <li><a href="#inventory" className="hover:text-luxury-crimson transition-colors">Inventory</a></li>
                <li><a href="#services" className="hover:text-luxury-crimson transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-luxury-crimson transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-luxury-light-gray font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-luxury-light-gray/70">
                <li><a href="#" className="hover:text-luxury-crimson transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-luxury-crimson transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-luxury-crimson transition-colors">Financing</a></li>
                <li><a href="#" className="hover:text-luxury-crimson transition-colors">Warranty</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-luxury-light-gray/10 mt-8 pt-8 text-center">
            <p className="text-luxury-light-gray/60">
              &copy; 2024 Luxury Auto. All rights reserved. | Built with excellence.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Index;
