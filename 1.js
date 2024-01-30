//Regular functions run synchronously, one after the other.
// Execution waits for each line to finish before moving on to the next.

function regular() {
  console.log("1");
  console.log("2");
}
regular();
console.log("3");

function fetchData() {
  return new Promise(function (resolve, reject) {
    // Asynchronous code (e.g., fetching data)
    setTimeout(function () {
      const success = true;
      if (success) {
        const data = "Data";
        resolve(data);
      } else {
        reject("Error fetching data");
      }
    }, 1000);
  });
}

fetchData()
  .then(function (data) {
    // Handle resolved data
    console.log(data);
  })
  .catch(function (error) {
    // Handle rejected/error case
    console.error(error);
  });

//Functions with Promises allow asynchronous operations.
// Promises provide a way to handle the result (resolved) or error (rejected) of an asynchronous operation.

async function asyncFunction() {
  // Asynchronous code (e.g., fetching data)
  console.log("5");
  const data = await fetchData();
  console.log(data);
}

asyncFunction();

//async functions are a syntactic sugar for working with Promises.
//await can be used inside async functions to pause execution until the promise is resolved, making asynchronous code look more like synchronous code

// Regular Functions: Run synchronously, line by line.

// Functions with Promises: Allow handling asynchronous operations using .then() and .catch().

// Functions with async/await: Syntactic sugar for Promises, making asynchronous code look more like synchronous code.
