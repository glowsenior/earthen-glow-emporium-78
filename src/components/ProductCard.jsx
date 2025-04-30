
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative card-hover">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
          
          {product.sale && (
            <div className="absolute top-2 right-2 bg-ceramic-terracotta text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </div>
          )}
          
          <button 
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-ceramic-terracotta text-white py-2 flex items-center justify-center opacity-0 transform translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
          >
            <ShoppingBag size={16} className="mr-2" />
            Add to Cart
          </button>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-ceramic-terracotta transition-colors">
              {product.name}
            </h3>
            <div>
              {product.sale ? (
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-ceramic-terracotta">${product.salePrice.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
