import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  // canActivate can returns Observable<boolean>
  canActivate(route, state: RouterStateSnapshot) {
    // we map over the user$ observable and return a boolean observable
    return this.auth.user$.map(user => {
      if (user) {
        return true;
      }

      // returnUrl records the url where user tries to access /login
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    });
  }

}
