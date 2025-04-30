import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ThreeDAnimation from '../../components/ThreeDAnimation';
import { Search, Package, Calendar } from 'lucide-react';

const Shipments = () => {
  // Mock shipments data
  const initialShipments = [
    { 
      id: 'SHP-1234', 
      orderId: 'ORD-1234',
      customer: 'John Smith', 
      date: '2023-04-28', 
      status: 'Delivered',
      carrier: 'FedEx',
      trackingNumber: 'FDX123456789',
      estimatedDelivery: '2023-04-30',
      actualDelivery: '2023-04-30'
    },
    { 
      id: 'SHP-1233', 
      orderId: 'ORD-1233',
      customer: 'Emma Johnson', 
      date: '2023-04-27', 
      status: 'In Transit',
      carrier: 'UPS',
      trackingNumber: 'UPS987654321',
      estimatedDelivery: '2023-04-30',
      actualDelivery: null
    },
    { 
      id: 'SHP-1232', 
      orderId: 'ORD-1232',
      customer: 'Michael Brown', 
      date: '2023-04-26', 
      status: 'In Transit',
      carrier: 'USPS',
      trackingNumber: 'USPS1357924680',
      estimatedDelivery: '2023-04-29',
      actualDelivery: null
    },
    { 
      id: 'SHP-1231', 
      orderId: 'ORD-1231',
      customer: 'Sarah Wilson', 
      date: '2023-04-25', 
      status: 'Delivered',
      carrier: 'DHL',
      trackingNumber: 'DHL2468013579',
      estimatedDelivery: '2023-04-27',
      actualDelivery: '2023-04-27'
    },
    { 
      id: 'SHP-1230', 
      orderId: 'ORD-1230',
      customer: 'Robert Garcia', 
      date: '2023-04-24', 
      status: 'Delivered',
      carrier: 'FedEx',
      trackingNumber: 'FDX567891234',
      estimatedDelivery: '2023-04-26',
      actualDelivery: '2023-04-26'
    }
  ];
  
  const [shipments, setShipments] = useState(initialShipments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState(null);
  
  // Filter shipments based on search term and status filter
  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || shipment.status.toLowerCase().replace(' ', '-') === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  // Get unique statuses
  const statuses = ['all', ...new Set(shipments.map(shipment => shipment.status.toLowerCase().replace(' ', '-')))];
  
  const updateShipmentStatus = (id, status, deliveryDate = null) => {
    setShipments(shipments.map(shipment => 
      shipment.id === id 
        ? { 
            ...shipment, 
            status, 
            actualDelivery: status === 'Delivered' ? (deliveryDate || new Date().toISOString().split('T')[0]) : shipment.actualDelivery 
          } 
        : shipment
    ));
    
    if (selectedShipment && selectedShipment.id === id) {
      setSelectedShipment({
        ...selectedShipment,
        status,
        actualDelivery: status === 'Delivered' ? (deliveryDate || new Date().toISOString().split('T')[0]) : selectedShipment.actualDelivery
      });
    }
  };
  
  // Mock shipment details
  const getShipmentDetails = (shipment) => {
    return {
      ...shipment,
      items: [
        { id: 'P1', name: 'Ceramic Vase', quantity: 1 },
        { id: 'P2', name: 'Clay Face Mask', quantity: 2 },
        { id: 'P3', name: 'Hand Cream', quantity: 2 }
      ],
      address: {
        recipient: shipment.customer,
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA'
      },
      history: [
        { date: shipment.date, time: '09:00 AM', status: 'Package Processed', location: 'Warehouse' },
        { date: shipment.date, time: '11:30 AM', status: 'Out for Delivery', location: 'Local Facility' },
        ...(shipment.status === 'Delivered' ? [{ date: shipment.actualDelivery, time: '02:15 PM', status: 'Delivered', location: 'Recipient Address' }] : [])
      ]
    };
  };
  
  return (
    <AdminLayout title="Manage Shipments">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={selectedShipment ? "lg:col-span-2" : "lg:col-span-3"}>
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
                    {status === 'all' 
                      ? 'All Shipments'
                      : status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search shipments..."
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
                      Shipment ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Carrier & Tracking
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
                  {filteredShipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {shipment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {shipment.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {shipment.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div>{shipment.carrier}</div>
                        <div className="text-xs text-gray-500">{shipment.trackingNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <button 
                          onClick={() => setSelectedShipment(getShipmentDetails(shipment))} 
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
            
            {filteredShipments.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No shipments found.</p>
              </div>
            )}
          </div>
        </div>
        
        {selectedShipment && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-medium text-ceramic-navy">Shipment Details</h2>
                <button 
                  onClick={() => setSelectedShipment(null)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Shipment ID:</span>
                  <span className="text-sm font-medium">{selectedShipment.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Order ID:</span>
                  <span className="text-sm">{selectedShipment.orderId}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Ship Date:</span>
                  <span className="text-sm">{selectedShipment.date}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Est. Delivery:</span>
                  <span className="text-sm">{selectedShipment.estimatedDelivery}</span>
                </div>
                {selectedShipment.actualDelivery && (
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Actual Delivery:</span>
                    <span className="text-sm">{selectedShipment.actualDelivery}</span>
                  </div>
                )}
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Shipping Information</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Carrier:</span>
                  <span className="text-sm">{selectedShipment.carrier}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Tracking Number:</span>
                  <span className="text-sm">{selectedShipment.trackingNumber}</span>
                </div>
                <div className="mt-2">
                  <a 
                    href="#" 
                    className="text-ceramic-terracotta text-sm hover:underline"
                  >
                    Track Shipment
                  </a>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Items</h3>
                {selectedShipment.items.map((item) => (
                  <div key={item.id} className="flex justify-between py-1">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm">×{item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                <div className="text-sm">
                  <p>{selectedShipment.address.recipient}</p>
                  <p>{selectedShipment.address.street}</p>
                  <p>{selectedShipment.address.city}, {selectedShipment.address.state} {selectedShipment.address.zip}</p>
                  <p>{selectedShipment.address.country}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Tracking History</h3>
                <div className="space-y-3">
                  {selectedShipment.history.map((event, index) => (
                    <div key={index} className="relative pl-6 pb-3">
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-ceramic-terracotta"></div>
                      <div className="text-sm font-medium">{event.status}</div>
                      <div className="text-xs text-gray-500">{event.date} {event.time} - {event.location}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Update Status</h3>
                <select
                  value={selectedShipment.status}
                  onChange={(e) => updateShipmentStatus(selectedShipment.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                >
                  <option value="Processing">Processing</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              
              <div className="mt-6">
                <button className="btn-primary w-full mb-2">Print Label</button>
                <button className="btn-secondary w-full">Send Tracking Info</button>
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

export default Shipments;
