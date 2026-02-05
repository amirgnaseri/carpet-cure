import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookPickup = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg transform rotate-6"></div>
              <div className="relative bg-white p-3 rounded-lg shadow-xl">
                <Shield className="w-10 h-10 text-teal-500" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                <span className="text-teal-500">Carpet</span>
                <span className="text-navy-800"> Cure</span>
              </h1>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-4 text-center">Book a Pickup</h2>
          <p className="text-gray-600 text-center mb-8">
            This booking system will be available soon! For now, please call us directly.
          </p>

          <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-8 text-white text-center mb-6">
            <h3 className="text-2xl font-bold mb-4">Call to Book</h3>
            <a
              href="tel:+9613102536"
              className="inline-block bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-xl hover:bg-teal-50 transition"
            >
              +961 3 102 536
            </a>
            <p className="mt-4 text-teal-100">Available 7 days a week</p>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-600">or</p>
            <a
              href="https://wa.me/9613102536"
              className="inline-flex items-center space-x-2 bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition font-medium"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 text-gray-600 hover:text-teal-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-navy-900 mb-2">Coming Soon: Online Booking</h3>
          <p className="text-sm text-gray-600">
            We're building a complete online booking system where you can schedule pickups, track your carpet in real-time, and manage payments online. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookPickup;
