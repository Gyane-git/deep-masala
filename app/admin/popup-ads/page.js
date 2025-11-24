"use client";
import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, ImageIcon } from 'lucide-react';


export default function PopupAdsAdmin() {
  const [ads, setAds] = useState([
    { id: 1, title: 'Summer Sale', description: 'Get 50% off on all items', imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400', link: 'https://example.com/sale', isActive: true },
    { id: 2, title: 'New Collection', description: 'Check out our latest products', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', link: 'https://example.com/new', isActive: true },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    isActive: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['title', 'description', 'imageUrl', 'link'];
    const invalidFields = requiredFields.filter(field => !formData[field]);
    if (invalidFields.length > 0) {
      alert(`Please fill in the following required fields: ${invalidFields.join(', ')}`);
      return;
    }
    const newAd = { ...formData, id: editingAd ? editingAd.id : Date.now() };
    if (editingAd) {
      setAds(prev => prev.map(ad => ad.id === editingAd.id ? newAd : ad));
    } else {
      setAds(prev => [...prev, newAd]);
    }
    resetForm();
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      description: ad.description,
      imageUrl: ad.imageUrl,
      link: ad.link,
      isActive: ad.isActive
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      setAds(prev => prev.filter(ad => ad.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      isActive: true
    });
    setEditingAd(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Popup Ads Management</h1>
              <p className="text-slate-600">Create and manage popup advertisements for your site</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              Add New Ad
            </button>
          </div>
        </div>

        {/* Ads List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-linear-to-r from-slate-700 to-slate-800 px-8 py-4">
            <h2 className="text-xl font-semibold text-white">Active Popup Ads</h2>
          </div>
          
          <div className="p-6">
            {ads.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg">No popup ads yet. Create your first one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {ads.map((ad) => (
                  <div
                    key={ad.id}
                    className="flex items-center gap-6 p-5 bg-linear-to-r from-slate-50 to-white border border-slate-200 rounded-xl hover:shadow-md transition-all"
                  >
                    {/* Image Preview */}
                    <div className="shrink-0 w-24 h-24 bg-slate-200 rounded-lg overflow-hidden">
                      {ad.imageUrl ? (
                        <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={32} className="text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="grow min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-800 truncate">{ad.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ad.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {ad.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-2 line-clamp-2">{ad.description}</p>
                      <a 
                        href={ad.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                      >
                        {ad.link}
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(ad)}
                        className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-blue-600 to-blue-700 px-8 py-6 flex items-center justify-between sticky top-0">
              <h2 className="text-2xl font-bold text-white">
                {editingAd ? 'Edit Popup Ad' : 'Create New Popup Ad'}
              </h2>
              <button
                onClick={resetForm}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter ad title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Enter ad description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Link URL *
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="https://example.com/landing-page"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-semibold text-slate-700 cursor-pointer">
                    Set as active (will be displayed on site)
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {editingAd ? 'Update Ad' : 'Create Ad'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}