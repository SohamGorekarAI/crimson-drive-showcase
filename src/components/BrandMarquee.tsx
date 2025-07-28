import { motion } from 'framer-motion';

const BrandMarquee = () => {
  const brands = [
    'MERCEDES-BENZ', 'BMW', 'AUDI', 'PORSCHE', 'FERRARI', 
    'LAMBORGHINI', 'MASERATI', 'BENTLEY', 'ROLLS-ROYCE', 'ASTON MARTIN',
    'MCLAREN', 'BUGATTI', 'TESLA', 'LEXUS', 'JAGUAR'
  ];

  return (
    <section className="py-16 bg-luxury-dark-gray border-y border-luxury-light-gray/10">
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: '-100%' }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="flex whitespace-nowrap"
          style={{ width: '200%' }}
        >
          {/* First set of brands */}
          <div className="flex items-center space-x-16 pr-16">
            {brands.map((brand, index) => (
              <motion.div
                key={`first-${index}`}
                whileHover={{ 
                  scale: 1.1,
                  color: 'hsl(var(--luxury-crimson))'
                }}
                transition={{ duration: 0.3 }}
                className="text-luxury-light-gray/60 hover:text-luxury-crimson text-xl md:text-2xl font-bold tracking-wider cursor-pointer transition-colors duration-300"
              >
                {brand}
              </motion.div>
            ))}
          </div>
          
          {/* Second set of brands (duplicate for seamless loop) */}
          <div className="flex items-center space-x-16 pr-16">
            {brands.map((brand, index) => (
              <motion.div
                key={`second-${index}`}
                whileHover={{ 
                  scale: 1.1,
                  color: 'hsl(var(--luxury-crimson))'
                }}
                transition={{ duration: 0.3 }}
                className="text-luxury-light-gray/60 hover:text-luxury-crimson text-xl md:text-2xl font-bold tracking-wider cursor-pointer transition-colors duration-300"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pause on hover indicator */}
      <div className="text-center mt-8">
        <p className="text-luxury-light-gray/40 text-sm tracking-wide">
          Luxury automotive brands we feature
        </p>
      </div>
    </section>
  );
};

export default BrandMarquee;