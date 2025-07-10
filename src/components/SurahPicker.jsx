import React, { useEffect, useState } from "react";
import axios from "axios";

const SurahPicker = ({ onSurahChange }) => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.alquran.cloud/v1/surah")
      .then((res) => {
        setSurahs(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch surah:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const selected = surahs.find((s) => s.number === parseInt(e.target.value));
    onSurahChange(selected);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold text-gray-700 mb-1">Pilih Surah:</label>
      {loading ? (
        <p>Memuat daftar surah...</p>
      ) : (
        <select
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white shadow"
        >
          <option value="">-- Pilih Surah --</option>
          {surahs.map((surah) => (
            <option key={surah.number} value={surah.number}>
              {surah.number}. {surah.englishName} ({surah.name})
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SurahPicker;
