📖 Hafalan Qur'an Interaktif
Aplikasi web interaktif untuk membantu anak-anak belajar menghafal Al-Qur'an menggunakan fitur audio, speech recognition, dan AI feedback yang ramah anak.

Web ini memberikan pengalaman belajar menyenangkan dengan:

🎧 Pemutaran audio ayat

🎙️ Perekaman suara bacaan anak

✅ Pengecekan kemiripan bacaan

🤖 Umpan balik motivatif dari AI

✨ UI ramah anak dengan warna-warna ceria dan ikon menarik

🚀 Fitur Utama
Picker Surah & Ayat
Pilih surah dan ayat yang ingin dipelajari langsung dari API Al-Qur'an.

Pemutar Audio & Teks Ayat
Anak dapat mendengarkan ayat dan membaca teks Arabnya.

Rekaman Suara (Speech Recognition)
Anak membaca ayat dengan mikrofon, lalu AI akan mengenali suaranya.

Skor Kecocokan & Motivasi
Sistem menghitung kesamaan bacaan anak dengan ayat asli dan memberi semangat sesuai hasilnya.

Feedback AI (DeepSeek / Gemini)
AI akan memberikan umpan balik singkat seperti guru ngaji yang ramah.

🛠️ Teknologi yang Digunakan
React.js + Vite

Tailwind CSS v4

Lucide React Icons

Web Speech API (Speech Recognition)

DeepSeek API (AI Feedback)

Al-Qur'an Cloud API (Data ayat, audio, dan surah)

🔗 Sumber API
📚 Al-Qur'an Cloud API
Menyediakan teks ayat, terjemahan, dan audio:
🔗 https://alquran.cloud/api

Contoh endpoint:
https://api.alquran.cloud/v1/surah/{surah_number}
https://api.alquran.cloud/v1/ayah/{surah_number}:{ayah_number}/ar.alafasy

🤖 DeepSeek AI via OpenRouter
Untuk AI feedback (dengan model seperti deepseek/deepseek-r1-0528:free):
🔗 https://openrouter.ai

📝 Cara Setup
1. Clone Repo
2. Install Dependency
npm install
3. Buat File .env
VITE_API_URL=https://openrouter.ai/api/v1/chat/completions
VITE_API_KEY=sk-xxxxxx (isi key kamu)
VITE_MODEL=deepseek/deepseek-r1-0528:free
3. Jalankan App
npm run dev

🖼️ Tampilan UI
UI ramah anak dengan warna ceria seperti:

🟢 #2D4F2B (Hijau Tua)

🟡 #FFB823 (Kuning Cerah)

🧡 #FFF1CA (Kuning Muda)

💚 #708A58 (Hijau Lembut)

💡 Rencana Fitur Selanjutnya

Menyimpan progres hafalan anak
Memeberikan Reward ketika sudah anak sudah menghafal

UI/UX untuk anak usia dini (besar teks dan icon)