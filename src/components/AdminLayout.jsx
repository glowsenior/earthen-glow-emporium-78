
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThreeDAnimation from './ThreeDAnimation';
import { 
  Home, 
  Package, 
  Tag, 
  ShoppingBag, 
  Truck, 
  Users, 
  Star, 
  Mail, 
  Gift, 
  BarChart3,
  Image as ImageIcon,
  RotateCw
} from 'lucide-react';

const AdminLayout = ({ children, title }) => {
  const location = useLocation();
  
  const adminNav = [
    { path: '/admin', icon: Home, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/categories', icon: Tag, label: 'Categories' },
    { path: '/admin/media', icon: ImageIcon, label: 'Media Manager' },
    { path: '/admin/inventory', icon: BarChart3, label: 'Inventory' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/admin/shipments', icon: Truck, label: 'Shipments' },
    { path: '/admin/returns', icon: RotateCw, label: 'Returns' },
    { path: '/admin/customers', icon: Users, label: 'Customers' },
    { path: '/admin/reviews', icon: Star, label: 'Reviews' },
    { path: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
    { path: '/admin/discounts', icon: Gift, label: 'Discounts' }
  ];
  
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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {adminNav.map((item) => {
                  const isActive = location.pathname === item.path ||
                                  (item.path !== '/admin' && location.pathname.startsWith(item.path));
                  return (
                    <li key={item.path}>
                      <Link 
                        to={item.path}
                        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-ceramic-terracotta/10 text-ceramic-terracotta' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-5">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-serif font-bold text-ceramic-navy">{title}</h1>
              <div className="absolute right-8 top-20 w-24 h-24 opacity-40 pointer-events-none">
                <ThreeDAnimation type="ceramic" height="100px" />
              </div>
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
