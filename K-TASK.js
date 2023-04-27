// let sonlar = [1, 2, 3, 4, 10, 5, 6, 7, 8];
// function test(sonlar) {
//   const a = Math.max(...sonlar);
//   return a;
// }

// const result = test(sonlar);
// console.log(result);

function countLetterOccurrences(letter, word) {
  let count = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      count++;
    }
  }

  return count;
}

// Example usage:
let letter = "a";
let word = "banana";
let occurrences = countLetterOccurrences(letter, word);
console.log(
  `The letter '${letter}' occurs ${occurrences} times in the word '${word}'.`
);
