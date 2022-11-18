let arr = ["20", "120", "111", "215", "215", "54", "120", "78"];
let n = arr.length;

let highest = -Infinity;
let secondHighest = -Infinity;

function findSecondLargest(arr) {
  for (let i = 0; i < n; i++) {
    highest = Math.max(highest, arr[i]);
  }

  for (let i = 0; i < n; i++) {
    if (arr[i] < highest) {
      secondHighest = Math.max(secondHighest, arr[i]);
    }
  }

  return secondHighest;
}

const result = findSecondLargest(arr);

console.log("bizning arrayimizdagi ikkinchi eng katta son:", result);
