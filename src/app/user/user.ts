import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../Services/user';
import { UserModel } from '../Models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
  providers: [User]
})
export class User implements OnInit {

  user : UserModel[] = [];

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

//   // ✅ Private - only in this component
// constructor(private userService: UserService) {}

// // ✅ Public - accessible in template too
// constructor(public userService: UserService) {}

// // ✅ Protected - only in this component and subclasses
// constructor(protected userService: UserService) {}

  constructor( private userService : UserService) {
    this.userService.getUsers().subscribe((data) => {
      console.log(data);
      this.user = [...data];
    });
  }

}
