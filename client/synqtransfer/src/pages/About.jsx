// pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-[#F9F9F9] px-6 py-12 font-sans">
      <div className="max-w-4xl mx-auto bg-[#1A1A1A] p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#FF6F3C] mb-6">About SynqTransfer</h1>

        <section className="mb-6 space-y-4 text-sm text-[#CCCCCC]">
          <p>
            SynqTransfer was built with one mission in mind: to provide a fast, secure, and frictionless way to share large files online. Whether you're a designer sending gigabytes of assets to a client, or a legal professional sharing sensitive documents, our platform is designed to meet your file transfer needs with simplicity and trust.
          </p>

          <p>
            The team behind SynqTransfer consists of experienced developers, cybersecurity specialists, and creatives who understand the pain points of current file-sharing solutions. With this insight, we've built a system that prioritizes end-to-end encryption, temporary storage, and zero-login convenience.
          </p>

          <p>
            Unlike many competitors, SynqTransfer doesn’t monetize your data or require lengthy account setups. Our tools are built with privacy-first architecture, so your files are never used for analytics, advertising, or tracking.
          </p>

          <p>
            We are constantly evolving. With upcoming features like transfer history, expiry customization, and file recall, SynqTransfer will continue to push the boundaries of easy, ethical file sharing.
          </p>

          <p>
            Our platform uses a modern tech stack including React for the frontend and Node.js for the backend. This allows us to deliver a responsive, real-time experience whether you're uploading files on desktop or mobile devices.
          </p>

          <p>
            We believe that file sharing should be both powerful and respectful of user privacy. That’s why we don’t store files longer than 24 hours and never require you to register or log in.
          </p>

          <p>
            Our encryption practices are aligned with industry standards, including TLS/SSL during file transfer and secure handling during temporary storage. Our team regularly audits these protocols to ensure compliance and safety.
          </p>

          <p>
            The simplicity of SynqTransfer has made it a go-to solution for professionals in various industries—creative agencies, legal firms, HR departments, IT consultancies, and more. The ability to quickly share files without bottlenecks adds tremendous value to everyday operations.
          </p>

          <p>
            In addition to our core product, we are working on an educational blog that dives into best practices for file management, privacy laws like GDPR, and guides on encryption. Our mission is not only to serve users with a robust tool but to also inform and empower them with knowledge.
          </p>

          <p>
            We are proud to say that SynqTransfer has been built by a passionate group of developers in India, with global ambitions. Our user base spans multiple countries, and we are currently working on localizing our platform to support multiple languages.
          </p>

          <p>
            SynqTransfer is free to use, with no hidden costs or upsells. However, we are planning to introduce a Pro version for power users—offering features like longer retention windows, larger file size support, and team-based collaboration.
          </p>

          <p>
            When it comes to transparency, we hold ourselves accountable. You can find our <a href="/privacy" className="text-[#FF6F3C] underline hover:text-[#e45e2e]">Privacy Policy</a>, <a href="/terms" className="text-[#FF6F3C] underline hover:text-[#e45e2e]">Terms of Service</a>, and <a href="/contact" className="text-[#FF6F3C] underline hover:text-[#e45e2e]">Contact</a> details clearly listed on our website.
          </p>

          <p>
            Our support team is also available via email, ensuring that users receive timely responses to technical queries or concerns. We actively monitor uploads to protect against abuse and have internal safeguards to maintain our commitment to ethical usage.
          </p>

          <p>
            We also ensure that our infrastructure scales with demand. Built on modern cloud-native practices, SynqTransfer can handle concurrent uploads from thousands of users without compromising performance.
          </p>

          <p>
            Interested in contributing to our vision? We’re open to partnerships, collaborations, and feedback. Reach out at <a href="mailto:ashishyelisetty@gmail.com" className="text-[#FF6F3C] underline hover:text-[#e45e2e]">support@synqtransfer.com</a>.
          </p>

          <p>
            In conclusion, SynqTransfer is more than just a file sharing service. It's a commitment to privacy, simplicity, and user trust. Whether you're a casual user or a professional handling sensitive information, we’re here to help you share with confidence.
          </p>

          <p>
            Thank you for choosing SynqTransfer. Your trust fuels our innovation.
          </p>
        </section>

        <footer className="pt-6 text-sm text-[#777] border-t border-[#2D2D2D] mt-8">
          &copy; {new Date().getFullYear()} SynqTransfer. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default About;
