import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-js-course',
  imports: [],
  templateUrl: './js-course.html',
  styleUrl: './js-course.css',
})
export class JsCourse  implements OnInit {

  ngOnInit(): void {
    this.promiseExample();
    console.log(this.factorial(5));
    console.log(this.recursiveFactorial(5));

    for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip i = 2, go to next iteration
  }
  console.log(i);
}

// Output:
// 0
// 1
// 3
// 4



function test() {
  for (let i = 0; i < 5; i++) {
    if (i === 2) {
      return; // Exit entire function
    }
    console.log(i);
  }
}

test();

// Output:
// 0
// 1

    //used for iterating over a sequence of values produced by a generator function. 
    // It allows you to pause and resume the execution of the generator function, making it easier to work with asynchronous data or to generate values on-the-fly without having to store them all in memory at once.
  const gen = this.generatorFunction(3);
  console.log(gen.next()); // { value: 1, done: false }
  }


  //generator function - a special type of function that can be paused and resumed, allowing it to produce a sequence of values over time. It is defined using the function* syntax and uses the yield keyword to produce values.
  *generatorFunction(input: number): any {
    yield input * 2;
    yield input * 3;
    yield input * 4;
  }  




  // recursion is a programming technique where a function calls itself in order to solve a problem. It typically involves a base case that stops the recursion and a recursive case that breaks the problem into smaller subproblems.
  // need return to break infinite loop.
  // add correct check

  factorial(input:number){

    if(input <= 0) return null;
    if(input === 1) return 1;

    let sum = 1;
    for(let i = 1; i <= input; i++){
      //console.log(sum, i);
      sum = sum * i;
    }
    return sum;
  }

  recursiveFactorial(input: number): any {

    if(input <= 0) return null;
    if(input === 1) return 1;
    
    return input * this.recursiveFactorial(input - 1);

  }


  // arrow function - single line na no return 
  // normal function - need return and curly braces
  // function declaration - need function keyword and name and curly braces
  // function expression - need function keyword and assign to a variable and curly braces

  // normal function
  functionDeclaration(input: number): any {
    return input * 2;
  }

  // arrow function
  functionExpression = (input: number): any => {
    return input * 2;
  }

  // function expression with single line and no return
  arrowFunction = (input: number): any => input * 2;  

  // iife - immediately invoked function expression - a function that is defined and executed immediately after its creation. It is typically used to create a new scope and avoid polluting the global namespace.
  iife = (function(input: number): any {
    return input * 2;
  })(5); // This will immediately invoke the function with the argument 5 and return 10 

  


  //shallow copy vs deep copy
  // shallow copy creates a new object but does not create copies of nested objects, it just copies the reference to the nested objects. 
  // deep copy creates a new object and also creates copies of all nested objects, so that the new object is completely independent of the original object.
  // shallow copy can be done using Object.assign() or spread operator, but deep copy requires a custom implementation or using a library like lodash.

  //shallow copy will affect the original data 
  // deep copy will not affect the originl  - everything will be new and independent. so if we change the nested object in the shallow copy it will change the original object but if we change the nested object in the deep copy it will not change the original object because it is a completely independent object.
// use spread, JSON.parse()strinify or Object .assign to do deep copy for simple objects {a:1}
//for complex and nested  use stringify  only
  
    //const deepCopy = structuredClone([1,2,3,]) - advanced
 

  // shallow copy example
  // const original = { a: 1, b: { c: 2 } };
  // const shallowCopy = { ...original };
  // shallowCopy.b.c = 3;
  // console.log(original.b.c); // Output: 3 (because shallowCopy.b is a reference to the same object as original.b)

  // deep copy example
  // const original = { a: 1, b: { c: 2 } };
  // const deepCopy = JSON.parse(JSON.stringify(original));
  // deepCopy.b.c = 3;
  // console.log(original.b.c); // Output: 2 (because deepCopy.b is a completely independent object from original.b)


  promiseExample() {
    //promise is a built-in JavaScript object that represents the 
    // eventual completion (or failure) of an asynchronous operation and its resulting value.

    //SYNC: resolve() is called in the executor directly
//ASYNC: resolve() is called inside a callback (setTimeout, api fetch, etc.)


//Promise executor (the function inside new Promise()) ALWAYS runs immediately. But the result (resolve/reject) can happen now or later.


//     A promise can be in one of three states: pending, resolved, or rejected
// Once it moves to resolved/rejected, it cannot change
// Whichever resolve/reject is called first wins
// Subsequent resolve/reject calls are silently ignored
    const myPromise = new Promise((resolve, reject) => {
      // Simulating an asynchronous operation
      setTimeout(() => {
        const success = true; // Change this to false to simulate an error
        if (success) {
          resolve('Promise resolved successfully!');
        } else {
          reject('Promise rejected with an error.');
        }
      }, 2000);
    });

    myPromise
      .then((result) => {
        console.log(result); // This will log 'Promise resolved successfully!' after 2 seconds
      })
      .catch((error) => {
        console.error(error); // This will log 'Promise rejected with an error.' if success is false
      });


      // we can chain promise also like this
    // myPromise
    //   .then((result) => {
    //     console.log(result);
    //     return 'Next step'; // This will be passed to the next then() in the chain
    //   })
    //   .then((nextResult) => {
    //     console.log(nextResult); // This will log 'Next step'
    //   })
    //   .catch((error) => {
    //     console.error(error); // This will catch any error that occurs in the promise chain
    //   });

    // here one catch and finally will be common for all then() 

    //or like this we can place another promise insie the then() of the first promise
    // myPromise
    //   .then((result) => {
    //     console.log(result);
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve('Second promise resolved!');
    //       }, 2000);
    //     });
    //   })
    //   .then((secondResult) => {
    //     console.log(secondResult); // This will log 'Second promise resolved!' after another 2 seconds
    //   })
    //   .catch((error) => {
    //     console.error(error); // This will catch any error that occurs in the promise chain
    //   });
    }


// async await is a syntactic sugar over promises, it makes asynchronous code look and behave more like synchronous code. It is built on top of promises 
// and provides a more concise and readable way to work with asynchronous operations.

// async function myAsyncFunction() {
//   try {
//     const result = await myPromise; // Waits for the promise to resolve
//     console.log(result); // Logs the resolved value of the promise
//   } catch (error) {
//     console.error(error); // Catches any error that occurs in the promise
//   }
// }

// myAsyncFunction(); // Call the async function to execute the code
//async keyword makes a function return a promise
//await keyword pauses execution until a promise settles
// use try cach for error handling in async functions


// class and function are same in JS
//encapsualtion grouping varibales and functions together in a single unit called class and controlling the access to that data using access modifiers like public, private and protected
// abstraction is hiding the implementation details and showing only the functionality to the user
// like giving access to the varibales 

  }

class Company{
name: string = '';
constructor(name: string){
  this.name = name;
}
print(){
  console.log(this.name);
}
}

class Employee extends Company{
  branch: string = '';
  constructor(name: string, branch: string){
    // use super to call the constructor of the parent class and pass the name parameter to it, so that the name property of the parent class is initialized properly.
    super(name);
    this.branch = branch;
  }
  
  override print(){
    console.log( this.name + ' - ' + this.branch);
    ///console.log(super.name); // this will access the name property of the parent class
    super.print(); // this will call the print method of the parent class and print the name property of the parent class
    super.print(); // this will call the print method of the parent class and print the name property of the parent class
  
    // uss this for fileds and super for methods.

    //methods we can access via super. because those are on prototype.
    // class fileds are on instance. not accessible via super. so we can access name via this.name or super.name both will work because name is inherited from parent class but we cannot access branch via super.branch because branch is not inherited from parent class it is only in child class.
  }
}

const test = new Employee('Goku', 'Chennai');
test.print(); // Output: Goku - Chennai 

const company = new Company('Google');
company.print(); // Output: Google


