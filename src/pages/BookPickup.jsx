import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookPickup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [carpets, setCarpets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Select Carpet
    carpetId: '',
    
    // Step 2: Service Selection
    serviceType: '',
    hasStains: false,
    hasPetOdor: false,
    hasHighTraffic: false,
    
    // Step 3: Schedule
    pickupDate: '',
    preferredTime: '',
    notes: '',
  });
  
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [selectedCarpet, setSelectedCarpet] = useState(null);

  // Check authentication and load user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      // Not logged in - redirect to login
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Load user's carpets
    loadCarpets(token);
  }, [navigate]);

  const loadCarpets = async (token) => {
    try {
      const response = await fetch('http://localhost:5001/api/carpets', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCarpets(data.carpets || []);
      } else {
        console.error('Failed to load carpets:', data.message);
      }
    } catch (error) {
      console.error('Error loading carpets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Price calculation
  useEffect(() => {
    calculatePrice();
  }, [formData.serviceType, selectedCarpet, formData.hasStains, formData.hasPetOdor, formData.hasHighTraffic]);

  const calculatePrice = () => {
    if (!formData.serviceType || !selectedCarpet) {
      setCalculatedPrice(0);
      return;
    }
    
    let basePrice = 0;
    
    // Base price by service type and carpet size
    const servicePrices = {
      basic: { small: 50, medium: 80, large: 120, 'x-large': 180 },
      deep: { small: 90, medium: 140, large: 200, 'x-large': 280 },
      premium: { small: 150, medium: 220, large: 320, 'x-large': 450 },
    };
    
    const carpetSize = selectedCarpet.size || 'medium';
    basePrice = servicePrices[formData.serviceType]?.[carpetSize] || 0;
    
    // Add-ons
    if (formData.hasStains) basePrice += 30;
    if (formData.hasPetOdor) basePrice += 40;
    if (formData.hasHighTraffic) basePrice += 20;
    
    setCalculatedPrice(basePrice);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // If carpet is selected, find and store the full carpet object
    if (field === 'carpetId') {
      const carpet = carpets.find(c => c._id === value);
      setSelectedCarpet(carpet);
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return formData.carpetId;
      case 2:
        return formData.serviceType;
      case 3:
        return formData.pickupDate && formData.preferredTime;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      // Generate order number
      const orderNumber = `CC${Date.now()}`;
      
      // Collect add-ons
      const addOns = [];
      if (formData.hasStains) addOns.push('stain-removal');
      if (formData.hasPetOdor) addOns.push('pet-odor-treatment');
      if (formData.hasHighTraffic) addOns.push('high-traffic-protection');
      
      const orderData = {
        orderNumber: orderNumber,
        client: user._id || user.id,
        carpet: formData.carpetId,
        serviceType: formData.serviceType,
        initialPrice: calculatedPrice,
        pickupDate: formData.pickupDate,
        pickupTime: formData.preferredTime, // Now sends 'morning', 'afternoon', or 'evening'
        location: {
          address: user.address || '',
          notes: formData.notes || '',
        },
        addOns: addOns,
        status: 'pending',
        paymentStatus: 'pending',
      };

      console.log('Sending order data:', orderData);

      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking');
      }

      // Navigate to confirmation with order details
      navigate('/booking-confirmation', { 
        state: { 
          booking: {
            ...formData,
            carpet: selectedCarpet,
            user: user,
            price: calculatedPrice,
            orderNumber: data.order?.orderNumber || orderNumber,
            orderId: data.order?._id,
          }
        } 
      });
      
    } catch (error) {
      console.error('Booking error:', error);
      alert(error.message || 'Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading your carpets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-navy-600">Book Cleaning</h1>
              <p className="text-sm text-gray-600 mt-1">
                Hello, <span className="font-semibold text-teal-600">{user?.name}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Estimated Price</p>
              <p className="text-3xl font-bold text-teal-500">
                ${calculatedPrice}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-teal-500 -translate-y-1/2 -z-10 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= num 
                      ? 'bg-teal-500 text-white shadow-lg' 
                      : 'bg-white text-gray-400 border-2 border-gray-300'
                  }`}
                >
                  {num}
                </div>
                <p className={`text-xs mt-2 font-medium ${step >= num ? 'text-teal-600' : 'text-gray-400'}`}>
                  {['Select Carpet', 'Service', 'Schedule'][num - 1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit}>
          
          {/* Step 1: Select Carpet */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Carpet</h2>
              <p className="text-gray-600 mb-8">Choose which carpet you'd like to clean</p>
              
              {carpets.length === 0 ? (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Carpets Added Yet</h3>
                  <p className="text-gray-600 mb-6">
                    You need to add a carpet to your account before booking a cleaning service.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard?tab=carpets')}
                    className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                  >
                    Add a Carpet
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {carpets.map((carpet) => (
                    <button
                      key={carpet._id}
                      type="button"
                      onClick={() => handleChange('carpetId', carpet._id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                        formData.carpetId === carpet._id
                          ? 'border-teal-500 bg-teal-50 shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-teal-300 hover:shadow-md bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{carpet.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">
                            {carpet.size} • {carpet.material}
                          </p>
                        </div>
                        {formData.carpetId === carpet._id && (
                          <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium">Color:</span>
                          <span className="ml-2 capitalize">{carpet.color}</span>
                        </div>
                        {carpet.status && (
                          <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium capitalize">
                            {carpet.status}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {carpets.length > 0 && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard?tab=carpets')}
                    className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
                  >
                    + Add another carpet
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Service Selection */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Service</h2>
              <p className="text-gray-600 mb-8">
                Cleaning: <span className="font-semibold text-teal-600">{selectedCarpet?.name}</span>
              </p>
              
              {/* Service Type */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Service Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'basic', name: 'Basic Clean', desc: 'Standard vacuum & spot clean', icon: '🧹' },
                    { id: 'deep', name: 'Deep Clean', desc: 'Hot water extraction', icon: '💧' },
                    { id: 'premium', name: 'Premium', desc: 'Steam + stain protection', icon: '⭐' },
                  ].map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleChange('serviceType', service.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                        formData.serviceType === service.id
                          ? 'border-teal-500 bg-teal-50 shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-teal-300 hover:shadow-md bg-white'
                      }`}
                    >
                      <div className="text-4xl mb-2">{service.icon}</div>
                      <h3 className="font-bold text-lg text-gray-800">{service.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Special Concerns (affects pricing)
                </label>
                <div className="space-y-3">
                  {[
                    { id: 'hasStains', label: 'Tough Stains', desc: '+$30', icon: '🎨' },
                    { id: 'hasPetOdor', label: 'Pet Odor Treatment', desc: '+$40', icon: '🐾' },
                    { id: 'hasHighTraffic', label: 'High Traffic Area', desc: '+$20', icon: '👣' },
                  ].map((addon) => (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData[addon.id]
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{addon.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-800">{addon.label}</p>
                          <p className="text-sm text-gray-600">{addon.desc}</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData[addon.id]}
                        onChange={(e) => handleChange(addon.id, e.target.checked)}
                        className="w-5 h-5 text-teal-500 rounded focus:ring-teal-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule Pickup</h2>
              <p className="text-gray-600 mb-8">When should we come pick up your carpet?</p>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                {/* Pickup Address Display */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">📍 Pickup Address</p>
                  <p className="text-blue-800">{user?.address}</p>
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard?tab=profile')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
                  >
                    Update address in profile →
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleChange('pickupDate', e.target.value)}
                    min={getMinDate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'morning', label: 'Morning', time: '8AM - 12PM', icon: '🌅' },
                      { value: 'afternoon', label: 'Afternoon', time: '12PM - 5PM', icon: '☀️' },
                      { value: 'evening', label: 'Evening', time: '5PM - 8PM', icon: '🌆' },
                    ].map((slot) => (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => handleChange('preferredTime', slot.value)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.preferredTime === slot.value
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{slot.icon}</div>
                        <div className="font-bold text-gray-800">{slot.label}</div>
                        <div className="text-sm text-gray-600">{slot.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Any special instructions or concerns?"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 border-2 border-teal-200">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carpet:</span>
                      <span className="font-semibold text-gray-800">{selectedCarpet?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold text-gray-800 capitalize">{formData.serviceType} Clean</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-semibold text-gray-800 capitalize">{selectedCarpet?.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold text-gray-800">{formData.pickupDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold text-gray-800">{formData.preferredTime}</span>
                    </div>
                    <div className="border-t border-teal-300 pt-3 mt-3 flex justify-between">
                      <span className="text-gray-800 font-bold">Total Price:</span>
                      <span className="text-2xl font-bold text-teal-600">${calculatedPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
            )}
            
            <div className="ml-auto">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!validateStep(step)}
                  className="px-8 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting || !validateStep(step)}
                  className="px-8 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Booking ✓
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}