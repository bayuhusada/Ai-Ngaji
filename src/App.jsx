import React, { useState } from "react";
import SurahPicker from "./components/SurahPicker";
import AyatPicker from "./components/AyatPicker";
import SpeechRecognizer from "./components/SpeechRecognizer";
import { compareText } from "./components/compareText";
import { askGeminiFeedback } from "./components/askGemini";
import { Mic, Book, Star } from "lucide-react";
import '@fontsource/baloo-2'; // default 400 weight


const App = () => {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedAyat, setSelectedAyat] = useState(null);
  const [compareResult, setCompareResult] = useState(null);
  const [speechText, setSpeechText] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);

function speakText(text, lang = "ar-SA") {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // sedikit lebih pelan
  speechSynthesis.speak(utterance);
}
function extractWrongWord(feedback) {
  const match = feedback.match(/kata ['‘“]?([^'’“”]+)['’“”]?/i);
  return match ? match[1] : null;
}


const handleSpeechResult = async (bacaanAnak) => {
  setSpeechText(bacaanAnak);
  setAiFeedback("");
  setIsLoadingAI(true);

  if (selectedAyat) {
    const result = compareText(selectedAyat.text, bacaanAnak);
    setCompareResult(result);

    const ai = await askGeminiFeedback(selectedAyat.text, bacaanAnak);
    setAiFeedback(ai);

    // 🔊 Tambah bagian ini:
    const salah = extractWrongWord(ai);
    if (salah) {
      setTimeout(() => speakText(salah), 1500); // jeda 1.5 detik
    }
  }

  setIsLoadingAI(false);
};


  return (
    <div className="min-h-screen bg-[#FFF1CA] p-6 font-baloo text-[#2D4F2B]">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-3xl shadow-lg border border-[#708A58]">

        {/* Header */}
        <h1 className="text-3xl text-center font-bold mb-6">🌙 Hafalan Qur'an Interaktif</h1>

        {/* Surah Picker */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Book className="text-[#708A58]" />
            <span className="font-semibold">Pilih Surah:</span>
          </div>
          <SurahPicker
            onSurahChange={(surah) => {
              setSelectedSurah(surah);
              setSelectedAyat(null);
              setCompareResult(null);
              setSpeechText("");
              setAiFeedback("");
            }}
          />
        </div>

        {/* Ayat Picker */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Book className="text-[#708A58]" />
            <span className="font-semibold">Pilih Ayat:</span>
          </div>
          <AyatPicker
            surah={selectedSurah}
            onAyatSelect={(ayat) => {
              setSelectedAyat(ayat);
              setCompareResult(null);
              setSpeechText("");
              setAiFeedback("");
            }}
          />
        </div>

        {/* Teks & Audio Ayat */}
        {selectedAyat && (
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold mb-2">📖 Teks Ayat:</h2>
            <p className="text-3xl text-right font-arabic mb-4">{selectedAyat.text}</p>
            <audio controls className="w-full rounded-md">
              <source src={selectedAyat.audio} type="audio/mp3" />
            </audio>
          </div>
        )}

        {/* Mic Button */}
        {selectedAyat && (
          <div className="flex justify-center mb-6">
          </div>
        )}

        {/* Speech Recognition */}
        {selectedAyat && <SpeechRecognizer onResult={handleSpeechResult} />}

        {/* Hasil Skor */}
        {compareResult && (
          <div className="mt-4 p-4 bg-white rounded-xl shadow text-center border-l-8 border-[#FFB823]">
            <p className="text-2xl font-bold">
              🎯 Kecocokan: {compareResult.similarity.toFixed(0)}%
            </p>

            {compareResult.similarity >= 90 && (
              <p className="text-green-600 font-bold mt-2">
                ✅ Wahh sudah mantap! Lanjut ke ayat berikutnya 💪
              </p>
            )}
            {compareResult.similarity >= 70 && compareResult.similarity < 90 && (
              <p className="text-yellow-600 font-semibold mt-2">
                🔁 Hampir benar! Sedikit lagi, coba ulangi ya 😊
              </p>
            )}
            {compareResult.similarity < 70 && (
              <p className="text-red-600 font-semibold mt-2">
                😅 Wah masih ada yang salah, coba ulangi lagi yuk!
              </p>
            )}
          </div>
        )}

        {/* Perbandingan Ayat */}
        {compareResult && selectedAyat && speechText && (
          <div className="mt-6 bg-[#FFF1CA] p-4 rounded-xl border border-[#708A58] shadow">
            <h3 className="font-bold mb-2">🔍 Perbandingan Bacaan</h3>
            <div className="text-right text-2xl font-arabic bg-white p-2 mb-2 rounded">
              <span className="block text-sm text-gray-500 text-left">🧕 Ayat Asli:</span>
              {selectedAyat.text}
            </div>
            <div className="text-right text-2xl font-arabic bg-white p-2 rounded">
              <span className="block text-sm text-blue-500 text-left">👧 Bacaanmu:</span>
              {speechText}
            </div>
          </div>
        )}

        {/* Loading AI */}
        {isLoadingAI && (
          <div className="mt-6 flex items-center justify-center gap-2 text-[#708A58]">
            <span className="animate-spin h-5 w-5 border-2 border-t-transparent border-[#708A58] rounded-full"></span>
            <span>Menunggu jawaban AI...</span>
          </div>
        )}

        {/* Feedback AI */}
        {aiFeedback && (
          <div className="mt-6 p-4 bg-[#FFFBF0] border border-[#FFB823] rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-[#FFB823] w-5 h-5" />
              <h3 className="text-[#2D4F2B] font-bold">🤖 Feedback Ustadz AI:</h3>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{aiFeedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
