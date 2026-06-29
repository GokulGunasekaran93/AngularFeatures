import { Component, input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-calculator-ui',
  imports: [NgFor],
  templateUrl: './calculator-ui.html',
  styleUrl: './calculator-ui.css',
})
export class CalculatorUI {

  numbers: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  operators: string[] = ['+', '-', '*', '/', '='];
  currentInput: string = '';

  // can get the query params using the input angular
  pageId =2;// input.required();

  constructor() { }

  calculate(){
    try {
      // added for unit testing purpose, to remove the = sign from the expression before evaluating it
      const expression = this.currentInput.replace('=', '');
      
      this.currentInput = eval(expression).toString();
    } catch (error) {
      this.currentInput = 'Error';
    }
  }

  backSpaceOpr(){
    if(this.currentInput.length > 0)
    this.currentInput = this.currentInput.slice(0, -1);
  }

  toggleSign(){
    if(this.currentInput.length > 0 && this.currentInput !== '0') {
      if(this.currentInput.startsWith('-')) {
        this.currentInput = this.currentInput.slice(1);
      } else {
        this.currentInput = '-' + this.currentInput;
      }
    }
  }

}
