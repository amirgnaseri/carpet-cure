import React, { useState } from 'react';
import { Shield, Check, ArrowRight, Phone, Sparkles, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [selectedSize, setSelectedSize] = useState('medium');

  const sizes = [
    { id: 'small', name: 'Small', dimension: 'Up 1x2m', multiplier: 1 },
    { id: 'medium', name: 'Medium', dimension: '2.5x3m ', multiplier: 1.5 },
    { id: 'large', name: 'Large', dimension: '3x4m to 4x5m', multiplier: 2 },
    { id: 'xlarge', name: 'Extra Large', dimension: 'Above 4x5m', multiplier: 2.5 }
  ];

  const packages = [
    {
      name: 'Basic Clean',
      icon: <Sparkles className="w-8 h-8" />,
      basePrice: 5,
      currency: 'USD',
      description: 'Perfect for regular maintenance',
      features: [
        'Vacuum cleaning',
        'Surface stain treatment',
        'Deodorizing',
        'Free pickup & delivery',
        '24-48 hour turnaround',
        'Basic quality check'
      ],
      color: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      name: 'Deep Clean',
      icon: <Star className="w-8 h-8" />,
      basePrice: 10,
      currency: 'USD',
      description: 'Our most popular service',
      features: [
        'Everything in Basic Clean',
        'Deep steam cleaning',
        'Stain removal treatment',
        'Anti-bacterial treatment',
        'Fabric protection spray',
        'Same-day pickup available',
        '48-hour turnaround',
        'Premium quality check',
        'Before & after photos'
      ],
      color: 'from-teal-500 to-teal-600',
      popular: true
    },
    {
      name: 'Premium Care',
      icon: <Shield className="w-8 h-8" />,
      basePrice: 15,
      currency: 'USD',
      description: 'Complete carpet restoration',
      features: [
        'Everything in Deep Clean',
        'Hand washing for delicate carpets',
        'Persian/Oriental rug expertise',
        'Color restoration',
        'Fringe cleaning & repair',
        'Moth & pest treatment',
        'Long-lasting protection coating',
        'Express 24-hour service',
        'White glove service',
        '6-month warranty'
      ],
      color: 'from-navy-700 to-navy-800',
      popular: false
    }
  ];

  const addOns = [
    { name: 'Pet Odor Removal', price: 1 },
    { name: 'Scotchgard Protection', price: 2 },
    { name: 'Express Service (12hr)', price: 2 },
    { name: 'Pickup Same Day', price: 5 }
  ];

  const calculatePrice = (basePrice) => {
    const size = sizes.find(s => s.id === selectedSize);
    return Math.round(basePrice * size.multiplier);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
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
                <p className="text-xs text-gray-500 tracking-wide">CARPET CLEANING</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 transition">Home</Link>
              <Link to="/pricing" className="text-teal-600 font-medium">Pricing</Link>
              <Link to="/login" className="text-gray-700 hover:text-teal-600 transition">Login</Link>
              <a href="tel:+9613102536" className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition font-medium">
                Call Now
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a2332] via-[#2f3e54] to-[#0d9490] text-white py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Professional carpet cleaning services at honest prices. No hidden fees.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-teal-400" />
              <span>Free Pickup & Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-teal-400" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-teal-400" />
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Size Selector */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Select Your Carpet Size</h2>
            <p className="text-gray-600">Prices adjust automatically based on your carpet size</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedSize === size.id
                    ? 'border-teal-500 bg-teal-50 shadow-lg'
                    : 'border-gray-200 hover:border-teal-300'
                }`}
              >
                <div className="text-center">
                  <h3 className="font-bold text-lg text-navy-900 mb-1">{size.name}</h3>
                  <p className="text-sm text-gray-600">{size.dimension}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                  pkg.popular ? 'ring-4 ring-teal-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-bl-2xl font-medium">
                    Most Popular
                  </div>
                )}

                <div className={`bg-gradient-to-br ${pkg.color} text-white p-8`}>
                  <div className="mb-4">{pkg.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-white/80 mb-4">{pkg.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">
                      {calculatePrice(pkg.basePrice).toLocaleString()}
                    </span>
                    <span className="ml-2 text-white/80">USD</span>
                  </div>
                  <p className="text-sm text-white/70 mt-2">
                    for {sizes.find(s => s.id === selectedSize)?.name.toLowerCase()} carpets
                  </p>
                </div>

                <div className="p-8">
                  <ul className="space-y-4">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="tel:+9613102536"
                    className={`mt-8 w-full py-4 px-6 rounded-lg font-medium transition flex items-center justify-center space-x-2 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Optional Add-Ons</h2>
            <p className="text-xl text-gray-600">Enhance your cleaning service</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-teal-600" />
                  </div>
                  <span className="font-medium text-navy-900">{addon.name}</span>
                </div>
                <span className="text-lg font-bold text-teal-600">
                  +{addon.price.toLocaleString()} USD
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
            Pricing FAQs
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-navy-900 mb-2">Do prices include pickup and delivery?</h3>
              <p className="text-gray-600">Yes! All our packages include free pickup and delivery within Baabda and surrounding areas. Extended areas may have a small delivery fee.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-navy-900 mb-2">How do you measure carpet size?</h3>
              <p className="text-gray-600">We measure the total area in square meters. When you book, we'll confirm the exact size during pickup and adjust the price if needed.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-navy-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept cash on delivery and Whish Money digital payments. Payment is due when your clean carpet is delivered.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-navy-900 mb-2">Are there any hidden fees?</h3>
              <p className="text-gray-600">No hidden fees! The price you see is the price you pay. The only additional costs would be optional add-ons you choose.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-navy-900 mb-2">Do you offer discounts for multiple carpets?</h3>
              <p className="text-gray-600">Yes! Contact us for bulk pricing if you have 3 or more carpets. We offer special rates for regular customers too.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1a2332] via-[#2f3e54] to-[#0d9490] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your carpet cleaning today and experience the Carpet Cure difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+9613102536"
              className="inline-flex items-center space-x-2 bg-teal-500 text-white px-10 py-5 rounded-full hover:bg-teal-600 transition font-medium text-lg shadow-xl"
            >
              <Phone className="w-5 h-5" />
              <span>Call +961 3 102 536</span>
            </a>
            <a
              href="https://wa.me/9613102536"
              className="inline-flex items-center space-x-2 bg-green-500 text-white px-10 py-5 rounded-full hover:bg-green-600 transition font-medium text-lg shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1a2332] to-[#0f1419] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Carpet Cure. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/9613102536"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default Pricing;
