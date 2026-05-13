import { Component, computed, effect, inject, Injector, signal, untracked } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.css',
})
export class Signals {

  //signals

  msg: string = "Hello from Parent Component";

  //only for signals
// variable vs signals .. we hava wrapper around to trcak chnages
  //signals are wrappers around a value that allow you to track changes to that value 
  // and react to those changes in a declarative way.

  //Signals are a modern Angular feature for reactive value management. They help Angular track when values change and automatically update the view.

// will get latest value from cache - state management
  // useful for state management and change detection

 // will be reactive only if we set the value once.else jus initialized only
 // writable and readable both
  sample = signal("test");

  // computed are readonly and derived from other signals. They automatically update when the underlying signals change, making them useful for creating derived state that depends on other signals.

   // computed signals are a type of signal that allows you to derive a new value based on one or more existing signals.
  // computed signals are useful for creating derived state that automatically updates when the underlying signals change. 
  // They can help simplify your code and improve performance by avoiding unnecessary calculations and updates.
  
  // no def value needed because it will be computed based on other signals

  age = signal(25);

  isMajor = computed(()=>{ return this.age() >= 18; });

// computed are dervived signals

 injec = inject(Injector);


 sideeffect = effect(() => {
//  console.log(untracked(this.sample)); // Access the signal without tracking it as a dependency
    console.log(`Age changed to: ${  this.age()}`);
  }, { injector: this.injec });

constructor() {

  // effect wont return anything like computed
  // eager .. compuye - lazy
  // effect(() => {
  //     console.log(`Age changed to: ${this.age()}`);
  //   });
    // can we be called in constructor or above injector
    // use for logging api calls
}


  ngOnInit(): void {
    //console.log(this.sample());

    // to replace the value completely use set
    // else use update to update the value based on previous value
    setTimeout(() => {
      this.sample.set("test updated");
    }, 2000);

    setTimeout(() => { 
      this.sample.update(value => value + " updated again");
    }, 4000); 


    setTimeout(() => {
      this.age.set(17);
    }, 2000);

    setTimeout(() => {
      this.age.update(age => age + 1);
    }, 3000); 

    


//  Use Signals for:

// Component state
// Form values
// UI state (toggles, counters)
// Simple reactivity
// ❌ Use Observables for:

// HTTP requests
// Event streams
// Complex async operations
// Timing operations


  }
}
