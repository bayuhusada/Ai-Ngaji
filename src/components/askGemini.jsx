export async function askGeminiFeedback(teksAsli, teksAnak) {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const MODEL = import.meta.env.VITE_MODEL;

  const messages = [
    {
      role: "system",
      content: "Kamu adalah guru mengaji yang sabar dan menyemangati anak-anak."
    },
    {
      role: "user",
      content: `Ini teks ayat: ${teksAsli}\nIni bacaan anak: ${teksAnak}\nTolong beri respon singkat.`
    }
  ];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": "http://localhost:5173", // ganti saat deploy
        "X-Title": "quran-hafalan-app"
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 100
      })
    });

    const data = await response.json();
    console.log("DeepSeek response:", data);

    return data?.choices?.[0]?.message?.content || "❌ Tidak ada jawaban dari AI.";
  } catch (error) {
    return `❌ Error saat menghubungi AI: ${error.message}`;
  }
}
