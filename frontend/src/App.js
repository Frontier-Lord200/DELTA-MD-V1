import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './App.css';

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Will be replaced with actual key

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-90 backdrop-blur-sm z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-red-500 transition-colors duration-300">
            FRONTIER-WEB-DEVELOPMENT
          </Link>
          <div className="flex space-x-8">
            <Link to="/" className="text-white hover:text-red-500 transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-red-500 transition-colors duration-300 font-medium">
              About Us
            </Link>
            <Link to="/services" className="text-white hover:text-red-500 transition-colors duration-300 font-medium">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:text-red-500 transition-colors duration-300 font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://files.catbox.moe/b1e8f9.jpg')`
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            FRONTIER
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-red-500">
            WEB DEVELOPMENT
          </h2>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed">
            Professional Web Development, Design & Digital Solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/services" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              View Our Services
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Services Preview */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600">Professional services tailored to your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300 hover:bg-red-50">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2">Website Development</h3>
              <p className="text-gray-600">Custom websites starting at $200</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300 hover:bg-red-50">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Logo Design</h3>
              <p className="text-gray-600">Professional logos for just $10</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300 hover:bg-red-50">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">Custom Coding</h3>
              <p className="text-gray-600">Code solutions for resale</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Frontier</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="https://files.catbox.moe/bo6m02.jpg" 
              alt="About Frontier" 
              className="w-full rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                I'm a <span className="font-semibold text-red-600">multi device website developer</span>, 
                <span className="font-semibold text-red-600"> Graphics designer</span>, 
                <span className="font-semibold text-red-600"> Logo Designer</span> and 
                <span className="font-semibold text-red-600"> Content Creator</span> dedicated to making products to my customers liking.
              </p>
              <p>
                At Frontier Web Development, we believe in delivering exceptional digital solutions that not only meet but exceed our clients' expectations. Our commitment to quality and customer satisfaction drives everything we do.
              </p>
              <p>
                From responsive websites to stunning visual designs, we bring your digital vision to life with creativity, technical expertise, and attention to detail.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">100+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">5★</div>
                <div className="text-gray-600">Client Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const services = [
    {
      name: "Website Development",
      image: "https://files.catbox.moe/6dj5x3.jpg",
      price: "$200",
      description: "Professional, responsive websites tailored to your business needs. I create modern, fast-loading websites with clean code, SEO optimization, and mobile-first design. From simple landing pages to complex web applications, I deliver high-quality websites that drive results and engage your audience effectively."
    },
    {
      name: "Logo Designing",
      image: "https://files.catbox.moe/4ezw8t.jpg",
      price: "$10",
      description: "Professional logo design services that capture your brand's essence and identity. I create unique, memorable logos that work across all platforms and mediums. Each design is crafted with attention to detail, ensuring your brand stands out with a distinctive visual identity that resonates with your target audience."
    },
    {
      name: "Streaming Accounts",
      image: "https://files.catbox.moe/c1ekuj.jpg",
      price: "Contact for pricing",
      description: "Get access to affordable Netflix and Crunchyroll accounts. We provide reliable streaming account services with competitive pricing. Enjoy your favorite shows, movies, and anime content without breaking the bank. Contact us for current availability and special bundle offers."
    },
    {
      name: "Code Dealer",
      image: "https://files.catbox.moe/7uhq6h.jpg",
      price: "Custom pricing",
      description: "Custom code solutions designed for resale and commercial use. I write clean, well-documented code in various programming languages and frameworks. Whether you need scripts, applications, or specific functionality, I deliver quality code that you can confidently resell to your clients with full commercial rights."
    },
    {
      name: "Free PSP Games",
      image: "https://files.catbox.moe/b05woz.jpg",
      price: "FREE",
      description: "Join our exclusive WhatsApp channel for free PSP games! We regularly share high-quality PSP game downloads, tips, tricks, and gaming content. Get access to a vast collection of classic and popular PlayStation Portable games. Contact us to be added to our gaming community channel."
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600">Professional services designed to elevate your business</p>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  <span className="text-lg font-bold text-red-600">{service.price}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link 
                  to="/contact" 
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300 text-sm font-medium"
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with actual EmailJS service details
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: 'sirfrontier3@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'
      );
      
      setSubmitStatus('success');
      navigate('/thank-you');
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600">Ready to start your project? Let's discuss your needs</p>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                  <a 
                    href="https://wa.me/263788521064" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 transition-colors duration-300"
                  >
                    +263788521064
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a 
                    href="mailto:sirfrontier3@gmail.com"
                    className="text-red-600 hover:text-red-700 transition-colors duration-300"
                  >
                    sirfrontier3@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.16-1.507-.402-2.451-1.534-2.451-3.11 0-3.778 2.745-7.252 7.919-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Instagram</h3>
                  <a 
                    href="https://www.instagram.com/frontiear?igsh=MWdpZHdmamk3N3Zqaw==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 transition-colors duration-300"
                  >
                    @frontiear
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">YouTube</h3>
                  <a 
                    href="https://youtube.com/@frontier-tech-r2m?si=7HXM40aIYAdXaRVX" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 transition-colors duration-300"
                  >
                    @frontier-tech-r2m
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300"
                  placeholder="Tell us about your project requirements..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm mt-2">
                  There was an error sending your message. Please try again or contact us directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThankYouPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="mb-8">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You for Choosing Us!</h1>
            <p className="text-xl text-gray-600 mb-8">
              We've received your message and will get back to you within 24 hours.
            </p>
          </div>
          
          <div className="mb-8">
            <video 
              autoPlay 
              loop 
              muted 
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              poster="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            >
              <source src="https://www.pexels.com/download/video/5311420/" type="video/mp4" />
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216" 
                alt="Business handshake representing successful partnership"
                className="w-full rounded-lg"
              />
            </video>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">What happens next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-3xl mb-2">📧</div>
                <h3 className="font-semibold text-gray-800">We Review</h3>
                <p className="text-sm text-gray-600">Your requirements are carefully analyzed</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold text-gray-800">We Discuss</h3>
                <p className="text-sm text-gray-600">We'll contact you to discuss details</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-semibold text-gray-800">We Deliver</h3>
                <p className="text-sm text-gray-600">Your project comes to life</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Back to Home
            </Link>
            <a 
              href="https://wa.me/263788521064" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;