let candidate = {
  name: "Nathan",
  username: "Abdukarim",
  age: 28,
  role: "Software Engineer",
  address: "fergana",
};

function elementSoni(candidate) {
  let result = Object.keys(candidate).length;
  return result;
}
const javob = elementSoni(candidate);
console.log("object ichidagi elementlar soni:", javob);
