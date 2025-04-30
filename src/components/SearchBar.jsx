
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import products from '../data/products';

const SearchBar = ({ className }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  
  // Check if we're in a router context
  const routerAvailable = typeof window !== 'undefined' && 
                         window.location.pathname !== undefined;
  
  // Use navigate only if we have router context
  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    // If useNavigate fails, we're outside router context
    navigate = (path) => {
      if (routerAvailable) {
        window.location.href = path;
      }
    };
  }

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  const handleSelectSuggestion = (productId) => {
    navigate(`/product/${productId}`);
    setShowResults(false);
    setQuery('');
  };

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) && query.length > 0
    )
    .slice(0, 5);

  return (
    <div ref={searchRef} className={`relative ${className || ''}`}>
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="pl-9 py-1.5 h-9 text-sm w-full md:w-[200px] lg:w-[300px]"
        />
      </form>
      
      {showResults && query.length > 0 && (
        <div className="absolute z-40 w-full mt-1 bg-white shadow-lg rounded-md overflow-hidden">
          <Command>
            <CommandList>
              {filteredProducts.length > 0 ? (
                <CommandGroup heading="Products">
                  {filteredProducts.map((product) => (
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
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                  <CommandItem 
                    onSelect={() => {
                      navigate(`/search?q=${encodeURIComponent(query)}`);
                      setShowResults(false);
                    }}
                    className="cursor-pointer text-ceramic-terracotta"
                  >
                    See all results for "{query}"
                  </CommandItem>
                </CommandGroup>
              ) : (
                <CommandEmpty>No products found</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
