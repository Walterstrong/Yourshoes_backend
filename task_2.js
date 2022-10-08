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
