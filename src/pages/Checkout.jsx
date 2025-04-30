
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const shipping = 10;
  const tax = cartTotal * 0.08;

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div>
        <Header />
        <main className="min-h-screen py-16">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
            <p className="mb-8">You need to add items to your cart before checking out.</p>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="min-h-screen py-8 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-serif font-bold">Checkout</h1>
              <Link to="/cart" className="text-ceramic-terracotta hover:text-ceramic-clay font-medium">
                Back to Cart
              </Link>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 overflow-hidden rounded">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div>
                      {item.salePrice ? (
                        <span className="font-medium">${(item.salePrice * item.quantity).toFixed(2)}</span>
                      ) : (
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <CheckoutForm subtotal={cartTotal} shipping={shipping} tax={tax} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
