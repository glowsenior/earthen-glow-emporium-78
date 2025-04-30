
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const UnderConstructionPage = ({ pageName }) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-ceramic-cream">
        {/* Hero Section */}
        <div className="bg-ceramic-navy text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{pageName}</h1>
            <p className="text-lg max-w-2xl">
              Thank you for your interest! We're currently working on this page.
            </p>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-2xl font-serif font-bold text-ceramic-navy mb-6">Coming Soon</h2>
              <p className="text-lg text-gray-700 mb-8">
                We're working hard to bring you amazing content for this section. 
                Please check back later!
              </p>
              <div className="mb-12">
                <img 
                  src="/placeholder.svg" 
                  alt="Under Construction" 
                  className="mx-auto max-w-md w-full opacity-50"
                />
              </div>
              <Link 
                to="/" 
                className="px-6 py-3 bg-ceramic-terracotta hover:bg-ceramic-clay text-white font-medium rounded-md transition-colors inline-block"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnderConstructionPage;
