//1
// Izoh: Bu yerda biz array ichidagi sonlarni reverse metodidan foydalanmagan holatda teskari ravishda yozdik
console.log("**************birinchi topshiriq***************");

const original_array = [2, 34, 1, 34, 54, 4, 109, 45, 999, 5, 23];
const reversed_array = [];

console.log("Original Array: ", original_array);

for (let i = original_array.length - 1; i >= 0; i--) {
  reversed_array.push(original_array[i]);
}
console.log("Reversed Array: ", reversed_array);
