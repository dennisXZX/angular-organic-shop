import { Component } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (
    private userService: UserService,
    private auth: AuthService,
    private router: Router) {
    // when the user login status change, redirect it to appropriate url
    auth.user$.subscribe(user => {
      if (user) {
        // store the user into database
        userService.save(user);
        // retrieve url from local storage
        const returnUrl = localStorage.getItem('returnUrl');
        // redirect user to the appropriate url
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
