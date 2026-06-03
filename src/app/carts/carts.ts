import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carts',
  imports: [],
  templateUrl: './carts.html',
  styleUrl: './carts.css',
})


export class Carts implements OnInit , OnChanges , DoCheck , AfterContentInit, AfterContentChecked, AfterViewInit , AfterContentChecked , OnDestroy{ 

  @Input() CartsObj : any = {};

  //1 - ngOnChanges is a lifecycle hook in Angular that is called whenever there are changes to input properties of a component. 
  // It allows you to respond to changes in the input data and perform necessary actions based on those changes.
  //2 - The ngOnChanges method receives a parameter called changes, which is an object that contains the current and previous values of the input properties that have changed. 
  // You can use this information to determine what has changed and take appropriate actions.
  //  if we use input as string directly name then if we change that in parent component it will not reflect in child component 
  // but if we use input as object then if we change that in parent component it will reflect in child component because it is reference type.

  //**important*/
  // use like spread operator 
  // this.CartsObj = {...this.CartsObj, name: 'New Cart Name'}; // This will trigger ngOnChanges because we are creating a new object reference.
  // this.CartsObj.name = 'New Cart Name'; // This will NOT trigger ngOnChanges because we are mutating the existing object reference.


//1st for lifecycle hook
// can destructure the changes object to get the current and previous values of the  particularinput property that has changed.
// like this ngnOnChanges({ CartsObj }: SimpleChanges): void {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.CartsObj);
    console.log(changes);
  }

  //2nd for lifecycle hook
  ngOnInit(): void {
 // to initialize the component with the input data when it is first created. It is called once after the first ngOnChanges
 //  and before the component is rendered.
  }

  //3rd for lifecycle hook
  // ngDoCheck is a lifecycle hook in Angular that is called during every change detection cycle. 
  // will call after ngOnChanges and ngOnInit, and it will be called every time there is a change in the component or its inputs, 
  // regardless of whether the change was detected by Angular's default change detection mechanism or not.
  // It allows you to perform custom change detection logic and respond to changes that may not be detected by Angular's default change detection mechanism.
   ngDoCheck(): void {
    //throw new Error('Method not implemented.');
  }

  //4th for lifecycle hook
  // ngAfterContentInit is a lifecycle hook in Angular that is called after Angular has fully initialized all content of a component, 
  // including any projected content from parent components.

  ngAfterContentInit(): void {
    //throw new Error('Method not implemented.');
  }

  //5th for lifecycle hook
  // ngAfterContentChecked is a lifecycle hook in Angular that is called after Angular has checked the content of a component for changes.
  ngAfterContentChecked(): void {
    //throw new Error('Method not implemented.');
  }
  
  //6th for lifecycle hook
  // ngAfterViewInit is a lifecycle hook in Angular that is called after Angular has fully initialized the component's view,
  // which includes the component's template and any child components. It is called once after the first ngAfterContentChecked.
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
  }

  //7th for lifecycle hook
  // ngAfterViewChecked is a lifecycle hook in Angular that is called after Angular has checked the component's view for changes.
  ngAfterViewChecked(): void {
    //throw new Error('Method not implemented.');
  }

  //for every detection all checked lifecycle hooks will be called in order like this
  // ngDoCheck -> ngAfterContentChecked -> ngAfterViewChecked
  // init will be called only once like this

  ngOnDestroy(): void {
    // to perform any necessary cleanup when the component is destroyed. It is called just before the component is removed from the DOM.
  }
}
