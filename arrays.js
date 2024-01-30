let example1 = ["apple", "banana"];
example1.push("orange", "grape");
console.log(example1); // ['apple', 'banana', 'orange', 'grape']

//
let example2 = ["apple", "banana", "orange"];
let removed = example2.pop();
console.log(removed); // 'orange'
console.log(example2); // ['apple', 'banana']

//
let example3 = ["apple", "banana", "orange"];
let removedFirstl = example3.shift();
console.log(removedFirstl); // 'apple'
console.log(example3); // ['banana', 'orange']

//
let example4 = ["banana", "orange"];
example4.unshift("apple", "grape");
console.log(example4); // ['apple', 'grape', 'banana', 'orange']

//
let example5 = ["apple", "banana"];
let example6 = ["carrot", "broccoli"];
let combined = example5.concat(example6);
console.log(combined); // ['apple', 'banana', 'carrot', 'broccoli']

//
let example7 = ["apple", "banana", "orange", "grape"];
let sliced = example7.slice(1, 3);
console.log(sliced); // ['banana', 'orange']

//
let example8 = ["apple", "banana", "orange", "grape"];
example8.splice(1, 2, "kiwi", "melon");
console.log(example8); // ['apple', 'kiwi', 'melon', 'grape']
