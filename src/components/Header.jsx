
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-ceramic-cream shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-ceramic-navy">
              Earthen<span className="text-ceramic-terracotta">Glow</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-ceramic-terracotta transition-colors">Home</Link>
            <Link to="/shop" className="font-medium hover:text-ceramic-terracotta transition-colors">Shop</Link>
            <Link to="/categories/ceramics" className="font-medium hover:text-ceramic-terracotta transition-colors">Ceramics</Link>
            <Link to="/categories/cosmetics" className="font-medium hover:text-ceramic-terracotta transition-colors">Cosmetics</Link>
            <Link to="/about" className="font-medium hover:text-ceramic-terracotta transition-colors">About</Link>
            <Link to="/contact" className="font-medium hover:text-ceramic-terracotta transition-colors">Contact</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="hover:text-ceramic-terracotta transition-colors">
              <Search size={20} />
            </Link>
            <Link to="/account" className="hover:text-ceramic-terracotta transition-colors">
              <User size={20} />
            </Link>
            <Link to="/cart" className="relative hover:text-ceramic-terracotta transition-colors">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ceramic-terracotta text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-ceramic-cream py-4 animate-fadeIn">
          <div className="container-custom flex flex-col space-y-4">
            <Link to="/" className="font-medium py-2 hover:text-ceramic-terracotta transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/shop" className="font-medium py-2 hover:text-ceramic-terracotta transition-colors" onClick={toggleMenu}>Shop</Link>
            <Link to="/categories/ceramics" className="font-medium py-2 hover:text-ceramic-terracotta transition-colors" onClick={toggleMenu}>Ceramics</Link>
            <Link to="/categories/cosmetics" className="font-medium py-2 hover:text-ceramic-terracotta transition-colors" onClick={toggleMenu}>Cosmetics</Link>
            <Link to="/about" className="font-medium py-2 hover:text-ceramic-terracotta transition-colors" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="font-medium py-2 hover:text-ceramic-terracotta transition-colors" onClick={toggleMenu}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
