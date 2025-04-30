
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Search, Filter, Package, Calendar } from 'lucide-react';

const Returns = () => {
  // Mock returns data
  const initialReturns = [
    { 
      id: 'RET-1234', 
      orderId: 'ORD-1220',
      customer: 'Jane Smith', 
      date: '2023-04-18', 
      status: 'Pending',
      reason: 'Wrong Size',
      amount: 49.99,
      productId: 'P12',
      productName: 'Ceramic Vase'
    },
    { 
      id: 'RET-1233', 
      orderId: 'ORD-1215',
      customer: 'David Johnson', 
      date: '2023-04-15', 
      status: 'Approved',
      reason: 'Defective',
      amount: 29.99,
      productId: 'P08',
      productName: 'Clay Face Mask'
    },
    { 
      id: 'RET-1232', 
      orderId: 'ORD-1210',
      customer: 'Lisa Brown', 
      date: '2023-04-12', 
      status: 'Completed',
      reason: 'Changed Mind',
      amount: 89.99,
      productId: 'P15',
      productName: 'Ceramic Dining Set'
    },
    { 
      id: 'RET-1231', 
      orderId: 'ORD-1205',
      customer: 'Mark Wilson', 
      date: '2023-04-10', 
      status: 'Rejected',
      reason: 'Out of Return Window',
      amount: 19.99,
      productId: 'P22',
      productName: 'Hand Cream'
    },
    { 
      id: 'RET-1230', 
      orderId: 'ORD-1201',
      customer: 'Sarah Garcia', 
      date: '2023-04-05', 
      status: 'Completed',
      reason: 'Ordered Wrong Item',
      amount: 59.99,
      productId: 'P05',
      productName: 'Clay Planter'
    }
  ];
  
  const [returns, setReturns] = useState(initialReturns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReturn, setSelectedReturn] = useState(null);
  
  // Filter returns based on search term and status filter
  const filteredReturns = returns.filter(returnItem => {
    const matchesSearch = 
      returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || returnItem.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  // Get unique statuses
  const statuses = ['all', ...new Set(returns.map(returnItem => returnItem.status.toLowerCase()))];
  
  const updateReturnStatus = (id, status) => {
    setReturns(returns.map(returnItem => 
      returnItem.id === id ? { ...returnItem, status } : returnItem
    ));
    
    if (selectedReturn && selectedReturn.id === id) {
      setSelectedReturn({ ...selectedReturn, status });
    }
  };
  
  // Mock return details
  const getReturnDetails = (returnItem) => {
    return {
      ...returnItem,
      customerEmail: `${returnItem.customer.toLowerCase().replace(' ', '.')}@example.com`,
      shippingAddress: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA'
      },
      originalOrder: {
        date: '2023-04-01',
        total: returnItem.amount * 2,
        items: [
          { id: returnItem.productId, name: returnItem.productName, price: returnItem.amount, quantity: 1, returned: true },
          { id: 'P99', name: 'Cosmetic Sample Pack', price: returnItem.amount, quantity: 1, returned: false }
        ]
      },
      notes: returnItem.status === 'Rejected' ? 'Product was used and not in resellable condition.' : '',
      timeline: [
        { date: returnItem.date, action: 'Return Requested', by: returnItem.customer },
        ...(returnItem.status !== 'Pending' ? [{ date: '2023-04-20', action: 'Return Reviewed', by: 'Admin User' }] : []),
        ...(returnItem.status === 'Completed' ? [
          { date: '2023-04-22', action: 'Refund Processed', by: 'System' },
          { date: '2023-04-23', action: 'Return Completed', by: 'Admin User' }
        ] : [])
      ]
    };
  };
  
  return (
    <AdminLayout title="Process Returns">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={selectedReturn ? "lg:col-span-2" : "lg:col-span-3"}>
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
                    {status === 'all' ? 'All Returns' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search returns..."
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
                      Return ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
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
                  {filteredReturns.map((returnItem) => (
                    <tr key={returnItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {returnItem.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {returnItem.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {returnItem.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {returnItem.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        ${returnItem.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          returnItem.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          returnItem.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          returnItem.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {returnItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <button 
                          onClick={() => setSelectedReturn(getReturnDetails(returnItem))} 
                          className="text-ceramic-terracotta hover:text-ceramic-clay"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredReturns.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No returns found.</p>
              </div>
            )}
          </div>
        </div>
        
        {selectedReturn && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-medium text-ceramic-navy">Return Details</h2>
                <button 
                  onClick={() => setSelectedReturn(null)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Return ID:</span>
                  <span className="text-sm font-medium">{selectedReturn.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Order ID:</span>
                  <span className="text-sm">{selectedReturn.orderId}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Date:</span>
                  <span className="text-sm">{selectedReturn.date}</span>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Customer Information</h3>
                <div className="mb-2">
                  <div className="text-sm">{selectedReturn.customer}</div>
                  <div className="text-xs text-gray-500">{selectedReturn.customerEmail}</div>
                </div>
                <div className="text-sm">
                  <p>{selectedReturn.shippingAddress.street}</p>
                  <p>{selectedReturn.shippingAddress.city}, {selectedReturn.shippingAddress.state} {selectedReturn.shippingAddress.zip}</p>
                  <p>{selectedReturn.shippingAddress.country}</p>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Return Details</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Product:</span>
                  <span className="text-sm">{selectedReturn.productName}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Reason:</span>
                  <span className="text-sm">{selectedReturn.reason}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Amount:</span>
                  <span className="text-sm">${selectedReturn.amount.toFixed(2)}</span>
                </div>
                {selectedReturn.notes && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500 block">Notes:</span>
                    <span className="text-sm">{selectedReturn.notes}</span>
                  </div>
                )}
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Timeline</h3>
                <div className="space-y-3">
                  {selectedReturn.timeline.map((event, index) => (
                    <div key={index} className="relative pl-6 pb-2">
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-ceramic-terracotta"></div>
                      <div className="text-sm font-medium">{event.action}</div>
                      <div className="text-xs text-gray-500">{event.date} by {event.by}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedReturn.status === 'Pending' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Process Return</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => updateReturnStatus(selectedReturn.id, 'Approved')} 
                      className="btn-primary flex-1"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateReturnStatus(selectedReturn.id, 'Rejected')} 
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-all duration-200 flex-1"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
              
              {selectedReturn.status === 'Approved' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Process Refund</h3>
                  <button 
                    onClick={() => updateReturnStatus(selectedReturn.id, 'Completed')} 
                    className="btn-primary w-full"
                  >
                    Issue Refund
                  </button>
                </div>
              )}
              
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Returns;
