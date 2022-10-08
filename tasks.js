//1
// Izoh: Bu yerda biz array ichidagi sonlarni reverse metodidan foydalanmagan holatda teskari ravishda yozdik
console.log("**************birinchi topshiriq***************");

const original_array = [2, 34, 1, 34, 54, 4, 109, 45, 999, 5, 23];
const reversed_array = [];

console.log("Original Array: ", original_array);

for (let i = original_array.length - 1; i >= 0; i--) {
  reversed_array.push(original_array[i]);
}
console.log("Reversed Array: ", reversed_array);

//2
// Izoh: Bu yerda biz array ichidagi sonlarni juft hamda toq sonlarga, arrayning filter metodidan foydalanga holda alohida arraylarga ajratgan holatda yozdik.

console.log("**************ikkinchi topshiriq***************");

const sonlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const juftSonlar = sonlar.filter(function (son) {
  return son % 2 === 0;
});
const toqSonlar = sonlar.filter(function (son) {
  return son % 2 !== 0;
});
console.log("juftSonlar=>:", juftSonlar);
console.log("toqSonlar=>:", toqSonlar);

//3
// Izoh: Bu yerda biz array ichidan faqatgina qiymatlarni hosil qilib oldik
console.log("**************uchinchi topshiriq***************");
const aralash = ["nok", "olma", "gilos", null, null];

const faqatMevalar = aralash.filter(function (mevalar) {
  return mevalar;
});

console.log("faqatMevalar:", faqatMevalar);

//4
// Izoh: Bu yerda Admin objectini hosil qildik, hamda uning ichiga ism va parol qabul qilish funksiya yaratdik,so'ng unga yangi shart belgiladik, belgilangan shartni tekshirish maqsadida 2 ta yangi Adminnning qiymatalarini kiritib funksiyani ishga tushiridik
console.log("**************to'rtinchi topshiriq***************");
const Admin = {
  adminInput(ism, password) {
    if (ism.length >= 4 && password.length >= 4) {
      console.log("WELCOME", ism);
    } else
      console.log("Iltimos eng kamida to'rt xonali ism yoki raqam kiriting!");
  },
};

Admin.adminInput("Walter", "1234");

Admin.adminInput("Lee", "111");

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

//Darsdagi topshiriq
console.log("**************Darsdagi topshiriq***************");
const ismlar = ["shawn", "walter", "leo", "ravshan", "john"];
const ikkiTalaba = ["shawn", "leo"];
const result = ismlar.filter((ele) => {
  if (ikkiTalaba.includes(ele)) {
    return true;
  } else return false;
});
console.log(result);
