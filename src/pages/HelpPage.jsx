import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function HelpPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      articles: [
        { title: "How to create your account", link: "#" },
        { title: "Choosing the right account type", link: "#" },
        { title: "Setting up your profile", link: "#" },
        { title: "Navigating the dashboard", link: "#" }
      ]
    },
    {
      title: "Booking Services",
      icon: "📅",
      articles: [
        { title: "How to search for services", link: "#" },
        { title: "Understanding service filters", link: "#" },
        { title: "Making a booking", link: "#" },
        { title: "Managing your bookings", link: "#" }
      ]
    },
    {
      title: "Payments & Billing",
      icon: "💳",
      articles: [
        { title: "Payment methods accepted", link: "#" },
        { title: "Understanding pricing", link: "#" },
        { title: "Refunds and cancellations", link: "#" },
        { title: "Billing history", link: "#" }
      ]
    },
    {
      title: "For Vendors",
      icon: "🏪",
      articles: [
        { title: "Setting up your vendor profile", link: "#" },
        { title: "Adding and managing services", link: "#" },
        { title: "Handling bookings", link: "#" },
        { title: "Managing your schedule", link: "#" }
      ]
    },
    {
      title: "Account & Security",
      icon: "🔒",
      articles: [
        { title: "Changing your password", link: "#" },
        { title: "Updating profile information", link: "#" },
        { title: "Privacy settings", link: "#" },
        { title: "Account security tips", link: "#" }
      ]
    },
    {
      title: "Troubleshooting",
      icon: "🔧",
      articles: [
        { title: "Common login issues", link: "#" },
        { title: "Booking problems", link: "#" },
        { title: "Payment issues", link: "#" },
        { title: "Technical support", link: "#" }
      ]
    }
  ];

  const quickActions = [
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: "📞",
      link: "/contact",
      color: "from-blue-400 to-blue-500"
    },
    {
      title: "Browse FAQ",
      description: "Find quick answers to common questions",
      icon: "❓",
      link: "/faq",
      color: "from-green-400 to-green-500"
    },
    {
      title: "Live Chat",
      description: "Chat with a support agent (24/7)",
      icon: "💬",
      link: "#",
      color: "from-purple-400 to-purple-500"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: "🎥",
      link: "#",
      color: "from-red-400 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-8 py-10">
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-4xl font-bold mb-2">Help Center</h1>
          <p className="text-gray-400 text-lg">Find answers and get the help you need</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors text-lg"
              />
              <button className="absolute right-3 top-3 bg-lime-400 hover:bg-lime-500 text-black px-4 py-2 rounded-lg font-medium transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-lime-400/50 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{action.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-lime-400 transition-colors">{action.title}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a
                        href={article.link}
                        className="text-gray-400 hover:text-lime-400 transition-colors text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {article.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-lime-400">How to Book Your First Service</h3>
              <p className="text-gray-400 text-sm mb-4">
                A step-by-step guide to making your first booking on CampusConnect, from searching to payment.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">5 min read</span>
                <span className="text-xs text-lime-400">Most viewed</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-lime-400">Understanding Service Ratings</h3>
              <p className="text-gray-400 text-sm mb-4">
                Learn how our rating system works and how to choose the best services for your needs.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">3 min read</span>
                <span className="text-xs text-blue-400">Editor's pick</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-lime-400/10 to-blue-400/10 border border-lime-400/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions or issues you might have.
            Don't hesitate to reach out - we're here to help you succeed on campus!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@campusconnect.edu"
              className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
