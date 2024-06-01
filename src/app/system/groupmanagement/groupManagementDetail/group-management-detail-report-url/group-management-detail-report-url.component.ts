import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { reportmanagerPermissionModel, reportmanagerUrlModel } from 'src/app/model/reportmanager';
import { MessageService } from 'src/app/shared/_services/message.service';
import { ReportManagerPermissionService } from 'src/app/shared/_services/report-manager-permission.service';
import { ReportManagerUrlService } from 'src/app/shared/_services/report-manager-url.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import { Location } from '@angular/common';
import { AccountService } from 'src/app/shared/_services/account-service';
import { ToastrService } from 'ngx-toastr';
import { environmentProduct } from 'src/app/shared/BASE_URL/environment-product';
@Component({
  selector: 'app-group-management-detail-report-url',
  templateUrl: './group-management-detail-report-url.component.html',
  styleUrls: ['./group-management-detail-report-url.component.css']
})
export class GroupManagementDetailReportUrlComponent implements OnInit {

  loading = false
  private RMPermissionList: Array<reportmanagerPermissionModel> = []
  MessageObj: string
  groupid: number
  RMReportUrlList: Array<reportmanagerUrlModel> = []
  private ReportManagerReportUrlList: Array<reportmanagerUrlModel> = []
  private OrgCode: string
  constructor(
    private rmpermissionService: ReportManagerPermissionService,
    private messageservice: MessageService,
    private _location: Location,
    private reportUrl: ReportManagerUrlService,
    private accountservice: AccountService,
    private tokenstorge: TokenStorageService,
    private toster: ToastrService
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
  Assigned(obj: any, $event: any) {
    this.loading = true
    const isChecked = $event.target.checked
    let RmPermission = new reportmanagerPermissionModel()
    RmPermission.user = this.groupid
    RmPermission.type = 'RMGroupUrlPermission'
    RmPermission.permission = obj.id
    // console.log(RmPermission)
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
            this.Apigetaccount()
          }
          else {
            this.Apigetaccount()
            // console.log('no Permission found by groupid')
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
        console.log(err.erroe)
      }
    )
  }
  private getReportUrlList(objReportUrl: any, objpermission: any, groupid: number) {
    let result: Array<reportmanagerUrlModel> = []
    if (!this.ValidatorChecker(objReportUrl) && !this.ValidatorChecker(groupid)) {
      objReportUrl.map((objurl: reportmanagerUrlModel) => {
        let url = objurl
        if (this.IsAssigned(groupid, objurl.id, 'RMGroupUrlPermission', objpermission)) {
          url.isselected = true
          result.push(url)
        }
        else {
          url.isselected = false
          result.push(url)
        }
      })
    }
    else {
      // console.log(objaccount)
      // console.log(objpermission)
      console.log('Invalid parameter or empty')
    }
    // console.log(result)
    return result
  }
  private ApigetReportUrl(orgCode: string) {
    this.loading = true
    this.reportUrl.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.loading = false
          this.ReportManagerReportUrlList = data.data.filter((item: any) => item.orgCode === orgCode)
          console.log(this.ReportManagerReportUrlList)
          if (this.ReportManagerReportUrlList.length != 0) {
            this.RMReportUrlList = this.getReportUrlList(this.ReportManagerReportUrlList, this.RMPermissionList, this.groupid)
          }
          else {
            console.log('Not Report Found')
          }
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.toster.error('Session Token Is Expired You Have To Re-Login')
          // console.log(data.apiStatus.message)
          this.logout()
          this.loading = false
        }
        else {
          console.log(data.apiStatus.message)
          this.loading = false
        }
      },
      err => {
        this.geterror()
        console.log(err.erroe)
        this.loading = false
      }
    )
  }
  private Apigetaccount() {
    this.accountservice.getAccounts().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          let checklist = data.data.filter((item: any) => item.user === this.tokenstorge.getUser().username)
          if (checklist.length != 0) {
            this.ApigetReportUrl(checklist[0].orgCode)
          }
          else {
            console.log('user not found')
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
        this.geterror()
        console.log(err.erroe)
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
