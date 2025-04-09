export const metadata = {
  title: "Privacy Policy | Saree Elegance",
  description: "Learn about how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium">Privacy Policy</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Last updated: November 15, 2023</p>
      </div>

      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <p>
          At Saree Elegance, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our website or make a purchase.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect information that you provide directly to us when you:</p>
        <ul>
          <li>Create an account</li>
          <li>Make a purchase</li>
          <li>Sign up for our newsletter</li>
          <li>Contact our customer service</li>
          <li>Participate in surveys or promotions</li>
        </ul>

        <p>The types of information we may collect include:</p>
        <ul>
          <li>Personal information (name, email address, phone number, shipping address)</li>
          <li>Payment information (credit card details, billing address)</li>
          <li>Order history and preferences</li>
          <li>Communications with our customer service team</li>
        </ul>

        <p>We also automatically collect certain information when you visit our website, including:</p>
        <ul>
          <li>IP address and device information</li>
          <li>Browser type and version</li>
          <li>Pages you view and how you interact with our website</li>
          <li>Referring website or source</li>
          <li>Cookies and similar technologies</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders, account, and our services</li>
          <li>Provide customer support</li>
          <li>Send you marketing communications (if you've opted in)</li>
          <li>Improve our website and services</li>
          <li>Detect and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Sharing Your Information</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>Service providers who help us operate our business (payment processors, shipping companies, etc.)</li>
          <li>Marketing partners (with your consent)</li>
          <li>Legal authorities when required by law</li>
          <li>Business partners in the event of a merger, acquisition, or sale of assets</li>
        </ul>

        <p>We do not sell your personal information to third parties.</p>

        <h2>Your Rights and Choices</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li>Access to your personal information</li>
          <li>Correction of inaccurate information</li>
          <li>Deletion of your information</li>
          <li>Objection to certain processing activities</li>
          <li>Data portability</li>
          <li>Withdrawal of consent</li>
        </ul>

        <p>To exercise these rights, please contact us at privacy@sareeelegance.com.</p>

        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to collect information about your browsing activities. You
          can manage your cookie preferences through your browser settings.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against
          unauthorized access, loss, or alteration. However, no method of transmission over the Internet or electronic
          storage is 100% secure, so we cannot guarantee absolute security.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our website is not intended for children under 13 years of age. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2>International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. These
          countries may have different data protection laws.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last
          Updated" date.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>
          Email: privacy@sareeelegance.com
          <br />
          Phone: +91 98765 43210
          <br />
          Address: 123 Silk Road, Fashion Street, Bangalore, Karnataka 560001, India
        </p>
      </div>
    </div>
  )
}

