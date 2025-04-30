
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Upload, Image as ImageIcon, Box, Trash2, Edit, Search, Filter, Save } from 'lucide-react';
import { toast } from "sonner";
import ThreeDAnimation from '../../components/ThreeDAnimation';

const MediaManager = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState('image');
  const [modelType, setModelType] = useState('vase');
  const [modelColor, setModelColor] = useState('#B88B6C');
  
  // Mock initial data
  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockMediaFiles = [
      { id: 1, name: 'Ceramic Vase Image 1', type: 'image', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3', productId: 1, dateAdded: '2023-08-15' },
      { id: 2, name: 'Clay Face Mask Image', type: 'image', url: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3', productId: 2, dateAdded: '2023-09-02' },
      { id: 3, name: 'Ceramic Vase 3D Model', type: '3d', modelType: 'vase', modelColor: '#B88B6C', productId: 1, dateAdded: '2023-08-20' },
      { id: 4, name: 'Face Mask 3D Model', type: '3d', modelType: 'compact', modelColor: '#D4B8A8', productId: 2, dateAdded: '2023-09-05' },
      { id: 5, name: 'Ceramic Plate Image', type: 'image', url: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3', productId: 3, dateAdded: '2023-10-10' },
    ];
    setMediaFiles(mockMediaFiles);
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    // In a real app, this would upload to a server/storage
    const file = e.target.files[0];
    if (!file) return;
    
    // Create a mock file object
    const newFile = {
      id: mediaFiles.length + 1,
      name: file.name.substring(0, file.name.lastIndexOf('.')),
      type: uploadType,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    
    if (uploadType === 'image') {
      // Create a temporary URL for the uploaded image
      newFile.url = URL.createObjectURL(file);
    } else {
      // For 3D models
      newFile.modelType = modelType;
      newFile.modelColor = modelColor;
    }
    
    setMediaFiles([...mediaFiles, newFile]);
    toast.success(`${uploadType === 'image' ? 'Image' : '3D Model'} uploaded successfully!`);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setMediaFiles(mediaFiles.filter(file => file.id !== id));
      if (selectedFile && selectedFile.id === id) {
        setSelectedFile(null);
      }
      toast.success('File deleted successfully!');
    }
  };
  
  const filteredMedia = mediaFiles.filter(file => {
    const matchesType = selectedType === 'all' || file.type === selectedType;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  return (
    <AdminLayout title="Media Manager">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar with controls */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Upload New Media</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
            <div className="flex space-x-2">
              <button 
                className={`flex-1 py-2 px-3 rounded ${uploadType === 'image' ? 'bg-ceramic-terracotta text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setUploadType('image')}
              >
                <ImageIcon className="inline-block mr-2 h-4 w-4" />
                Image
              </button>
              <button 
                className={`flex-1 py-2 px-3 rounded ${uploadType === '3d' ? 'bg-ceramic-terracotta text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setUploadType('3d')}
              >
                <Box className="inline-block mr-2 h-4 w-4" />
                3D Model
              </button>
            </div>
          </div>
          
          {uploadType === '3d' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Type</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={modelType}
                  onChange={(e) => setModelType(e.target.value)}
                >
                  <option value="vase">Vase</option>
                  <option value="plate">Plate</option>
                  <option value="bowl">Bowl</option>
                  <option value="mug">Mug</option>
                  <option value="compact">Compact (Cosmetics)</option>
                  <option value="bottle">Bottle (Cosmetics)</option>
                  <option value="cream">Cream (Cosmetics)</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    className="w-10 h-10 border-none"
                    value={modelColor}
                    onChange={(e) => setModelColor(e.target.value)}
                  />
                  <input
                    type="text"
                    className="ml-3 flex-1 border border-gray-300 rounded-md p-2"
                    value={modelColor}
                    onChange={(e) => setModelColor(e.target.value)}
                    placeholder="#RRGGBB"
                  />
                </div>
              </div>
              
              <div className="mb-4 h-40 border border-gray-200 rounded-md overflow-hidden">
                <ThreeDAnimation 
                  type={uploadType === '3d' ? modelType : 'default'}
                  color={modelColor}
                  height="100%"
                />
              </div>
            </>
          )}
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  {uploadType === 'image' ? 'PNG, JPG or WebP' : 'GLB, GLTF or OBJ'}
                </p>
              </div>
              <input id="file-upload" type="file" className="hidden" onChange={handleUpload} />
            </label>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-lg font-medium">Media Library</h2>
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search media..."
                    className="pl-8 pr-3 py-2 w-full sm:w-40 md:w-60 border border-gray-300 rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-2"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="image">Images</option>
                  <option value="3d">3D Models</option>
                </select>
              </div>
            </div>
            
            {filteredMedia.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredMedia.map((file) => (
                  <div 
                    key={file.id}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedFile?.id === file.id ? 'ring-2 ring-ceramic-terracotta' : ''}`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="aspect-square bg-gray-100 relative">
                      {file.type === 'image' ? (
                        <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                      ) : (
                        <ThreeDAnimation 
                          type={file.modelType || 'default'} 
                          color={file.modelColor || '#B88B6C'} 
                          height="100%" 
                        />
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${file.type === 'image' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                          {file.type === 'image' ? 'Image' : '3D'}
                        </span>
                      </div>
                      <button 
                        className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">Added: {file.dateAdded}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Box className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No media files</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery ? 'No files match your search' : 'Get started by uploading a file'}
                </p>
              </div>
            )}
          </div>
          
          {selectedFile && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">File Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="aspect-square bg-gray-100 mb-4 rounded overflow-hidden">
                    {selectedFile.type === 'image' ? (
                      <img src={selectedFile.url} alt={selectedFile.name} className="w-full h-full object-cover" />
                    ) : (
                      <ThreeDAnimation 
                        type={selectedFile.modelType || 'default'} 
                        color={selectedFile.modelColor || '#B88B6C'} 
                        height="100%" 
                      />
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                      <input 
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={selectedFile.name}
                        onChange={(e) => {
                          const updatedFile = { ...selectedFile, name: e.target.value };
                          setSelectedFile(updatedFile);
                          setMediaFiles(mediaFiles.map(f => f.id === selectedFile.id ? updatedFile : f));
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                      <input 
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
                        value={selectedFile.type === 'image' ? 'Image' : '3D Model'}
                        readOnly
                      />
                    </div>
                    
                    {selectedFile.type === '3d' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Model Type</label>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={selectedFile.modelType}
                            onChange={(e) => {
                              const updatedFile = { ...selectedFile, modelType: e.target.value };
                              setSelectedFile(updatedFile);
                              setMediaFiles(mediaFiles.map(f => f.id === selectedFile.id ? updatedFile : f));
                            }}
                          >
                            <option value="vase">Vase</option>
                            <option value="plate">Plate</option>
                            <option value="bowl">Bowl</option>
                            <option value="mug">Mug</option>
                            <option value="compact">Compact (Cosmetics)</option>
                            <option value="bottle">Bottle (Cosmetics)</option>
                            <option value="cream">Cream (Cosmetics)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Model Color</label>
                          <div className="flex items-center">
                            <input
                              type="color"
                              className="w-10 h-10 border-none"
                              value={selectedFile.modelColor}
                              onChange={(e) => {
                                const updatedFile = { ...selectedFile, modelColor: e.target.value };
                                setSelectedFile(updatedFile);
                                setMediaFiles(mediaFiles.map(f => f.id === selectedFile.id ? updatedFile : f));
                              }}
                            />
                            <input
                              type="text"
                              className="ml-3 flex-1 border border-gray-300 rounded-md p-2"
                              value={selectedFile.modelColor}
                              onChange={(e) => {
                                const updatedFile = { ...selectedFile, modelColor: e.target.value };
                                setSelectedFile(updatedFile);
                                setMediaFiles(mediaFiles.map(f => f.id === selectedFile.id ? updatedFile : f));
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Added</label>
                      <input 
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
                        value={selectedFile.dateAdded}
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Actions</label>
                      <div className="flex space-x-2">
                        <button 
                          className="bg-ceramic-terracotta hover:bg-ceramic-clay text-white py-2 px-4 rounded"
                          onClick={() => {
                            toast.success('Changes saved successfully!');
                          }}
                        >
                          <Save className="h-4 w-4 inline-block mr-2" />
                          Save Changes
                        </button>
                        <button 
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                          onClick={() => handleDelete(selectedFile.id)}
                        >
                          <Trash2 className="h-4 w-4 inline-block mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default MediaManager;
