import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import heroCarImage from '@/assets/hero-car.jpg';

const HeroSection = () => {
  const scrollToInventory = () => {
    const element = document.querySelector('#inventory');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroCarImage}
          alt="Luxury Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-luxury-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center lg:text-left">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-luxury-light-gray mb-6 leading-tight"
          >
            Crafting
            <br />
            <span className="bg-gradient-crimson bg-clip-text text-transparent">
              Automotive
            </span>
            <br />
            Excellence
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl text-luxury-light-gray/70 mb-8 max-w-2xl leading-relaxed"
          >
            Experience the pinnacle of luxury automotive design with our curated collection 
            of the world's finest vehicles.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToInventory}
              className="btn-luxury-primary group flex items-center space-x-3"
            >
              <span>Explore Collection</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury-outline group flex items-center space-x-3"
            >
              <Play size={18} />
              <span>Watch Showcase</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-luxury-light-gray/20"
          >
            {[
              { number: "500+", label: "Luxury Vehicles" },
              { number: "25+", label: "Premium Brands" },
              { number: "10k+", label: "Satisfied Clients" }
            ].map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  className="text-2xl md:text-3xl font-bold text-luxury-crimson mb-1"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-luxury-light-gray/60 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-luxury-light-gray/60"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <div className="w-px h-8 bg-gradient-to-b from-luxury-crimson to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;