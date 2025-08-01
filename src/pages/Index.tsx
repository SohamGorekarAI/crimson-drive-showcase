import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BrandMarquee from '@/components/BrandMarquee';
import FeaturedInventory from '@/components/FeaturedInventory';
import USPSection from '@/components/USPSection';
import ContactForm from '@/components/ContactForm';
import SuperCar from '@/components/SuperCar';
import Footer from '@/components/Footer';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Always show preloader on page load/refresh
  useEffect(() => {
    setShowPreloader(true);
    setIsLoaded(false);
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
        <SuperCar />
        <USPSection />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer/>

    </motion.div>
  );
};

export default Index;
