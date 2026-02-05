import React, { useState } from "react";
import { API_ENDPOINTS, REQUEST_METHODS } from "../config/apiConfig";


const CountHistory = () => {
  const [userId, setUserId] = useState("");
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
  try {
    const isEmail = userId.includes("@");

    const query = isEmail
      ? `?email=${userId}`
      : `?userId=${userId}`;

    const res = await fetch(
      `${API_ENDPOINTS.GET_HISTORY}${query}`,
      {
        method: REQUEST_METHODS.GET,
      }
    );

    const data = await res.json();
    setHistory(data);
  } catch (err) {
    console.error("Failed to load history", err);
  }
};


  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white p-8">
      <h1 className="text-3xl text-[#FF6F3C] font-bold mb-6 text-center">
        Count History
      </h1>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Enter Email or Unique ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-3 rounded bg-[#1A1A1A] border border-[#333] mb-4"
        />

        <button
          onClick={loadHistory}
          className="bg-[#FFC93C] text-black w-full py-3 rounded-lg mb-6"
        >
          Load History
        </button>

        <div className="space-y-3">
          {history.length === 0 && (
            <p className="text-center text-sm text-gray-400">
              No history found
            </p>
          )}

          {history.map((item, i) => (
  <div
    key={i}
    className="bg-[#1A1A1A] p-4 rounded text-sm space-y-1"
  >
    <div>
      Total Counts: 
      <span className="text-[#FF6F3C] ml-1">
        {item.totalCounts}
      </span>
    </div>

    <div>Date: {new Date(item.createdAt).toLocaleDateString()}</div>

    <div>Start Time: {item.startTime}</div>
    <div>End Time: {item.endTime}</div>

    <div className="text-[#FFC93C]">
      Total Time: {item.totalDuration}
    </div>

    <div>
      Avg per Count: {item.avgTime}
    </div>
  </div>
))}


        </div>
      </div>
    </div>
  );
};

export default CountHistory;
