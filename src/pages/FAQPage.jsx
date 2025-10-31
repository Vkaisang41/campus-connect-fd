import { Link } from "react-router-dom";
import { useState } from "react";

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I create an account on CampusConnect?",
      answer: "Click the 'Get Started' button on our homepage, choose your account type (Student, Vendor, or Admin), and fill in your details. You'll receive a confirmation email to verify your account."
    },
    {
      question: "What types of services can I find on CampusConnect?",
      answer: "We offer a wide range of campus services including laundry, printing, tutoring, food delivery, bike rentals, tech support, academic services, creative services, and automotive services."
    },
    {
      question: "How do I book a service?",
      answer: "Browse services using our search and filter options, select the service you need, choose your preferred time slot, and complete the booking. You'll receive instant confirmation."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, debit cards, PayPal, and campus payment systems. All payments are processed securely through our certified payment partners."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify bookings through your dashboard. Cancellation policies vary by service provider - please check the specific terms when booking."
    },
    {
      question: "How do I become a service vendor on CampusConnect?",
      answer: "Sign up as a vendor, complete your profile with service details, pricing, and availability. Our admin team will review and approve your listing within 24-48 hours."
    },
    {
      question: "What if I have an issue with a service I booked?",
      answer: "Contact the vendor directly through the platform messaging system, or use the 'Report Issue' button on the service page. Our support team is also available 24/7."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use enterprise-grade encryption and security measures. We never share your personal information with third parties without your consent."
    },
    {
      question: "How do I leave a review for a service?",
      answer: "After your service is completed, you'll receive a notification to rate and review your experience. Honest reviews help other students make informed decisions."
    },
    {
      question: "What if I forget my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a secure link to reset your password."
    },
    {
      question: "Are there any fees for using CampusConnect?",
      answer: "Basic account creation and service browsing is free. Some premium features may have associated costs, which will be clearly displayed."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us through the Contact page, email support@campusconnect.edu, or call our support line at +254714522628."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-8 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-lg">Find answers to common questions about CampusConnect</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors"
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#1a1a1a] transition-colors"
              >
                <h3 className="text-lg font-medium text-white pr-4">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-lime-400 transform transition-transform flex-shrink-0 ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openFAQ === index && (
                <div className="px-6 pb-4 border-t border-gray-700">
                  <p className="text-gray-300 leading-relaxed pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-lime-400/10 to-blue-400/10 border border-lime-400/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@campusconnect.edu"
              className="px-6 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/services" className="text-center p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors">
              <div className="text-lime-400 text-2xl mb-2">🔍</div>
              <div className="text-sm font-medium text-white">Browse Services</div>
            </Link>
            <Link to="/about" className="text-center p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors">
              <div className="text-lime-400 text-2xl mb-2">ℹ️</div>
              <div className="text-sm font-medium text-white">About Us</div>
            </Link>
            <Link to="/contact" className="text-center p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors">
              <div className="text-lime-400 text-2xl mb-2">📞</div>
              <div className="text-sm font-medium text-white">Contact</div>
            </Link>
            <Link to="/signup" className="text-center p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors">
              <div className="text-lime-400 text-2xl mb-2">🚀</div>
              <div className="text-sm font-medium text-white">Get Started</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}