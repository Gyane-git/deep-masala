"use client";
import { useState } from 'react';
import Link from 'next/link';
import { User, MapPin, List, Heart, RotateCcw, MessageSquare, Shield, LogOut, Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MyAccountPage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const pathname = usePathname();

  // Sample user data
  const userData = {
    name: 'global tech',
    email: 'gyane.globaltech@gmail.com',
    phone: '9813074888',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    addresses: {
      home: {
        title: 'Global Tech',
        address: 'Bagmati Province - Kathmandu\nMetro 1 - Naxal Area - Jamal\n9813074814',
        type: 'Home Address'
      },
      billing: {
        title: 'Global Tech',
        address: 'Bagmati Province - Kathmandu\nMetro 1 - Naxal Area - Jamal\n9813074814'
      }
    }
  };

  const menuItems = [
    { id: 'manage', icon: User, label: 'Manage My Account', route: '/myaccount' },
    { id: 'address', icon: MapPin, label: 'Address Book', route: 'myaccount/address' },
    { id: 'orders', icon: List, label: 'My Orders', route: '/order' },
    { id: 'complaint', icon: RotateCcw, label: 'Complaint', route: '/complaint' }
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    setShowLogoutModal(false);
    // Add logout logic here - redirect to login page
    // window.location.href = '/login';
  };

  const handleRemoveAccount = () => {
    console.log('Removing account...');
    setShowRemoveModal(false);
    // Add account removal logic here
  };

  const isActive = (route) => {
    return pathname === route;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Profile Section */}
              <div className="text-center mb-6">
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
                <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{userData.email}</p>
                <p className="text-sm text-gray-600">{userData.phone}</p>
              </div>

              {/* Menu Items */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.route}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.route)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            {/* Profile Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Personal Profile */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Profile</h3>
                  <Link
                    href="/myaccount/edit-profile"
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    EDIT
                  </Link>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium">{userData.name}</p>
                  <p className="text-gray-600 text-sm">{userData.email}</p>
                  <p className="text-gray-600 text-sm">{userData.phone}</p>
                </div>
              </div>

              {/* Address Book */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Address Book</h3>
                  <Link
                    href="/address/edit"
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    EDIT
                  </Link>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium">{userData.addresses.home.title}</p>
                  <p className="text-gray-600 text-sm whitespace-pre-line">
                    {userData.addresses.home.address}
                  </p>
                  <span className="inline-block text-xs text-gray-500 mt-2">
                    {userData.addresses.home.type}
                  </span>
                </div>
              </div>

              {/* Default Billing Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Default Billing Address</h3>
                  <Link
                    href="/address/billing/edit"
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    EDIT
                  </Link>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium">{userData.addresses.billing.title}</p>
                  <p className="text-gray-600 text-sm whitespace-pre-line">
                    {userData.addresses.billing.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Account Security</h3>
              </div>

              {/* Password Section */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Password</p>
                    <p className="text-sm text-gray-500">Last changed: Never</p>
                  </div>
                </div>
                <Link
                  href="/password/change"
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  Change
                </Link>
              </div>

              {/* Logout Section */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Account logout</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLogoutModal(true)}
                  className="text-red-600 font-medium hover:text-red-700"
                >
                  Logout
                </button>
              </div>

              {/* Account Removal Section */}
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Account Removal</p>
                    <p className="text-sm text-gray-500">Permanently delete your account</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowRemoveModal(true)}
                  className="text-red-600 font-medium hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout from your account?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Account Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Remove Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}