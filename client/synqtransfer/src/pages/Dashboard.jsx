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
          className="text-[#F9F9F9] text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A powerful ecosystem combining secure file transfers and smart productivity tools 
          like the interactive Count Machine — all in one fast, lightweight platform.
        </motion.p>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <a
            href="/upload"
            className="bg-[#FF6F3C] hover:bg-[#e55a24] px-8 py-3 rounded-lg font-semibold transition"
          >
            Start File Transfer
          </a>

          <a
            href="/count-machine"
            className="border border-[#FF6F3C] text-[#FF6F3C] hover:bg-[#FF6F3C] hover:text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Open Count Machine
          </a>
        </div>
      </section>

      {/* ================= FILE TRANSFER FEATURES ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-12">
          Secure File Transfer System
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          {[
            {
              title: "24-Hour Expiry",
              desc: "Automatically deletes shared files after 24 hours ensuring maximum privacy."
            },
            {
              title: "End-to-End Encryption",
              desc: "Your files are encrypted using industry-grade protocols during upload and transfer."
            },
            {
              title: "Link or Email Sharing",
              desc: "Generate secure short links or send files directly through email."
            },
            {
              title: "Drag & Drop Upload",
              desc: "Simply drag your files into the browser to upload instantly."
            },
            {
              title: "Live Progress Tracking",
              desc: "Visual upload progress so you always know what's happening."
            },
            {
              title: "No Login Needed",
              desc: "Transfer files instantly without any signup process."
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#1A1A1A] p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl text-[#FF6F3C] mb-2">{item.title}</h3>
              <p className="text-sm text-[#F9F9F9]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FILE TRANSFER HOW ================= */}
      <section className="py-20 bg-[#111] px-6">

        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-12">
          How Secure File Transfer Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">

          {[
            { step: "1", title: "Upload", desc: "Choose or drag your files securely." },
            { step: "2", title: "Configure", desc: "Set expiration time and email details." },
            { step: "3", title: "Share", desc: "Send link or email instantly." },
          ].map((item, i) => (
            <div key={i} className="bg-[#1A1A1A] p-6 rounded-lg">

              <div className="text-4xl font-bold text-[#FF6F3C] mb-3">
                {item.step}
              </div>

              <h4 className="text-xl mb-2">{item.title}</h4>

              <p className="text-sm text-[#F9F9F9]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= COUNT MACHINE INTRO ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-[#FFC93C] mb-6">
          Smart Count Machine
        </h2>

        <p className="max-w-3xl mx-auto text-sm text-[#F9F9F9] leading-relaxed mb-12">
          Smart Count Machine is a built-in productivity tool designed to track clicks, time, 
          session performance and historical data — all without complex authentication.
        </p>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            {
              title: "Guest Mode",
              desc: "Start counting instantly without any account."
            },
            {
              title: "Session Tracking",
              desc: "Every session tracks time, speed, and performance."
            },
            {
              title: "Cloud History",
              desc: "Signed users get full database saved history."
            },
            {
              title: "Live Stopwatch",
              desc: "Measure time between each count precisely."
            },
            {
              title: "Analog Clock",
              desc: "Beautiful real-time clock for session visualization."
            },
            {
              title: "Reset & Summary",
              desc: "Reset anytime and see complete session summary."
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#1A1A1A] p-6 rounded-lg shadow"
            >
              <h3 className="text-xl text-[#FF6F3C] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#F9F9F9]">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-12">
          <a
            href="/count-machine"
            className="bg-[#FF6F3C] hover:bg-[#e55a24] px-8 py-3 rounded-lg font-semibold transition"
          >
            Launch Count Machine
          </a>
        </div>
      </section>

      {/* ================= COUNT MACHINE USE CASES ================= */}
      <section className="py-20 bg-[#111] px-6">

        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-12">
          Who Uses Count Machine?
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto text-sm text-[#F9F9F9]">

          <div>
            <p className="mb-4">
              Smart Count Machine is built for a wide range of productivity and tracking needs.
            </p>

            <p>
              From fitness sessions to coding experiments, it helps users understand time 
              efficiency and repetition performance.
            </p>
          </div>

          <ul className="list-disc pl-6 space-y-2">
            <li>Developers testing interactions</li>
            <li>Students practicing tasks</li>
            <li>Fitness reps tracking</li>
            <li>Workflow experiments</li>
            <li>Gamified challenges</li>
          </ul>
        </div>
      </section>

      {/* ================= PLATFORM BENEFITS ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-12">
          Why Choose SynqTransfer Platform?
        </h2>

        <div className="space-y-6 text-sm text-[#F9F9F9] leading-relaxed">

          <p>
            SynqTransfer is more than just a file sharing service. It’s a full productivity ecosystem 
            combining secure transfers with intelligent tools.
          </p>

          <p>
            Whether you need fast file delivery or session-based tracking, everything runs on a 
            lightweight and secure infrastructure.
          </p>

          <p>
            No clutter. No permanent storage. Just fast, smart and safe operations.
          </p>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] text-center px-6">

        <h2 className="text-4xl font-bold text-[#FF6F3C] mb-6">
          Start Using SynqTransfer Today
        </h2>

        <p className="max-w-2xl mx-auto text-sm text-[#F9F9F9] mb-10">
          Transfer files securely or track productivity with Smart Count Machine — all in one place.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href="/upload"
            className="bg-[#FF6F3C] hover:bg-[#e55a24] px-8 py-3 rounded-lg font-semibold transition"
          >
            Transfer Files
          </a>

          <a
            href="/count-machine"
            className="border border-[#FF6F3C] text-[#FF6F3C] hover:bg-[#FF6F3C] hover:text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Use Count Machine
          </a>
        </div>
      </section>

      <section className="text-center py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">

<motion.h1
className="text-5xl font-bold text-[#FF6F3C] mb-4"
initial={{ opacity: 0, y: -30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
>
SynqTransfer Platform
</motion.h1>

<p className="text-[#F9F9F9] text-lg max-w-3xl mx-auto">
A complete digital platform combining secure file transfers with smart productivity tools like Count Machine.
</p>

<div className="mt-8 flex justify-center gap-6 flex-wrap">

<a href="/upload" className="bg-[#FF6F3C] px-8 py-3 rounded-lg font-semibold">
Start File Transfer
</a>

<a href="/count-machine" className="border border-[#FF6F3C] px-8 py-3 rounded-lg text-[#FF6F3C]">
Open Count Machine
</a>

</div>
</section>

{/* ================================================= FILE TRANSFER OVERVIEW ================================================= */}

<section className="py-20 px-6 max-w-6xl mx-auto">

<h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">
Secure File Transfer System
</h2>

<p className="text-sm text-[#F9F9F9] mb-6">
SynqTransfer is designed for speed, security and simplicity. It allows users to transfer large files instantly without registration.
</p>

<p className="text-sm text-[#F9F9F9] mb-6">
Every transfer is encrypted and auto-expired, making it ideal for sensitive data exchange.
</p>

<p className="text-sm text-[#F9F9F9] mb-6">
From freelancers to enterprises, SynqTransfer solves file sharing pain points.
</p>

</section>

{/* ================================================= FILE TRANSFER FEATURES GRID ================================================= */}

<section className="py-20 px-6 max-w-6xl mx-auto">

<div className="grid md:grid-cols-3 gap-10">

{[
"24 Hour Expiry",
"End to End Encryption",
"Unlimited File Size",
"Drag and Drop Upload",
"Live Progress Tracking",
"Short Secure Links",
"Email Delivery",
"No Login Required",
"Cloud Storage",
"Auto Cleanup",
"Fast CDN Delivery",
"Mobile Friendly"
].map((item,i)=>(
<div key={i} className="bg-[#1A1A1A] p-6 rounded-lg">
<h3 className="text-[#FF6F3C] text-lg mb-2">{item}</h3>
<p className="text-sm text-[#F9F9F9]">
Feature designed for modern secure transfers and productivity.
</p>
</div>
))}

</div>

</section>

{/* ================================================= FILE TRANSFER USE CASES ================================================= */}

<section className="py-20 bg-[#111] px-6">

<h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">
File Transfer Use Cases
</h2>

<div className="max-w-6xl mx-auto space-y-6 text-sm">

<p>Design agencies sending large mockups.</p>
<p>Developers sharing builds and archives.</p>
<p>Students submitting assignments.</p>
<p>Legal firms transferring contracts.</p>
<p>Photographers delivering albums.</p>
<p>Marketing teams sharing campaigns.</p>
<p>HR sending onboarding files.</p>
<p>Remote teams collaborating globally.</p>

</div>

</section>

{/* ================================================= COUNT MACHINE INTRO ================================================= */}

<section className="py-20 px-6 max-w-6xl mx-auto text-center">

<h2 className="text-3xl font-bold text-[#FFC93C] mb-6">
Smart Count Machine
</h2>

<p className="text-sm text-[#F9F9F9] max-w-3xl mx-auto mb-6">
Count Machine is a real-time tracking tool that measures counts, time intervals, session summaries and history.
</p>

<p className="text-sm text-[#F9F9F9] max-w-3xl mx-auto mb-6">
Users can use guest mode or sign in via email for permanent tracking.
</p>

<p className="text-sm text-[#F9F9F9] max-w-3xl mx-auto mb-6">
It is built for speed, accuracy and simplicity.
</p>

</section>

{/* ================================================= COUNT MACHINE FEATURES ================================================= */}

<section className="py-20 px-6 max-w-6xl mx-auto">

<div className="grid md:grid-cols-3 gap-10">

{[
"Live Stopwatch",
"Analog Clock Display",
"Session Summary",
"Cloud History",
"Email Based Login",
"Unique ID System",
"Fast Click Response",
"Reset Button",
"Performance Metrics",
"Average Speed",
"Total Duration",
"Session Storage"
].map((item,i)=>(
<div key={i} className="bg-[#1A1A1A] p-6 rounded-lg">
<h3 className="text-[#FF6F3C] mb-2">{item}</h3>
<p className="text-sm text-[#F9F9F9]">
Powerful built-in functionality for productivity tracking.
</p>
</div>
))}

</div>

</section>

{/* ================================================= COUNT MACHINE USE CASES ================================================= */}

<section className="py-20 bg-[#111] px-6">

<h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">
Count Machine Use Cases
</h2>

<div className="max-w-6xl mx-auto space-y-6 text-sm">

<p>Fitness repetition tracking.</p>
<p>Study session productivity.</p>
<p>Gamified challenges.</p>
<p>Workflow testing.</p>
<p>Speed measurement.</p>
<p>Time based experiments.</p>
<p>Learning tasks.</p>
<p>Performance optimization.</p>

</div>

</section>

{/* ================================================= EDUCATIONAL CONTENT ================================================= */}

<section className="py-20 px-6 max-w-6xl mx-auto text-sm space-y-6">

<h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">
Educational Guide
</h2>

<p>
Modern digital workflows rely heavily on secure file sharing and productivity measurement tools.
</p>

<p>
SynqTransfer solves the file sharing problem by providing a fast encrypted pipeline for data delivery.
</p>

<p>
Count Machine complements this by offering insight into user activity and time usage.
</p>

<p>
Together these tools create a complete digital productivity ecosystem.
</p>

<p>
Security is the foundation of SynqTransfer while usability drives Count Machine.
</p>

<p>
This platform removes friction in daily digital operations.
</p>

<p>
Both systems are optimized for speed and reliability.
</p>

<p>
Users enjoy seamless experience without complexity.
</p>

<p>
No permanent data clutter.
</p>

<p>
Everything is designed lightweight.
</p>

</section>

{/* ================================================= EXPANDED SEO CONTENT (LOTS OF LINES) ================================================= */}

<section className="py-20 px-6 max-w-6xl mx-auto text-sm space-y-4">

{Array.from({length:150}).map((_,i)=>(
<p key={i}>
SynqTransfer platform improves digital productivity by combining secure file sharing and smart session tracking tools for modern workflows.
</p>
))}

</section>

{/* ================================================= CALL TO ACTION ================================================= */}

<section className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] text-center px-6">

<h2 className="text-4xl font-bold text-[#FF6F3C] mb-6">
Start Using SynqTransfer Today
</h2>

<p className="text-sm text-[#F9F9F9] mb-8">
Fast file transfers. Smart productivity tracking. One powerful platform.
</p>

<div className="flex justify-center gap-6 flex-wrap">

<a href="/upload" className="bg-[#FF6F3C] px-8 py-3 rounded-lg font-semibold">
Transfer Files
</a>

<a href="/count-machine" className="border border-[#FF6F3C] px-8 py-3 rounded-lg text-[#FF6F3C]">
Use Count Machine
</a>

</div>

</section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1A1A1A] text-center py-6 text-sm text-[#7D7D7D]">
        © {new Date().getFullYear()} SynqTransfer. All rights reserved. |{" "}
        <a href="/privacy">Privacy Policy</a> |{" "}
        <a href="/terms">Terms & Conditions</a> |{" "}
        <a href="/contact">ContactUs</a> |{" "}
        <a href="/about-us">AboutUs</a>
      </footer>

    </div>
  );
};

export default Dashboard;
