import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const SearchFilters = ({ filters, setFilters }) => {
  const categories = [
    "Ceramics", 
    "Cosmetics", 
    "Accessories", 
    "Home Decor", 
    "Kitchenware"
  ];

  const handleCategoryChange = (category) => {
    if (filters.category.includes(category)) {
      setFilters({
        ...filters,
        category: filters.category.filter(cat => cat !== category)
      });
    } else {
      setFilters({
        ...filters,
        category: [...filters.category, category]
      });
    }
  };

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleCheckboxChange = (field) => {
    setFilters({ ...filters, [field]: !filters[field] });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-serif text-lg font-bold mb-4">Filters</h3>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox 
                id={`category-${category}`} 
                checked={filters.category.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Price Range</h4>
        <Slider 
          defaultValue={[0, 500]} 
          min={0} 
          max={500} 
          step={10}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="my-6"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>
      
      {/* Other Filters */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Checkbox 
            id="sale" 
            checked={filters.onSale}
            onCheckedChange={() => handleCheckboxChange('onSale')}
          />
          <Label htmlFor="sale" className="ml-2 text-sm font-medium leading-none">
            On Sale
          </Label>
        </div>
        
        <div className="flex items-center">
          <Checkbox 
            id="3d" 
            checked={filters.has3DView}
            onCheckedChange={() => handleCheckboxChange('has3DView')}
          />
          <Label htmlFor="3d" className="ml-2 text-sm font-medium leading-none">
            Has 3D View
          </Label>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
