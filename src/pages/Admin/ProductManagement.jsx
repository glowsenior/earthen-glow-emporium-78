
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash } from 'lucide-react';
import products from '../../data/products';

const ProductManagement = () => {
  const [productList, setProductList] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter products based on category and search term
  const filteredProducts = productList.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleDeleteProduct = (id) => {
    // In a real app, this would be an API call
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductList(productList.filter(product => product.id !== id));
    }
  };
  
  // Get unique categories
  const categories = ['all', ...new Set(productList.map(product => product.category.toLowerCase()))];
  
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
          <h1 className="text-2xl font-serif font-bold text-ceramic-navy">Product Management</h1>
          <Link to="/admin/products/new" className="bg-ceramic-terracotta hover:bg-ceramic-clay text-white px-4 py-2 rounded-md text-sm">
            Add New Product
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            {/* Category Filter */}
            <div className="flex overflow-x-auto space-x-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
              />
            </div>
          </div>
          
          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded object-cover" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
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
                      <div className="text-sm text-gray-900">{product.stockQuantity}</div>
                      {product.stockQuantity <= 5 && (
                        <div className="text-xs text-red-500">Low stock</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.sale ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {product.sale ? 'On Sale' : 'Regular Price'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link to={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
