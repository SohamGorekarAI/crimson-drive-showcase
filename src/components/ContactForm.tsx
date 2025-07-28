import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      // Simulate form submission (replace with actual Formspree endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus({
        type: 'success',
        message: 'Thank you! We\'ll contact you within 24 hours.'
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      description: "Mon-Sat 9AM-8PM"
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "info@luxuryauto.com",
      description: "We respond within 2 hours"
    },
    {
      icon: MapPin,
      title: "Visit Showroom",
      value: "123 Luxury Ave, Beverly Hills",
      description: "By appointment only"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-luxury-black">
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
            Get In
            <span className="text-luxury-crimson"> Touch</span>
          </h2>
          <p className="text-xl text-luxury-light-gray/70 max-w-3xl mx-auto">
            Ready to find your dream car? Our luxury automotive specialists are here 
            to provide personalized service and expert guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-luxury-light-gray mb-6">
                Contact Information
              </h3>
              <p className="text-luxury-light-gray/70 leading-relaxed mb-8">
                Experience white-glove service from our luxury automotive specialists. 
                We're here to make your car buying journey as smooth as the vehicles we sell.
              </p>
            </div>

            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-luxury-dark-gray/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-crimson rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent size={20} className="text-luxury-light-gray" />
                  </div>
                  <div>
                    <h4 className="text-luxury-light-gray font-semibold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-luxury-crimson font-medium mb-1">
                      {item.value}
                    </p>
                    <p className="text-luxury-light-gray/60 text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-luxury-light-gray/20"
            >
              <h4 className="text-luxury-light-gray font-semibold mb-4">
                Follow Our Journey
              </h4>
              <div className="flex space-x-4">
                {['Instagram', 'Facebook', 'LinkedIn', 'YouTube'].map((platform, index) => (
                  <motion.button
                    key={platform}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-luxury-dark-gray border border-luxury-light-gray/20 rounded-full flex items-center justify-center text-luxury-light-gray hover:border-luxury-crimson hover:text-luxury-crimson transition-all duration-300"
                  >
                    {platform.charAt(0)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="luxury-card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="floating-label-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="floating-input w-full px-4 py-3 bg-luxury-dark-gray border border-luxury-light-gray/20 rounded-lg text-luxury-light-gray focus:border-luxury-crimson focus:outline-none transition-colors duration-300"
                />
                <label htmlFor="name" className="floating-label">
                  Full Name
                </label>
              </div>

              {/* Email Field */}
              <div className="floating-label-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="floating-input w-full px-4 py-3 bg-luxury-dark-gray border border-luxury-light-gray/20 rounded-lg text-luxury-light-gray focus:border-luxury-crimson focus:outline-none transition-colors duration-300"
                />
                <label htmlFor="email" className="floating-label">
                  Email Address
                </label>
              </div>

              {/* Phone Field */}
              <div className="floating-label-group">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="floating-input w-full px-4 py-3 bg-luxury-dark-gray border border-luxury-light-gray/20 rounded-lg text-luxury-light-gray focus:border-luxury-crimson focus:outline-none transition-colors duration-300"
                />
                <label htmlFor="phone" className="floating-label">
                  Phone Number
                </label>
              </div>

              {/* Message Field */}
              <div className="floating-label-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder=" "
                  className="floating-input w-full px-4 py-3 bg-luxury-dark-gray border border-luxury-light-gray/20 rounded-lg text-luxury-light-gray focus:border-luxury-crimson focus:outline-none transition-colors duration-300 resize-none"
                />
                <label htmlFor="message" className="floating-label">
                  Your Message
                </label>
              </div>

              {/* Status Message */}
              {status.type !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : status.type === 'error'
                      ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                      : 'bg-luxury-crimson/10 border border-luxury-crimson/20 text-luxury-crimson'
                  }`}
                >
                  {status.type === 'success' && <CheckCircle size={16} />}
                  {status.type === 'error' && <AlertCircle size={16} />}
                  {status.type === 'loading' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    />
                  )}
                  <span className="text-sm">{status.message}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status.type === 'loading'}
                whileHover={{ scale: status.type === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status.type === 'loading' ? 1 : 0.98 }}
                className="w-full btn-luxury-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;