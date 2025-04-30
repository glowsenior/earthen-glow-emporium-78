
import React, { useState } from 'react';
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    // Mock subscribe functionality - would connect to backend in real implementation
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail('');
  };

  return (
    <div className="py-16 bg-ceramic-cream">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-ceramic-navy mb-4">Stay Connected</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for exclusive offers, early access to new products, and ceramic care tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ceramic-terracotta"
            />
            <button 
              type="submit"
              className="btn-primary sm:px-6"
            >
              Subscribe
            </button>
          </form>
          
          <p className="mt-4 text-sm text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
