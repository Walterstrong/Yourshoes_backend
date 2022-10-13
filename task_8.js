let a = [1, 2, 3, 6, 5, 4];
let b = [1, 2, 3, 4, 5, 6];

const taqqoslash = (a, b) => {
  if (a.length !== b.length) return false;

  const result = a.map((val) => b.includes(val));
  return !result.includes(false);
};

let natija = taqqoslash(a, b);
console.log("javob:", natija);

const nullValue = null;
const emptyText = ""; // falsy
let someNumber;

const valA = nullValue ?? "default for A";
const valB = emptyText ?? "default for B";
const valC = someNumber ?? 0;

console.log(valA); // "default for A"
console.log(valB); // "" (as the empty string is not null or undefined)
console.log(valC);
