
import React from 'react';
import { Link } from 'react-router-dom';
import ThreeDAnimation from './ThreeDAnimation';

const AdminLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-ceramic-navy text-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="font-serif text-xl font-bold">
                Earthen<span className="text-ceramic-terracotta">Glow</span>
              </Link>
              <span className="text-sm bg-ceramic-terracotta px-2 py-0.5 rounded">Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-sm hover:text-ceramic-terracotta">Dashboard</Link>
              <Link to="/" className="text-sm hover:text-ceramic-terracotta">View Store</Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-ceramic-navy">{title}</h1>
          <div className="absolute right-8 top-20 w-24 h-24 opacity-40 pointer-events-none">
            <ThreeDAnimation type="ceramic" height="100px" />
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
