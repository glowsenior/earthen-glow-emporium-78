
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-ceramic-cream">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-ceramic-navy leading-tight mb-4">
              Handcrafted with <span className="text-ceramic-terracotta">Love</span> and <span className="text-ceramic-terracotta">Care</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Discover our collection of premium ceramic products and natural cosmetics made with sustainable materials and traditional techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary text-center">
                Shop Collection
              </Link>
              <Link to="/about" className="btn-secondary text-center">
                Our Story
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1565193298442-2373bcb29ca4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Beautiful ceramic vase with flowers" 
                className="object-cover w-full h-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-ceramic-navy opacity-10 rounded-lg"></div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-40 h-40 rounded-full bg-ceramic-sage opacity-20 -z-10"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-ceramic-terracotta opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
