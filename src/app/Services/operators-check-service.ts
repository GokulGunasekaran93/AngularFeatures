import { Injectable } from '@angular/core';
import { delay, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperatorsCheckService {

  //
  languages : string[] = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#'];

  // from operator converts array to observable stream, and emits each item one by one
  $langObs = from (this.languages); // delay operator is used to delay the emission of values, it will emit the values after 2 seconds

  // of operator emits the whole array as a single item, so it will emit the entire array at once
  $langObsvable = of (1,2,3,4,5,6,7,8,9,10);  // delay operator is used to delay the emission of values, it will emit the values after 2 seconds


  $langObsDelay = from (this.languages).pipe(delay(3000)); // delay operator is used to delay the emission of values, it will emit the values after 2 seconds

  // of operator emits the whole array as a single item, so it will emit the entire array at once
  $langObsvableDelay = of (1,2,3,4,5,6,7,8,9,10).pipe(delay(8000));  // delay operator is used to delay the emission of values, it will emit the values after 2 seconds


  
  booksDetails = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' }
  ];

  $numberObservable = of (1,2,3,4,5,6,7,8,9,10);

  constructor() { 

  }



}
