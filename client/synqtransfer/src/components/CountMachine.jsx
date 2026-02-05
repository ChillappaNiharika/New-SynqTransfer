import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, REQUEST_METHODS } from "../config/apiConfig";


const CountMachine = () => {
  const [inputId, setInputId] = useState("");
  const [userId, setUserId] = useState(
    localStorage.getItem("activeUser") || ""
  );
  const [sessionStart, setSessionStart] = useState(null);
const [sessionEnd, setSessionEnd] = useState(null);
const [showSummary, setShowSummary] = useState(false);


  const [count, setCount] = useState(0);
  const [clockTime, setClockTime] = useState(new Date());

  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  const navigate = useNavigate();
  const stopwatchRef = useRef(null);

  /* ================= LIVE CLOCK ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setClockTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ================= LOAD USER DATA ================= */

  useEffect(() => {
    if (!userId) {
      setCount(0);
      return;
    }

    const saved = localStorage.getItem(`count-${userId}`);
    setCount(saved ? parseInt(saved) : 0);
  }, [userId]);

  /* ================= STOPWATCH ================= */

  useEffect(() => {
    if (!startTime) return;

    stopwatchRef.current = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);

    return () => clearInterval(stopwatchRef.current);
  }, [startTime]);

  const formatTime = (ms) => {
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const rem = sec % 60;
    const milli = Math.floor((ms % 1000) / 100);
    return `${min}:${rem < 10 ? "0" : ""}${rem}.${milli}`;
  };

  /* ================= SIGN IN ================= */

  const handleSignIn = async () => {
  if (!inputId.trim()) return;

  try {
    const res = await fetch(API_ENDPOINTS.SIGNIN, {
      method: REQUEST_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputId.trim(),
      }),
    });

    const data = await res.json();

    // backend returns email + uniqueId
    setUserId(data.uniqueId);

    localStorage.setItem("activeUser", data.uniqueId);
    localStorage.setItem("activeEmail", data.email);

    setInputId("");
  } catch (err) {
    console.error("Sign in failed", err);
  }
};


  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    setUserId("");
    setCount(0);
    localStorage.removeItem("activeUser");
  };

  /* ================= COUNT ================= */

  const handleIncrease = () => {
  const now = new Date();

  if (!sessionStart) {
    setSessionStart(now);
  }

  const timeTaken = startTime ? Date.now() - startTime : 0;

  const newCount = count + 1;
  setCount(newCount);

  // Guest mode → no saving
  if (!userId) {
    setStartTime(Date.now());
    setElapsed(0);
    return;
  }

  localStorage.setItem(`count-${userId}`, newCount);

  const history =
    JSON.parse(localStorage.getItem(`history-${userId}`)) || [];

  history.push({
    count: newCount,
    date: now.toLocaleDateString(),
    startTime: startTime
      ? new Date(startTime).toLocaleTimeString()
      : "—",
    endTime: now.toLocaleTimeString(),
    duration: formatTime(timeTaken),
  });

  localStorage.setItem(
    `history-${userId}`,
    JSON.stringify(history)
  );

  setStartTime(Date.now());
  setElapsed(0);
  setShowSummary(false);
};

const handleEndSession = async () => {
  const end = new Date();
  setSessionEnd(end);
  clearInterval(stopwatchRef.current);
  setShowSummary(true);

  // Guest → don’t save
  if (!userId) return;

  try {
    await fetch(API_ENDPOINTS.SAVE_SESSION, {
      method: REQUEST_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("activeEmail"),
        userId: userId,
        totalCounts: count,
        startTime: sessionStart.toLocaleTimeString(),
        endTime: end.toLocaleTimeString(),
        totalDuration: formatTime(end - sessionStart),
        avgTime: formatTime((end - sessionStart) / count),
      }),
    });
  } catch (err) {
    console.error("Saving session failed", err);
  }
};

const handleReset = () => {
  setCount(0);
  setSessionStart(null);
  setSessionEnd(null);
  setShowSummary(false);
  setStartTime(null);
  setElapsed(0);

  if (userId) {
    localStorage.removeItem(`count-${userId}`);
  }
};




  /* ================= CLOCK ROTATION ================= */

  const seconds = clockTime.getSeconds();
  const minutes = clockTime.getMinutes();
  const hours = clockTime.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;


  const totalDuration =
  sessionStart && sessionEnd
    ? sessionEnd - sessionStart
    : 0;

const averageTime =
  count > 0 ? totalDuration / count : 0;


  return (
    <motion.div
      className="bg-[#1A1A1A] p-8 rounded-2xl shadow-xl max-w-md mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >

      {/* SIGN IN AREA */}
      {!userId ? (
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Enter Email or Unique ID"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[#0F0F0F] border border-[#333] text-white"
          />
          <button
            onClick={handleSignIn}
            className="bg-[#FFC93C] text-black px-4 rounded-lg font-semibold hover:opacity-90"
          >
            Sign In
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-5 bg-[#0F0F0F] p-3 rounded-lg border border-[#333]">
          <span className="text-sm text-[#FFC93C] truncate">
            Signed in as: {userId}
          </span>
          <button
            onClick={handleLogout}
            className="text-red-400 text-sm hover:underline"
          >
            Logout
          </button>
        </div>
      )}

      {/* ANALOG CLOCK */}
      <div className="relative w-48 h-48 mx-auto my-6 rounded-full border-[6px] border-[#FFC93C] bg-[#0F0F0F] shadow-inner">

        <div
          className="absolute w-2 h-16 bg-[#FF6F3C] rounded bottom-1/2 left-1/2 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
        />

        <div
          className="absolute w-1.5 h-20 bg-white rounded bottom-1/2 left-1/2 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${minDeg}deg)` }}
        />

        <div
          className="absolute w-[2px] h-24 bg-red-500 bottom-1/2 left-1/2 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${secDeg}deg)` }}
        />

        <div className="absolute w-4 h-4 bg-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-[#FFC93C]"
            style={{
              top: "6px",
              left: "50%",
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              transformOrigin: "center 90px",
            }}
          />
        ))}
      </div>

      {/* STOPWATCH */}
      <div className="text-lg text-[#FFC93C] mb-4">
        Time since last click: {formatTime(elapsed)}
      </div>

      {/* COUNT */}
      <div className="text-6xl font-bold text-[#FF6F3C] mb-6">
        {count}
      </div>

      <button
        onClick={handleIncrease}
        className="bg-[#FF6F3C] hover:bg-[#e55a24] w-full py-3 rounded-xl font-semibold transition mb-4"
      >
        Increase Count
      </button>

      {count > 0 && !showSummary && (
  <button
    onClick={handleEndSession}
    className="bg-gray-700 hover:bg-gray-600 w-full py-3 rounded-xl font-semibold transition mb-4"
  >
    End Session
  </button>
)}

<button
  onClick={handleReset}
  className="bg-red-600 hover:bg-red-500 w-full py-3 rounded-xl font-semibold transition mb-4"
>
  Reset Count
</button>


{showSummary && (
  <div className="bg-[#0F0F0F] border border-[#333] p-5 rounded-xl mt-4 text-sm space-y-2">

    <h3 className="text-[#FFC93C] font-semibold mb-2 text-center">
      Session Summary
    </h3>

    <div>Total Counts: <span className="text-[#FF6F3C]">{count}</span></div>

    <div>
      Start Time: {sessionStart?.toLocaleTimeString()}
    </div>

    <div>
      End Time: {sessionEnd?.toLocaleTimeString()}
    </div>

    <div className="text-[#FFC93C]">
      Total Time: {formatTime(totalDuration)}
    </div>

    <div>
      Avg per Count: {formatTime(averageTime)}
    </div>
  </div>
)}


      {userId && (
        <button
          onClick={() => navigate("/count-history")}
          className="border-2 border-[#FFC93C] text-[#FFC93C] w-full py-3 rounded-xl hover:bg-[#FFC93C] hover:text-black transition"
        >
          View Time & Count History
        </button>
      )}

      {!userId && (
        <p className="text-xs text-gray-400 mt-3">
          Guest mode: counts are not saved
        </p>
      )}
    </motion.div>
  );
};

export default CountMachine;
