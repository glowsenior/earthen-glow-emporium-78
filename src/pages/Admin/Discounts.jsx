
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Edit, Trash, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const Discounts = () => {
  // Mock discounts data
  const initialDiscounts = [
    { 
      id: 1, 
      code: 'WELCOME10', 
      type: 'percentage', 
      value: 10,
      minOrder: 0,
      maxUses: 0, // Unlimited
      usedCount: 120,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'active',
      products: [],
      categories: []
    },
    { 
      id: 2, 
      code: 'SUMMER20', 
      type: 'percentage', 
      value: 20,
      minOrder: 50,
      maxUses: 500,
      usedCount: 243,
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      status: 'scheduled',
      products: [],
      categories: []
    },
    { 
      id: 3, 
      code: 'FREESHIP', 
      type: 'shipping', 
      value: 100, // 100% off shipping
      minOrder: 75,
      maxUses: 0, // Unlimited
      usedCount: 89,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'active',
      products: [],
      categories: []
    },
    { 
      id: 4, 
      code: 'CERAMICS15', 
      type: 'percentage', 
      value: 15,
      minOrder: 0,
      maxUses: 0, // Unlimited
      usedCount: 67,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'active',
      products: [],
      categories: ['ceramics']
    },
    { 
      id: 5, 
      code: 'BDAY25', 
      type: 'percentage', 
      value: 25,
      minOrder: 0,
      maxUses: 1, // One-time use
      usedCount: 0,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'active',
      products: [],
      categories: []
    },
  ];
  
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [newDiscount, setNewDiscount] = useState({
    code: '',
    type: 'percentage',
    value: 10,
    minOrder: 0,
    maxUses: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    products: [],
    categories: []
  });
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newDiscount.code.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }
    
    if (newDiscount.value <= 0) {
      toast.error("Discount value must be greater than 0.");
      return;
    }
    
    if (newDiscount.type === 'percentage' && newDiscount.value > 100) {
      toast.error("Percentage discount cannot be more than 100%.");
      return;
    }
    
    if (!newDiscount.endDate) {
      toast.error("Please select an end date.");
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const status = new Date(newDiscount.startDate) > new Date() ? 'scheduled' : 'active';
    
    if (editingId) {
      // Update existing discount
      setDiscounts(discounts.map(discount => 
        discount.id === editingId 
          ? { ...newDiscount, id: editingId, status, usedCount: discount.usedCount } 
          : discount
      ));
      toast.success(`Discount code ${newDiscount.code} updated`);
    } else {
      // Add new discount
      const newId = Math.max(...discounts.map(d => d.id)) + 1;
      setDiscounts([
        ...discounts,
        { ...newDiscount, id: newId, usedCount: 0, status }
      ]);
      toast.success(`Discount code ${newDiscount.code} created`);
    }
    
    setNewDiscount({
      code: '',
      type: 'percentage',
      value: 10,
      minOrder: 0,
      maxUses: 0,
      startDate: today,
      endDate: '',
      products: [],
      categories: []
    });
    setShowNewForm(false);
    setEditingId(null);
  };
  
  const editDiscount = (id) => {
    const discount = discounts.find(d => d.id === id);
    if (discount) {
      setNewDiscount({ ...discount });
      setEditingId(id);
      setShowNewForm(true);
    }
  };
  
  const deleteDiscount = (id) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      setDiscounts(discounts.filter(d => d.id !== id));
      toast.success("Discount deleted");
    }
  };
  
  const toggleDiscountStatus = (id) => {
    setDiscounts(discounts.map(discount => 
      discount.id === id 
        ? { 
            ...discount, 
            status: discount.status === 'active' ? 'inactive' : 'active' 
          } 
        : discount
    ));
  };
  
  return (
    <AdminLayout title="Manage Discounts">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-ceramic-navy mb-2 sm:mb-0">Active Discounts</h2>
              <button
                onClick={() => {
                  setShowNewForm(true);
                  setEditingId(null);
                  setNewDiscount({
                    code: '',
                    type: 'percentage',
                    value: 10,
                    minOrder: 0,
                    maxUses: 0,
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: '',
                    products: [],
                    categories: []
                  });
                }}
                className="btn-primary text-sm py-1 px-4 flex items-center"
              >
                <Plus size={16} className="mr-2" />
                New Discount
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
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
                  {discounts.map((discount) => (
                    <tr key={discount.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold">{discount.code}</div>
                        <div className="text-xs text-gray-500">
                          {discount.minOrder > 0 && `Min. order $${discount.minOrder}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {discount.type === 'percentage' && `${discount.value}% off`}
                        {discount.type === 'fixed' && `$${discount.value} off`}
                        {discount.type === 'shipping' && `Free Shipping`}
                        <div className="text-xs text-gray-500">
                          {discount.categories.length > 0 && 
                            `On ${discount.categories.join(', ')}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div>{discount.startDate}</div>
                        <div>to {discount.endDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div>{discount.usedCount} used</div>
                        <div className="text-xs text-gray-500">
                          {discount.maxUses > 0 
                            ? `${discount.maxUses - discount.usedCount} remaining`
                            : 'Unlimited'
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          discount.status === 'active' ? 'bg-green-100 text-green-800' : 
                          discount.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {discount.status.charAt(0).toUpperCase() + discount.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => editDiscount(discount.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteDiscount(discount.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash size={16} />
                          </button>
                          {(discount.status === 'active' || discount.status === 'inactive') && (
                            <button
                              onClick={() => toggleDiscountStatus(discount.id)}
                              className={`text-sm ${
                                discount.status === 'active'
                                  ? 'text-gray-600 hover:text-gray-800'
                                  : 'text-green-600 hover:text-green-800'
                              }`}
                            >
                              {discount.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {discounts.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No discounts available.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {showNewForm ? (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-ceramic-navy">
                  {editingId ? 'Edit Discount' : 'New Discount'}
                </h2>
                <button 
                  onClick={() => {
                    setShowNewForm(false);
                    setEditingId(null);
                  }} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Code
                    </label>
                    <input
                      type="text"
                      value={newDiscount.code}
                      onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value.toUpperCase()})}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                      placeholder="e.g. SUMMER20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Type
                    </label>
                    <select
                      value={newDiscount.type}
                      onChange={(e) => setNewDiscount({...newDiscount, type: e.target.value})}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                    >
                      <option value="percentage">Percentage Discount</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="shipping">Free Shipping</option>
                    </select>
                  </div>
                  
                  {newDiscount.type !== 'shipping' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {newDiscount.type === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
                      </label>
                      <input
                        type="number"
                        value={newDiscount.value}
                        min={1}
                        max={newDiscount.type === 'percentage' ? 100 : 1000}
                        onChange={(e) => setNewDiscount({...newDiscount, value: parseInt(e.target.value) || 0})}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Order Amount ($)
                    </label>
                    <input
                      type="number"
                      value={newDiscount.minOrder}
                      min={0}
                      onChange={(e) => setNewDiscount({...newDiscount, minOrder: parseInt(e.target.value) || 0})}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Uses (0 = unlimited)
                    </label>
                    <input
                      type="number"
                      value={newDiscount.maxUses}
                      min={0}
                      onChange={(e) => setNewDiscount({...newDiscount, maxUses: parseInt(e.target.value) || 0})}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={newDiscount.startDate}
                        onChange={(e) => setNewDiscount({...newDiscount, startDate: e.target.value})}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={newDiscount.endDate}
                        onChange={(e) => setNewDiscount({...newDiscount, endDate: e.target.value})}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Restriction (Optional)
                    </label>
                    <select
                      value={newDiscount.categories[0] || ''}
                      onChange={(e) => setNewDiscount({
                        ...newDiscount, 
                        categories: e.target.value ? [e.target.value] : [] 
                      })}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                    >
                      <option value="">All Categories</option>
                      <option value="ceramics">Ceramics</option>
                      <option value="cosmetics">Cosmetics</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button type="submit" className="btn-primary w-full">
                    {editingId ? 'Update Discount' : 'Create Discount'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-ceramic-navy mb-4">Discount Summary</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Active Discounts</h3>
                  <p className="text-2xl font-bold text-ceramic-navy">
                    {discounts.filter(d => d.status === 'active').length}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Scheduled Discounts</h3>
                  <p className="text-2xl font-bold text-ceramic-navy">
                    {discounts.filter(d => d.status === 'scheduled').length}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Total Uses</h3>
                  <p className="text-2xl font-bold text-ceramic-navy">
                    {discounts.reduce((total, discount) => total + discount.usedCount, 0)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Discounts;
