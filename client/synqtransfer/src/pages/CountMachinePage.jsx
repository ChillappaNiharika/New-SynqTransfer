import React from "react";
import CountMachine from "../components/CountMachine";

const CountMachinePage = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white py-16 px-6">

      <h1 className="text-4xl font-bold text-center text-[#FF6F3C] mb-6">
        Count Machine
      </h1>

      <p className="text-center max-w-2xl mx-auto mb-12 text-sm text-[#F9F9F9]">
        Increase your count with a single click.  
        Use your email or unique ID to automatically save and track your progress.
      </p>

      <CountMachine />
    </div>
  );
};

export default CountMachinePage;
