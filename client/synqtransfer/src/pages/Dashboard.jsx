import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import CountMachine from "../components/CountMachine";



const Dashboard = () => {
  return (
    <div className="bg-[#0F0F0F] text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
        <motion.h1
          className="text-5xl font-bold text-[#FF6F3C] mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Fast & Secure File Transfers
        </motion.h1>
        <motion.p
          className="text-[#F9F9F9] text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Send large files with confidence. SynqTransfer ensures your files are encrypted, tracked, and auto-expired for security.
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="/upload"
            className="bg-[#FF6F3C] hover:bg-[#e55a24] text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Start Uploading
          </a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">Why SynqTransfer?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: '24-Hour Expiry', desc: 'All files expire automatically in 24 hours to ensure privacy.' },
            { title: 'End-to-End Encryption', desc: 'We protect your data with the highest-grade encryption protocols.' },
            { title: 'Link or Email', desc: 'Choose to generate a shareable link or directly send via email.' },
            { title: 'Drag & Drop', desc: 'Easily drag files and folders to upload seamlessly.' },
            { title: 'Progress Tracking', desc: 'Get real-time upload status with visual indicators.' },
            { title: 'No Login Needed', desc: 'Send files instantly—no signup or login required.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#1A1A1A] p-6 rounded-lg shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-[#FF6F3C] mb-2">{item.title}</h3>
              <p className="text-[#F9F9F9] text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-[#111] px-6">
        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          {[
            { step: '1', title: 'Upload Files', desc: 'Choose your files or folders to upload securely.' },
            { step: '2', title: 'Set Options', desc: 'Enter email details, message, and expiration duration.' },
            { step: '3', title: 'Share or Send', desc: 'Generate a secure link or send via email instantly.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#1A1A1A] p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-[#FF6F3C] mb-2">{item.step}</div>
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-[#F9F9F9]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">Trusted by Creators and Teams</h2>
        <div className="grid md:grid-cols-2 gap-12 text-[#F9F9F9]">
          <div>
            <p className="mb-4">
              Whether you're a designer, developer, photographer, or corporate team—SynqTransfer is tailored to
              streamline your file-sharing workflow.
            </p>
            <p className="mb-4">
              Collaborate faster by sharing design prototypes, documents, or video edits without size constraints or
              sign-ins.
            </p>
            <p>
              Focus on your work—we’ll handle the storage, delivery, and security.
            </p>
          </div>
          <div className="flex flex-col gap-6 justify-center">
            <div className="bg-[#1A1A1A] p-5 rounded-lg shadow">
              <p className="italic text-sm mb-2">“SynqTransfer made it effortless to send our project files to clients securely and on time.”</p>
              <p className="text-[#FFC93C] font-semibold">— Niharika Chillappa., UI/UX Developer</p>
            </div>
            <div className="bg-[#1A1A1A] p-5 rounded-lg shadow">
              <p className="italic text-sm mb-2">“We no longer worry about file size or email restrictions. It's simply drag, drop, and done.”</p>
              <p className="text-[#FFC93C] font-semibold">— Ashish Yelisetty., Full Stack Developer</p>
            </div>
            <div className="bg-[#1A1A1A] p-5 rounded-lg shadow">
              <p className="italic text-sm mb-2">“The 24-hour expiry keeps our legal docs secure and out of unwanted hands.”</p>
              <p className="text-[#FFC93C] font-semibold">— Kashyap., Lawyer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational SEO Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-[#F9F9F9]">
        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">Learn More About File Transfer Security</h2>
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            File transfer is a daily need in modern digital workspaces. From creative teams to enterprise-level
            corporations, sending large files quickly and safely can make or break productivity.
          </p>
          <p>
            SynqTransfer simplifies this with secure upload, instant sharing, and 24-hour expiry—all without
            mandatory signups. Whether you're sending gigabytes of design files, confidential contracts, or personal
            data, your content is encrypted and transient.
          </p>
          <p>
            Using end-to-end encryption and industry-standard protocols, your data remains protected from
            interception or leaks. In fact, many professionals trust SynqTransfer over traditional cloud drives
            for quick, one-time delivery needs.
          </p>
          <p>
            Avoid clutter, save time, and increase your efficiency with our no-login-required file sharing.
          </p>
          <ul className="list-disc pl-5">
            <li>Perfect for remote teams and freelancers needing to share files securely.</li>
            <li>Useful for legal firms, HR departments, and educators who value file expiry.</li>
            <li>No need to worry about permanent storage—your data is cleared automatically.</li>
          </ul>
          <p>
            Have questions? Visit our Help Center or reach out via our contact form. Start your first upload today and experience the future of secure file sharing.
          </p>
        </div>
      </section>

      {/* Count Machine Info Section */}
<section className="py-16 px-6 max-w-6xl mx-auto text-center">
  <h2 className="text-3xl font-bold text-[#FFC93C] mb-6">
    Smart Count Machine
  </h2>

  <p className="text-[#F9F9F9] mb-6 max-w-3xl mx-auto text-sm leading-relaxed">
    Count Machine is an interactive tracking tool that allows you to increase and store counts securely 
    without any login required. Simply enter your email or a unique ID and your counts will be saved 
    automatically with a full history record.
  </p>

  <div className="grid md:grid-cols-3 gap-8 text-center mt-10">

    <div className="bg-[#1A1A1A] p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-[#FF6F3C] mb-2">
        No Login Required
      </h3>
      <p className="text-sm text-[#F9F9F9]">
        Just use your email or unique ID — no signup, no password, no hassle.
      </p>
    </div>

    <div className="bg-[#1A1A1A] p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-[#FF6F3C] mb-2">
        Auto Save & History
      </h3>
      <p className="text-sm text-[#F9F9F9]">
        Every click is stored securely along with timestamped history.
      </p>
    </div>

    <div className="bg-[#1A1A1A] p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-[#FF6F3C] mb-2">
        Fast & Lightweight
      </h3>
      <p className="text-sm text-[#F9F9F9]">
        Works instantly with no delay and no heavy system usage.
      </p>
    </div>

  </div>

  <div className="mt-10">
    <a
      href="/count-machine"
      className="bg-[#FF6F3C] hover:bg-[#e55a24] px-8 py-3 rounded-lg font-semibold transition"
    >
      Open Count Machine
    </a>
  </div>
</section>




      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-center py-6 mt-12 text-sm text-[#7D7D7D]">
        © {new Date().getFullYear()} SynqTransfer. All rights reserved. | <a href="/privacy" >Privacy Policy</a> | <a href="/terms" >Terms and Conditions</a> | <a href="/contact" >ContactUs</a> | <a href="/about-us" >AboutUs</a>
      </footer>
    </div>
  );
};

export default Dashboard;
