class Hisoblash {
  constructor(one, two) {
    this.one = one;
    this.two = two;
  }

  kopaytirish(one, two) {
    return one * two;
  }

  qoshish(one, two) {
    return one + two;
  }
  kvadratYigindisi(one, two) {
    return one ** 2 + two ** 2;
  }
}
const hisob = new Hisoblash();
const result1 = hisob.kopaytirish(3, 4);
const natija = hisob.qoshish(3, 4);
const javob = hisob.kvadratYigindisi(3, 4);

console.log(result1);
console.log(natija);
console.log(javob);
