import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // use withcompoinoyt bindinh to get the input angular from the query parsam in path
    provideRouter(routes, withComponentInputBinding()),

    { provide: 'test', useValue: 'test123' },
    {provide: 'test2', useFactory : fecthVal}
  ]
};

function fecthVal(){
  return 'test456';
}

export interface AppConfig {
  apiUrl: string;
  appVersion: number;
}



export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {

  providedIn: 'root',
  factory: () => ({
    apiUrl: 'https://api.example.com',
    appVersion: 1.0
  })

});
