import { Routes } from '@angular/router';
import { AGGrid } from './aggrid/aggrid';
import { RxjsOperatorComp } from './rxjs-operator-comp/rxjs-operator-comp';
import { CalculatorUI } from './calculator-ui/calculator-ui';
import { Pagenotfound } from './pagenotfound/pagenotfound';
import { App } from './app';
import { DependencyInjection } from './dependency-injection/dependency-injection';

export const routes: Routes = [
    { path: '', component: App },

    { path : 'abc', redirectTo: 'rxjs', pathMatch: 'full' },
    // fullll exact match 
    // prefix jus the initial match
    { path: 'aggrid', component: AGGrid },
    { path: 'rxjs', component: RxjsOperatorComp },
    { path: 'calc', component: CalculatorUI },
    {path:'calc/:pageId', component:CalculatorUI},
    {path: 'appcon', component: DependencyInjection},

    // if need to pass childeren then add router outlet in that parent componnet .
    // currnetly router outlet set in app component as parent

    // can pass the query params in the function to get the redirect root 
    {path: 'oldCalc/:pageId', redirectTo: (route)=>{
 return `/calc/${route.params['pageId']}`;
    }},
    { path: '**', component: Pagenotfound },
];
