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

let years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2034];

// function getMeSundays(years) {
//   for (let i = years[0]; i >= years.length - 1; i++) {
//     const yakshanba = new Date(i, 0, 1);
//     if (yakshanba.getDay() === 0) {
//       return [i];
//     }
//   }
// }
const beginningSundayYears = years.filter(function (year) {
  const yakshanba = new Date(year, 0, 1);
  if (yakshanba.getDay() === 0) {
    return [year];
  }
});

// const result = getMeSundays(years);
console.log("natija:", beginningSundayYears);
