
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import GoogleMap from '../components/GoogleMap';
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    toast.success("Thank you for your message! We'll be in touch soon.");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-ceramic-navy text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-lg max-w-2xl">
              Have questions or feedback? We'd love to hear from you. Reach out to our team using the form below.
            </p>
          </div>
        </div>
        
        {/* Contact Form & Information */}
        <div className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-serif font-bold text-ceramic-navy mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ceramic-terracotta"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ceramic-terracotta"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ceramic-terracotta"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ceramic-terracotta"
                      required
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-ceramic-terracotta hover:bg-ceramic-clay text-white font-medium rounded-md transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-serif font-bold text-ceramic-navy mb-6">Contact Information</h2>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Ceramic Lane<br />
                      Clay District, CA 90210<br />
                      United States
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">info@earthenglow.com</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                
                {/* Google Map */}
                <div className="h-64 rounded-lg overflow-hidden">
                  <GoogleMap address="123 Ceramic Lane, Clay District, CA 90210" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
