import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
    //'Content-Type': 'application/json',
    //'Authorization': 'Bearer YOUR_TOKEN_HERE' // Add your token here
  })
};

  constructor(httpClient : HttpClient) {
    this.httpClient = httpClient;
  }

  // 

  getUsers() {
    return this.httpClient.get<UserModel[]>('https://json-placeholder.mock.beeceptor.com/users');
  }

  getUsersList(){
    return this.httpClient.get<any[]>('http://localhost:5220/api/Users',this.httpOptions);
  }
}
