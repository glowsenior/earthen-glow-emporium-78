
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryBanner from '../components/CategoryBanner';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import products from '../data/products';

const Index = () => {
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        <FeaturedProducts 
          title="Featured Products" 
          products={featuredProducts} 
          viewAllLink="/shop" 
        />
        
        <CategoryBanner />
        
        <div className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-ceramic-navy mb-6">Handcrafted with Love</h2>
              <p className="text-gray-600 mb-8">
                At EarthenGlow, we create beautiful ceramic products and natural cosmetics using traditional techniques and sustainably sourced materials. Each piece is handcrafted with care to bring natural beauty into your everyday life.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-ceramic-sand rounded-lg">
                  <div className="w-16 h-16 bg-ceramic-terracotta rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Sustainable Materials</h3>
                  <p className="text-gray-600">We use only sustainable, ethically sourced materials in all our products.</p>
                </div>
                <div className="p-6 bg-ceramic-sand rounded-lg">
                  <div className="w-16 h-16 bg-ceramic-terracotta rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Handcrafted</h3>
                  <p className="text-gray-600">Every piece is handcrafted with care using traditional techniques.</p>
                </div>
                <div className="p-6 bg-ceramic-sand rounded-lg">
                  <div className="w-16 h-16 bg-ceramic-terracotta rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Natural Ingredients</h3>
                  <p className="text-gray-600">Our cosmetics use only natural ingredients that are gentle on your skin.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
