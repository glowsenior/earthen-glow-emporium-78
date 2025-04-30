
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const OrderSummary = ({ showCheckoutButton = false }) => {
  const { cartItems } = useCart();
  
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.salePrice || item.price;
    return total + (price * item.quantity);
  }, 0);
  
  const shipping = 10; // Fixed shipping cost
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({cartItems.reduce((count, item) => count + item.quantity, 0)} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between">
          <span className="text-lg font-medium text-gray-900">Total</span>
          <span className="text-lg font-medium text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>
      
      {showCheckoutButton && (
        <Link to="/checkout" className="w-full block text-center bg-ceramic-terracotta hover:bg-ceramic-clay text-white py-3 rounded-md transition-colors">
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
};

export default OrderSummary;
