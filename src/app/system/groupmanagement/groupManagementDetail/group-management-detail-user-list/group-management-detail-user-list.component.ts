import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { reportmanagerPermissionModel } from 'src/app/model/reportmanager';
import { CustomersList } from 'src/app/model/timer';
import { AccountService } from 'src/app/shared/_services/account-service';
import { MessageService } from 'src/app/shared/_services/message.service';
import { ReportManagerPermissionService } from 'src/app/shared/_services/report-manager-permission.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import { Location } from '@angular/common';
import { environmentProduct } from 'src/app/shared/BASE_URL/environment-product';
@Component({
  selector: 'app-group-management-detail-user-list',
  templateUrl: './group-management-detail-user-list.component.html',
  styleUrls: ['./group-management-detail-user-list.component.css']
})
export class GroupManagementDetailUserListComponent implements OnInit {

  loading = true
  AccountListRM: Array<CustomersList> = []
  private AccountList: Array<CustomersList> = []
  private RMPermissionList: Array<reportmanagerPermissionModel> = []
  MessageObj: string
  groupid: number
  constructor(
    private accountService: AccountService,
    private tokenstorage: TokenStorageService,
    private tosterService: ToastrService,
    private rmpermissionService: ReportManagerPermissionService,
    private messageservice: MessageService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.getmessage()
  }
  private getmessage() {
    this.MessageObj = this.messageservice.getmessage()
    if (this.MessageObj === '') {
      this.routBack()
    }
    else {
      this.start(JSON.parse(this.MessageObj))
    }
  }
  private start(obj: any) {
    // console.log(obj)
    this.groupid = obj.id
    this.ApigetRMPermission(this.groupid)
  }
  private routBack() {
    // this.router.navigate(['GroupManagmentList/details'])
    this._location.back();
  }
  private getaccountlist(objaccount: any, objpermission: any, groupid: number) {
    let result: Array<CustomersList> = []
    if (!this.ValidatorChecker(objaccount) && !this.ValidatorChecker(groupid)) {
      objaccount.map((objuser: CustomersList) => {
        let user = objuser
        if (this.IsAssigned(groupid, objuser.id, 'RMGroupUserPermission', objpermission)) {
          user.isselected = true
          result.push(user)
        }
        else {
          user.isselected = false
          result.push(user)
        }
      })
    }
    else {
      // console.log(objaccount)
      // console.log(objpermission)
      console.log('Invalid parameter or empty')
    }
    return result
  }
  private ApigetAccount(user: string, role: string) {
    this.AccountList = []
    this.accountService.getAccounts().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          let checklist = data.data.filter((item: any) => item.user === user)
          if (checklist.length != 0) {
            let checklistuser = this.getDataByRole(data.data, role, user, checklist[0].orgCode)
            if (checklistuser.length != 0) {
              this.AccountList = checklistuser
              if (this.AccountList.length != 0) {
                // console.log(this.RMPermissionList)
                this.AccountListRM = this.getaccountlist(this.AccountList, this.RMPermissionList, this.groupid)
                if (!this.ValidatorChecker(this.AccountListRM)) {
                  // console.log(this.AccountListRM)
                  this.loading = false
                }
                else {
                  console.log('no Rm User List Found')
                }
              }
            }
            else {
              console.log('user list not found')
            }
          } else {
            console.log('user not found')
          }
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterService.error('Session Token Is Expired You Have To Re-Login')
          // console.log(data.apiStatus.message)
          this.logout()
        }
        else {
          console.log(data.apiStatus.message)
        }
      },
      err => {
        this.geterror()
        console.log(err.erroe)
      }
    )
  }
  Assigned(obj: any, $event: any) {
    this.loading = true
    const isChecked = $event.target.checked
    let RmPermission = new reportmanagerPermissionModel()
    RmPermission.user = this.groupid
    RmPermission.type = 'RMGroupUserPermission'
    RmPermission.permission = obj.id
    let checklist = this.RMPermissionList.filter((item: any) => item.user === RmPermission.user.toString() && item.permission === RmPermission.permission.toString() && item.type === RmPermission.type)
    if (isChecked === true) {

      if (checklist.length === 0) {
        console.log('assigned')
        this.ApicreateRmpermission(RmPermission)
      }
      else {
        console.log('permission Allreay exist')
      }
    }
    else {
      if (checklist.length != 0) {
        this.ApideleteRmPermission(checklist[0].id)
        console.log('assigned removed')
      }
      else {
        console.log('permission not exist')
      }

    }
  }
  private IsAssigned(groupid: number, userid: number, type: string, permissionlist: any): boolean {
    let result = false
    if (!this.ValidatorChecker(permissionlist) && !this.ValidatorChecker(userid) && !this.ValidatorChecker(groupid) && !this.ValidatorChecker(type)) {
      let checklist = permissionlist.filter((objitem: any) => objitem.type === type && objitem.user === groupid.toString() && objitem.permission === userid.toString())
      if (checklist.length != 0) {
        result = true
      }
      else {
        // console.log('permission list not found')

      }
    }
    else {
      // console.log('Invalid parameters or Empty')
    }
    return result
  }
  private getDataByRole(obj: any, role: string, user: String, orgCode: string) {
    let result: Array<CustomersList> = []
    if (!this.ValidatorChecker(role) && !this.ValidatorChecker(user) && !this.ValidatorChecker(orgCode) && !this.ValidatorChecker(obj)) {
      if (role === 'ROLE_ADMIN') {
        let checklist = obj.filter((item: any) => item.accountAuthority === "SECONDARY" && item.orgCode === orgCode)
        if (checklist.length != 0) {
          result = checklist
        }
        else {
          console.log('list not found')
        }
      }
      else if (role === 'ROLE_SUPER_ADMIN') {
        let checklist = obj.filter((item: any) => item.accountAuthority === 'PRIMARY' && item.user != user)
        if (checklist.length != 0) {
          result = checklist
        }
        else {
          console.log('list not found')
        }
      }
      else {
        console.log('invalid role Found')
      }
    }
    else {
      console.log(obj)
      console.log(user)
      console.log(role)
      console.log(orgCode)
      console.log('invalid paremeters or Empty parameteres')
    }
    return result
  }
  private ApigetRMPermission(groupid: number) {
    this.loading = true
    this.RMPermissionList = []
    this.rmpermissionService.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          let checklist = data.data.filter((item: any) => item.user === groupid.toString())
          if (checklist.length != 0) {
            this.RMPermissionList = checklist
            // console.log(this.RMPermissionList)
            this.ApigetAccount(this.tokenstorage.getUser().username, this.tokenstorage.getUser().roles[0])
          }
          else {
            this.ApigetAccount(this.tokenstorage.getUser().username, this.tokenstorage.getUser().roles[0])
            console.log('no Permission found by groupid')
          }
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterService.error('Session Token Is Expired You Have To Re-Login')
          // console.log(data.apiStatus.message)
          this.logout()
        }
        else {
          console.log(data.apiStatus.message)
        }
      },
      err => {
        this.geterror()
        console.log(err.erroe)
      }
    )
  }
  private ValidatorChecker(data: any) {
    if (typeof data === "undefined" || data === null || data === '' || data.length != 0) {
      return false
    }
    else {
      return true
    }
  }
  private ApicreateRmpermission(obj: any) {
    this.loading = true
    // console.log(obj)
    this.rmpermissionService.create(obj).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.ngOnInit()
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterService.error('Session Token Is Expired You Have To Re-Login')
          // console.log(data.apiStatus.message)
          // this.logout()
        }
        else {
          console.log(data.apiStatus.message)
        }
      },
      err => {
        console.log(err.erroe)
      }
    )
  }
  private ApideleteRmPermission(id: number) {
    this.loading = true
    this.rmpermissionService.delete(id).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.ngOnInit()
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterService.error('Session Token Is Expired You Have To Re-Login')
          // console.log(data.apiStatus.message)
          // this.logout()
        }
        else {
          console.log(data.apiStatus.message)
        }
      },
      err => {
        console.log(err.erroe)
      }
    )
  }
  private geterror() {
    this.tosterService.error('Check Your Network Connect Or Server Error')
    this.logout()
  }
  private logout() {
    window.location.href = environmentProduct.xilontechReportManager + '#/logout'
  }
}

