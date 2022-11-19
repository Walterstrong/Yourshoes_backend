//**********************************************************************************************************************************
//*                                                                                                                                *
//*                                                   1-MASALA                                                                     *
//*                                                                                                                                *
//*                                                                                                                                *
//**********************************************************************************************************************************

//Berilagan ikki argumentning umumiy yig'indisi yoki ularni birining qiymati 10 ga teng bo'lganda bizga funksiya true qaytarsin, aks holda false qaytarsin
// function makes10(a, b) {
//   if (a == 10 || b == 10 || a + b == 10) {
//     return true;
//   } else {
//     return false;
//   }
// }
// const first = makes10(5, 4);
// const second = makes10(6, 4);
// const third = makes10(7, 8);
// console.log(first, second, third);

//**********************************************************************************************************************************
//*                                                                                                                                *
//*                                                   2-MASALA                                                                     *
//*                                                                                                                                *
//*                                                                                                                                *
//**********************************************************************************************************************************

// berilgan argumentlar biri 100 dan katta va ikkinchisi 0 dan kichkina bo'lgan holatlardagina bizga true qiymati qaytsin
// function icyHot(a, b) {
//   if ((a > 100 && b < 0) || (a < 0 && b > 100)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// const first = icyHot(101, -1);
// const second = icyHot(102, 4);
// const third = icyHot(120, -8);
// console.log(first, second, third);

//**********************************************************************************************************************************
//*                                                                                                                                *
//*                                                   3-MASALA                                                                     *
//*                                                                                                                                *
//*                                                                                                                                *
//**********************************************************************************************************************************

// berilgan stringdagi e harflari soni 1 va 3ni orasida bo'lsa true aks holda flase qaytarsin

// let first = "hello";
// let second = "heelooo";
// let third = "heeeey";

// function limitE(a) {
//   let n = a.length;
//   let count = 0;

//   for (let i = 0; i < n; i++) {
//     if (a[i] == "e") {
//       count++;
//     }
//   }
//   if (count >= 1 && count <= 3) {
//     return true;
//   }
//   return false;
// }

// const case1 = limitE(first);
// const case2 = limitE(second);
// const case3 = limitE(third);

// console.log(case1, case2, case3);

//**********************************************************************************************************************************
//*                                                                                                                                *
//*                                                   4-MASALA                                                                     *
//*                                                                                                                                *
//*                                                                                                                                *
//**********************************************************************************************************************************

// berilgan integerning 100 yoki 200 ga yaqinlik darajasi 10 dan kichik yoki teng bo'lsa bizga true aks holda false bersin

// function nearHundred(n) {
//   let result1 = Math.abs(n - 100);
//   let result2 = Math.abs(n - 200);

//   if (result1 <= 10 || result2 <= 10) {
//     return true;
//   }
//   return false;
// }

// const case1 = nearHundred(5);
// const case2 = nearHundred(210);
// const case3 = nearHundred(89);

// console.log(case1, case2, case3);
