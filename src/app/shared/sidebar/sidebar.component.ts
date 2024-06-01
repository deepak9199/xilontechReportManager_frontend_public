import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { environmentProduct } from '../BASE_URL/environment-product';
import { AccountService } from '../_services/account-service';
import { TimerProjectsService } from '../_services/timer-projects.service';
import { TimnerProjectAssineService } from '../_services/timner-project-assine.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  projectManager = false
  // organisationmanager = false
  username = 'none'
  role = ''
  constructor(
    private tokenStorage: TokenStorageService,
    private PermissionService: TimnerProjectAssineService,
    private checkaccesstoken: AccountService,
    private toster: ToastrService



  ) { }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().roles[0];
    this.username = this.tokenStorage.getUser().username;
    this.tokenValidator()
  }
  checkPermission() {
    this.PermissionService.gettimeprojectsAssine().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === "OK") {
          let findpermission = data.data.filter((item: any) => (item.type === 'ProjectManager' && item.user === this.username) || (item.type === 'OrganisationManager' && item.user === this.username))
          // console.log(findpermission)
          if (findpermission.length != 0) {
            this.projectManager = true
          }
        }
        else {
          console.log(data.apiStatus.message)
        }
      },
      err => {
        console.log(err.error)
      }
    )
  }
  private tokenValidator() {
    this.checkaccesstoken.getAccounts().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          // console.log(data.data);
          this.checkPermission()
        } else if (data.apiStatus.message === 'Access is denied') {
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
        // console.log(err.error)
      }
    )
  }
  private geterror() {
    this.toster.error('Check Your Network Connect Or Server Error')
    this.logout()
  }
  private logout() {
    window.location.href = environmentProduct.xilontechReportManager + '#/logout'
  }
}
