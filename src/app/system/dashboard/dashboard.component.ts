import { Component, ElementRef, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { reportmanagerGroupmanagementModel, reportmanagerPermissionModel, reportmanagerUrlModel } from 'src/app/model/reportmanager';
import { CustomersList } from 'src/app/model/timer';
import { environmentProduct } from 'src/app/shared/BASE_URL/environment-product';
import { AccountService } from 'src/app/shared/_services/account-service';
import { ReportManagerManageGroupService } from 'src/app/shared/_services/report-manager-manage-group.service';
import { ReportManagerPermissionService } from 'src/app/shared/_services/report-manager-permission.service';
import { ReportManagerUrlService } from 'src/app/shared/_services/report-manager-url.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = true
  urllist: Array<reportmanagerUrlModel> = []
  private reportmanagerurllist: Array<reportmanagerUrlModel> = []
  private rmpermissinlist: Array<reportmanagerPermissionModel> = []
  private accountlist: Array<CustomersList> = []
  private orgCode: string
  private FindRmpermissionListForuser: Array<reportmanagerPermissionModel> = []
  private FindRmpermissionListForgroup: Array<reportmanagerPermissionModel> = []
  constructor(
    private accountservice: AccountService,
    private rmpermissionservice: ReportManagerPermissionService,
    private tokenstorageservice: TokenStorageService,
    private rmurlservice: ReportManagerUrlService,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.start()
  }
  start() {
    this.ApigetAccountLiList()
  }
  private ApigetReportUrlListSuperAdmin(orgCode: string) {
    this.rmurlservice.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.urllist = data.data.filter((item: any) => item.orgCode === orgCode)
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
        console.log(err.erroe)
      }
    )
  }
  private ApigetReportUrlList() {
    this.rmurlservice.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.reportmanagerurllist = data.data
          if (!this.ValidatorChecker(this.reportmanagerurllist)) {
            if (!this.ValidatorChecker(this.FindRmpermissionListForuser)) {
              this.FindRmpermissionListForgroup = this.getrmpermissionListbyGroup(this.rmpermissinlist, this.FindRmpermissionListForuser, this.getuserIdbyName(this.tokenstorageservice.getUser().username))
              this.urllist = this.getUrlList(this.FindRmpermissionListForgroup, this.reportmanagerurllist)
              // console.log(this.urllist)
              this.loading = false
            }
            else {
              console.log('RmpermissionListForuser is empty or invalid')
            }
          }
          else {
            console.log('url list is empty')
          }

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
        console.log(err.erroe)
      }
    )
  }
  private ApigetAccountLiList() {
    this.accountservice.getAccounts().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.accountlist = data.data
          let checklist = data.data.filter((item: any) => item.user === this.tokenstorageservice.getUser().username)
          if (checklist.length != 0) {
            this.orgCode = checklist[0].orgCode
            if (this.tokenstorageservice.getUser().roles[0] === 'ROLE_SUPER_ADMIN' || this.tokenstorageservice.getUser().roles[0] === 'ROLE_ADMIN') {
              this.ApigetReportUrlListSuperAdmin(checklist[0].orgCode)
            }
            else {
              // console.log('user')
              this.ApiReprotmanagerPermission()
            }
          }
          else {
            console.log('no user found')
          }
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
        console.log(err.erroe)
      }
    )
  }
  private ApiReprotmanagerPermission() {
    this.rmpermissionservice.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.rmpermissinlist = data.data
          if (!this.ValidatorChecker(this.rmpermissinlist)) {
            let checklist = this.rmpermissinlist.filter((item: any) => item.type === 'RMGroupUserPermission')
            if (!this.ValidatorChecker(checklist)) {
              this.ApigetReportUrlList()
              this.FindRmpermissionListForuser = this.getrmpermissionListbyorgCodeOruser(checklist, this.tokenstorageservice.getUser().username)
            }
            else {
              console.log('not user permission found')
            }
          }
          else {
            console.log('rm permission list not found')
          }
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
        console.log(err.erroe)
      }
    )
  }
  private getorgCodebyUser(userid: number): string {
    let result: string
    let checklist = this.accountlist.filter((item: any) => item.id == userid)
    // console.log(checklist)
    if (!this.ValidatorChecker(checklist)) {
      result = checklist[0].orgCode
    }
    else {
      result = ''
      console.log('user not found by id')
    }
    return result
  }
  private getrmpermissionListbyorgCodeOruser(obj: any, user: string) {
    // console.log(user)
    let result: Array<reportmanagerPermissionModel> = []
    if (!this.ValidatorChecker(obj)) {
      obj.map((item: any) => {
        let orgCode = this.getorgCodebyUser(item.permission)
        if (!this.ValidatorChecker(orgCode)) {
          if (orgCode === this.orgCode && item.permission === this.getuserIdbyName(user).toString()) {
            result.push(item)
          }
        }
        else {
          console.log('orgcode not found by permission(user)')
        }
      })
    }
    else {
      console.log('obj is Empty or invalid')
    }
    // console.log(result)
    return result
  }
  private getrmpermissionListbyGroup(objrmpermission: any, objrmpermissionuser: any, userid: number) {
    let result: Array<reportmanagerPermissionModel> = []
    if (!this.ValidatorChecker(objrmpermission) && !this.ValidatorChecker(objrmpermissionuser)) {
      let checklist = objrmpermission.filter((itemrmobj: any) => itemrmobj.type === 'RMGroupUrlPermission')
      if (!this.ValidatorChecker(checklist)) {
        let UniquepermisionListbyGroup = [...new Map(objrmpermissionuser.map((item: any) =>
          [item['user'], item])).values()];
        UniquepermisionListbyGroup.map((itemobj: any) => {
          let findobjbygroupid = checklist.filter((itemobjfind: any) => itemobjfind.user === itemobj.user)
          if (!this.ValidatorChecker(findobjbygroupid)) {
            findobjbygroupid.map((itemobjurl: any) => {
              result.push(itemobjurl)
            })
          }
          else {
            // console.log('no groupid found')
          }
        })
      }
      else {
        console.log('no url permission found')
      }
    }
    else {
      console.log('obj is Empty or invalid')
    }
    if (!this.ValidatorChecker(result)) {
      let UniquepermisionListbyurl = [...new Map(result.map((item: any) =>
        [item['permission'], item])).values()];
      // console.log(UniquepermisionListbyurl)
      return UniquepermisionListbyurl
    }
    else {
      console.log('Result is empty or Invalid')
    }
  }
  private ValidatorChecker(data: any) {
    if (typeof data === "undefined" || data === null || data === '' || data.length != 0) {
      return false
    }
    else {
      return true
    }
  }
  private getUrlList(objpermisionlist: any, ObjUrlList: any) {
    // console.log(objpermisionlist)
    let result: Array<reportmanagerUrlModel> = []
    if (!this.ValidatorChecker(objpermisionlist) && !this.ValidatorChecker(ObjUrlList)) {
      objpermisionlist.map((objper: any) => {
        let checklist = ObjUrlList.filter((objurl: any) => objper.permission == objurl.id)
        if (checklist.length != 0) {
          result.push(checklist[0])
        }
        else {
          console.log('url permission not found')
        }
      })
    }
    else {
      console.log('object is empty or invalid')
    }
    return result
  }
  private getuserIdbyName(username: string) {

    let result = null
    let checklist = this.accountlist.filter((item: any) => item.user === username)
    if (checklist.length != 0) {
      result = checklist[0].id
    }
    return result
  }
  private geterror() {
    this.toster.error('Check Your Network Connect Or Server Error')
    this.logout()
  }
  private logout() {
    window.location.href = environmentProduct.xilontechReportManager + '#/logout'
  }
}
