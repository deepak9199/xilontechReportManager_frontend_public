import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs";
import { environmentProduct } from "../BASE_URL/environment-product";
import { AuthService } from "../_services/auth.service";
import { TimnerProjectAssineService } from "../_services/timner-project-assine.service";
import { TokenStorageService } from "../_services/token-storage.service";




@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private token: TokenStorageService,
    private authService: AuthService,
    private toster: ToastrService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.token.getToken() != null) {
      const roles = next.data['role'] as Array<string>;
      const roles1 = next.data['role1'] as Array<string>;
      const roles2 = next.data['role2'] as Array<string>;
      const roles3 = next.data['role3'] as Array<string>;
      //this.checkPermission()

      if (roles || roles2 || roles3) {

        var match = this.token.getUser().roles[0]
        var match2 = this.token.getUser().roles[1]
        var match3 = this.token.getUser().roles[2]
        // // console.log(roles)
        // console.log(match)
        // // console.log(roles2)
        // console.log(match2)
        // // console.log(roles3)
        // console.log(match3)
        if ((typeof (match) != 'undefined' && typeof (match2) != 'undefined') && typeof (match3) != 'undefined') {
          match = this.token.getUser().roles[0][0]
          match2 = this.token.getUser().roles[1][0]
          match3 = this.token.getUser().roles[2][0]
          // // console.log(roles)
          // console.log(match)
          // // console.log(roles2)
          // console.log(match2)
          // // console.log(roles3)
          // console.log(match3)
        } else
          if ((typeof (match) != 'undefined' && typeof (match2) != 'undefined')) {
            match = this.token.getUser().roles[0][0]
            match2 = this.token.getUser().roles[1][0]
            // // console.log(roles)
            // console.log(match)
            // // console.log(roles2)
            // console.log(match2)
            // // console.log(roles3)
            // // console.log(match3)
          }

        // console.log(roles)
        // console.log(match)
        // console.log(roles1)
        // console.log(roles2)
        // console.log(match2)
        // console.log(roles3)
        // console.log(match3)
        if (match === roles || match === roles1) {
          return true;
        }
        else if ((match2 === roles2 && typeof (roles2) != 'undefined') || (match2 === roles3 && typeof (roles3) != 'undefined')) {
          return true;
        }
        else if (match3 === roles3 && typeof (roles3) != 'undefined') {
          return true;
        }
        else {
          // tslint:disable-next-line: quotemark
          this.toster.error("unauthorise routing session logout");
          this.router.navigate(['/logout']);
          this.logout()
          //this.router.navigate(['/login']);
          // this.router.navigate(['/forbidden']);
          return false;
        }
      } else {
        return true;
      }
    }
    this.router.navigate(['']);
    return false;
  }
  logout() {
    this.authService.logout();
    window.location.href = environmentProduct.xilontechPortal + '#/logout'
    // this.router.navigate(['/login']).then(() => {
    //   window.location.reload();
    // })
  }
}

