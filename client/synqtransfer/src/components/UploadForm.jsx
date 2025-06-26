import React, { useState } from 'react';
import { FiUploadCloud, FiFolderPlus, FiCheckCircle, FiCopy, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS, WS_ENDPOINTS } from '../config/apiConfig';

const UploadForm = ({ setSubmitted, setLink, setStatus }) => {
  const [files, setFiles] = useState([]);
  const [emailTo, setEmailTo] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [option, setOption] = useState('link');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileURL, setFileURL] = useState(null);
  const [copyText, setCopyText] = useState('Copy Link');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const uploadViaWebSocket = (file, metadata, onProgress, onSuccess, onError) => {
  const socket = new WebSocket(WS_ENDPOINTS.FILE_UPLOAD); // Update to your backend address

  let offset = 0;
  const CHUNK_SIZE = 1024 * 1024; // 1MB

  socket.binaryType = 'arraybuffer';

  socket.onopen = () => {
    socket.send(JSON.stringify({ ...metadata, filename: file.name, size: file.size }));
  };

  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === 'start') {
      sendChunk();
    }

    if (msg.type === 'done') {
      onSuccess(msg.uuid);
      socket.close();
    }

    if (msg.type === 'error') {
      onError(msg.error);
      socket.close();
    }
  };

  socket.onerror = (e) => {
    onError('WebSocket error occurred.');
  };

  const sendChunk = () => {
    if (offset >= file.size) {
      socket.send(new Uint8Array()); // signal EOF
      return;
    }

    const reader = new FileReader();
    const nextSlice = file.slice(offset, offset + CHUNK_SIZE);

    reader.onload = () => {
      socket.send(reader.result);
      offset += CHUNK_SIZE;
      onProgress(Math.min(100, Math.round((offset * 100) / file.size)));
      setTimeout(sendChunk, 0); // async next chunk
    };

    reader.onerror = () => {
      onError('Failed to read file chunk.');
      socket.close();
    };

    reader.readAsArrayBuffer(nextSlice);
  };
};

  const handleSubmit = async () => {
  // Validation
  if (!files || files.length === 0) {
      return setError("📂 Please choose one or more files.");
    }

  if (!emailTo || !yourEmail || !title || !message)
    return setError('⚠️ All fields must be filled out to continue.');

  const file = files[0]; // for simplicity, upload one file at a time
  const largeFileThreshold = 2 * 1024 * 1024 * 1024; // 2GB

  setLoading(true);
  setProgress(0);
  setError('');

  const metadata = {
    toEmail: emailTo,
    fromEmail: yourEmail,
    title,
    message,
    option,
    forceS3: file.size > largeFileThreshold
  };

  // If file is large or user forces it, use WebSocket
  if (file.size > largeFileThreshold) {
    uploadViaWebSocket(
      file,
      metadata,
      (percent) => setProgress(percent),
      async (uuid) => {
        const shortUrl = `${window.location.origin}/api/files/${uuid}`;
        setFileURL(shortUrl);
        setShowSuccess(true);
        setLoading(false);
        setProgress(0);
      },
      (errMsg) => {
        setError(errMsg);
        setLoading(false);
        setProgress(0);
      }
    );
  } else {
  const formData = new FormData();
  files.forEach((f) => {
  formData.append("files", f); // 'files' must match backend multer config
    });
  formData.append("toEmail", emailTo);
  formData.append("fromEmail", yourEmail);
  formData.append("title", title);
  formData.append("message", message);
  formData.append("option", option);

  try {
    setLoading(true);
    const res = await axios.post(API_ENDPOINTS.UPLOADFILE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
       timeout: 0,
      onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        }
    });

    console.log("✅ Upload response:", res.data); // Optional: debug

    setLoading(false);
    setFileURL(res.data.file); // ✅ fix: use res.data.file instead of res.data.link
    setShowSuccess(true);
    setProgress(0);
    setError('');
  } catch (err) {
    setLoading(false);
    setError('❌ Upload failed. Please try again.');
    console.error(err);
    setProgress(0);
  }
  }
};

  const handleCopy = () => {
    navigator.clipboard.writeText(fileURL);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy Link'), 5000);
  };

  const resetForm = () => {
    setFiles([]); 
    setEmailTo('');
    setYourEmail('');
    setTitle('');
    setMessage('');
    setOption('link');
    setShowSuccess(false);
    setCopyText('Copy Link');
  };

  const closeModal = () => setError('');

  return (
    <div className="relative bg-[#FFFFFF] text-[#232323] rounded-xl shadow-lg p-6 w-full max-w-md">
      {/* Error Modal */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 top-5 left-5 right-5 bg-red-50 border border-red-300 rounded-lg p-4 shadow"
          >
            <div className="flex items-start gap-3">
              <FiAlertCircle className="text-red-500 mt-1 text-xl" />
              <div className="text-sm text-red-700">{error}</div>
              <button onClick={closeModal} className="ml-auto text-red-600 font-bold hover:underline">X</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Success Modal */}
      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <FiCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Upload Successful!</h2>
              <p className="mb-4">Your file has been uploaded and is ready to be shared.</p>
              <div className="bg-[#F9F9F9] rounded p-3 mb-4">
                <p className="break-words text-sm mb-2">{fileURL}</p>
                <button
                  onClick={handleCopy}
                  className="text-sm bg-[#FF6F3C] text-white py-1 px-4 rounded hover:bg-[#e45e2e]"
                >
                  {copyText}
                </button>
              </div>
              <button
                onClick={resetForm}
                className="text-sm text-[#FF6F3C] underline hover:text-[#e45e2e]"
              >
                Want to upload another file?
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4">Request files</h2>

            {files.length > 0 && (
              <div className="bg-[#F9F9F9] p-2 rounded text-sm mb-4 max-h-40 overflow-auto">
                <p className="font-semibold mb-1">Selected files:</p>
                <ul className="list-disc pl-5 text-xs">
                  {files.map((f, i) => (
                    <li key={i}>{f.webkitRelativePath || f.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="flex flex-col items-center justify-center border border-dashed rounded-lg py-6 bg-[#F9F9F9] hover:bg-[#EEE] cursor-pointer transition">
                <FiUploadCloud className="text-2xl mb-2" />
                Add files
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                />
              </label>
              <label className="flex flex-col items-center justify-center border border-dashed rounded-lg py-6 bg-[#F9F9F9] hover:bg-[#EEE] cursor-pointer transition">
                <FiFolderPlus className="text-2xl mb-2" />
                Add folders
               <input
                  type="file"
                  className="hidden"
                  webkitdirectory="true"
                  directory="true"
                  multiple
                  onChange={(e) => {
                    const selected = Array.from(e.target.files);
                    if (!selected || selected.length === 0) {
                      setError("⚠️ Folder upload is not supported in this browser.");
                      return;
                    }
                    setFiles(selected);
                  }}
                />

              </label>
            </div>


            {/* <p className="text-xs text-[#7D7D7D] mb-4">
              Get unlimited transfers <span className="text-[#FF6F3C] cursor-pointer">⚡ Increase limit</span>
            </p> */}

            <input
              type="email"
              placeholder="Email to"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              className="w-full mb-2 border px-3 py-2 rounded text-sm"
            />
            <input
              type="email"
              placeholder="Your email"
              value={yourEmail}
              onChange={(e) => setYourEmail(e.target.value)}
              className="w-full mb-2 border px-3 py-2 rounded text-sm"
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-2 border px-3 py-2 rounded text-sm"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mb-3 border px-3 py-2 rounded text-sm"
              rows="3"
            ></textarea>

            <div className="mb-4 text-sm text-[#232323]">
              <p className="mb-2 font-medium">Delivery Method</p>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value="link"
                    checked={option === 'link'}
                    onChange={() => setOption('link')}
                  />
                  <span>Generate Link</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value="email"
                    checked={option === 'email'}
                    onChange={() => setOption('email')}
                  />
                  <span>Send Email</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between border rounded px-3 py-2 mb-4 text-sm bg-[#F9F9F9]">
              <div className="flex items-center gap-2">
                <span role="img" aria-label="calendar">🗓️</span>
                <select className="bg-transparent outline-none text-sm">
                  <option value="24h">Expires in 24 hours</option>
                </select>
              </div>
              <div className="text-xl text-[#999]">⋮</div>
            </div>

            {loading && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-[#FF6F3C] h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#FF6F3C] hover:bg-[#e45e2e] text-white font-medium py-2 rounded"
            >
              {loading ? 'Uploading...' : 'Continue'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
     {loading && (
  <div className="flex justify-center items-center my-4">
    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
      <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="#FF6F3C"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 35}
          strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 35}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: 'bold',
          fontSize: '14px',
          color: '#232323',
        }}
      >
        {progress}%
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default UploadForm;
