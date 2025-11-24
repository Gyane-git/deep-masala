"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Package,
  FolderTree,
  Flag,
  Tag,
  ShoppingCart,
  Stethoscope,
  Users,
  Star,
  MessageSquare,
  FileText,
  UserCog,
  BarChart3,
  Truck,
  MapPin,
  XCircle,
  Shield,
} from "lucide-react";

const SideHeaderBar = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // MENU WITH ROUTES
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },

    {
      icon: Package,
      label: "Products",
      path: "/admin/products",
      expandable: true,
      children: [
        { name: "View All", path: "/admin/products" },
        { name: "Add New", path: "/admin/products/add" },
      ],
    },

    {
      icon: FolderTree,
      label: "Categories",
      path: "/admin/categories",
      expandable: true,
      children: [
        { name: "View All", path: "/admin/categories" },
        { name: "Add New", path: "/admin/add-categories" },
      ],
    },

    {
      icon: Flag,
      label: "Brands",
      path: "/admin/brands",
      expandable: true,
      children: [
        { name: "View All", path: "/admin/brands" },
        { name: "Add New", path: "/admin/brands/add" },
      ],
    },

    {
      icon: Tag,
      label: "Coupons",
      path: "/admin/coupons",
      expandable: true,
    },

    {
      icon: ShoppingCart,
      label: "Manage Orders",
      path: "/admin/orders",
      expandable: true,
    },

    {
      icon: Stethoscope,
      label: "Manage Clinic Setup",
      path: "/admin/clinic",
      expandable: true,
    },

    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: Star, label: "Reviews & Ratings", path: "/admin/reviews" },
    { icon: MessageSquare, label: "Inquiries", path: "/admin/inquiries" },
    { icon: FileText, label: "Grievances", path: "/admin/grievances" },
    {
      icon: FileText,
      label: "Newsletter Subscribers",
      path: "/admin/newsletter",
    },

    {
      icon: UserCog,
      label: "System Users",
      path: "/admin/users",
      expandable: true,
      children: [
        { name: "View All", path: "/admin/users" },
        { name: "Add New", path: "/admin/users/add" },
      ],
    },

    { icon: BarChart3, label: "Report", path: "/admin/report" },
    { icon: Truck, label: "Shipping Carriers", path: "/admin/shipping" },
    { icon: MapPin, label: "Manage Address", path: "/admin/address" },
    { icon: XCircle, label: "Return & Cancel Reasons", path: "/admin/returns" },

    {
      icon: Shield,
      label: "Compliance & Legitimacy",
      path: "/admin/compliance",
      expandable: true,
      children: [
        { name: "Policies", path: "/admin/compliance/policies" },
        { name: "Certificates", path: "/admin/compliance/certificates" },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white h-full border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* Main Button */}
            <div
              className="flex items-center justify-between px-4 py-2.5 hover:bg-blue-50 cursor-pointer group transition-colors"
              onClick={() => item.expandable && toggleExpand(item.label)}
            >
              <Link
                href={item.path}
                className="flex items-center gap-3 w-full"
              >
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-sm text-gray-700 group-hover:text-blue-600">
                  {item.label}
                </span>
              </Link>

              {item.expandable && (
                <div className="text-gray-400 ml-2">
                  {expandedItems[item.label] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              )}
            </div>

            {/* Expandable Children */}
            {item.expandable &&
              expandedItems[item.label] &&
              item.children && (
                <div className="bg-gray-50 py-1">
                  {item.children.map((child, i) => (
                    <Link
                      key={i}
                      href={child.path}
                      className="block pl-12 pr-4 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">G</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Gyanendra</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideHeaderBar;
