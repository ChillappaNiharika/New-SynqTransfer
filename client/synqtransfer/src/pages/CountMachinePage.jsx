import React from "react";
import CountMachine from "../components/CountMachine";

const CountMachinePage = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white">

      {/* HERO */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
        <h1 className="text-5xl font-bold text-[#FF6F3C] mb-4">
          Smart Count Machine
        </h1>

        <p className="max-w-3xl mx-auto text-sm text-[#F9F9F9] leading-relaxed">
          A powerful interactive counting tool designed to track sessions, time spent, 
          and performance — all without login or complex setup.
        </p>
      </section>

      {/* MAIN TOOL */}
      <section className="py-16 px-6">
        <CountMachine />
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="bg-[#1A1A1A] p-6 rounded-lg shadow">
            <h3 className="text-xl text-[#FF6F3C] mb-2">Guest Mode</h3>
            <p className="text-sm text-[#F9F9F9]">
              Use instantly without entering any details.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-lg shadow">
            <h3 className="text-xl text-[#FF6F3C] mb-2">Smart Sessions</h3>
            <p className="text-sm text-[#F9F9F9]">
              Track time, speed, and performance per session.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-lg shadow">
            <h3 className="text-xl text-[#FF6F3C] mb-2">Cloud Saved</h3>
            <p className="text-sm text-[#F9F9F9]">
              Signed users get secure database storage.
            </p>
          </div>

        </div>
      </section>

      {/* USE CASES */}
      <section className="py-16 bg-[#111] px-6">
        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">
          Who Is It For?
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto text-sm">

          <div>
            <p className="mb-4">
              Count Machine is perfect for productivity tracking, fitness reps, 
              click experiments, learning exercises, and workflow monitoring.
            </p>
            <p>
              Whether you're testing speed, practicing repetition, or measuring 
              engagement — Count Machine keeps everything simple and fast.
            </p>
          </div>

          <div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Developers testing interactions</li>
              <li>Students practicing counting tasks</li>
              <li>Fitness routines</li>
              <li>Quality testing</li>
              <li>Gamified challenges</li>
            </ul>
          </div>

        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#FFC93C] mb-10">
          Why Use Smart Count Machine?
        </h2>

        <div className="space-y-6 text-sm leading-relaxed text-[#F9F9F9]">

          <p>
            Traditional counters only show numbers. Smart Count Machine adds 
            intelligent time tracking, summaries, and historical storage.
          </p>

          <p>
            It combines simplicity with analytics — letting you see not just how 
            many times you clicked, but how long you spent and how efficient you were.
          </p>

          <p>
            No signups, no passwords, no barriers. Just instant productivity.
          </p>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-center py-6 mt-12 text-sm text-[#7D7D7D]">
        © {new Date().getFullYear()} SynqTransfer. All rights reserved. |{" "}
        <a href="/privacy">Privacy Policy</a> |{" "}
        <a href="/terms">Terms and Conditions</a> |{" "}
        <a href="/contact">ContactUs</a> |{" "}
        <a href="/about-us">AboutUs</a>
      </footer>
    </div>
  );
};

export default CountMachinePage;
