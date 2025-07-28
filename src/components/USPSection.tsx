import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Clock, Award } from 'lucide-react';

const USPSection = () => {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const uspItems = [
    {
      icon: Shield,
      title: "Lifetime Warranty",
      description: "Comprehensive coverage on all certified pre-owned vehicles with our exclusive lifetime warranty program.",
      counter: { value: 100, suffix: "%" }
    },
    {
      icon: Star,
      title: "Premium Service",
      description: "White-glove concierge service including pickup, delivery, and personalized vehicle consultations.",
      counter: { value: 24, suffix: "/7" }
    },
    {
      icon: Clock,
      title: "Fast Financing",
      description: "Same-day financing approval with competitive rates and flexible terms tailored to your needs.",
      counter: { value: 48, suffix: "hrs" }
    },
    {
      icon: Award,
      title: "Certified Excellence",
      description: "Every vehicle undergoes our rigorous 300-point inspection by certified luxury automotive technicians.",
      counter: { value: 300, suffix: "pts" }
    }
  ];

  useEffect(() => {
    const animateCounters = () => {
      counterRefs.current.forEach((ref, index) => {
        if (ref) {
          const targetValue = uspItems[index].counter.value;
          const suffix = uspItems[index].counter.suffix;
          let currentValue = 0;
          const increment = targetValue / 50;
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              clearInterval(timer);
            }
            ref.textContent = Math.floor(currentValue) + suffix;
          }, 50);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('usp-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 bg-luxury-dark-gray">
      <div id="usp-section" className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-luxury-light-gray mb-6">
            Why Choose
            <span className="text-luxury-crimson"> Excellence</span>
          </h2>
          <p className="text-xl text-luxury-light-gray/70 max-w-3xl mx-auto">
            Experience unparalleled service and expertise in luxury automotive sales. 
            We don't just sell cars, we deliver dreams.
          </p>
        </motion.div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {uspItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="luxury-card text-center group"
              >
                {/* Animated Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-6"
                >
                  <div className="w-20 h-20 mx-auto bg-gradient-crimson rounded-full flex items-center justify-center mb-4 group-hover:shadow-crimson-glow transition-all duration-300">
                    <IconComponent size={32} className="text-luxury-light-gray" />
                  </div>
                  
                  {/* Counter */}
                  <div className="text-3xl font-bold text-luxury-crimson mb-2">
                    <span
                      ref={(el) => (counterRefs.current[index] = el)}
                      className="tabular-nums"
                    >
                      0{item.counter.suffix}
                    </span>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-luxury-light-gray group-hover:text-luxury-crimson transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-luxury-light-gray/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Element */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                  className="mt-6 h-px bg-gradient-to-r from-transparent via-luxury-crimson to-transparent"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-luxury-crimson/10 to-luxury-crimson/5 rounded-2xl p-8 border border-luxury-crimson/20">
            <h3 className="text-2xl font-bold text-luxury-light-gray mb-4">
              Ready to Experience Luxury?
            </h3>
            <p className="text-luxury-light-gray/70 mb-6 max-w-2xl mx-auto">
              Schedule a private consultation with our luxury automotive specialists 
              and discover your perfect vehicle today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury-primary"
            >
              Book Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default USPSection;