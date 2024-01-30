//3
// Izoh: Bu yerda biz array ichidan faqatgina qiymatlarni hosil qilib oldik
console.log("**************uchinchi topshiriq***************");
const aralash = ["nok", "olma", "gilos", null, null];

const faqatMevalar = aralash.filter(function (mevalar) {
  return mevalar;
});

console.log("faqatMevalar:", faqatMevalar);
