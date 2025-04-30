
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ThreeDAnimation from '../../components/ThreeDAnimation';
import { Search, Mail, User, package as Package } from 'lucide-react';

const Customers = () => {
  // Mock customers data
  const initialCustomers = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@example.com',
      registeredDate: '2023-01-15',
      orders: 8,
      totalSpent: 457.92,
      lastOrder: '2023-04-28',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Emma Johnson', 
      email: 'emma.j@example.com',
      registeredDate: '2023-02-03',
      orders: 3,
      totalSpent: 149.97,
      lastOrder: '2023-04-12',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Michael Brown', 
      email: 'mbrown@example.com',
      registeredDate: '2022-11-20',
      orders: 12,
      totalSpent: 789.45,
      lastOrder: '2023-04-26',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Sarah Wilson', 
      email: 'swilson@example.com',
      registeredDate: '2023-03-05',
      orders: 2,
      totalSpent: 124.95,
      lastOrder: '2023-04-10',
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Robert Garcia', 
      email: 'rgarcia@example.com',
      registeredDate: '2022-08-12',
      orders: 15,
      totalSpent: 1245.67,
      lastOrder: '2023-04-24',
      status: 'active'
    },
    { 
      id: 6, 
      name: 'Jennifer Lee', 
      email: 'jlee@example.com',
      registeredDate: '2023-01-30',
      orders: 5,
      totalSpent: 287.45,
      lastOrder: '2023-04-18',
      status: 'inactive'
    },
    { 
      id: 7, 
      name: 'David Williams', 
      email: 'dwilliams@example.com',
      registeredDate: '2022-10-15',
      orders: 7,
      totalSpent: 432.20,
      lastOrder: '2023-03-22',
      status: 'active'
    },
    { 
      id: 8, 
      name: 'Amanda Rodriguez', 
      email: 'arodriguez@example.com',
      registeredDate: '2023-02-28',
      orders: 1,
      totalSpent: 45.00,
      lastOrder: '2023-03-01',
      status: 'inactive'
    }
  ];
  
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // Filter customers based on search term and status filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortField === 'orders' || sortField === 'totalSpent') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    } else {
      return sortDirection === 'asc'
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
  });
  
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const toggleCustomerStatus = (id) => {
    setCustomers(customers.map(customer => 
      customer.id === id 
        ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' } 
        : customer
    ));
    
    if (selectedCustomer && selectedCustomer.id === id) {
      setSelectedCustomer({
        ...selectedCustomer,
        status: selectedCustomer.status === 'active' ? 'inactive' : 'active'
      });
    }
  };
  
  // Mock customer details
  const getCustomerDetails = (customer) => {
    return {
      ...customer,
      phone: '123-456-7890',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA'
      },
      recentOrders: [
        { id: 'ORD-1234', date: '2023-04-28', amount: 149.97, status: 'Delivered' },
        { id: 'ORD-1220', date: '2023-04-15', amount: 78.50, status: 'Returned' },
        { id: 'ORD-1215', date: '2023-03-30', amount: 229.45, status: 'Delivered' }
      ],
      notes: ''
    };
  };
  
  return (
    <AdminLayout title="Customer List">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={selectedCustomer ? "lg:col-span-2" : "lg:col-span-3"}>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <div className="flex flex-wrap mb-4 sm:mb-0">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${
                    statusFilter === 'all' 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Customers
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${
                    statusFilter === 'active' 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setStatusFilter('inactive')}
                  className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${
                    statusFilter === 'inactive' 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inactive
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search customers..."
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
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('name')}
                    >
                      Customer
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('registeredDate')}
                    >
                      Registered
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('orders')}
                    >
                      Orders
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('totalSpent')}
                    >
                      Total Spent
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
                  {sortedCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-ceramic-sage rounded-full flex items-center justify-center text-white">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {customer.registeredDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {customer.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        ${customer.totalSpent.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <button 
                          onClick={() => setSelectedCustomer(getCustomerDetails(customer))} 
                          className="text-ceramic-terracotta hover:text-ceramic-clay mr-3"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredCustomers.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No customers found.</p>
              </div>
            )}
          </div>
        </div>
        
        {selectedCustomer && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-medium text-ceramic-navy">Customer Details</h2>
                <button 
                  onClick={() => setSelectedCustomer(null)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 bg-ceramic-sage rounded-full flex items-center justify-center text-white text-xl">
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{selectedCustomer.name}</h3>
                  <div className="text-sm text-gray-500">Customer since {selectedCustomer.registeredDate}</div>
                  <div className={`text-xs mt-1 ${
                    selectedCustomer.status === 'active' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center mb-2">
                  <Mail size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm">{selectedCustomer.phone}</span>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                <div className="text-sm">
                  <p>{selectedCustomer.address.street}</p>
                  <p>{selectedCustomer.address.city}, {selectedCustomer.address.state} {selectedCustomer.address.zip}</p>
                  <p>{selectedCustomer.address.country}</p>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Orders Summary</h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Orders</div>
                    <div className="text-lg font-medium">{selectedCustomer.orders}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Spent</div>
                    <div className="text-lg font-medium">${selectedCustomer.totalSpent.toFixed(2)}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Last Order</div>
                    <div className="text-base font-medium">{selectedCustomer.lastOrder}</div>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Recent Orders</h3>
                {selectedCustomer.recentOrders.map((order, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="text-sm font-medium">{order.id}</div>
                      <div className="text-xs text-gray-500">{order.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-right">${order.amount.toFixed(2)}</div>
                      <div className={`text-xs text-right ${
                        order.status === 'Delivered' ? 'text-green-600' : 
                        order.status === 'Returned' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => toggleCustomerStatus(selectedCustomer.id)} 
                  className={`w-full py-2 px-4 rounded font-medium transition-all duration-200 ${
                    selectedCustomer.status === 'active'
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      : 'bg-green-100 hover:bg-green-200 text-green-800'
                  }`}
                >
                  {selectedCustomer.status === 'active' ? 'Mark as Inactive' : 'Mark as Active'}
                </button>
                <button className="btn-primary w-full">
                  Email Customer
                </button>
              </div>
              
              <div className="mt-6">
                <ThreeDAnimation type="cosmetic" height="100px" />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Customers;
