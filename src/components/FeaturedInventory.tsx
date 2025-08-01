import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import featuredCar1 from '@/assets/featured-car-1.jpg';
import featuredCar2 from '@/assets/featured-car-2.jpg';
import featuredCar3 from '@/assets/featured-car-3.jpg';

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  price: string;
  year: number;
  image: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
  };
}

const FeaturedInventory = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const vehicles: Vehicle[] = [
    {
      id: 1,
      name: "AMG GT 63 S",
      brand: "Mercedes-Benz",
      price: "$189,900",
      year: 2024,
      image: featuredCar1,
      specs: {
        engine: "4.0L V8 Biturbo",
        power: "630 HP",
        acceleration: "3.1s 0-60mph",
        topSpeed: "196 mph"
      }
    },
    {
      id: 2,
      name: "X7 M50i",
      brand: "BMW",
      price: "$156,700",
      year: 2024,
      image: featuredCar2,
      specs: {
        engine: "4.4L V8 TwinPower",
        power: "523 HP",
        acceleration: "4.1s 0-60mph",
        topSpeed: "155 mph"
      }
    },
    {
      id: 3,
      name: "911 Turbo S",
      brand: "Porsche",
      price: "$234,400",
      year: 2024,
      image: featuredCar3,
      specs: {
        engine: "3.8L H6 Twin-Turbo",
        power: "640 HP",
        acceleration: "2.6s 0-60mph",
        topSpeed: "205 mph"
      }
    },
    {
      id: 4,
      name: "F-Type R",
      brand: "Jaguar",
      price: "$126,500",
      year: 2024,
      image: featuredCar1,
      specs: {
        engine: "5.0L V8 Supercharged",
        power: "575 HP",
        acceleration: "3.5s 0-60mph",
        topSpeed: "186 mph"
      }
    },
    {
      id: 5,
      name: "GLE 63 S AMG",
      brand: "Mercedes-Benz",
      price: "$174,900",
      year: 2024,
      image: featuredCar2,
      specs: {
        engine: "4.0L V8 Biturbo",
        power: "603 HP",
        acceleration: "3.7s 0-60mph",
        topSpeed: "174 mph"
      }
    },
    {
      id: 6,
      name: "Cayenne Turbo",
      brand: "Porsche",
      price: "$167,500",
      year: 2024,
      image: featuredCar3,
      specs: {
        engine: "4.0L V8 Twin-Turbo",
        power: "541 HP",
        acceleration: "3.9s 0-60mph",
        topSpeed: "177 mph"
      }
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % vehicles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [vehicles.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % vehicles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  };

  const getSlidePosition = (index: number) => {
    const totalSlides = vehicles.length;
    const activeIndex = currentIndex;
    let position = index - activeIndex;
    
    if (position < -totalSlides / 2) position += totalSlides;
    if (position > totalSlides / 2) position -= totalSlides;
    
    return position;
  };

  const getSlideStyles = (position: number) => {
    const isCenter = position === 0;
    const isAdjacent = Math.abs(position) === 1;
    const isSideVisible = Math.abs(position) <= 2;
    
    if (!isSideVisible) {
      return {
        opacity: 0,
        scale: 0.7,
        x: position > 0 ? 400 : -400,
        z: -200,
        rotateY: position > 0 ? -45 : 45
      };
    }
    
    if (isCenter) {
      return {
        opacity: 1,
        scale: 1,
        x: 0,
        z: 0,
        rotateY: 0
      };
    }
    
    if (isAdjacent) {
      return {
        opacity: 0.7,
        scale: 0.85,
        x: position * 280,
        z: -100,
        rotateY: position * 25
      };
    }
    
    return {
      opacity: 0.4,
      scale: 0.75,
      x: position * 320,
      z: -150,
      rotateY: position * 35
    };
  };

  return (
    <section id="inventory" className="py-24 bg-luxury-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-luxury-light-gray mb-6">
            Featured
            <span className="text-luxury-crimson"> Collection</span>
          </h2>
          <p className="text-xl text-luxury-light-gray/70 max-w-3xl mx-auto">
            Discover our handpicked selection of the world's most extraordinary vehicles, 
            each representing the pinnacle of automotive engineering and design.
          </p>
        </motion.div>

        {/* Circular Carousel */}
        <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="absolute left-8 z-20 text-luxury-light-gray hover:text-luxury-crimson transition-colors duration-300"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="absolute right-8 z-20 text-luxury-light-gray hover:text-luxury-crimson transition-colors duration-300"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </motion.button>

          {/* Carousel Items */}
          <div className="relative w-full h-full flex items-center justify-center">
            {vehicles.map((vehicle, index) => {
              const position = getSlidePosition(index);
              const styles = getSlideStyles(position);
              const isVisible = Math.abs(position) <= 2;
              
              if (!isVisible) return null;
              
              return (
                <motion.div
                  key={vehicle.id}
                  className="absolute w-80 cursor-pointer"
                  animate={styles}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <motion.div
                    className="luxury-card group"
                    whileHover={position === 0 ? { y: -10 } : {}}
                  >
                    {/* Vehicle Image */}
                    <div className="relative overflow-hidden rounded-lg mb-6">
                      <motion.img
                        src={vehicle.image}
                        alt={`${vehicle.brand} ${vehicle.name}`}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Actions - only visible on center card */}
                      {position === 0 && (
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-luxury-black/80 text-luxury-light-gray hover:text-luxury-crimson rounded-full backdrop-blur-sm transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Heart size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-luxury-black/80 text-luxury-light-gray hover:text-luxury-crimson rounded-full backdrop-blur-sm transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Eye size={18} />
                          </motion.button>
                        </div>
                      )}

                      {/* Year Badge */}
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-luxury-crimson text-luxury-light-gray text-sm font-semibold rounded-full">
                        {vehicle.year}
                      </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-luxury-light-gray group-hover:text-luxury-crimson transition-colors duration-300">
                          {vehicle.brand}
                        </h3>
                        <p className="text-luxury-light-gray/70 text-lg">
                          {vehicle.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-luxury-crimson">
                          {vehicle.price}
                        </span>
                        {position === 0 && (
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center text-luxury-light-gray/60 group-hover:text-luxury-crimson transition-colors duration-300"
                          >
                            <span className="text-sm font-medium mr-2">View Details</span>
                            <ArrowRight size={16} />
                          </motion.div>
                        )}
                      </div>

                      {/* Quick Specs - only show on center card */}
                      {position === 0 && (
                        <div className="grid grid-cols-2 gap-2 text-sm text-luxury-light-gray/60">
                          <div>{vehicle.specs.power}</div>
                          <div>{vehicle.specs.acceleration}</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {vehicles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-luxury-crimson w-6' 
                    : 'bg-luxury-light-gray/30 hover:bg-luxury-light-gray/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/inventory'}
            className="btn-luxury-outline"
          >
            View Complete Inventory
          </motion.button>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/90 backdrop-blur-lg p-6"
            onClick={() => setSelectedVehicle(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-luxury-dark-gray rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedVehicle.image}
                  alt={`${selectedVehicle.brand} ${selectedVehicle.name}`}
                  className="w-full h-96 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="absolute top-4 right-4 p-2 bg-luxury-black/80 text-luxury-light-gray hover:text-luxury-crimson rounded-full backdrop-blur-sm transition-colors duration-300"
                >
                  ×
                </button>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-luxury-light-gray mb-2">
                    {selectedVehicle.brand} {selectedVehicle.name}
                  </h3>
                  <p className="text-4xl font-bold text-luxury-crimson">
                    {selectedVehicle.price}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {Object.entries(selectedVehicle.specs).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-luxury-light-gray text-lg font-semibold mb-1">
                        {value}
                      </div>
                      <div className="text-luxury-light-gray/60 text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button className="btn-luxury-primary flex-1">
                    Schedule Test Drive
                  </button>
                  <button className="btn-luxury-outline flex-1">
                    Request Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedInventory;