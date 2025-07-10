import React, { useState, useRef } from "react";
import { Mic } from "lucide-react";

const SpeechRecognizer = ({ onResult }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser tidak mendukung SpeechRecognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setResult(spoken);
      onResult?.(spoken);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Terjadi kesalahan saat merekam suara.");
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="mt-6 p-4 bg-[#FFF1CA] rounded-xl border border-[#708A58] shadow font-baloo">
      <h3 className="text-lg font-semibold mb-4 text-[#2D4F2B]">🎙️ Rekam Suara Hafalan</h3>

      {/* Tombol mic */}
      <div className="flex justify-center">
        <button
          onClick={isRecording ? stopListening : startListening}
          className={`w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 ${
            isRecording ? "bg-red-500" : "bg-[#FFB823]"
          }`}
          aria-label="Tombol Rekam"
        >
          <Mic className="w-10 h-10 text-white" />
        </button>
      </div>

      {/* Hasil Bacaan */}
      {result && (
        <div className="mt-4 text-right">
          <p className="text-sm text-[#2D4F2B] mb-1">📖 Hasil Bacaan:</p>
          <p className="text-2xl font-arabic bg-white p-3 rounded border border-[#708A58]">
            {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default SpeechRecognizer;
