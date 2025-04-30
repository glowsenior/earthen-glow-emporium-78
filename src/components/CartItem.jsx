
import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center py-5 border-b border-gray-200">
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-ceramic-terracotta"
            aria-label="Remove item"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-gray-500">{item.category}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button 
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:text-ceramic-terracotta focus:outline-none" 
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-2 py-1 text-sm">{item.quantity}</span>
            <button 
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:text-ceramic-terracotta focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="text-right">
            {item.salePrice ? (
              <>
                <p className="text-sm font-medium text-ceramic-terracotta">${(item.salePrice * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-gray-500 line-through">${(item.price * item.quantity).toFixed(2)}</p>
              </>
            ) : (
              <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
