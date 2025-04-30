
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import ThreeDAnimation from '../../components/ThreeDAnimation';
import { Search, ArrowUp, ArrowDown, Package } from 'lucide-react';
import products from '../../data/products';

const Inventory = () => {
  const [productList, setProductList] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Filter products based on search term
  const filteredProducts = productList.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.id.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === 'stockQuantity') {
      return sortDirection === 'asc' 
        ? a.stockQuantity - b.stockQuantity
        : b.stockQuantity - a.stockQuantity;
    } else if (sortField === 'price') {
      const aPrice = a.salePrice || a.price;
      const bPrice = b.salePrice || b.price;
      return sortDirection === 'asc' ? aPrice - bPrice : bPrice - aPrice;
    } else {
      // Sort by name
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
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
  
  const updateStock = (id, quantity) => {
    setProductList(productList.map(product => 
      product.id === id 
        ? { ...product, stockQuantity: Math.max(0, quantity) } 
        : product
    ));
  };
  
  return (
    <AdminLayout title="Inventory Control">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-ceramic-navy mb-2 sm:mb-0">Stock Management</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('name')}>
                      <div className="flex items-center">
                        Product
                        {sortField === 'name' && (
                          sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('price')}>
                      <div className="flex items-center">
                        Price
                        {sortField === 'price' && (
                          sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('stockQuantity')}>
                      <div className="flex items-center">
                        Stock
                        {sortField === 'stockQuantity' && (
                          sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedProducts.map((product) => (
                    <tr key={product.id} className={product.stockQuantity <= 5 ? "bg-red-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded object-cover" src={product.image} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.salePrice ? (
                          <div>
                            <div className="text-sm font-medium text-ceramic-terracotta">${product.salePrice.toFixed(2)}</div>
                            <div className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            value={product.stockQuantity}
                            onChange={(e) => updateStock(product.id, parseInt(e.target.value))}
                            className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                          {product.stockQuantity <= 5 && (
                            <span className="ml-2 text-xs text-red-500">Low stock</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateStock(product.id, product.stockQuantity + 1)}
                            className="px-2 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 text-xs"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => updateStock(product.id, product.stockQuantity + 5)}
                            className="px-2 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 text-xs"
                          >
                            +5
                          </button>
                          <button
                            onClick={() => updateStock(product.id, product.stockQuantity - 1)}
                            className="px-2 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 text-xs"
                            disabled={product.stockQuantity <= 0}
                          >
                            -1
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No products found.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-ceramic-navy mb-4">Inventory Overview</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">In Stock</h3>
                <p className="text-2xl font-bold text-green-800 mt-1">
                  {productList.filter(p => p.stockQuantity > 5).length}
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800">Low Stock</h3>
                <p className="text-2xl font-bold text-yellow-800 mt-1">
                  {productList.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 5).length}
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-red-800">Out of Stock</h3>
                <p className="text-2xl font-bold text-red-800 mt-1">
                  {productList.filter(p => p.stockQuantity === 0).length}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/admin/products" className="btn-primary block text-center">
                Manage Products
              </Link>
            </div>
            
            <div className="mt-6">
              <ThreeDAnimation type="cosmetic" height="150px" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Inventory;
