import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Carts } from './carts/carts';
import { JsCourse } from './Javascript/js-course/js-course';
import { Signals } from './signals/signals';
import { User } from './user/user';
import { RxjsOperatorComp } from './rxjs-operator-comp/rxjs-operator-comp';
import { AGGrid } from './aggrid/aggrid';
import { CalculatorUI } from "./calculator-ui/calculator-ui";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Carts, JsCourse, Signals, User, RxjsOperatorComp, AGGrid, CalculatorUI],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Learning');

  cartsData = {
    id: 1,
    name: 'Cart 1',
    items: [
      { id: 1, name: 'Item 1', price: 10 },
      { id: 2, name: 'Item 2', price: 20 },
      { id: 3, name: 'Item 3', price: 30 }
    ]
  }
}
