import { Link } from "react-router-dom";

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-400 text-lg">Rules and guidelines for using CampusConnect</p>
        </div>

        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-8 space-y-8">
          <div>
            <p className="text-gray-400 text-sm mb-8">Last updated: January 2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">1. Acceptance of Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <p>By accessing and using CampusConnect, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">2. Description of Service</h2>
                <div className="space-y-4 text-gray-300">
                  <p>CampusConnect is a platform that connects students with campus service providers. Our services include:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Service discovery and booking</li>
                    <li>Payment processing</li>
                    <li>Communication between students and vendors</li>
                    <li>Review and rating system</li>
                    <li>Account management</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">3. User Accounts</h2>
                <div className="space-y-4 text-gray-300">
                  <h3 className="text-lg font-medium text-white mb-2">3.1 Account Creation</h3>
                  <p>To use our services, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.</p>

                  <h3 className="text-lg font-medium text-white mb-2">3.2 Account Types</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Students:</strong> Can browse, book, and review services</li>
                    <li><strong>Vendors:</strong> Can list services and manage bookings</li>
                    <li><strong>Administrators:</strong> Can manage platform content and users</li>
                  </ul>

                  <h3 className="text-lg font-medium text-white mb-2">3.3 Account Termination</h3>
                  <p>We reserve the right to terminate accounts that violate these terms or engage in harmful behavior.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">4. User Conduct</h2>
                <div className="space-y-4 text-gray-300">
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use the service for any unlawful purpose</li>
                    <li>Post false, misleading, or harmful content</li>
                    <li>Harass, threaten, or abuse other users</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with the proper functioning of the platform</li>
                    <li>Violate intellectual property rights</li>
                    <li>Share account credentials with others</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">5. Service Bookings</h2>
                <div className="space-y-4 text-gray-300">
                  <h3 className="text-lg font-medium text-white mb-2">5.1 Booking Process</h3>
                  <p>All bookings are subject to vendor availability and confirmation. Prices and availability may change without notice.</p>

                  <h3 className="text-lg font-medium text-white mb-2">5.2 Payment Terms</h3>
                  <p>Payment is required at the time of booking. All payments are processed securely through our payment partners.</p>

                  <h3 className="text-lg font-medium text-white mb-2">5.3 Cancellations</h3>
                  <p>Cancellation policies vary by service provider. Please review individual service terms before booking.</p>

                  <h3 className="text-lg font-medium text-white mb-2">5.4 Refunds</h3>
                  <p>Refunds are processed according to the vendor's cancellation policy and our refund guidelines.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">6. Vendor Responsibilities</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Vendors agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate service descriptions and pricing</li>
                    <li>Deliver services as advertised</li>
                    <li>Maintain professional standards</li>
                    <li>Respond promptly to booking requests</li>
                    <li>Handle customer service issues appropriately</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">7. Content and Reviews</h2>
                <div className="space-y-4 text-gray-300">
                  <h3 className="text-lg font-medium text-white mb-2">7.1 User Content</h3>
                  <p>You retain ownership of content you submit, but grant us a license to use it for platform purposes.</p>

                  <h3 className="text-lg font-medium text-white mb-2">7.2 Reviews and Ratings</h3>
                  <p>Reviews should be honest and based on actual experiences. False or malicious reviews may result in account suspension.</p>

                  <h3 className="text-lg font-medium text-white mb-2">7.3 Content Moderation</h3>
                  <p>We reserve the right to remove content that violates these terms or is harmful to our community.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">8. Privacy and Data Protection</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Your privacy is important to us. Please review our Privacy Policy for details on how we collect, use, and protect your information.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">9. Intellectual Property</h2>
                <div className="space-y-4 text-gray-300">
                  <p>The CampusConnect platform and its original content are protected by copyright and other intellectual property laws. Our trademarks and trade dress may not be used without permission.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">10. Disclaimers</h2>
                <div className="space-y-4 text-gray-300">
                  <h3 className="text-lg font-medium text-white mb-2">10.1 Service Quality</h3>
                  <p>We strive to provide high-quality services but cannot guarantee the performance of individual vendors.</p>

                  <h3 className="text-lg font-medium text-white mb-2">10.2 Availability</h3>
                  <p>While we aim for high availability, we do not guarantee uninterrupted access to our platform.</p>

                  <h3 className="text-lg font-medium text-white mb-2">10.3 Third-Party Services</h3>
                  <p>We are not responsible for the actions or services provided by third-party vendors.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">11. Limitation of Liability</h2>
                <div className="space-y-4 text-gray-300">
                  <p>CampusConnect shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">12. Indemnification</h2>
                <div className="space-y-4 text-gray-300">
                  <p>You agree to indemnify and hold harmless CampusConnect from any claims arising from your violation of these terms or misuse of the platform.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">13. Termination</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Either party may terminate this agreement at any time. Upon termination, your right to use the service ceases immediately.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">14. Governing Law</h2>
                <div className="space-y-4 text-gray-300">
                  <p>These terms are governed by the laws of the jurisdiction in which CampusConnect operates, without regard to conflict of law principles.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">15. Changes to Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We reserve the right to modify these terms at any time. Material changes will be communicated to users via email or platform notifications.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">16. Contact Information</h2>
                <div className="space-y-4 text-gray-300">
                  <p>If you have questions about these Terms of Service, please contact us:</p>
                  <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4">
                    <p><strong>Email:</strong> legal@campusconnect.edu</p>
                    <p><strong>Phone:</strong> +254714522628</p>
                    <p><strong>Address:</strong> Student Center, Room 204, University Campus</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}