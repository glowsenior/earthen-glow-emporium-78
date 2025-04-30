
import React from 'react';

const testimonials = [
  {
    id: 1,
    content: "The ceramic planter I purchased is absolutely stunning! The craftsmanship is exceptional and it looks perfect in my living room.",
    author: "Sarah Johnson",
    location: "New York, NY"
  },
  {
    id: 2,
    content: "I've tried many face creams but EarthenGlow's clay mask is by far the best. My skin feels rejuvenated and soft after each use.",
    author: "Michael Chen",
    location: "San Francisco, CA"
  },
  {
    id: 3,
    content: "The ceramic dinnerware set is not only beautiful but extremely durable. I receive compliments every time I host dinner parties.",
    author: "Emma Thompson",
    location: "Chicago, IL"
  }
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-ceramic-sage/10">
      <div className="container-custom">
        <h2 className="text-3xl font-serif font-bold text-ceramic-navy text-center mb-2">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-12">Discover why people love our products</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
              <div className="mt-auto">
                <p className="font-medium text-ceramic-navy">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
