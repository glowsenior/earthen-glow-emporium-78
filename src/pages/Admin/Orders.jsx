
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import ThreeDAnimation from '../../components/ThreeDAnimation';
import { Search, Filter, Eye, package as Package, calendar as Calendar } from 'lucide-react';

const Orders = () => {
  // Mock orders data
  const initialOrders = [
    { 
      id: 'ORD-1234', 
      customer: 'John Smith', 
      email: 'john.smith@example.com',
      date: '2023-04-28', 
      total: 149.97, 
      status: 'Delivered',
      items: 3,
      paymentMethod: 'Credit Card'
    },
    { 
      id: 'ORD-1233', 
      customer: 'Emma Johnson', 
      email: 'emma.j@example.com',
      date: '2023-04-27', 
      total: 78.50, 
      status: 'Processing',
      items: 2,
      paymentMethod: 'PayPal'
    },
    { 
      id: 'ORD-1232', 
      customer: 'Michael Brown', 
      email: 'mbrown@example.com',
      date: '2023-04-26', 
      total: 209.99, 
      status: 'Shipped',
      items: 4,
      paymentMethod: 'Credit Card'
    },
    { 
      id: 'ORD-1231', 
      customer: 'Sarah Wilson', 
      email: 'swilson@example.com',
      date: '2023-04-25', 
      total: 124.95, 
      status: 'Delivered',
      items: 2,
      paymentMethod: 'Credit Card'
    },
    { 
      id: 'ORD-1230', 
      customer: 'Robert Garcia', 
      email: 'rgarcia@example.com',
      date: '2023-04-24', 
      total: 56.99, 
      status: 'Delivered',
      items: 1,
      paymentMethod: 'PayPal'
    },
    { 
      id: 'ORD-1229', 
      customer: 'Jennifer Lee', 
      email: 'jlee@example.com',
      date: '2023-04-23', 
      total: 87.45, 
      status: 'Pending',
      items: 2,
      paymentMethod: 'Credit Card'
    },
    { 
      id: 'ORD-1228', 
      customer: 'David Williams', 
      email: 'dwilliams@example.com',
      date: '2023-04-22', 
      total: 199.99, 
      status: 'Shipped',
      items: 3,
      paymentMethod: 'Credit Card'
    },
    { 
      id: 'ORD-1227', 
      customer: 'Amanda Rodriguez', 
      email: 'arodriguez@example.com',
      date: '2023-04-21', 
      total: 45.00, 
      status: 'Pending',
      items: 1,
      paymentMethod: 'PayPal'
    }
  ];
  
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };
  
  // Get unique statuses
  const statuses = ['all', ...new Set(orders.map(order => order.status.toLowerCase()))];
  
  // Mock order details for selected order
  const getOrderDetails = (order) => {
    return {
      ...order,
      products: [
        { id: 'P1', name: 'Ceramic Vase', price: 49.99, quantity: 1, total: 49.99 },
        { id: 'P2', name: 'Clay Face Mask', price: 29.99, quantity: 2, total: 59.98 },
        { id: 'P3', name: 'Hand Cream', price: 19.99, quantity: 2, total: 39.98 }
      ],
      subtotal: order.total - 10,
      shipping: 10,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA'
      }
    };
  };
  
  return (
    <AdminLayout title={statusFilter === 'pending' ? "Pending Orders" : "All Orders"}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={selectedOrder ? "lg:col-span-2" : "lg:col-span-3"}>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <div className="flex flex-wrap mb-4 sm:mb-0">
                {statuses.map((status, index) => (
                  <button
                    key={index}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${
                      statusFilter === status 
                        ? 'bg-ceramic-terracotta text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
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
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div>{order.customer}</div>
                        <div className="text-xs text-gray-500">{order.email}</div>
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
                          order.status === 'Processing' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => setSelectedOrder(getOrderDetails(order))} 
                          className="text-ceramic-terracotta hover:text-ceramic-clay"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No orders found.</p>
              </div>
            )}
          </div>
        </div>
        
        {selectedOrder && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-medium text-ceramic-navy">Order Details</h2>
                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Order ID:</span>
                  <span className="text-sm font-medium">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Date:</span>
                  <span className="text-sm">{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Customer:</span>
                  <span className="text-sm">{selectedOrder.customer}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Email:</span>
                  <span className="text-sm">{selectedOrder.email}</span>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Products</h3>
                {selectedOrder.products.map((product) => (
                  <div key={product.id} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-grow">
                      <div className="text-sm">{product.name}</div>
                      <div className="text-xs text-gray-500">${product.price} × {product.quantity}</div>
                    </div>
                    <div className="text-sm font-medium">${product.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Subtotal:</span>
                  <span className="text-sm">${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Shipping:</span>
                  <span className="text-sm">${selectedOrder.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="text-sm font-medium">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                <div className="text-sm">
                  <p>{selectedOrder.address.street}</p>
                  <p>{selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.zip}</p>
                  <p>{selectedOrder.address.country}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Update Status</h3>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <button className="btn-primary flex-1">Print Invoice</button>
                <Link to={`/admin/shipments/${selectedOrder.id}`} className="btn-secondary flex-1 text-center">
                  Shipment
                </Link>
              </div>
              
              <div className="mt-6">
                <ThreeDAnimation type="default" height="100px" />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;
