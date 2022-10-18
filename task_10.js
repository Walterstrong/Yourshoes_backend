let array = [
  ["ab", "cd"],
  ["hello", "hi"],
  ["me", "one"],
];
function convertor(array) {
  const Flat = array.flat();
  const Join = Flat.join("");
  return Join;
}

const result = convertor(array);
console.log("natija:", result);
