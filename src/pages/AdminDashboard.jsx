import React, { useState } from 'react';
import { Shield, Package, Users, DollarSign, TrendingUp, MapPin, Phone, Mail, Search, Filter, CheckCircle, Clock, Truck, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const stats = {
    totalOrders: 47,
    activeOrders: 12,
    totalRevenue: 2350000,
    totalCustomers: 23,
    todayOrders: 5,
    weekRevenue: 750000
  };

  const orders = [
    {
      id: 'CC-2026-001',
      customer: 'Amir Naseri',
      phone: '+961 3 102 536',
      carpet: 'Persian Living Room Rug',
      service: 'Deep Clean',
      status: 'in-cleaning',
      pickupDate: '2026-02-01',
      deliveryDate: '2026-02-05',
      location: 'Baabda',
      price: 75000,
      paid: false
    },
    {
      id: 'CC-2026-002',
      customer: 'Sarah M.',
      phone: '+961 70 123 456',
      carpet: 'Bedroom Runner',
      service: 'Basic Clean',
      status: 'ready',
      pickupDate: '2026-01-28',
      deliveryDate: '2026-02-04',
      location: 'Beirut',
      price: 45000,
      paid: true
    },
    {
      id: 'CC-2026-003',
      customer: 'Ahmad K.',
      phone: '+961 71 234 567',
      carpet: 'Oriental Rug',
      service: 'Premium Care',
      status: 'picked-up',
      pickupDate: '2026-02-03',
      deliveryDate: '2026-02-07',
      location: 'Jounieh',
      price: 120000,
      paid: false
    }
  ];

  const recentCustomers = [
    { name: 'Amir Naseri', orders: 3, totalSpent: 195000, lastOrder: '2026-02-01' },
    { name: 'Sarah M.', orders: 2, totalSpent: 95000, lastOrder: '2026-01-28' },
    { name: 'Ahmad K.', orders: 1, totalSpent: 120000, lastOrder: '2026-02-03' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
      'picked-up': 'bg-purple-100 text-purple-800 border-purple-200',
      'in-cleaning': 'bg-teal-100 text-teal-800 border-teal-200',
      'ready': 'bg-green-100 text-green-800 border-green-200',
      'delivered': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusText = (status) => {
    const texts = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'picked-up': 'Picked Up',
      'in-cleaning': 'In Cleaning',
      'ready': 'Ready',
      'delivered': 'Delivered'
    };
    return texts[status] || status;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // In real app, call API here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-navy-800 to-navy-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg transform rotate-6"></div>
                <div className="relative bg-white p-2 rounded-lg">
                  <Shield className="w-8 h-8 text-teal-500" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-xs text-gray-300">Carpet Cure Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white hover:text-teal-300 transition text-sm">
                View Site
              </Link>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
                activeTab === 'orders'
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
                activeTab === 'customers'
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Customers
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-teal-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
                  <Package className="w-8 h-8 text-teal-500" />
                </div>
                <p className="text-3xl font-bold text-navy-900">{stats.totalOrders}</p>
                <p className="text-sm text-teal-600 mt-2">+{stats.todayOrders} today</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Active Orders</h3>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-navy-900">{stats.activeOrders}</p>
                <p className="text-sm text-blue-600 mt-2">In progress</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-navy-900">{(stats.totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-green-600 mt-2">+{(stats.weekRevenue / 1000).toFixed(0)}K this week</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Customers</h3>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-navy-900">{stats.totalCustomers}</p>
                <p className="text-sm text-purple-600 mt-2">Active clients</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-navy-900 mb-6">Recent Orders</h2>
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm font-medium text-navy-900">{order.id}</span>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        {!order.paid && (
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            Unpaid
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{order.customer} • {order.carpet}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{order.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{order.phone}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-teal-600">{order.price.toLocaleString()} LBP</p>
                      <p className="text-xs text-gray-500">Delivery: {order.deliveryDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-navy-900 mb-6">Top Customers</h2>
              <div className="space-y-4">
                {recentCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.orders} orders • Last: {customer.lastOrder}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-teal-600">{customer.totalSpent.toLocaleString()} LBP</p>
                      <p className="text-xs text-gray-500">Total spent</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders, customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-cleaning">In Cleaning</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Carpet</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Delivery</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-mono text-sm font-medium text-navy-900">{order.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-navy-900">{order.customer}</p>
                          <p className="text-xs text-gray-500">{order.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{order.carpet}</p>
                          <p className="text-xs text-gray-500">{order.service}</p>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="picked-up">Picked Up</option>
                            <option value="in-cleaning">In Cleaning</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{order.deliveryDate}</p>
                          <p className="text-xs text-gray-500">{order.location}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-teal-600">{order.price.toLocaleString()} LBP</p>
                          {!order.paid && (
                            <span className="text-xs text-red-600">Unpaid</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-teal-600 hover:text-teal-700 text-sm">View</button>
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-navy-900 mb-6">Customer Directory</h2>
            <div className="space-y-4">
              {recentCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-teal-300 transition">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 text-lg">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.orders} orders completed</p>
                      <p className="text-xs text-gray-500 mt-1">Last order: {customer.lastOrder}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-teal-600">{customer.totalSpent.toLocaleString()} LBP</p>
                    <p className="text-sm text-gray-500">Total revenue</p>
                    <div className="flex gap-2 mt-3">
                      <a href={`tel:${customer.phone}`} className="text-teal-600 hover:text-teal-700 text-sm">
                        Call
                      </a>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View Orders
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
