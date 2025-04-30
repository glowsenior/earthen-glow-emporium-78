
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Shop = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    sort: 'featured',
    priceRange: [0, 100]
  });

  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      category
    });
  };

  const handleSortChange = (e) => {
    setFilters({
      ...filters,
      sort: e.target.value
    });
  };

  // Filter products based on category
  const filteredProducts = products.filter(product => {
    if (filters.category === 'all') return true;
    return product.category.toLowerCase() === filters.category;
  });

  // Sort products based on sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.salePrice || a.price;
    const priceB = b.salePrice || b.price;
    
    switch (filters.sort) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'newest':
        return b.id - a.id; // Using ID as a proxy for date in this example
      default:
        return a.featured ? -1 : 1; // Featured first
    }
  });

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <div className="bg-ceramic-navy text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl font-serif font-bold">Our Collection</h1>
            <p className="mt-2">Discover our handcrafted ceramics and natural cosmetics</p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="flex flex-wrap items-center justify-between mb-6">
            {/* Category Filter */}
            <div className="flex space-x-4 mb-4 sm:mb-0 overflow-x-auto pb-2">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm ${
                  filters.category === 'all' 
                    ? 'bg-ceramic-terracotta text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => handleCategoryChange('ceramics')}
                className={`px-4 py-2 rounded-full text-sm ${
                  filters.category === 'ceramics' 
                    ? 'bg-ceramic-terracotta text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ceramics
              </button>
              <button
                onClick={() => handleCategoryChange('cosmetics')}
                className={`px-4 py-2 rounded-full text-sm ${
                  filters.category === 'cosmetics' 
                    ? 'bg-ceramic-terracotta text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cosmetics
              </button>
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
              <select
                id="sort"
                value={filters.sort}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try changing your filters or check back later for new items.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
