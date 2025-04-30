
import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryBanner from '../components/CategoryBanner';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Index = () => {
  return (
    <div className="bg-ceramic-cream">
      <Hero />
      <FeaturedProducts />
      <CategoryBanner />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Index;
