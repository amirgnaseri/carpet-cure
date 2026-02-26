import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getOrders, 
  getCarpets, 
  addCarpet, 
  deleteCarpet, 
  cancelOrder,
  getCurrentUser,
  updateProfile,
  logout 
} from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [carpets, setCarpets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Add carpet form
  const [showAddCarpet, setShowAddCarpet] = useState(false);
  const [newCarpet, setNewCarpet] = useState({
    name: '',
    width: '',
    height: '',
    color: '',
    material: '',
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [addingCarpet, setAddingCarpet] = useState(false);

  // Profile edit
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [userData, ordersData, carpetsData] = await Promise.all([
        getCurrentUser(),
        getOrders(),
        getCarpets(),
      ]);

      setUser(userData.user);
      setProfileData({
        name: userData.user.name,
        phone: userData.user.phone,
        address: userData.user.address,
      });
      setOrders(ordersData.orders || []);
      setCarpets(carpetsData.carpets || []);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Photo size should be less than 2MB');
        return;
      }

      setNewCarpet({ ...newCarpet, photo: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate size category based on width and height in meters
  const calculateSize = (width, height) => {
    const areaM = parseFloat(width) * parseFloat(height); // Area in m²
    if (areaM < 1) return 'small';      // < 1 m²
    if (areaM < 3) return 'medium';     // 1-3 m²
    if (areaM < 5) return 'large';      // 3-5 m²
    return 'xlarge';                     // > 5 m²
  };

  const handleAddCarpet = async (e) => {
    e.preventDefault();
    
    // Validate width and height
    if (!newCarpet.width || !newCarpet.height) {
      alert('Please enter both width and height');
      return;
    }

    const width = parseFloat(newCarpet.width);
    const height = parseFloat(newCarpet.height);

    if (width <= 0 || height <= 0) {
      alert('Width and height must be positive numbers');
      return;
    }

    setAddingCarpet(true);
    
    try {
      const carpetData = {
        name: newCarpet.name,
        width: width,
        height: height,
        size: calculateSize(width, height), // Auto-calculate size for pricing
        color: newCarpet.color,
        material: newCarpet.material,
        photo: photoPreview, // Base64 string
      };

      await addCarpet(carpetData);
      await loadData(); // Reload carpets
      
      // Reset form
      setNewCarpet({ name: '', width: '', height: '', color: '', material: '', photo: null });
      setPhotoPreview(null);
      setShowAddCarpet(false);
      alert('Carpet added successfully!');
    } catch (err) {
      alert('Failed to add carpet: ' + (err.message || 'Please try again'));
      console.error(err);
    } finally {
      setAddingCarpet(false);
    }
  };

  const handleDeleteCarpet = async (carpetId) => {
    if (!window.confirm('Are you sure you want to delete this carpet?')) return;
    
    try {
      await deleteCarpet(carpetId);
      await loadData();
      alert('Carpet deleted successfully!');
    } catch (err) {
      alert('Failed to delete carpet');
      console.error(err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      await cancelOrder(orderId);
      await loadData();
      alert('Order cancelled successfully!');
    } catch (err) {
      alert('Failed to cancel order');
      console.error(err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      await loadData();
      setEditingProfile(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDimensions = (carpet) => {
    if (carpet.width && carpet.height) {
      const areaFt = carpet.width * carpet.height;
      const areaM = (areaFt * 0.092903).toFixed(2); // Convert sq ft to sq m
      return `${carpet.width} × ${carpet.height} m (${areaM} m²)`;
    }
    return 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = {
    activeOrders: orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length,
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, o) => sum + (o.price || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold">
                CC
              </div>
              <div>
                <h1 className="text-xl font-bold text-navy-900">Carpet Cure</h1>
                <p className="text-xs text-gray-500">Client Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-navy-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/book')}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-teal-700 hover:to-teal-600 transition-all shadow-lg font-medium"
          >
            📅 Book Carpet Cleaning
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b overflow-x-auto">
            {['overview', 'orders', 'carpets', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Orders</p>
                    <p className="text-3xl font-bold text-navy-900 mt-1">{stats.activeOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-3xl font-bold text-navy-900 mt-1">{stats.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-3xl font-bold text-navy-900 mt-1">${stats.totalSpent}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-navy-900 mb-4">Recent Orders</h2>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium text-navy-900">Order #{order.orderNumber}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.pickupDate).toLocaleDateString()} • ${order.price}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No orders yet. Book your first cleaning!</p>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-navy-900 mb-6">My Orders</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-navy-900">Order #{order.orderNumber}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.pickupDate).toLocaleDateString()} • {order.pickupTime}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-600">Service:</p>
                        <p className="font-medium capitalize">{order.serviceType} Cleaning</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price:</p>
                        <p className="font-medium">${order.price}</p>
                      </div>
                    </div>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">No orders yet. Book your first cleaning!</p>
            )}
          </div>
        )}

        {/* Carpets Tab */}
        {activeTab === 'carpets' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-navy-900">My Carpets</h2>
              <button
                onClick={() => setShowAddCarpet(!showAddCarpet)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                {showAddCarpet ? 'Cancel' : '+ Add Carpet'}
              </button>
            </div>

            {/* Add Carpet Form */}
            {showAddCarpet && (
              <form onSubmit={handleAddCarpet} className="mb-6 p-6 bg-gray-50 rounded-lg border">
                <h3 className="font-bold text-navy-900 mb-4">Add New Carpet</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Carpet Name *
                    </label>
                    <input
                      type="text"
                      value={newCarpet.name}
                      onChange={(e) => setNewCarpet({ ...newCarpet, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g., Living Room Carpet"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Width (m) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={newCarpet.width}
                        onChange={(e) => setNewCarpet({ ...newCarpet, width: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="2.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height (m) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={newCarpet.height}
                        onChange={(e) => setNewCarpet({ ...newCarpet, height: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="3.0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color *
                    </label>
                    <input
                      type="text"
                      value={newCarpet.color}
                      onChange={(e) => setNewCarpet({ ...newCarpet, color: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g., Beige, Gray, Red"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Material *
                    </label>
                    <input
                      type="text"
                      value={newCarpet.material}
                      onChange={(e) => setNewCarpet({ ...newCarpet, material: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g., Wool, Silk, Synthetic"
                      required
                    />
                  </div>
                </div>

                {/* Area calculation preview */}
                {newCarpet.width && newCarpet.height && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      📏 Area: <strong>{(parseFloat(newCarpet.width) * parseFloat(newCarpet.height)).toFixed(2)} m²</strong>
                      {' '}({calculateSize(newCarpet.width, newCarpet.height)} carpet)
                    </p>
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carpet Photo (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max size: 2MB</p>
                  {photoPreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={addingCarpet}
                  className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingCarpet ? 'Adding...' : 'Add Carpet'}
                </button>
              </form>
            )}

            {/* Carpets List */}
            {carpets.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {carpets.map((carpet) => (
                  <div key={carpet._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    {carpet.photo && (
                      <img 
                        src={carpet.photo} 
                        alt={carpet.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                    )}
                    <h3 className="font-bold text-navy-900 mb-2">{carpet.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <p><span className="font-medium">Dimensions:</span> {formatDimensions(carpet)}</p>
                      <p><span className="font-medium">Color:</span> {carpet.color}</p>
                      <p><span className="font-medium">Material:</span> {carpet.material}</p>
                      <p className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                        carpet.status === 'clean' ? 'bg-green-100 text-green-800' :
                        carpet.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {carpet.status}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteCarpet(carpet._id)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">No carpets added yet. Add your first carpet above!</p>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-navy-900">My Profile</h2>
              <button
                onClick={() => setEditingProfile(!editingProfile)}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                {editingProfile ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {editingProfile ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{user?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{user?.address}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
