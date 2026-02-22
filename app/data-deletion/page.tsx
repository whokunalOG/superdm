export default function DataDeletionPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Data Deletion Instructions</h1>
        <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-200">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">How to Request Deletion</h2>
            <p>
              If you want SuperDM to delete data associated with your account or your connected
              Meta/Instagram account, you can request deletion using the steps below.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Option 1: Email Request</h2>
            <p>
              Send an email to <span className="font-semibold">support@yourdomain.com</span> with the subject line
              <span className="font-semibold"> "Data Deletion Request"</span>.
            </p>
            <p>Please include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your account email (if applicable).</li>
              <li>Your Instagram username and/or Instagram User ID.</li>
              <li>A description of what you want deleted (account, automations, tokens, logs).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">What We Delete</h2>
            <p>
              Upon verification of your request, we will delete or de-identify data such as:
              automation settings, stored access tokens, and identifiers used to operate the Service.
              We may retain limited data as required by law or for security and fraud prevention.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Timeline</h2>
            <p>
              We aim to complete deletion requests within a reasonable timeframe, typically within
              30 days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Contact</h2>
            <p>
              If you have questions, contact: <span className="font-semibold">support@yourdomain.com</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
