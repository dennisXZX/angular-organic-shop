import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  // canActivate can returns Observable<boolean>
  canActivate() {
    // we map over the user$ observable and return a boolean observable
    return this.auth.user$.map(user => {
      if (user) {
        return true;
      }

      this.router.navigate(['/login']);
      return false;
    });
  }

}
