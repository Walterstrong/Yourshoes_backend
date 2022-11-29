let sonlar = [1, 2, 3, 4, 10, 5, 6, 7, 8];
function test(sonlar) {
  const a = Math.max(...sonlar);
  return a;
}

const result = test(sonlar);
console.log(result);
