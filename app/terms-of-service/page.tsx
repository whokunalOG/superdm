export default function TermsOfServicePage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-200">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Agreement</h2>
            <p>
              By accessing or using SuperDM (the "Service"), you agree to these Terms of Service
              ("Terms"). If you do not agree, do not use the Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Eligibility</h2>
            <p>
              You must be at least the minimum age required in your jurisdiction and capable of
              forming a binding contract to use the Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Account Connections (Meta / Instagram)</h2>
            <p>
              If you connect a Meta/Instagram account, you authorize us to access and process
              information needed to provide the Service. You are responsible for maintaining
              appropriate permissions and complying with Meta platform policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the Service for unlawful, harmful, or deceptive activity.</li>
              <li>Send spam, harassing messages, or violate platform/community guidelines.</li>
              <li>Attempt to bypass security, rate limits, or access controls.</li>
              <li>Reverse engineer or disrupt the Service.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">User Content</h2>
            <p>
              You are responsible for the automation rules and message content you create and send
              via the Service. You represent that you have the necessary rights to use such content.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Disclaimers</h2>
            <p>
              The Service is provided on an "as is" and "as available" basis. We do not guarantee
              uninterrupted availability or that automations will achieve particular results.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SuperDM will not be liable for indirect,
              incidental, special, consequential, or punitive damages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Termination</h2>
            <p>
              We may suspend or terminate access to the Service at any time if we reasonably believe
              you have violated these Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Contact</h2>
            <p>
              Questions about these Terms can be sent to: <span className="font-semibold">support@yourdomain.com</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
