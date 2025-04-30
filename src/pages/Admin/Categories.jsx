
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Edit, Trash, Save } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Ceramics', slug: 'ceramics', productCount: 12 },
    { id: 2, name: 'Cosmetics', slug: 'cosmetics', productCount: 8 },
    { id: 3, name: 'Vases', slug: 'vases', productCount: 5, parent: 'Ceramics' },
    { id: 4, name: 'Face Creams', slug: 'face-creams', productCount: 3, parent: 'Cosmetics' }
  ]);
  
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', parent: '' });
  const [editingId, setEditingId] = useState(null);
  
  const handleAddCategory = () => {
    if (!newCategory.name) return;
    
    setCategories([
      ...categories, 
      { 
        id: categories.length + 1, 
        name: newCategory.name, 
        slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, '-'),
        productCount: 0,
        parent: newCategory.parent || null
      }
    ]);
    setNewCategory({ name: '', slug: '', parent: '' });
  };
  
  const handleUpdateCategory = (category) => {
    setCategories(categories.map(c => c.id === category.id ? category : c));
    setEditingId(null);
  };
  
  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };
  
  const parentCategories = categories.filter(c => !c.parent);
  
  return (
    <AdminLayout title="Manage Categories">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-medium text-ceramic-navy mb-4">Categories</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === category.id ? (
                          <input 
                            type="text" 
                            className="border rounded px-2 py-1 text-sm w-full"
                            value={category.name}
                            onChange={(e) => handleUpdateCategory({...category, name: e.target.value})}
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === category.id ? (
                          <input 
                            type="text" 
                            className="border rounded px-2 py-1 text-sm w-full"
                            value={category.slug}
                            onChange={(e) => handleUpdateCategory({...category, slug: e.target.value})}
                          />
                        ) : (
                          <div className="text-sm text-gray-500">{category.slug}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === category.id ? (
                          <select 
                            className="border rounded px-2 py-1 text-sm w-full"
                            value={category.parent || ''}
                            onChange={(e) => handleUpdateCategory({...category, parent: e.target.value || null})}
                          >
                            <option value="">No Parent</option>
                            {parentCategories.map(parent => (
                              <option key={parent.id} value={parent.name}>{parent.name}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="text-sm text-gray-500">{category.parent || '-'}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{category.productCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingId === category.id ? (
                          <button 
                            onClick={() => handleUpdateCategory(category)} 
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            <Save size={16} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => setEditingId(category.id)} 
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteCategory(category.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-ceramic-navy mb-4">Add New Category</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                  placeholder="auto-generated-if-empty"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Category</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ceramic-terracotta focus:border-ceramic-terracotta"
                  value={newCategory.parent || ''}
                  onChange={(e) => setNewCategory({...newCategory, parent: e.target.value})}
                >
                  <option value="">No Parent</option>
                  {parentCategories.map(parent => (
                    <option key={parent.id} value={parent.name}>{parent.name}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="button"
                className="btn-primary flex items-center justify-center w-full"
                onClick={handleAddCategory}
              >
                <Plus size={16} className="mr-2" />
                Add Category
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Categories;
