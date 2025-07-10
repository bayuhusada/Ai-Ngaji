export function normalizeArabic(str) {
  return str
    .replace(/[ًٌٍَُِّْٰ]/g, "") // hapus harakat
    .replace(/ٱ/g, "ا")
    .replace(/\u200f|\u200e|\uFEFF/g, "")
    .trim();
}

export function compareText(actual, spoken) {
  const a = normalizeArabic(actual);
  const b = normalizeArabic(spoken);

  const aWords = a.split(" ");
  const bWords = b.split(" ");

  let correct = 0;
  aWords.forEach((word, i) => {
    if (word === bWords[i]) correct++;
  });

  const similarity = (correct / aWords.length) * 100;

  return {
    similarity,
    matched: correct,
    total: aWords.length,
  };
}
