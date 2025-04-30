
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Search, Mail, Send, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const Newsletter = () => {
  // Mock subscribers data
  const initialSubscribers = [
    { id: 1, email: 'john.smith@example.com', dateSubscribed: '2023-04-10', status: 'active' },
    { id: 2, email: 'emma.johnson@example.com', dateSubscribed: '2023-04-05', status: 'active' },
    { id: 3, email: 'michael.brown@example.com', dateSubscribed: '2023-03-28', status: 'active' },
    { id: 4, email: 'sarah.wilson@example.com', dateSubscribed: '2023-03-15', status: 'active' },
    { id: 5, email: 'robert.garcia@example.com', dateSubscribed: '2023-03-10', status: 'unsubscribed' },
    { id: 6, email: 'jennifer.lee@example.com', dateSubscribed: '2023-03-05', status: 'active' },
    { id: 7, email: 'david.williams@example.com', dateSubscribed: '2023-02-28', status: 'active' },
    { id: 8, email: 'amanda.rodriguez@example.com', dateSubscribed: '2023-02-20', status: 'unsubscribed' },
    { id: 9, email: 'james.taylor@example.com', dateSubscribed: '2023-02-15', status: 'active' },
    { id: 10, email: 'sophia.anderson@example.com', dateSubscribed: '2023-02-10', status: 'active' }
  ];
  
  // Mock campaigns data
  const initialCampaigns = [
    { 
      id: 1, 
      subject: 'Spring Collection Launch', 
      sentDate: '2023-04-01', 
      recipients: 8, 
      opened: 6, 
      clicked: 4 
    },
    { 
      id: 2, 
      subject: 'Free Shipping Weekend', 
      sentDate: '2023-03-15', 
      recipients: 7, 
      opened: 5, 
      clicked: 3 
    },
    { 
      id: 3, 
      subject: 'New Ceramic Collection', 
      sentDate: '2023-03-01', 
      recipients: 6, 
      opened: 4, 
      clicked: 2 
    },
    { 
      id: 4, 
      subject: 'Valentine\'s Day Special', 
      sentDate: '2023-02-10', 
      recipients: 9, 
      opened: 7, 
      clicked: 5 
    }
  ];
  
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newCampaign, setNewCampaign] = useState({
    subject: '',
    content: '',
    recipients: 'all'
  });
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  
  // Filter subscribers based on search term and status filter
  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const toggleSubscriberStatus = (id) => {
    setSubscribers(subscribers.map(subscriber => 
      subscriber.id === id 
        ? { 
            ...subscriber, 
            status: subscriber.status === 'active' ? 'unsubscribed' : 'active' 
          } 
        : subscriber
    ));
  };
  
  const addSubscriber = (email) => {
    if (!email.trim() || !email.includes('@')) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      toast.error("This email is already subscribed.");
      return;
    }
    
    const newSubscriber = {
      id: subscribers.length + 1,
      email: email.trim(),
      dateSubscribed: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    
    setSubscribers([...subscribers, newSubscriber]);
    toast.success(`Added ${email} to subscribers`);
    return newSubscriber;
  };
  
  const handleNewCampaignSubmit = (e) => {
    e.preventDefault();
    
    if (!newCampaign.subject.trim()) {
      toast.error("Please enter a campaign subject.");
      return;
    }
    
    if (!newCampaign.content.trim()) {
      toast.error("Please enter campaign content.");
      return;
    }
    
    // Calculate number of recipients based on selection
    const recipientCount = newCampaign.recipients === 'all'
      ? subscribers.filter(s => s.status === 'active').length
      : parseInt(newCampaign.recipients);
    
    // Create new campaign
    const today = new Date().toISOString().split('T')[0];
    const newCampaignObj = {
      id: campaigns.length + 1,
      subject: newCampaign.subject,
      sentDate: today,
      recipients: recipientCount,
      opened: 0,
      clicked: 0
    };
    
    setCampaigns([newCampaignObj, ...campaigns]);
    setNewCampaign({ subject: '', content: '', recipients: 'all' });
    setShowNewCampaign(false);
    
    toast.success("Campaign created and sent!");
  };
  
  return (
    <AdminLayout title="Newsletter Subscribers">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-ceramic-navy mb-2 sm:mb-0">Subscribers</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusFilter === 'all' 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusFilter === 'active' 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setStatusFilter('unsubscribed')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusFilter === 'unsubscribed' 
                      ? 'bg-ceramic-terracotta text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Unsubscribed
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Subscribed
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Mail size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {subscriber.dateSubscribed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                        <button
                          onClick={() => toggleSubscriberStatus(subscriber.id)}
                          className="text-ceramic-terracotta hover:text-ceramic-clay"
                        >
                          {subscriber.status === 'active' ? 'Unsubscribe' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredSubscribers.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No subscribers found.</p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-ceramic-navy">Recent Campaigns</h2>
              <button 
                onClick={() => setShowNewCampaign(!showNewCampaign)} 
                className="btn-primary text-sm py-1 px-4 flex items-center"
              >
                <Send size={16} className="mr-2" />
                New Campaign
              </button>
            </div>
            
            {showNewCampaign && (
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium mb-4">Create New Campaign</h3>
                <form onSubmit={handleNewCampaignSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      value={newCampaign.subject}
                      onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                      placeholder="Enter email subject..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Content
                    </label>
                    <textarea
                      value={newCampaign.content}
                      onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                      rows={5}
                      placeholder="Enter email content..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recipients
                    </label>
                    <select
                      value={newCampaign.recipients}
                      onChange={(e) => setNewCampaign({...newCampaign, recipients: e.target.value})}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                    >
                      <option value="all">All Active Subscribers ({subscribers.filter(s => s.status === 'active').length})</option>
                      <option value="5">Test Group (5 subscribers)</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowNewCampaign(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary text-sm py-2"
                    >
                      Send Campaign
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opens
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Mail size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm">{campaign.subject}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {campaign.sentDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {campaign.recipients}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {campaign.opened} ({Math.round((campaign.opened / campaign.recipients) * 100)}%)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {campaign.clicked} ({Math.round((campaign.clicked / campaign.recipients) * 100)}%)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-ceramic-navy mb-4">Quick Add</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const newSub = addSubscriber(email);
                if (newSub) {
                  e.target.email.value = '';
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Add Subscriber
              </button>
            </form>
            
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-ceramic-navy mb-4">Statistics</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Total Subscribers</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold text-ceramic-navy">
                    {subscribers.filter(s => s.status === 'active').length}
                  </p>
                  <p className="text-xs text-gray-500">
                    Active
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Unsubscribed</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold text-ceramic-navy">
                    {subscribers.filter(s => s.status === 'unsubscribed').length}
                  </p>
                  <p className="text-xs text-gray-500">
                    {((subscribers.filter(s => s.status === 'unsubscribed').length / subscribers.length) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Email Campaigns</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold text-ceramic-navy">
                    {campaigns.length}
                  </p>
                  <p className="text-xs text-gray-500">
                    Total Sent
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Average Open Rate</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold text-ceramic-navy">
                    {campaigns.length > 0 
                      ? Math.round(
                          (campaigns.reduce((total, campaign) => total + campaign.opened, 0) / 
                          campaigns.reduce((total, campaign) => total + campaign.recipients, 0)) * 100
                        )
                      : 0}%
                  </p>
                  <p className="text-xs text-gray-500">
                    Industry avg: 20.94%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Newsletter;
