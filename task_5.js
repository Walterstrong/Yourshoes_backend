//5
// Izoh: Bu yerda dastlab bitta array yasab oldik, hamda ikkita qiymat qabul qiluvchi funksiya yasab oldik. Funksiya qabul qiluvchi birinchi qiymat array sifatida, ikkinchisini string sifatida beldiladik. So'ng funksiya ichiga array ichidagi ikkinchi qiymat bo'lmish string bo'lsa arrray bizga stringdan tashqari boshqa qiymatlarni qaytarishi bo'yicha shart belgiladik.

console.log("**************beshinchi topshiriq***************");
const AutoCompanies = ["Tesla", "BMW", "UzAuto", "Volvo", "Ford"];

const recommendAutos = (myRecommend, yourRecommend) => {
  const indexOfEle = AutoCompanies.findIndex((ele) => ele === yourRecommend);
  if (indexOfEle !== -1) {
    AutoCompanies.splice(indexOfEle, 1);
    return AutoCompanies;
  } else return AutoCompanies;
};

console.log(
  "Tavsiya qilingan mashinalar:",
  recommendAutos(AutoCompanies, "UzAuto")
);
