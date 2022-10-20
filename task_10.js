// let years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2034];

// const beginningSundayYears = years.filter(function (year) {
//   const yakshanba = new Date(year, 0, 1);
//   if (yakshanba.getDay() === 0) {
//     return [year];
//   }
// });

// console.log("natija:", beginningSundayYears);

function givemeyear(a, b) {
  for (let i = a; i >= b; i++) {
    const Yakshanba = new Date(i, 0, 1);
    if (Yakshanba.getDay() === 0) {
      return i;
    }
  }
}
const result = givemeyear(2014, 2034);
console.log(result);

// function getMeSundays(a, b) {
//   for (let i = a; i >= b; i++) {
//     const yakshanba = new Date(i, 0, 1);
//     if (yakshanba.getDay() === 0) {
//       return [i];
//       // if ((yakshanbalar = sunday)) {
//       //   return true;
//     }
//     // return yakshanbalar;
//   }
// }

// const result = getMeSundays(2014, 2045);
// console.log("natija:", result);
// var freqAlphabets = function (sfsdsffds) {
//   const alphabets = "abcdefghijklmnopqrstuvwxyz";
//   let resArr = [];

//   for (let i = 0; i < s.length; i++) {
//     if (s[i + 2] === "#") {
//       resArr.push(s[i] + s[i + 1]);
//       i += 2;
//     } else {
//       resArr.push(s[i]);
//     }
//   }

//   return resArr.map((num) => alphabets[num - 1]).join("");
// };
// console.log(freqAlphabets);

// let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let regexp = /[a-z]/gi - 1;
// console.log(str.match(regexp));

// const regExpStr = "^([a-z0-9]{Y,})$";
// const result = new RegExp(regExpStr, "g").test("Your string"); // here I have used 'g' which means global search
// console.log(result); // true if it matched, false if it doesn't

// console.log(/^[a-z\d]{5,}$/.test("abc123"));

// console.log(/^[a-z\d]{5,}$/.test("ab12"));

// let reg = /[a-zA-Z0-9]+/g;
// let txt = "hello";
// let matches = reg.exec(txt)[0] == txt;
// console.log(`It ${matches ? "does" : "doesn't"} match`);
