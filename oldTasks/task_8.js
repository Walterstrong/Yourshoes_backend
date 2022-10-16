// Bu holda ikkita array functin ichiga argument sifatida pass qilinayabdi. Function shartiga esa, agar ikkala array qiymatlari to'liq bir-birida mavjuda bo'lsa true aks holda esa false qilib qaytarsin mazmunida logica kiritiliyabdi. Darvoqea, agar ikkala array uzunliklari teng bo'lmagan holatda darhol false qiymati qaytadi.
let a = [1, 2, 3, 6, 5, 4];
let b = [1, 2, 3, 4, 5, 6];

const taqqoslash = (a, b) => {
  if (a.length !== b.length) return false;

  const result = a.map((val) => b.includes(val));
  return !result.includes(false);
};

let natija = taqqoslash(a, b);
console.log("javob:", natija);
