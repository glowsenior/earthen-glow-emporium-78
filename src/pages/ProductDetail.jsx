
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Get related products in the same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
    }
    
    // Reset quantity and image index when product changes
    setQuantity(1);
    setCurrentImageIndex(0);
    
    // Scroll to top on product change
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const productToAdd = {
        ...product,
        quantity
      };
      addToCart(productToAdd);
    }
  };

  const nextImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex(prevIndex => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex(prevIndex => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!product) {
    return (
      <div>
        <Header />
        <div className="container-custom py-16 text-center">
          <h2 className="text-2xl font-medium">Product not found</h2>
          <p className="mt-4 mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="min-h-screen py-8">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-ceramic-terracotta">Home</Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link to="/shop" className="text-gray-500 hover:text-ceramic-terracotta">Shop</Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link 
                  to={`/categories/${product.category.toLowerCase()}`}
                  className="text-gray-500 hover:text-ceramic-terracotta"
                >
                  {product.category}
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div>
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="object-cover object-center w-full h-full"
                />
                
                {product.sale && (
                  <div className="absolute top-4 right-4 bg-ceramic-terracotta text-white text-xs font-bold px-3 py-1 rounded-full">
                    SALE
                  </div>
                )}
                
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white/80"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white/80"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`aspect-square overflow-hidden rounded-md ${currentImageIndex === index ? 'ring-2 ring-ceramic-terracotta' : 'ring-1 ring-gray-200'}`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} view ${index + 1}`}
                        className="object-cover object-center w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="mb-4">
                {product.sale ? (
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-ceramic-terracotta">${product.salePrice.toFixed(2)}</span>
                    <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Quantity</p>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 px-3 py-1 border-y border-gray-300 text-center focus:outline-none"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-r-md"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {product.stockQuantity > 10 
                    ? 'In stock' 
                    : product.stockQuantity > 0 
                      ? `Only ${product.stockQuantity} left in stock` 
                      : 'Out of stock'}
                </p>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className={`w-full px-6 py-3 rounded-md font-medium ${
                  product.stockQuantity > 0 
                    ? 'bg-ceramic-terracotta hover:bg-ceramic-clay text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Product Details</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Category: {product.category}</li>
                  {product.category === 'Ceramics' && (
                    <>
                      <li>Handmade with natural clay</li>
                      <li>Food safe and easy to clean</li>
                      <li>Each piece is unique with slight variations</li>
                    </>
                  )}
                  {product.category === 'Cosmetics' && (
                    <>
                      <li>Made with natural ingredients</li>
                      <li>No artificial fragrances or preservatives</li>
                      <li>Not tested on animals</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Shipping & Returns</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Free shipping on orders over $50</li>
                  <li>Standard shipping: 3-5 business days</li>
                  <li>30-day return policy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-serif font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
