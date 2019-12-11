import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UtilityService} from '@app/shared/utility.service';
import {AuthenticationService} from '@app/auth/login/login.service';
import { map } from 'rxjs/operators';



@Injectable()
export class LoggedGuard implements CanActivate {

  policies: any;
  user: any;
  section: any;

  constructor( private router: Router,
               private utilityService: UtilityService,
               private authenticationService: AuthenticationService ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.section = route.data.role;
    this.user =  this.utilityService.user;


    if (!this.user) {
      return this.authenticationService.GetUserLoggato().pipe(map( res => {
        this.user = res;
        this.utilityService.user = res;

        return this.check();
      }));

    } else {
      return this.check();
    }

  }



  check() {
    console.log("utentesasasa: ", this.user);
    console.log("section: ", this.section);

    if (this.user && this.section[0] === 'public') {
      return true;
    } else {
      let trovato = false;
      let trovato2 = false;

      this.user.permissions.forEach(element => {
      if (element === this.section[0]) {
        trovato = true;
      }
    });

      if (this.section.length === 2) {
    this.user.permissions.forEach(element => {
      if (element === this.section[1]) {
        trovato2 = true;
      }
    });
    }



      console.log("trovato: ", trovato, "trovato2: ", trovato2);

      if (trovato || trovato2) {
        return true;
      } else {
        return false;
    }
    }
  }
}
