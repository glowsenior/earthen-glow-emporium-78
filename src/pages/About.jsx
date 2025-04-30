
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const About = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-ceramic-navy text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Story</h1>
            <p className="text-lg max-w-2xl">
              Discover the passion and craftsmanship behind EarthenGlow's handcrafted ceramic products and natural cosmetics.
            </p>
          </div>
        </div>
        
        {/* Mission Section */}
        <div className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-ceramic-navy mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At EarthenGlow, we believe in the beauty of natural materials and traditional craftsmanship. Our mission is to create products that bring the warmth and authenticity of handcrafted ceramics and natural cosmetics into everyday life.
                </p>
                <p className="text-gray-600 mb-4">
                  We are committed to sustainable practices, using only ethically sourced materials and traditional techniques that honor the environment and the artisans who create our products.
                </p>
                <p className="text-gray-600">
                  Each piece is crafted with intention, care, and a deep respect for the natural world, resulting in beautiful products that are as kind to the earth as they are to you.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1591373471769-4c459a30b56a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Pottery wheel with hands crafting clay" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-ceramic-terracotta opacity-20 -z-10"></div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-ceramic-sage opacity-20 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Story Section */}
        <div className="py-16 bg-ceramic-sand">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-ceramic-navy mb-6">Our Journey</h2>
              <p className="text-gray-600">
                From humble beginnings to a community of artisans and creators, our journey has been shaped by a love for natural materials and traditional craft.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-ceramic-terracotta/10 text-ceramic-terracotta mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">The Beginning</h3>
                <p className="text-gray-600">
                  EarthenGlow began in 2015 in a small pottery studio in Portland, Oregon. Founded by ceramics artist Emma Chen, the company started with a simple collection of handmade vases and planters sold at local markets.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-ceramic-terracotta/10 text-ceramic-terracotta mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">Growth & Innovation</h3>
                <p className="text-gray-600">
                  In 2018, herbalist and skincare specialist Michael Torres joined the team, bringing his expertise in natural cosmetics. Together, they expanded the brand to include clay-based skincare products that complement the ceramic collection.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-ceramic-terracotta/10 text-ceramic-terracotta mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">Today</h3>
                <p className="text-gray-600">
                  Today, EarthenGlow is a collective of skilled artisans and herbalists dedicated to creating beautiful, functional products using sustainable materials and practices. Each piece still carries the spirit of those first handcrafted items.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Team Section */}
        <div className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-bold text-ceramic-navy text-center mb-12">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1581704906775-891dd5207444?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Emma Chen - Founder & Lead Ceramicist" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">Emma Chen</h3>
                <p className="text-ceramic-terracotta font-medium text-sm mb-2">Founder & Lead Ceramicist</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years of experience in ceramics, Emma brings her passion for traditional techniques to every EarthenGlow piece.
                </p>
              </div>
              
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Michael Torres - Co-Founder & Herbalist" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">Michael Torres</h3>
                <p className="text-ceramic-terracotta font-medium text-sm mb-2">Co-Founder & Herbalist</p>
                <p className="text-gray-600 text-sm">
                  A trained herbalist with a background in organic skincare formulation, Michael develops all our natural cosmetic products.
                </p>
              </div>
              
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Sarah Johnson - Design Director" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">Sarah Johnson</h3>
                <p className="text-ceramic-terracotta font-medium text-sm mb-2">Design Director</p>
                <p className="text-gray-600 text-sm">
                  With an eye for detail and a minimalist aesthetic, Sarah oversees the design and artistic direction of our product lines.
                </p>
              </div>
              
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="David Kim - Production Manager" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">David Kim</h3>
                <p className="text-ceramic-terracotta font-medium text-sm mb-2">Production Manager</p>
                <p className="text-gray-600 text-sm">
                  David ensures that our sustainable production practices maintain the highest quality standards across all product lines.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="py-16 bg-ceramic-navy text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-ceramic-terracotta rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Sustainability</h3>
                <p className="text-gray-300">
                  We prioritize sustainable materials and practices in every aspect of our business, from sourcing to packaging to production.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-ceramic-terracotta rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Craftsmanship</h3>
                <p className="text-gray-300">
                  We believe in the value of handcraft and the unique character that comes from traditional making processes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-ceramic-terracotta rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Community</h3>
                <p className="text-gray-300">
                  We support and celebrate the makers, artists, and communities that contribute to our collective creative vision.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default About;
