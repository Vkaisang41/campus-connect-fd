import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">How we protect and handle your data</p>
        </div>

        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-8 space-y-8">
          <div>
            <p className="text-gray-400 text-sm mb-8">Last updated: January 2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">1. Information We Collect</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Create an account (name, email, phone number)</li>
                    <li>Book services (service preferences, booking history)</li>
                    <li>Contact us (messages, feedback, support requests)</li>
                    <li>Use our platform (usage data, device information)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">2. How We Use Your Information</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and improve our services</li>
                    <li>Process your bookings and payments</li>
                    <li>Send you important updates and notifications</li>
                    <li>Respond to your questions and support requests</li>
                    <li>Analyze usage patterns to improve our platform</li>
                    <li>Ensure platform security and prevent fraud</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">3. Information Sharing</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With service providers to fulfill your bookings</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and prevent fraud</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">4. Data Security</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We implement appropriate security measures to protect your personal information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal information</li>
                    <li>Secure payment processing</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">5. Your Rights</h2>
                <div className="space-y-4 text-gray-300">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and review your personal information</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt out of marketing communications</li>
                    <li>Data portability</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">6. Cookies and Tracking</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We use cookies and similar technologies to enhance your experience:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Essential cookies for platform functionality</li>
                    <li>Analytics cookies to improve our services</li>
                    <li>Preference cookies to remember your settings</li>
                  </ul>
                  <p className="mt-4">You can control cookie preferences through your browser settings.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">7. Data Retention</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We retain your personal information for as long as necessary to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide our services</li>
                    <li>Comply with legal obligations</li>
                    <li>Resolve disputes</li>
                    <li>Enforce our agreements</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">8. International Data Transfers</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">9. Children's Privacy</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Our services are intended for users 18 years and older. We do not knowingly collect personal information from children under 18.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">10. Changes to This Policy</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-lime-400">11. Contact Us</h2>
                <div className="space-y-4 text-gray-300">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
                  <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4">
                    <p><strong>Email:</strong> privacy@campusconnect.edu</p>
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