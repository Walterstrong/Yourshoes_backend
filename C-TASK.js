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
const kopaytirishJavobi = hisob.kopaytirish(3, 4);
const qoshishJavobi = hisob.qoshish(3, 4);
const kvadratYigindisiJavobi = hisob.kvadratYigindisi(3, 4);

console.log("kopaytirishJavobi:", kopaytirishJavobi);
console.log("qoshishJavobi:", qoshishJavobi);
console.log("kvadratYigindisiJavobi:", kvadratYigindisiJavobi);
