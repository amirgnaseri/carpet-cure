import React, { useState } from 'react';
import { Shield, Package, Calendar, MapPin, Phone, LogOut, User, Plus, Clock, CheckCircle, Truck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this comes from API
  const user = {
    name: 'Amir Naseri',
    email: 'amir@example.com',
    phone: '+961 3 102 536',
    joinedDate: 'January 2026'
  };

  const orders = [
    {
      id: 'CC-2026-001',
      carpetName: 'Persian Living Room Rug',
      status: 'in-cleaning',
      pickupDate: '2026-02-01',
      estimatedDelivery: '2026-02-05',
      service: 'Deep Clean',
      price: 75000,
      image: '🔷'
    },
    {
      id: 'CC-2026-002',
      carpetName: 'Bedroom Runner',
      status: 'ready',
      pickupDate: '2026-01-28',
      estimatedDelivery: '2026-02-04',
      service: 'Basic Clean',
      price: 45000,
      image: '🔶'
    }
  ];

  const carpets = [
    { id: 1, name: 'Persian Living Room Rug', size: '3x4m', lastCleaned: '2026-02-01', image: '🔷' },
    { id: 2, name: 'Bedroom Runner', size: '2x3m', lastCleaned: '2026-01-28', image: '🔶' },
    { id: 3, name: 'Hallway Carpet', size: '1x5m', lastCleaned: '2025-12-15', image: '🔹' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'picked-up': 'bg-purple-100 text-purple-800',
      'in-cleaning': 'bg-teal-100 text-teal-800',
      'ready': 'bg-green-100 text-green-800',
      'delivered': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      'pending': 'Pending Pickup',
      'confirmed': 'Confirmed',
      'picked-up': 'Picked Up',
      'in-cleaning': 'In Cleaning',
      'ready': 'Ready for Delivery',
      'delivered': 'Delivered'
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': <Clock className="w-4 h-4" />,
      'confirmed': <CheckCircle className="w-4 h-4" />,
      'picked-up': <Truck className="w-4 h-4" />,
      'in-cleaning': <Sparkles className="w-4 h-4" />,
      'ready': <Package className="w-4 h-4" />,
      'delivered': <CheckCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg transform rotate-6"></div>
                <div className="relative bg-white p-2 rounded-lg">
                  <Shield className="w-8 h-8 text-teal-500" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-teal-500">Carpet</span>
                  <span className="text-navy-800"> Cure</span>
                </h1>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-teal-600 transition">
                Home
              </Link>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="font-bold text-navy-900">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">Member since {user.joinedDate}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'overview'
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'orders'
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Orders</span>
                </button>

                <button
                  onClick={() => setActiveTab('carpets')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'carpets'
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>My Carpets</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'profile'
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href="tel:+9613102536"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-teal-600 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>+961 3 102 536</span>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                  <div className="relative">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
                    <p className="text-teal-100 mb-6">Track your carpets and manage your cleaning orders</p>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center space-x-2 bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Book New Cleaning</span>
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Active Orders</p>
                        <p className="text-3xl font-bold text-navy-900">2</p>
                      </div>
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-teal-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Carpets</p>
                        <p className="text-3xl font-bold text-navy-900">3</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Next Delivery</p>
                        <p className="text-3xl font-bold text-navy-900">2 days</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Truck className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Orders */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-navy-900 mb-6">Active Orders</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:border-teal-300 transition">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="text-4xl">{order.image}</div>
                            <div>
                              <h3 className="font-bold text-navy-900">{order.carpetName}</h3>
                              <p className="text-sm text-gray-600">Order #{order.id}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {getStatusIcon(order.status)}
                                  <span>{getStatusText(order.status)}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Service</p>
                            <p className="font-bold text-navy-900">{order.service}</p>
                            <p className="text-lg font-bold text-teal-600 mt-2">{order.price.toLocaleString()} LBP</p>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative pt-4 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <div>
                              <p className="text-gray-600">Picked Up</p>
                              <p className="font-medium text-navy-900">{order.pickupDate}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-600">Est. Delivery</p>
                              <p className="font-medium text-navy-900">{order.estimatedDelivery}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-navy-900 mb-1">{order.carpetName}</h3>
                          <p className="text-sm text-gray-600">Order #{order.id}</p>
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium mt-3 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span>{getStatusText(order.status)}</span>
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-teal-600">{order.price.toLocaleString()} LBP</p>
                          <button className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'carpets' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-navy-900">My Carpets</h2>
                  <button className="flex items-center space-x-2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition">
                    <Plus className="w-5 h-5" />
                    <span>Add Carpet</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {carpets.map((carpet) => (
                    <div key={carpet.id} className="border border-gray-200 rounded-xl p-6 hover:border-teal-300 transition">
                      <div className="flex items-start space-x-4">
                        <div className="text-5xl">{carpet.image}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-navy-900 mb-1">{carpet.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">Size: {carpet.size}</p>
                          <p className="text-xs text-gray-500">Last cleaned: {carpet.lastCleaned}</p>
                          <button className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium">
                            Book Cleaning →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={user.phone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition font-medium">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
