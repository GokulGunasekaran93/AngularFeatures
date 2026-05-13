import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../Models/user';

@Injectable({
  providedIn: 'root',
  //global level
})

// @NgModule({
//   providers: [UserService]
// })
// export class AppModule {}


// @Component({
//   providers: [UserService] // New instance for this component only
// })
// export class UserComponent {}

export class UserService {

  private httpClient : HttpClient;

  constructor(httpClient : HttpClient) {
    this.httpClient = httpClient;
  }

  // 

  getUsers() {
    return this.httpClient.get<UserModel[]>('https://json-placeholder.mock.beeceptor.com/users');
  }
}
