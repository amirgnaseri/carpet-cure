import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SecretaryManagement() {
  const navigate = useNavigate();
  const [secretaries, setSecretaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    permissions: {
      canViewOrders: true,
      canEditOrders: true,
      canUpdateStatus: true,
      canViewCustomers: true,
      canGenerateInvoices: true,
      canViewFinancials: false,
      canManageUsers: false,
    },
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    
    loadSecretaries();
  }, [navigate]);

  const loadSecretaries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/admin/secretaries', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSecretaries(data.secretaries || []);
      }
    } catch (error) {
      console.error('Error loading secretaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const url = editingId 
        ? `http://localhost:5001/api/admin/users/${editingId}/permissions`
        : 'http://localhost:5001/api/admin/users/secretary';
      
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId 
        ? JSON.stringify({ permissions: formData.permissions })
        : JSON.stringify(formData);

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save secretary');
      }

      alert(editingId ? 'Permissions updated successfully!' : 'Secretary created successfully!');
      setShowAddForm(false);
      setEditingId(null);
      resetForm();
      loadSecretaries();
      
    } catch (error) {
      console.error('Error saving secretary:', error);
      alert(error.message);
    }
  };

  const handleEditPermissions = (secretary) => {
    setEditingId(secretary._id);
    setFormData({
      ...formData,
      permissions: secretary.permissions,
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      permissions: {
        canViewOrders: true,
        canEditOrders: true,
        canUpdateStatus: true,
        canViewCustomers: true,
        canGenerateInvoices: true,
        canViewFinancials: false,
        canManageUsers: false,
      },
    });
  };

  const togglePermission = (permission) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [permission]: !formData.permissions[permission],
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Secretary Management</h1>
              <p className="text-gray-600 mt-1">Manage staff and permissions</p>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Add Secretary Button */}
        {!showAddForm && (
          <div className="mb-6">
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingId(null);
                resetForm();
              }}
              className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-lg"
            >
              + Add New Secretary
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? 'Edit Permissions' : 'Add New Secretary'}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!editingId && (
                <>
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="john@carpetcure.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="+961 3 XXX XXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Full address"
                    />
                  </div>
                </>
              )}

              {/* Permissions */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Permissions</h3>
                <div className="space-y-3">
                  {[
                    { id: 'canViewOrders', label: 'View Orders', desc: 'Can see all orders' },
                    { id: 'canEditOrders', label: 'Edit Orders', desc: 'Can modify order details' },
                    { id: 'canUpdateStatus', label: 'Update Order Status', desc: 'Can change order status' },
                    { id: 'canViewCustomers', label: 'View Customers', desc: 'Can see customer information' },
                    { id: 'canGenerateInvoices', label: 'Generate Invoices', desc: 'Can create and download invoices' },
                    { id: 'canViewFinancials', label: 'View Financials', desc: 'Can see revenue and payments' },
                    { id: 'canManageUsers', label: 'Manage Users', desc: 'Can add/edit other secretaries' },
                  ].map((permission) => (
                    <label
                      key={permission.id}
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.permissions[permission.id]
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{permission.label}</p>
                        <p className="text-sm text-gray-600">{permission.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.permissions[permission.id]}
                        onChange={() => togglePermission(permission.id)}
                        className="w-5 h-5 text-teal-500 rounded focus:ring-teal-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                >
                  {editingId ? 'Update Permissions' : 'Create Secretary Account'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Secretaries List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Staff Members</h2>
          </div>

          {secretaries.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Secretaries Yet</h3>
              <p className="text-gray-600">Add your first secretary to help manage orders</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Permissions</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {secretaries.map((secretary) => (
                    <tr key={secretary._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{secretary.name}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{secretary.email}</td>
                      <td className="px-6 py-4 text-gray-600">{secretary.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(secretary.permissions || {}).filter(([_, value]) => value).length > 0 ? (
                            Object.entries(secretary.permissions || {})
                              .filter(([_, value]) => value)
                              .slice(0, 3)
                              .map(([key]) => (
                                <span key={key} className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                                  {key.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                              ))
                          ) : (
                            <span className="text-sm text-gray-500">No permissions</span>
                          )}
                          {Object.entries(secretary.permissions || {}).filter(([_, value]) => value).length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                              +{Object.entries(secretary.permissions || {}).filter(([_, value]) => value).length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEditPermissions(secretary)}
                          className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
                        >
                          Edit Permissions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
