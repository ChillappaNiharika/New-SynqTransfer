// pages/Terms.jsx
import React from 'react';

const Terms = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-[#F9F9F9] px-6 py-12 font-sans">
      <div className="max-w-4xl mx-auto bg-[#1A1A1A] p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#FF6F3C] mb-6">Terms & Conditions</h1>

        <section className="mb-6">
          <p className="text-sm text-[#CCCCCC]">
            By using SynqTransfer, you agree to the following terms and conditions. We reserve the right to update these terms at any time without prior notice. Continued use of the platform implies your acceptance of the current version of the terms.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">1. Use of Service</h2>
          <p className="text-sm text-[#F9F9F9]">
            You may use SynqTransfer to upload and share non-malicious, lawful content. Any misuse—including spam, distribution of malware, or abuse of email services—may result in immediate suspension.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">2. File Expiration</h2>
          <p className="text-sm text-[#F9F9F9]">
            All uploaded files are deleted automatically within 24 hours. We do not guarantee file recovery after expiration.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">3. Liability</h2>
          <p className="text-sm text-[#F9F9F9]">
            SynqTransfer is not liable for data loss, file corruption, or unauthorized access due to third-party vulnerabilities. Users are responsible for sharing secure links with the intended recipients.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">4. Privacy</h2>
          <p className="text-sm text-[#F9F9F9]">
            Please review our <a href="/privacy" className="underline text-[#FF6F3C]">Privacy Policy</a> to understand how your data is handled.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-[#FFC93C] mb-2">5. Termination</h2>
          <p className="text-sm text-[#F9F9F9]">
            We reserve the right to terminate accounts or block access to users who violate these terms without notice.
          </p>
        </section>

        <footer className="pt-6 text-sm text-[#777] border-t border-[#2D2D2D] mt-8">
          &copy; {new Date().getFullYear()} SynqTransfer. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Terms;