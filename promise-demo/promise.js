
// A Promise construction function takes an argument. 
  // The argument is a function with two parameters--resolve and reject.
//
const p = new Promise((resolve, reject) => {
  // Do async work
  // ...

  setTimeout(() => {
    // let a = null;
    // if (a) {
    //   resolve(a);
    // } else {
      reject(new Error('null result'))
    // }
   
  }, 2000)

});

p.then(result => console.log("Result", result)) 
.catch(err => console.log('Error', err.message));

// In this case, result is the 1 passed into resolve .