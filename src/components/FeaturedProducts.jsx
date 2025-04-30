
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const FeaturedProducts = ({ title, products, viewAllLink }) => {
  return (
    <div className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-ceramic-navy">{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-ceramic-terracotta hover:text-ceramic-clay font-medium">
              View All
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
