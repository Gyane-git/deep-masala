"use client";
import React from 'react';
import { Package, FolderTree, Flag, Users, ShoppingCart, MessageSquare, Bell, Star, UserCircle } from 'lucide-react';


const DashboardPage = () => {
  const statsCards = [
    { icon: Package, label: 'Products', value: '1339', color: 'bg-orange-100', iconColor: 'text-orange-600' },
    { icon: FolderTree, label: 'Categories', value: '26', color: 'bg-orange-100', iconColor: 'text-orange-600' },
    { icon: Users, label: 'Customers', value: '90', color: 'bg-orange-100', iconColor: 'text-orange-600' },
    { icon: ShoppingCart, label: 'Orders', value: '507', color: 'bg-orange-100', iconColor: 'text-orange-600' },
    { icon: MessageSquare, label: 'Inquiries', value: '29', color: 'bg-green-100', iconColor: 'text-green-600' },
    { icon: Bell, label: 'Subscribers', value: '1178', color: 'bg-green-100', iconColor: 'text-green-600' },
    { icon: UserCircle, label: 'System Users', value: '90', color: 'bg-green-100', iconColor: 'text-green-600' },
    { icon: Star, label: 'Reviews', value: '35', color: 'bg-green-100', iconColor: 'text-green-600' },
  ];

  const processingOrders = [
    { id: '#803920251120003', items: 1, user: 'gyane', amount: '48.00', date: '2025-11-20 08:12 PM' },
    { id: '#617420251120002', items: 1, user: 'gyane', amount: '115.00', date: '2025-11-20 08:09 PM' },
    { id: '#213520251120001', items: 1, user: 'gyane', amount: '115.00', date: '2025-11-20 08:09 PM' },
    { id: '#626420251118021', items: 1, user: 'Raaz "Rock"', amount: '48.00', date: '2025-11-18 01:22 PM' },
    { id: '#204320251118020', items: 1, user: 'Raaz "Rock"', amount: '48.00', date: '2025-11-18 01:13 PM' },
  ];

  const chartData = {
    processing: 55,
    shipped: 15,
    delivered: 20,
    cancelled: 10
  };

  return (
    <div className="w-full bg-gray-50">


      {/* Main Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-gray-600 text-sm font-medium mb-4">{card.label}</h3>
              <div className="flex items-center gap-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <span className="text-3xl font-bold text-gray-800">{card.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Processing Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Processing (396)
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="p-6">
              {processingOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-800">{order.id}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Processing
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>📦 {order.items} items</span>
                      <span>👤 {order.user}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">{order.amount}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Data Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Visual Data of Orders</h2>
            <div className="relative">
              <svg viewBox="0 0 200 200" className="w-full">
                {/* Processing - Blue */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="30"
                  strokeDasharray={`${chartData.processing * 4.4} 440`}
                  transform="rotate(-90 100 100)"
                />
                {/* Shipped - Green */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="30"
                  strokeDasharray={`${chartData.shipped * 4.4} 440`}
                  strokeDashoffset={`-${chartData.processing * 4.4}`}
                  transform="rotate(-90 100 100)"
                />
                {/* Delivered - Yellow */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="30"
                  strokeDasharray={`${chartData.delivered * 4.4} 440`}
                  strokeDashoffset={`-${(chartData.processing + chartData.shipped) * 4.4}`}
                  transform="rotate(-90 100 100)"
                />
                {/* Cancelled - Red */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="30"
                  strokeDasharray={`${chartData.cancelled * 4.4} 440`}
                  strokeDashoffset={`-${(chartData.processing + chartData.shipped + chartData.delivered) * 4.4}`}
                  transform="rotate(-90 100 100)"
                />
                {/* Center white circle */}
                <circle cx="100" cy="100" r="55" fill="white" />
              </svg>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-sm text-gray-600">Processing</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{chartData.processing}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-gray-600">Shipped</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{chartData.shipped}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span className="text-sm text-gray-600">Delivered</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{chartData.delivered}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-sm text-gray-600">Cancelled</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{chartData.cancelled}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;