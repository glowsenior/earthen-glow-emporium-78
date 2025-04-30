
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import products from '../data/products';
import SearchFilters from '../components/SearchFilters';

const Search = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 500],
    onSale: false,
    has3DView: false,
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    // Keep the search query but just refresh the page (in a real app this would update results)
  };

  const handleSelectSuggestion = (productId) => {
    navigate(`/product/${productId}`);
    setShowSuggestions(false);
  };

  const filteredProducts = products.filter((product) => {
    // Search query filter
    const matchesQuery = query 
      ? product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description?.toLowerCase().includes(query.toLowerCase())
      : true;

    // Category filter
    const matchesCategory = filters.category.length > 0
      ? filters.category.includes(product.category)
      : true;

    // Price filter
    const matchesPrice = product.sale 
      ? product.salePrice >= filters.priceRange[0] && product.salePrice <= filters.priceRange[1]
      : product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

    // Sale filter
    const matchesSale = filters.onSale ? product.sale : true;

    // 3D view filter
    const matches3D = filters.has3DView ? product.has3DView : true;

    return matchesQuery && matchesCategory && matchesPrice && matchesSale && matches3D;
  });

  const suggestions = products
    .filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) && query.length > 0
    )
    .slice(0, 5);

  return (
    <div className="bg-ceramic-cream min-h-screen">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-serif font-bold mb-6">Search Products</h1>

        <div className="relative mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="pl-10 pr-4 py-2 w-full"
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md overflow-hidden">
                  <Command>
                    <CommandList>
                      <CommandGroup heading="Suggestions">
                        {suggestions.map((product) => (
                          <CommandItem 
                            key={product.id}
                            onSelect={() => handleSelectSuggestion(product.id)}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 overflow-hidden rounded">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="text-sm font-medium">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.category}</p>
                              </div>
                              <div className="text-sm font-medium">
                                {product.sale 
                                  ? <span className="text-ceramic-terracotta">${product.salePrice.toFixed(2)}</span>
                                  : <span>${product.price.toFixed(2)}</span>
                                }
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {suggestions.length === 0 && query && (
                        <CommandEmpty>No products found</CommandEmpty>
                      )}
                    </CommandList>
                  </Command>
                </div>
              )}
            </div>
            <Button type="submit" className="bg-ceramic-terracotta hover:bg-ceramic-terracotta/90">
              Search
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div>
                <p className="mb-4 text-gray-600">{filteredProducts.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
