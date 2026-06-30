import { Component, inject, Inject, OnInit } from '@angular/core';
import { Config } from '../Services/config';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-dependency-injection',
  imports: [],
  templateUrl: './dependency-injection.html',
  styleUrl: './dependency-injection.css',
})
export class DependencyInjection implements OnInit , ControlValueAccessor{

  private config = inject(Config);

  // inject is latest
  // @Injetc is legacy. use din constructor 

  constructor(@Inject('test') private test: string, @Inject('test2') private test2: string,
    private configService: Config) { 
    
  }
  // controlvalueaccessor methods
  // ControlValueAccessor is an interface that allows a component to act as a form control.
  //  It provides methods for writing and reading values, registering change and touch events,
  //  and setting the disabled state of the control.
  writeValue(obj: any): void {
    // used to write a new value to the form control.
    //  This method is called by the parent form when it wants to update the value of the form control.
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // used to register a callback function that is called when the value of the form control changes.
    //  This allows the form control to notify the parent form when its value has changed.
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // used to register a callback function that is called when the form control is touched.
    //  This allows the form control to notify the parent form when it has been touched.
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // used to set the disabled state of the form control. This allows the parent form to disable or enable the form control as needed.
    throw new Error('Method not implemented.');
  }

  ngOnInit() {

    console.log(this.test);
    console.log(this.test2);
    
    console.log('API URL:', this.configService.getAPIUrl());
    console.log('App Version:', this.configService.getAppVersion());
  }

}
