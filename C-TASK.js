//
const qiymat = "abcdef";
const qiymat_2 = "defghijkl";

function findSimilarLetters(qiymat, qiymat_2) {
  const arr_1 = qiymat.split("");
  const arr_2 = qiymat_2.split("");

  const natija = arr_1.filter((ele) => {
    if (arr_2.includes(ele)) {
      return true;
    }
  });

  return natija;
}

const result = findSimilarLetters(qiymat, qiymat_2);

console.log(result);
