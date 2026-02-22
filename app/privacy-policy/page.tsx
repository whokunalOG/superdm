export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-200">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Overview</h2>
            <p>
              This Privacy Policy describes how SuperDM ("we", "us", "our") collects, uses, and
              protects information when you use our website, application, and connected services
              (collectively, the "Service").
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
            <p>
              We may collect information you provide directly (such as your email address), and
              information generated through your use of the Service (such as automation settings).
            </p>
            <p>
              If you connect an Instagram/Meta account, we may store account identifiers and access
              tokens required to provide the Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">How We Use Information</h2>
            <p>We use information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide, operate, and maintain the Service.</li>
              <li>Authenticate users and secure access to accounts.</li>
              <li>Configure and execute automations you create.</li>
              <li>Communicate with you about updates and support.</li>
              <li>Comply with legal obligations and enforce our terms.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">AI / Automation Features</h2>
            <p>
              Some features may use automation and/or AI-assisted functionality to help generate or
              send messages based on the rules you set. You are responsible for the content you
              configure and for ensuring your use complies with applicable laws and platform
              policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Data Retention</h2>
            <p>
              We retain information only as long as necessary to provide the Service and for
              legitimate business purposes, unless a longer retention period is required by law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Security</h2>
            <p>
              We implement reasonable administrative, technical, and organizational safeguards to
              protect information. However, no method of transmission or storage is 100% secure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, export, or delete
              your personal data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Contact</h2>
            <p>
              To ask questions or request deletion of your data, contact us at: <span className="font-semibold">support@yourdomain.com</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
