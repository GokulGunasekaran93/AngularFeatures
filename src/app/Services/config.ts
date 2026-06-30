import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class Config {

  private config = inject(APP_CONFIG);

  constructor(){

  }

  getAPIUrl(){
    return this.config.apiUrl;
  }

  getAppVersion(){
    return this.config.appVersion;
  }
}
