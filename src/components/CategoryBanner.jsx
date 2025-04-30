
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryBanner = () => {
  return (
    <div className="py-16 bg-ceramic-sand">
      <div className="container-custom">
        <h2 className="text-3xl font-serif font-bold text-ceramic-navy text-center mb-12">Shop by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ceramics Category */}
          <div className="relative overflow-hidden rounded-lg group">
            <img 
              src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Ceramic Products Collection" 
              className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-white text-3xl font-serif font-bold mb-2">Ceramic Collection</h3>
              <p className="text-white/80 mb-4">Handcrafted with traditional techniques</p>
              <Link to="/categories/ceramics" className="inline-block bg-white text-ceramic-navy py-2 px-6 rounded hover:bg-ceramic-terracotta hover:text-white transition-colors">
                Explore Ceramics
              </Link>
            </div>
          </div>
          
          {/* Cosmetics Category */}
          <div className="relative overflow-hidden rounded-lg group">
            <img 
              src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Natural Cosmetics Collection" 
              className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-white text-3xl font-serif font-bold mb-2">Cosmetics Collection</h3>
              <p className="text-white/80 mb-4">Natural ingredients, beautiful results</p>
              <Link to="/categories/cosmetics" className="inline-block bg-white text-ceramic-navy py-2 px-6 rounded hover:bg-ceramic-terracotta hover:text-white transition-colors">
                Explore Cosmetics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
