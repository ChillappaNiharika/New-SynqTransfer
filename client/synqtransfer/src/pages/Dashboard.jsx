import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="bg-[#0F0F0F] text-white font-sans">

      {/* ================= HERO ================= */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">

        <motion.h1
          className="text-5xl font-bold text-[#FF6F3C] mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          SynqTransfer Platform
        </motion.h1>

        <motion.p
          className="text-lg max-w-3xl mx-auto text-[#F9F9F9]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A modern digital productivity platform built for secure file sharing and real-time session tracking. 
          Transfer files safely while optimizing workflows with smart tools.
        </motion.p>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <a href="/upload" className="bg-[#FF6F3C] hover:bg-[#e55a24] px-8 py-3 rounded-lg font-semibold transition">
            Start Secure Transfer
          </a>

          <a href="/count-machine" className="border border-[#FF6F3C] text-[#FF6F3C] hover:bg-[#FF6F3C] hover:text-white px-8 py-3 rounded-lg font-semibold transition">
            Open Count Machine
          </a>
        </div>
      </section>

      {/* ================= FILE TRANSFER OVERVIEW ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">
          Secure File Sharing Made Simple
        </h2>

        <div className="space-y-6 text-sm text-[#F9F9F9] leading-relaxed">

          <p>
            SynqTransfer enables fast and protected file transfers without complex registrations or permanent storage.
          </p>

          <p>
            Files are encrypted during upload and delivery, ensuring sensitive data remains private and secure.
          </p>

          <p>
            Automatic expiration removes clutter while keeping transfers lightweight and efficient.
          </p>

        </div>
      </section>

      {/* ================= FILE TRANSFER FEATURES ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <div className="grid md:grid-cols-3 gap-10 text-center">

          {[
            { title: "Auto File Expiry", desc: "Shared files are removed automatically after a set time for privacy." },
            { title: "Strong Encryption", desc: "Industry-level security protects every upload and download." },
            { title: "Instant Sharing Links", desc: "Generate short secure links or send directly by email." },
            { title: "Drag & Drop Uploads", desc: "Upload large files effortlessly through the browser." },
            { title: "Real-Time Progress", desc: "Track uploads visually as they happen." },
            { title: "No Registration Needed", desc: "Transfer files immediately without creating accounts." },
          ].map((item, i) => (
            <div key={i} className="bg-[#1A1A1A] p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl text-[#FF6F3C] mb-2">{item.title}</h3>
              <p className="text-sm text-[#F9F9F9]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FILE TRANSFER PROCESS ================= */}
      <section className="py-20 bg-[#111] px-6">

        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">

          {[
            { step: "1", title: "Upload Files", desc: "Select or drag files into the secure uploader." },
            { step: "2", title: "Set Options", desc: "Configure expiration and delivery preferences." },
            { step: "3", title: "Share Securely", desc: "Send links or emails instantly." },
          ].map((item, i) => (
            <div key={i} className="bg-[#1A1A1A] p-6 rounded-lg">
              <div className="text-4xl font-bold text-[#FF6F3C] mb-3">{item.step}</div>
              <h4 className="text-xl mb-2">{item.title}</h4>
              <p className="text-sm text-[#F9F9F9]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= COUNT MACHINE ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-[#FFC93C] mb-6">
          Smart Count Machine
        </h2>

        <p className="max-w-3xl mx-auto text-sm text-[#F9F9F9] leading-relaxed mb-12">
          Smart Count Machine is a built-in productivity tracker that measures clicks, session time, performance speed, 
          and historical activity in real time.
        </p>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            { title: "Guest Mode Access", desc: "Start tracking instantly without accounts." },
            { title: "Session Analytics", desc: "Monitor time, speed, and performance metrics." },
            { title: "Cloud History", desc: "Signed users can save long-term records." },
            { title: "Precision Stopwatch", desc: "Track time intervals accurately." },
            { title: "Live Clock View", desc: "Visual session timing display." },
            { title: "Instant Reset", desc: "Restart sessions with quick summaries." },
          ].map((item, i) => (
            <div key={i} className="bg-[#1A1A1A] p-6 rounded-lg shadow">
              <h3 className="text-xl text-[#FF6F3C] mb-2">{item.title}</h3>
              <p className="text-sm text-[#F9F9F9]">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="py-20 bg-[#111] px-6">

        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-12">
          Real World Applications
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto text-sm text-[#F9F9F9]">

          <ul className="list-disc pl-6 space-y-2">
            <li>Remote team file collaboration</li>
            <li>Design asset delivery</li>
            <li>Secure document sharing</li>
            <li>Large media transfers</li>
            <li>Client project exchanges</li>
          </ul>

          <ul className="list-disc pl-6 space-y-2">
            <li>Fitness repetition tracking</li>
            <li>Study productivity measurement</li>
            <li>Workflow performance testing</li>
            <li>Gamified challenges</li>
            <li>Time efficiency analysis</li>
          </ul>

        </div>
      </section>

      {/* ================= PLATFORM BENEFITS ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-sm space-y-6 text-[#F9F9F9]">

        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">
          Why SynqTransfer?
        </h2>

        <p>
          SynqTransfer unifies secure digital file delivery with intelligent productivity tracking in one platform.
        </p>

        <p>
          Users benefit from encrypted transfers, automatic cleanup, and real-time performance insights.
        </p>

        <p>
          The lightweight infrastructure ensures speed, privacy, and reliability for modern workflows.
        </p>

      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] text-center px-6">

        <h2 className="text-4xl font-bold text-[#FF6F3C] mb-6">
          Boost Your Digital Workflow Today
        </h2>

        <p className="max-w-2xl mx-auto text-sm text-[#F9F9F9] mb-10">
          Share files securely and track productivity smarter — all in one seamless platform.
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1A1A1A] text-center py-6 text-sm text-[#7D7D7D]">
        © {new Date().getFullYear()} SynqTransfer. All rights reserved. |{" "}
        <a href="/privacy">Privacy Policy</a> |{" "}
        <a href="/terms">Terms & Conditions</a> |{" "}
        <a href="/contact">Contact Us</a> |{" "}
        <a href="/about-us">About Us</a>
      </footer>

    </div>
  );
};

export default Dashboard;
