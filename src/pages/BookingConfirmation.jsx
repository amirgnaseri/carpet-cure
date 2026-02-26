import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function BookingConfirmation() {
  const location = useLocation();
  const booking = location.state?.booking;

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No booking found</h2>
          <Link 
            to="/book" 
            className="text-teal-600 hover:text-teal-700 font-semibold"
          >
            Create a new booking →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce-in">
            <svg 
              className="w-12 h-12 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="3" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Booking Confirmed! 🎉</h1>
          <p className="text-gray-600 text-lg">
            Your carpet cleaning has been scheduled
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Header with order number */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
            <p className="text-sm opacity-90 mb-1">Order Number</p>
            <p className="text-2xl font-bold tracking-wide">{booking.orderNumber}</p>
          </div>

          {/* Booking Details */}
          <div className="p-8 space-y-6">
            {/* Service Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Service Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Service Type</p>
                  <p className="font-semibold text-gray-800 capitalize">{booking.serviceType} Clean</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Carpet Size</p>
                  <p className="font-semibold text-gray-800 capitalize">{booking.carpetSize}</p>
                </div>
              </div>
            </div>

            {/* Carpet Info */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Carpet Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name / Room</p>
                  <p className="font-semibold text-gray-800">{booking.carpetName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Material</p>
                  <p className="font-semibold text-gray-800 capitalize">{booking.carpetMaterial}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Color</p>
                  <p className="font-semibold text-gray-800 capitalize">{booking.carpetColor}</p>
                </div>
              </div>
              
              {(booking.hasStains || booking.hasPetOdor || booking.hasHighTraffic) && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Special Treatments:</p>
                  <div className="flex flex-wrap gap-2">
                    {booking.hasStains && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        🎨 Stain Treatment
                      </span>
                    )}
                    {booking.hasPetOdor && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        🐾 Pet Odor Removal
                      </span>
                    )}
                    {booking.hasHighTraffic && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        👣 High Traffic Care
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Pickup Schedule
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(booking.pickupDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time Slot</p>
                  <p className="font-semibold text-gray-800">{booking.preferredTime}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Contact Information
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-800">{booking.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{booking.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-800">{booking.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pickup Address</p>
                  <p className="font-semibold text-gray-800">{booking.address}</p>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Additional Notes
                </h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{booking.notes}</p>
              </div>
            )}

            {/* Price */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xs text-gray-500 mt-1">Payment due at delivery</p>
                </div>
                <p className="text-4xl font-bold text-teal-600">${booking.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg text-blue-900 mb-4">📋 What Happens Next?</h3>
          <ol className="space-y-3 text-blue-800">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
              <div>
                <p className="font-semibold">Confirmation Email</p>
                <p className="text-sm text-blue-700">You'll receive an email confirmation shortly at {booking.email}</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
              <div>
                <p className="font-semibold">Pickup Day</p>
                <p className="text-sm text-blue-700">Our team will arrive during your scheduled time slot</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
              <div>
                <p className="font-semibold">Cleaning Process</p>
                <p className="text-sm text-blue-700">Your carpet will be professionally cleaned at our facility</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
              <div>
                <p className="font-semibold">Delivery</p>
                <p className="text-sm text-blue-700">Clean carpet returned to your address (typically 3-5 days)</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/dashboard" 
            className="flex-1 bg-teal-500 text-white text-center py-4 rounded-xl font-semibold hover:bg-teal-600 transition-colors shadow-lg"
          >
            View Dashboard
          </Link>
          <Link 
            to="/" 
            className="flex-1 bg-white text-gray-700 text-center py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-300"
          >
            Back to Home
          </Link>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-2">Need to make changes?</p>
          <a 
            href="https://wa.me/9613102536" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Contact us on WhatsApp
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
