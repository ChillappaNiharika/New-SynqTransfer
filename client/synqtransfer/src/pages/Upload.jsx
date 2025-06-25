import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import { motion } from 'framer-motion';

const Upload = () => {
  const [submitted, setSubmitted] = useState(false);
  const [link, setLink] = useState(null);
  const [status, setStatus] = useState('');

  return (
    <div className="bg-[#F9F9F9] min-h-screen text-[#232323] font-sans px-4 py-10">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-[#FF6F3C] mb-4">Upload & Share Files</h1>
        <p className="text-[#232323] max-w-xl mx-auto">
          Upload your files quickly and securely. Generate a downloadable link or send it directly via email. All files
          expire in 24 hours.
        </p>
      </motion.div>

      {/* Upload Form */}
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <UploadForm setSubmitted={setSubmitted} setLink={setLink} setStatus={setStatus} />
      </motion.div>

      {/* Submission Status */}
      {submitted && (
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-green-600 font-medium mb-2">{status}</p>
          {link && (
            <div>
              <p className="mb-1">Download Link:</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {link}
              </a>
            </div>
          )}
        </motion.div>
      )}

      {/* Info Section */}
      <section className="mt-20 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#FFC93C] mb-4">How SynqTransfer Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div className="bg-[#FFFFFF] p-6 rounded-lg shadow">
            <h3 className="text-[#FF6F3C] font-semibold mb-2">1. Select File</h3>
            <p>Choose the file or folder you wish to share securely with others.</p>
          </div>
          <div className="bg-[#FFFFFF] p-6 rounded-lg shadow">
            <h3 className="text-[#FF6F3C] font-semibold mb-2">2. Choose Method</h3>
            <p>Send via email or generate a unique download link to share.</p>
          </div>
          <div className="bg-[#FFFFFF] p-6 rounded-lg shadow">
            <h3 className="text-[#FF6F3C] font-semibold mb-2">3. File Expires</h3>
            <p>File will be auto-deleted after 24 hours to ensure privacy.</p>
          </div>
        </div>
      </section>

      {/* Educational SEO Section */}
      <section className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#FFC93C] text-center mb-6">Learn More About File Sharing</h2>
        <div className="space-y-6 text-sm leading-relaxed text-[#232323]">
          <p>
            File sharing is an essential part of today's digital workflows. Whether you're a designer sharing drafts,
            a developer distributing builds, or a lawyer exchanging contracts—having a reliable platform like
            SynqTransfer is vital. Our platform ensures your data is secure and reaches its destination promptly.
          </p>
          <p>
            There are many tools online that allow file sharing, but very few prioritize both **simplicity** and **security**.
            At SynqTransfer, we designed the interface to be minimal, requiring no login for basic transfers,
            while ensuring best-in-class encryption behind the scenes.
          </p>
          <p>
            You can use SynqTransfer to:
          </p>
          <ul className="list-disc pl-5">
            <li>Send large video or image files to clients.</li>
            <li>Distribute school or office documents.</li>
            <li>Send compressed archives (.zip/.rar) to team members.</li>
            <li>Securely send legal or confidential documents.</li>
          </ul>
          <p>
            Ready to get started? Click the <strong>Continue</strong> button above to upload your files now.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-20 text-[#7D7D7D] text-sm">
        © {new Date().getFullYear()} SynqTransfer. Secure File Sharing Made Simple.
      </footer>
    </div>
  );
};

export default Upload;
