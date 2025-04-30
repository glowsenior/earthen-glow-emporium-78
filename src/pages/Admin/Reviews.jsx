
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ThreeDAnimation from '../../components/ThreeDAnimation';
import { Search, Star, Check, X } from 'lucide-react';

const Reviews = () => {
  // Mock reviews data
  const initialReviews = [
    { 
      id: 1, 
      productId: 'P001', 
      productName: 'Ceramic Vase',
      customerName: 'John Smith',
      date: '2023-04-28',
      rating: 5,
      comment: 'Beautiful handcrafted vase. The quality and craftsmanship are excellent. Highly recommend!',
      status: 'published',
      helpful: 8,
      reply: ''
    },
    { 
      id: 2, 
      productId: 'P002', 
      productName: 'Clay Face Mask',
      customerName: 'Emma Johnson',
      date: '2023-04-25',
      rating: 4,
      comment: 'Great face mask. Skin feels refreshed after using it. Would have given 5 stars but the packaging could be improved.',
      status: 'published',
      helpful: 3,
      reply: 'Thank you for your feedback! We\'re working on improving our packaging.'
    },
    { 
      id: 3, 
      productId: 'P003', 
      productName: 'Ceramic Dinner Plates',
      customerName: 'Michael Brown',
      date: '2023-04-22',
      rating: 2,
      comment: 'Disappointed with these plates. One arrived chipped and they seem fragile.',
      status: 'published',
      helpful: 1,
      reply: 'We\'re sorry to hear about your experience. Please contact customer service for a replacement.'
    },
    { 
      id: 4, 
      productId: 'P004', 
      productName: 'Hand Cream',
      customerName: 'Sarah Wilson',
      date: '2023-04-20',
      rating: 5,
      comment: 'Amazing hand cream! Makes my hands so soft and smells wonderful.',
      status: 'published',
      helpful: 12,
      reply: ''
    },
    { 
      id: 5, 
      productId: 'P005', 
      productName: 'Clay Planter',
      customerName: 'David Williams',
      date: '2023-04-18',
      rating: 4,
      comment: 'Nice planter. Good size and quality. Colors are exactly as shown.',
      status: 'published',
      helpful: 5,
      reply: ''
    },
    { 
      id: 6, 
      productId: 'P006', 
      productName: 'Ceramic Oil Diffuser',
      customerName: 'Jennifer Lee',
      date: '2023-04-15',
      rating: 1,
      comment: 'This diffuser doesn\'t work properly. Very disappointed with this purchase.',
      status: 'pending',
      helpful: 0,
      reply: ''
    },
    { 
      id: 7, 
      productId: 'P007', 
      productName: 'Natural Soap',
      customerName: 'Robert Garcia',
      date: '2023-04-12',
      rating: 5,
      comment: 'Love these soaps! Gentle on skin and the scent is amazing.',
      status: 'pending',
      helpful: 0,
      reply: ''
    }
  ];
  
  const [reviews, setReviews] = useState(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  // Filter reviews based on search term, status filter, and rating filter
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter);
    
    return matchesSearch && matchesStatus && matchesRating;
  });
  
  const updateReviewStatus = (id, status) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status } : review
    ));
    
    if (selectedReview && selectedReview.id === id) {
      setSelectedReview({ ...selectedReview, status });
    }
  };
  
  const submitReply = (id) => {
    if (!replyText.trim()) return;
    
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, reply: replyText } : review
    ));
    
    setSelectedReview({ ...selectedReview, reply: replyText });
    setReplyText('');
  };
  
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };
  
  return (
    <AdminLayout title="Product Reviews">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={selectedReview ? "lg:col-span-2" : "lg:col-span-3"}>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <div className="flex flex-wrap mb-4 sm:mb-0">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${
                    statusFilter === 'all' 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Reviews
                </button>
                <button
                  onClick={() => setStatusFilter('published')}
                  className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${
                    statusFilter === 'published' 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Published
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${
                    statusFilter === 'pending' 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pending
                </button>
              </div>
              <div className="flex space-x-2">
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta text-sm"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div 
                  key={review.id} 
                  className="border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => setSelectedReview(review)}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{review.productName}</h3>
                      <div className="flex items-center mt-1">
                        {renderStars(review.rating)}
                        <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        review.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">By {review.customerName}</p>
                  </div>
                  {review.reply && (
                    <div className="mt-2 pl-3 border-l-2 border-gray-200">
                      <p className="text-xs italic text-gray-600">{review.reply}</p>
                    </div>
                  )}
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-gray-500">{review.helpful} customers found this helpful</div>
                    <div className="flex space-x-2">
                      {review.status === 'pending' ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateReviewStatus(review.id, 'published');
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Are you sure you want to delete this review?')) {
                                setReviews(reviews.filter(r => r.id !== review.id));
                              }
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReview(review);
                            setReplyText(review.reply);
                          }}
                          className="text-ceramic-terracotta hover:text-ceramic-clay text-xs"
                        >
                          {review.reply ? 'Edit Reply' : 'Reply'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredReviews.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">No reviews found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {selectedReview && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-medium text-ceramic-navy">Review Details</h2>
                <button 
                  onClick={() => setSelectedReview(null)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <div className="mb-2">
                  <span className="text-sm font-medium">Product</span>
                  <div className="text-sm">{selectedReview.productName}</div>
                  <div className="text-xs text-gray-500">ID: {selectedReview.productId}</div>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium">Customer</span>
                  <div className="text-sm">{selectedReview.customerName}</div>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium">Date</span>
                  <div className="text-sm">{selectedReview.date}</div>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium">Rating</span>
                  <div className="flex mt-1">{renderStars(selectedReview.rating)}</div>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <span className="text-sm font-medium">Review</span>
                <p className="text-sm mt-2">{selectedReview.comment}</p>
                <div className="mt-2 text-xs text-gray-500">
                  {selectedReview.helpful} customers found this helpful
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-sm font-medium">Status</span>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => updateReviewStatus(selectedReview.id, 'published')}
                    className={`px-3 py-1 text-xs rounded-full ${
                      selectedReview.status === 'published' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    onClick={() => updateReviewStatus(selectedReview.id, 'pending')}
                    className={`px-3 py-1 text-xs rounded-full ${
                      selectedReview.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Pending
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-sm font-medium">Your Reply</span>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Enter your reply to this review..."
                  className="mt-2 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                  rows={4}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => submitReply(selectedReview.id)}
                    className="btn-primary text-sm py-1"
                  >
                    {selectedReview.reply ? 'Update Reply' : 'Post Reply'}
                  </button>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this review?')) {
                      setReviews(reviews.filter(r => r.id !== selectedReview.id));
                      setSelectedReview(null);
                    }
                  }}
                  className="w-full py-2 text-sm text-red-600 hover:text-red-800 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                >
                  Delete Review
                </button>
              </div>
              
              <div className="mt-6">
                <ThreeDAnimation type="cosmetic" height="100px" />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Reviews;
