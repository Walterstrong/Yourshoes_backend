var Integars = 1248151;
var temp = {};

function findMostRepeated(Integars) {
  const arr = Array.from(String(Integars), Number);

  for (let i = 0; i < arr.length; i++) {
    if (temp[arr[i]] == undefined) {
      temp[arr[i]] = 1;
    } else {
      temp[arr[i]] += 1;
    }
  }

  let max = 0,
    maxEle;

  for (const i in temp) {
    if (temp[i] > max) {
      max = temp[i];
      maxEle = i;
    }
  }
  console.log(
    `Eng ko'p qaytarilgan element: ${maxEle}, uning takrorlanishlari soni: ${max}`
  );
}

const result = findMostRepeated(Integars);
