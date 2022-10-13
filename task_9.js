// nullish bu mantiqiy operator hissoblanadi, yani biror variableni qiymatga tenglaganimzda qiymatdan so'ng ishlatiladi va o'zidan so'ng doimo qiymat yetaklab keladi, yani o'zidan so'ng biror qiymat yozishni talab qiladi. Agar nullish mantiqiy operatoridan oldingi qiymat null yoki undefined bo'lsa u qiymat variablega qiymat sifatida o'zidan o'ng tomondagi qiymatni qaytaradi, agar o'zidan oldingi qiymat null yoki undefineddan tashqari qiymat bo'lsa u holda shu qiymatni o'zini qaytaradi

const nullValue = null;
const emptyText = "";
let someNumber;

const valA = nullValue ?? "default for A"; // qiymat null bo'lganligi uchun biz o'ng tomondagi qiymatni qabul qilamiz
const valB = emptyText ?? "default for B"; // string ichi bo'sh lekin null yoki undefined emas, qiymat sifatida string ichi qaytadi
const valC = someNumber ?? 0; // qiymat undefined, shuning uchun 0 qiymat sifatida qaytadi

console.log(valA); // "default for A"
console.log(valB); // "" (as the empty string is not null or undefined)
console.log(valC);
