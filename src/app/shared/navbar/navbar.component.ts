import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersList } from 'src/app/model/timer';
import { environment } from 'src/environments/environment';
import { environmentProduct } from '../BASE_URL/environment-product';
import { AccountService } from '../_services/account-service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserSharingService } from '../_services/user-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  roles = ''
  username = ''
  binaryImage: any;
  firstName = ''
  middleName = ''
  lastName = ''
  AccountList: Array<CustomersList> = []
  constructor(
    private authService: AuthService,
    private tokenStroage: TokenStorageService,
    private accountservice: AccountService,
    private router: Router,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.username = this.tokenStroage.getUser().username
    this.roles = this.tokenStroage.getUser().roles
    this.getaccountList()
  }
  getaccountList() {
    this.accountservice.getAccounts().subscribe(
      data => {
        // console.log(data.data);
        if (data.apiStatus.message === 'OK') {
          this.AccountList = data.data.filter((item: any) => item.user === this.tokenStroage.getUser().username)
          if (this.AccountList.length != 0) {
            // console.log(this.AccountList)
            this.firstName = this.AccountList[0].firstName
            this.middleName = this.AccountList[0].middleName
            this.lastName = this.AccountList[0].lastName
          }
          // console.log(this.AccountList)
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.toster.error('Session Token Is Expired You Have To Re-Login')
          // console.log(data.apiStatus.message)
          this.logout()
        }
        else {
          console.log(data.apiStatus.message)
        }

      },
      err => {
        this.geterror()
        console.log(err.error)
      }
    )
  }
  logout() {
    this.router.navigate(['/logout'])
  }
  public reload() {
    window.location.reload();
  }
  public profile() {
    if (this.roles == 'ROLE_ADMIN') {
      window.location.href = environmentProduct.xilontechPortal + '/#/portal/admin/profile'
      // this.router.navigate(['portal/admin/profile'])
    }
    else if (this.roles == 'ROLE_USER') {
      window.location.href = environmentProduct.xilontechPortal + '/#/portal/user/profile'
      // this.router.navigate(['portal/user/profile'])
    }
    else if (this.roles == 'ROLE_SUPER_ADMIN') {
      window.location.href = environmentProduct.xilontechPortal + '/#/portal/superadmin/profile'
      // this.router.navigate(['portal/user/profile'])
    }
  }
  public home() {
    window.location.href = environmentProduct.xilontechPortal
    // this.authService.logout()
  }

  private geterror() {
    this.toster.error('Check Your Network Connect Or Server Error')
    this.logout()
  }
}
