
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = {
    totalOrders: 156,
    totalRevenue: 12850,
    newCustomers: 28,
    lowStock: 5
  };
  
  const recentOrders = [
    { id: 'ORD-1234', customer: 'John Smith', date: '2023-04-28', total: 149.97, status: 'Delivered' },
    { id: 'ORD-1233', customer: 'Emma Johnson', date: '2023-04-27', total: 78.50, status: 'Processing' },
    { id: 'ORD-1232', customer: 'Michael Brown', date: '2023-04-26', total: 209.99, status: 'Shipped' },
    { id: 'ORD-1231', customer: 'Sarah Wilson', date: '2023-04-25', total: 124.95, status: 'Delivered' },
    { id: 'ORD-1230', customer: 'Robert Garcia', date: '2023-04-24', total: 56.99, status: 'Delivered' }
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
              <Link to="/" className="text-sm hover:text-ceramic-terracotta">View Store</Link>
              <button className="text-sm hover:text-ceramic-terracotta">Logout</button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-ceramic-navy">Admin Dashboard</h1>
          <div>
            <Link to="/admin/products/new" className="bg-ceramic-terracotta hover:bg-ceramic-clay text-white px-4 py-2 rounded-md text-sm">
              Add New Product
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Total Orders</h2>
            <p className="text-2xl font-bold text-ceramic-navy">{stats.totalOrders}</p>
            <div className="text-xs text-green-600 mt-2">
              <span>↑ 12% from last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Revenue</h2>
            <p className="text-2xl font-bold text-ceramic-navy">${stats.totalRevenue.toLocaleString()}</p>
            <div className="text-xs text-green-600 mt-2">
              <span>↑ 8% from last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-sm font-medium text-gray-500 mb-1">New Customers</h2>
            <p className="text-2xl font-bold text-ceramic-navy">{stats.newCustomers}</p>
            <div className="text-xs text-green-600 mt-2">
              <span>↑ 5% from last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Low Stock Items</h2>
            <p className="text-2xl font-bold text-ceramic-navy">{stats.lowStock}</p>
            <div className="text-xs text-orange-600 mt-2">
              <span>Reorder needed</span>
            </div>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-ceramic-navy">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-ceramic-terracotta hover:text-ceramic-clay">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <Link to={`/admin/orders/${order.id}`} className="text-ceramic-terracotta hover:text-ceramic-clay">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-ceramic-navy mb-4">Product Management</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/admin/products" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  View All Products
                </Link>
              </li>
              <li>
                <Link to="/admin/products/new" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Add New Product
                </Link>
              </li>
              <li>
                <Link to="/admin/categories" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Manage Categories
                </Link>
              </li>
              <li>
                <Link to="/admin/inventory" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Inventory Control
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-ceramic-navy mb-4">Order Management</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/admin/orders" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  All Orders
                </Link>
              </li>
              <li>
                <Link to="/admin/orders?status=pending" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Pending Orders
                </Link>
              </li>
              <li>
                <Link to="/admin/shipments" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Manage Shipments
                </Link>
              </li>
              <li>
                <Link to="/admin/returns" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Process Returns
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-ceramic-navy mb-4">Customer Management</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/admin/customers" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Customer List
                </Link>
              </li>
              <li>
                <Link to="/admin/reviews" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Product Reviews
                </Link>
              </li>
              <li>
                <Link to="/admin/newsletter" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Newsletter Subscribers
                </Link>
              </li>
              <li>
                <Link to="/admin/discounts" className="text-ceramic-terracotta hover:text-ceramic-clay">
                  Manage Discounts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
