import React from 'react';

const Privacy = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-[#F9F9F9] px-6 py-12 font-sans">
      <div className="max-w-4xl mx-auto bg-[#1A1A1A] p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#FF6F3C] mb-6">Privacy Policy</h1>

        <p className="mb-6 text-sm text-[#CCCCCC]">
          Effective Date: <span className="font-medium">June 19, 2025</span>
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">1. Overview</h2>
          <p className="text-[#F9F9F9] text-sm">
            SynqTransfer is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when using our file-sharing services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">2. What We Collect</h2>
          <ul className="list-disc pl-5 text-sm text-[#F9F9F9] space-y-1">
            <li>Uploaded files (temporarily stored).</li>
            <li>Sender and recipient email addresses (only if email delivery is chosen).</li>
            <li>Optional titles and messages you include with a file.</li>
            <li>Metadata such as upload time and IP address for abuse prevention.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">3. File Retention & Deletion</h2>
          <p className="text-sm text-[#F9F9F9]">
            All uploaded files are automatically deleted <strong>24 hours</strong> after upload. We do not retain any files beyond this period, and they are irreversibly removed from our systems.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">4. Encryption & Security</h2>
          <p className="text-sm text-[#F9F9F9]">
            Your files are protected with <strong>end-to-end encryption</strong> in transit. We use industry-standard SSL/TLS protocols to prevent unauthorized access during file transfers.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">5. Data Usage</h2>
          <p className="text-sm text-[#F9F9F9]">
            We do not access, view, or analyze the contents of your files. Your personal data is never shared, sold, or used for advertising purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">6. Your Rights</h2>
          <p className="text-sm text-[#F9F9F9]">
            You have the right to contact us for questions, concerns, or requests related to your personal data or file uploads. We're here to ensure your peace of mind.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">7. Contact Us</h2>
          <p className="text-sm text-[#F9F9F9]">
            If you have questions about this privacy policy, contact us at:
            <br />
            <a
              href="mailto:support@synqtransfer.com"
              className="text-[#FF6F3C] underline hover:text-[#e55a24]"
            >
              ashishyelisetty@gmail.com
            </a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">8. Frequently Asked Questions</h2>
          <ul className="list-disc pl-5 text-sm text-[#F9F9F9] space-y-2">
            <li>
              <strong>Can SynqTransfer see my files?</strong><br />
              No. Your files are encrypted during upload and are deleted within 24 hours. We don’t access or read your data.
            </li>
            <li>
              <strong>What happens after 24 hours?</strong><br />
              Files are permanently deleted from our servers and cannot be recovered.
            </li>
            <li>
              <strong>How do you protect my email address?</strong><br />
              Email data is used only for delivery and never shared or reused. All transmissions are secured with encryption.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">9. Compliance</h2>
          <p className="text-sm text-[#F9F9F9]">
            We follow applicable data protection laws, including GDPR and CCPA. Users can request data deletion or opt out of any data collection beyond essential functionality.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">10. Updates to Policy</h2>
          <p className="text-sm text-[#F9F9F9]">
            Our Privacy Policy may be updated periodically. The date of the latest revision will always be displayed at the top. Users will be notified of significant changes.
          </p>
        </section>

        <footer className="pt-6 text-sm text-[#777] border-t border-[#2D2D2D] mt-8">
          &copy; {new Date().getFullYear()} SynqTransfer. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Privacy;
