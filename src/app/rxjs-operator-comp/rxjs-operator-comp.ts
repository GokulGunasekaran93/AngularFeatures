import { Component, inject, OnInit, output } from '@angular/core';
import { OperatorsCheckService } from '../Services/operators-check-service';
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  first,
  forkJoin,
  interval,
  map,
  Observable,
  ReplaySubject,
  Subject,
  take,
  timer,
  withLatestFrom,
  zip,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-operator-comp',
  imports: [],
  templateUrl: './rxjs-operator-comp.html',
  styleUrl: './rxjs-operator-comp.css',
})
export class RxjsOperatorComp implements OnInit {
  private oprSrv = inject(OperatorsCheckService);
  // can create DI like this without constructor as well, but constructor is more common and readable

  languagesList: string[] = [];
  filteredLanguagesList: string[] = [];
  firstFilteredLanguage: string = '';

  // 1.createiona opr
  // from , of ,map operators

  // 2.pipelining and transformation
  // pipe map filter first

  //3. timing and control
  // interval, timer, delay, debounceTime, throttleTime

  //combination operators
  // forkJoin, combineLatest, zip, withLatestFrom

  $age = new BehaviorSubject(25);
  $name = new BehaviorSubject('John');
  combineLatestResult: string = '';

  constructor() {}

  combineLatestExample() {
    combineLatest([this.$age, this.$name]).subscribe(([age, name]) => {
      console.log('Age : ', age);
      console.log('Name : ', name);

      this.combineLatestResult = 'Combine Latest Result : ' + name + ' - ' + age;
    });
  }

  changeBSValue() {
    this.$age.next(30);
    this.$name.next('Doe');
  }

  test() {
    forkJoin(this.oprSrv.$langObsDelay, this.oprSrv.$langObsvableDelay).subscribe(
      ([langs, nums]) => {
        console.log('Languages : ', langs);
        console.log('Numbers : ', nums);
      },
    );

    // concat is similar to forkJoin but it will emit the values one by one, and it will not wait for all the observables to complete before emitting the values, it will emit the values as soon as they are emitted by the source observables
    // concat(this.oprSrv.$langObsDelay, this.oprSrv.$langObsvableDelay).subscribe((val) => {
    //   console.log('Concat Value : ', val);
    // });
  }

  distinctUntilChangedExample() {
    // distinctUntilChanged operator is used to emit only the distinct values from the source observable, it will emit the values only when the current value is different from the previous value, it will emit the values in the order they were emitted by the source observable

    // if input is 1,1,2,2,3,3,4,4,5,5 then it will emit 1,2,3,4,5

    this.oprSrv.$numberObservable.pipe(distinctUntilChanged()).subscribe((num) => {
      console.log('Distinct Until Changed Value : ', num);
    });
  }

  zipExample() {
    // zip operator is used to combine the values from multiple observables,
    // and it will emit the combined values as an array, it will emit the values only when all the source observables
    //  have emitted a value, and it will emit the values in the order they were emitted by the source observables

    zip(this.oprSrv.$langObsDelay, this.oprSrv.$langObsvableDelay).subscribe(([langs, nums]) => {
      console.log('Zip Languages : ', langs);
      console.log('Zip Numbers : ', nums);
    });
  }

  withLatestFromExample() {
    // withLatestFrom operator is used to combine the values from multiple observables,
    //  and it will emit the combined values as an array, it will emit the values only when the source observable emits a value,
    //  and it will emit the latest values from the other observables,
    //  it will emit the values in the order they were emitted by the source observable

    this.oprSrv.$langObsDelay
      .pipe(withLatestFrom(this.oprSrv.$langObsvableDelay))
      .subscribe(([langs, nums]) => {
        console.log('WithLatestFrom Languages : ', langs);
        console.log('WithLatestFrom Numbers : ', nums);
      });
  }

  sample() {
    //     🔷 1️⃣ combineLatest – Emits When Any Source Emits
    // Combines the latest values from each input Observable
    // Emits after all sources have emitted at least once
    // Emits every time any source emits, using the latest values from all
    // 🔷 2️⃣ zip – Emits Only When All Sources Emit
    // Waits for each Observable to emit one value
    // Emits tuples of values at the same index
    // Like zipping two arrays
    // 🔷 3️⃣ withLatestFrom – Emits When Source Emits, Using Latest from Others
    // Waits for the source Observable to emit
    // Combines it with the latest values from other Observables
    // Emits only when the source emits, not when others emit
  }

  SubjectExample() {
    // Subject is a special type of Observable that allows values to be multicasted to many Observers.
    // Subjects are like EventEmitters: they maintain a registry of many listeners.

    // example for subject

    const subject = new Subject<number>();

    const subscriber1 = subject.subscribe((val) =>
      console.log('Subject Value subscriber1 : ', val),
    );
    const subscriber2 = subject.subscribe((val) =>
      console.log('Subject Value subscriber2 : ', val),
    );
    subject.next(1);
    subject.next(2);
    subject.next(3);

    //output:
    // Subject Value subscriber1 :  1
    // Subject Value subscriber2 :  1
    // Subject Value subscriber1 :  2
    // Subject Value subscriber2 :  2
    // Subject Value subscriber1 :  3
    // Subject Value subscriber2 :  3
    // can emit value .. both subscribe will get same value

    //output if we use observable instead of subject:
    // Subject Value subscriber1 :  1
    // Subject Value subscriber1 :  2
    // Subject Value subscriber1 :  3

    // Subject Value subscriber2 :  1
    // Subject Value subscriber2 :  2
    // Subject Value subscriber2 :  3
    // each subscriber will get the values separately, so it will emit 1,2,3 to the console for each subscriber, so it will emit 1,2,3 twice in the console, but in subject it will emit 1,2,3 only once in the console as it is a multicast observable and it will emit the values to all the subscribers

    // above code is same as obervable but the difference is that in observable
    // each subscriber will receive the values separately,
    // but in subject all the subscribers will receive the same values,
    // so it is a multicast observable, and it will emit the values to all the subscribers,
    // so it will emit 1,2,3 to the console as subject is a multicast observable and
    // it will emit the values to all the subscribers

    // if we use observable instead of subject, then each subscriber will receive the values separately,
    // so it will emit 1,2,3 to the console for each subscriber, so it will emit 1,2,3 twice in the console,
    // but in subject it will emit 1,2,3 only once in the console as it is a multicast observable and it will emit the values to all the subscribers

    // above code will emit 1,2,3 to the console as subject is a multicast observable and it will emit the values to all the subscribers

    // lets do for math random number generation using subject

    // multicast same value
    const randomNumSubject = new Subject<number>();

    randomNumSubject.subscribe((val) => console.log('Random Number Subject Subscriber 1 : ', val));
    randomNumSubject.subscribe((val) => console.log('Random Number Subject Subscriber 2 : ', val));

    //output will be same for both subscribers as subject is a multicast observable and it will emit the values to all the subscribers,
    //  so it will emit the same random number to both subscribers at the same time

    setInterval(() => {
      const randomNum = Math.random();
      randomNumSubject.next(parseFloat((randomNum * 100).toFixed(2)));
    }, 2000);

    // unicast diff value for observable
    // use same code for observable
    const randomNumObservable = new Observable<number>((observer) => {
      setInterval(() => {
        const randomNum = Math.random();
        observer.next(parseFloat((randomNum * 100).toFixed(2)));
      }, 2000);
    });

    randomNumObservable.subscribe((val) =>
      console.log('Random Number Observable Subscriber 1 : ', val),
    );
    randomNumObservable.subscribe((val) =>
      console.log('Random Number Observable Subscriber 2 : ', val),
    );

    // subject  no initial value required

    // BehaviorSubject is a type of Subject that requires an initial value and emits its current value (last emitted item) to new subscribers.
    // It also has a getValue() method to retrieve the current value.

    // ReplaySubject is a type of Subject that can buffer a set number of values and replay them to new subscribers.
    // It can be configured to replay all values or only the latest N values.

    // AsyncSubject is a type of Subject that only emits the last value to observers when the source Observable completes.
    // It is useful for representing a single result from an asynchronous operation.
  }

  behaviorSubjectExample() {
    // initial values required

    const behaviorSubject = new BehaviorSubject<number>(0); // initial value is 0

    behaviorSubject.subscribe((val) => console.log('Behavior Subject Subscriber 1 : ', val));

    behaviorSubject.next(1);
    behaviorSubject.next(2);
    behaviorSubject.next(3);

    // output will be:
    // Behavior Subject Subscriber 1 :  0
    // Behavior Subject Subscriber 1 :  1
    // Behavior Subject Subscriber 1 :  2
    // Behavior Subject Subscriber 1 :  3

    // if we subscribe after emitting some values, then it will emit the latest value to the new subscriber,
    //  so it will emit 3 to the new subscriber as it is the latest value emitted by the subject

    behaviorSubject.subscribe((val) => console.log('Behavior Subject Subscriber 2 : ', val));

    // output will be:
    // Behavior Subject Subscriber 2 :  3

    // if we subscribe after emitting some values, then it will emit the latest value to the new subscriber,
    // so it will emit 3 to the new subscriber as it is the latest value emitted by the subject

    // if we subscribe before emitting any values, then it will emit the initial value to the subscriber,
    // so it will emit 0 to the subscriber as it is the initial value of the subject
  }

  replaySubjectExample() {
    // buffer a set number of values and replay them to new subscribers.
    // It can be configured to replay all values or only the latest N values.

    // example for replay subject
    // here replaysubject is not there

    // create a replay subject with buffer size of 2
    const replaySubject = new ReplaySubject<number>(3); // buffer size is 3, so it will replay the latest 3 values to the new subscriber

    replaySubject.subscribe((val) => console.log('Replay Subject Subscriber 1 : ', val));

    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);
    replaySubject.next(4);
    replaySubject.next(5);

    // output will be:
    // Replay Subject Subscriber 1 :  1
    // Replay Subject Subscriber 1 :  2
    // Replay Subject Subscriber 1 :  3
    // Replay Subject Subscriber 1 :  4
    // Replay Subject Subscriber 1 :  5

    // if we subscribe after emitting some values, then it will emit the buffered values to the new subscriber,
    // so it will emit 2 and 3 to the new subscriber as they are the latest values emitted by the subject and the buffer size is 2

    replaySubject.subscribe((val) => console.log('Replay Subject Subscriber 2 : ', val));

    // output will be:
    // Replay Subject Subscriber 2 :  3
    // Replay Subject Subscriber 2 :  4
    // Replay Subject Subscriber 2 :  5

    // if we subscribe after emitting some values, then it will emit the buffered values to the new subscriber,
    // so it will emit 2 and 3 to the new subscriber as they are the latest values emitted by the subject and the buffer size is 2

    // if we subscribe before emitting any values, then it will not emit any values to the subscriber as there are no values in the buffer
  }

  asyncSubjectExample() {
    // only emits the last value to observers when the source Observable completes.
    // It is useful for representing a single result from an asynchronous operation.

    // create an async subject
    const asyncSubject = new AsyncSubject<number>();
    asyncSubject.subscribe((val) => console.log('Async Subject Subscriber 1 : ', val));

    asyncSubject.next(1);
    asyncSubject.next(2);
    asyncSubject.next(3);

    // output will be:
    // Async Subject Subscriber 1 :  3. after 6 seconsds

    // if we subscribe after emitting some values, then it will not emit any values to the new subscriber as the source observable has not completed yet,
    // so it will not emit any values to the new subscriber

    asyncSubject.subscribe((val) => console.log('Async Subject Subscriber 2 : ', val));

    // output will be:
    // Async Subject Subscriber 2 :  3 after 6 secodns

    // if we subscribe after emitting some values, then it will not emit any values to the new subscriber as the source observable has not completed yet,
    // so it will not emit any values to the new subscriber

    setTimeout(() => {
      asyncSubject.complete(); // complete the source observable to emit the last value to the subscribers
    }, 6000);

    //asyncSubject.complete(); // complete the source observable to emit the last value to the subscribers

    asyncSubject.subscribe((val) => console.log('Async Subject Subscriber 3 : ', val));

    // output will be:
    // Async Subject Subscriber 1 :  3 after 6 seconds
    // Async Subject Subscriber 2 :  3 after 6 seconds
    // Async Subject Subscriber 3 :  3 after 6 seconds

    // if we subscribe after completing the source observable, then it will emit the last value to the new subscriber as the source observable has completed,
    // so it will emit 3 to the new subscriber as it is the last value emitted by the subject and the source observable has completed

    // subject , BS, RS are  immd ,, asyncsubject will emiot after completed. - whats app
    // sub- all values
    // BS - latest value. // default value if no value emitted // def value is required. - user login state
    // RS - buffer values and replay // buffer size required. -- old chat
    // AS - last value after completed   -- exam result . cant see while evaulation in prog, can see only after result is declared.

    // AS caches the latest value and emits only when complete() is called.

    // subject = observavle + observer, multicast, no initial value required
    // special type of observable that allows values to be multicasted to many observers. Subjects are like EventEmitters: they maintain a registry of many listeners.
    // for comp commn, eent broadcasting , shared srvices,real time updates.
  }

  observableExample() {
    //     Observables are able to deliver values either synchronously or asynchronously.

    // What is the difference between an Observable and a function? Observables can "return" multiple values over time, something which functions cannot. You can't do this:

    // content_copy open_in_new
    // function foo() {
    //   console.log('Hello');
    //   return 42;
    //   return 100; // dead code. will never happen
    // }

    // Functions can only return one value. Observables, however, can do this:

    //import { Observable } from 'rxjs';

    const foo = new Observable((subscriber) => {
      console.log('Hello');
      subscriber.next(42);
      subscriber.next(100); // "return" another value
      subscriber.next(200); // "return" yet another
    });

    console.log('before');
    foo.subscribe((x) => {
      console.log(x);
    });
    console.log('after');

    // with syn observables, the output will be:
    // before
    // Hello
    // 42
    // 100
    // 200
    // after

    //import { Observable } from 'rxjs';

    const foo1 = new Observable((subscriber) => {
      console.log('Hello');
      subscriber.next(42);
      subscriber.next(100);
      subscriber.next(200);
      setTimeout(() => {
        subscriber.next(300); // happens asynchronously
      }, 1000);
    });

    console.log('before');
    foo.subscribe((x) => {
      console.log(x);
    });
    console.log('after');

    // with async observables, the output will be:
    // before
    // Hello
    // 42
    // 100
    // 200
    // after
    // 300 (after 1 second)

    // Observables can also be cancelled, which is not possible with functions. This is done by unsubscribing from the Observable:

    const subscription = foo.subscribe((x) => {
      console.log(x);
    });

    subscription.unsubscribe(); // cancel the subscription

    // After calling unsubscribe(), the subscriber will no longer receive any values from the Observable. This is particularly useful for preventing memory leaks in applications that use Observables to manage resources such as event listeners or timers.

    //Observables are like functions with zero arguments, but generalize those to allow multiple values.

    // function foo() {
    //   console.log('Hello');
    //   return 42;
    // }

    // const x = foo.call(); // same as foo()
    // console.log(x);
    // const y = foo.call(); // same as foo()
    // console.log(y);

    // "Hello"
    // 42
    // "Hello"
    // 42

    // func.call() means "give me one value synchronously"
    // observable.subscribe() means "give me any amount of values, either synchronously or asynchronously"
  }

  timingControlOperators() {
    // interval operator is used to emit values at regular intervals, and timer operator is used to emit a single value after a specified delay,

    // below code will emit a value every 2 seconds, and the emitted value will be the number of times the interval has been emitted, starting from 0
    var interval$ = interval(2000);
    interval$.subscribe((val) => console.log('Interval Value : ', val));

    const timer$ = timer(5000);
    // have to unsubscribe timers$
    timer$.subscribe((val) => console.log('Timer Value : emitted after 5 seconds : ', val));

    this.oprSrv.$numberObservable
      .pipe(delay(3000))
      .subscribe((num) => console.log('Delayed Value : emitted after 5 seconds : ', num));

    //delay(5000)(() => console.log('Delayed Value : emitted after 5 seconds'));

    // delay operator is used to delay the emission of values, debounceTime operator is used to emit a value only after a specified time has passed without any new values being emitted, and throttleTime operator is used to emit a value at most once in a specified time period

    // take operator is used to take a specified number of values from the source observable, and skip operator is used to skip a specified number of values from the source observable before emitting the remaining values

    this.oprSrv.$numberObservable
      .pipe(take(5))
      .subscribe((num) => console.log('Take example: ', num));

    //timer operator is used to emit a single value after a specified delay, and then complete the observable, so it will not emit any more values after that
    // below code will emit a value after 5 seconds, and the emitted value will be 0
    timer(5000).subscribe((val) => console.log('Timer Value : emitted after 5 seconds : ', val));
  }

  ngOnInit(): void {
    this.asyncSubjectExample();
    return;
    this.replaySubjectExample();

    this.combineLatestExample();
    this.test();

    this.SubjectExample();

    //this.timingControlOperators();
    //first operator is used to get the first value that matches the condition,
    // first will complete the observable after emitting the first value that matches the condition, so it will not emit any more values after that

    this.oprSrv.$numberObservable.pipe(first((num) => num % 2 === 0)).subscribe((num) => {
      this.firstFilteredLanguage = num.toString();
      console.log('First Filtered Language : ', this.firstFilteredLanguage);
    });

    //filter operator is used to filter the emitted values based on a condition,

    this.oprSrv.$numberObservable.pipe(filter((num) => num % 2 === 0)).subscribe((num) => {
      this.filteredLanguagesList.push(num.toString());
      console.log('Filtered Numbers  List : ', this.filteredLanguagesList);
    });

    // receve the values one by one as from operator emits each item separately

    // pipe is used to chain multiple operators together, and map operator is used to transform the emitted values,
    // in this case we are converting each language name to lowercase before pushing it to the languagesList array
    this.oprSrv.$langObs.pipe(map((lang) => lang.toLowerCase())).subscribe((lang) => {
      this.languagesList.push(lang);
    });
    this.oprSrv.$langObsvable.subscribe((lang) => console.log(lang));
  }

  ngonDestroy() {}
}
