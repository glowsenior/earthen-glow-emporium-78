import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from "sonner";
import products from '../../data/products';
import ThreeDAnimation from '../../components/ThreeDAnimation';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const emptyProduct = {
    name: '',
    description: '',
    price: '',
    salePrice: '',
    category: 'Ceramics',
    image: '',
    images: ['', '', ''],
    featured: false,
    sale: false,
    stockQuantity: '',
    has3DView: false,
    productType: '',
    modelColor: '#ECD4BC'
  };
  
  const [formData, setFormData] = useState(emptyProduct);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  
  useEffect(() => {
    if (isEditing) {
      const productToEdit = products.find(p => p.id === parseInt(id));
      if (productToEdit) {
        // Make sure images array has at least 3 items
        const productImages = [...productToEdit.images];
        while (productImages.length < 3) {
          productImages.push('');
        }
        
        setFormData({
          ...productToEdit,
          images: productImages,
          price: productToEdit.price.toString(),
          salePrice: productToEdit.salePrice ? productToEdit.salePrice.toString() : '',
          stockQuantity: productToEdit.stockQuantity.toString(),
          has3DView: productToEdit.has3DView || false,
          productType: productToEdit.productType || '',
          modelColor: productToEdit.modelColor || '#ECD4BC'
        });
      } else {
        toast.error("Product not found");
        navigate('/admin/products');
      }
    }
  }, [id, isEditing, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
      newErrors.price = "Price must be a valid number";
    }
    
    if (formData.salePrice.trim() && (isNaN(parseFloat(formData.salePrice)) || parseFloat(formData.salePrice) < 0)) {
      newErrors.salePrice = "Sale price must be a valid number";
    }
    
    if (formData.sale && !formData.salePrice.trim()) {
      newErrors.salePrice = "Sale price is required when product is on sale";
    }
    
    if (!formData.image.trim()) newErrors.image = "Main image URL is required";
    
    if (!formData.stockQuantity.trim()) {
      newErrors.stockQuantity = "Stock quantity is required";
    } else if (isNaN(parseInt(formData.stockQuantity)) || parseInt(formData.stockQuantity) < 0) {
      newErrors.stockQuantity = "Stock quantity must be a valid number";
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // In a real app, this would be an API call
    const updatedProduct = {
      ...formData,
      price: parseFloat(formData.price),
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
      stockQuantity: parseInt(formData.stockQuantity),
      // Filter out empty image URLs
      images: formData.images.filter(img => img.trim() !== '')
    };
    
    if (isEditing) {
      toast.success(`Product "${formData.name}" updated successfully`);
    } else {
      // For new products, generate a new ID
      updatedProduct.id = Math.max(...products.map(p => p.id)) + 1;
      toast.success(`Product "${formData.name}" created successfully`);
    }
    
    navigate('/admin/products');
  };
  
  // Generate product type options based on category
  const getProductTypeOptions = () => {
    if (formData.category === 'Ceramics') {
      return ['vase', 'plate', 'bowl', 'mug'];
    } else if (formData.category === 'Cosmetics') {
      return ['cream', 'bottle', 'compact'];
    }
    return [];
  };
  
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
              <Link to="/admin/products" className="text-sm hover:text-ceramic-terracotta">Products</Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-ceramic-navy">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <Link to="/admin/products" className="text-ceramic-terracotta hover:text-ceramic-clay">
            Back to Products
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-ceramic-terracotta'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
                >
                  <option value="Ceramics">Ceramics</option>
                  <option value="Cosmetics">Cosmetics</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                  errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-ceramic-terracotta'
                }`}
              ></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Regular Price* ($)
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-ceramic-terracotta'
                  }`}
                />
                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
              </div>
              
              <div>
                <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Price ($)
                </label>
                <input
                  type="text"
                  id="salePrice"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.salePrice ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-ceramic-terracotta'
                  }`}
                />
                {errors.salePrice && <p className="mt-1 text-sm text-red-500">{errors.salePrice}</p>}
              </div>
              
              <div>
                <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity*
                </label>
                <input
                  type="text"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.stockQuantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-ceramic-terracotta'
                  }`}
                />
                {errors.stockQuantity && <p className="mt-1 text-sm text-red-500">{errors.stockQuantity}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Main Product Image URL*
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.image ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-ceramic-terracotta'
                  }`}
                />
                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                
                {formData.image && (
                  <div className="mt-2 h-32 w-32 overflow-hidden rounded border border-gray-200">
                    <img 
                      src={formData.image} 
                      alt="Product preview" 
                      className="h-full w-full object-cover"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Additional Images (Optional)
                </label>
                
                <div className="space-y-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={formData.images[index] || ''}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
                      />
                      {formData.images[index] && (
                        <div className="ml-2 h-10 w-10 flex-shrink-0 overflow-hidden rounded border border-gray-200">
                          <img 
                            src={formData.images[index]} 
                            alt={`Product view ${index + 1}`} 
                            className="h-full w-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">3D Product View</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="has3DView"
                      name="has3DView"
                      checked={formData.has3DView}
                      onChange={handleChange}
                      className="h-4 w-4 text-ceramic-terracotta rounded border-gray-300 focus:ring-ceramic-terracotta"
                    />
                    <label htmlFor="has3DView" className="ml-2 block text-sm text-gray-700">
                      Enable 3D product view
                    </label>
                  </div>
                  
                  {formData.has3DView && (
                    <>
                      <div>
                        <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">
                          Product Shape Type
                        </label>
                        <select
                          id="productType"
                          name="productType"
                          value={formData.productType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
                        >
                          <option value="">Select a model type</option>
                          {getProductTypeOptions().map(type => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="modelColor" className="block text-sm font-medium text-gray-700 mb-1">
                          Model Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            id="modelColor"
                            name="modelColor"
                            value={formData.modelColor}
                            onChange={handleChange}
                            className="w-12 h-8 p-0 border-none"
                          />
                          <input
                            type="text"
                            value={formData.modelColor}
                            onChange={handleChange}
                            name="modelColor"
                            className="ml-2 w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
                          />
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none"
                      >
                        {showPreview ? 'Hide Preview' : 'Show 3D Preview'}
                      </button>
                    </>
                  )}
                </div>
                
                {formData.has3DView && showPreview && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500 mb-2">3D Model Preview:</p>
                    <div className="h-64 w-full">
                      <ThreeDAnimation 
                        type={formData.category.toLowerCase()} 
                        productType={formData.productType} 
                        color={formData.modelColor}
                        height="100%"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-4 mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-ceramic-terracotta rounded border-gray-300 focus:ring-ceramic-terracotta"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured Product
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sale"
                  name="sale"
                  checked={formData.sale}
                  onChange={handleChange}
                  className="h-4 w-4 text-ceramic-terracotta rounded border-gray-300 focus:ring-ceramic-terracotta"
                />
                <label htmlFor="sale" className="ml-2 block text-sm text-gray-700">
                  On Sale
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ceramic-terracotta"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-ceramic-terracotta text-white rounded-md hover:bg-ceramic-clay focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ceramic-terracotta"
              >
                {isEditing ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
