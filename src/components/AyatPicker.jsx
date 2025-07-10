import React, { useEffect, useState } from "react";
import axios from "axios";

const AyatPicker = ({ surah, onAyatSelect }) => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!surah) return;

    setLoading(true);
    axios
      .get(`https://api.alquran.cloud/v1/surah/${surah.number}/ar.alafasy`)
      .then((res) => {
        setVerses(res.data.data.ayahs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch ayat:", err);
        setLoading(false);
      });
  }, [surah]);

  const handleChange = (e) => {
    const selected = verses.find((v) => v.numberInSurah === parseInt(e.target.value));
    onAyatSelect(selected);
  };

  if (!surah) return null;

  return (
    <div className="mb-4">
      <label className="block font-semibold text-gray-700 mb-1">Pilih Ayat:</label>
      {loading ? (
        <p>Memuat ayat...</p>
      ) : (
        <select onChange={handleChange} className="w-full p-2 border rounded bg-white">
          <option value="">-- Pilih Ayat --</option>
          {verses.map((ayah) => (
            <option key={ayah.number} value={ayah.numberInSurah}>
              Ayat {ayah.numberInSurah}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AyatPicker;
