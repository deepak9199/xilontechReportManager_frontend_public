import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { reportmanagerGroupmanagementModel, reportmanagerPermissionModel, reportmanagerUrlModel } from 'src/app/model/reportmanager';
import { CustomersList } from 'src/app/model/timer';
import { environmentProduct } from 'src/app/shared/BASE_URL/environment-product';
import { AccountService } from 'src/app/shared/_services/account-service';
import { MessageService } from 'src/app/shared/_services/message.service';
import { ReportManagerManageGroupService } from 'src/app/shared/_services/report-manager-manage-group.service';
import { ReportManagerPermissionService } from 'src/app/shared/_services/report-manager-permission.service';
import { ReportManagerUrlService } from 'src/app/shared/_services/report-manager-url.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-gropu-management-details',
  templateUrl: './gropu-management-details.component.html',
  styleUrls: ['./gropu-management-details.component.css']
})
export class GropuManagementDetailsComponent implements OnInit {

  loading = true
  loadingReportUrl = false
  loadingUser = false
  formUpdateGroupManagement: any = {}
  ReportManagerUrlList: Array<reportmanagerUrlModel> = []
  MessageObj: string
  private AccountList: Array<CustomersList> = []
  AccountListRM: Array<CustomersList> = []
  private RMPermissionList: Array<reportmanagerPermissionModel> = []
  RMReportUrlList: Array<reportmanagerUrlModel> = []
  private ReportManagerReportUrlList: Array<reportmanagerUrlModel> = []
  private groupid: number
  constructor(
    private tokenStorage: TokenStorageService,
    private tosterService: ToastrService,
    private reportmanagerGroupManagement: ReportManagerManageGroupService,
    private router: Router,
    private messageService: MessageService,
    private reportUrl: ReportManagerUrlService,
    private accountService: AccountService,
    private rmpermissionService: ReportManagerPermissionService,
  ) { }

  ngOnInit(): void {
    this.getmessage()
  }
  edit() {
    this.Apiupdate(this.formUpdateGroupManagement)
  }
  private getmessage() {
    this.MessageObj = this.messageService.getmessage()
    if (this.MessageObj === '') {
      this.routBack()
    }
    else {

      this.start(JSON.parse(this.MessageObj))
    }
  }
  private start(obj: any) {
    this.groupid = obj.id
    this.Apiget(this.groupid)
  }
  private getaccountlist(objaccount: any, objpermission: any, groupid: number) {
    let result: Array<CustomersList> = []
    if (!this.ValidatorChecker(objaccount) && !this.ValidatorChecker(groupid)) {
      objaccount.map((objuser: CustomersList) => {
        let checkedlist = objpermission.filter((item: any) => item.permission === objuser.id.toString() && item.type === 'RMGroupUserPermission')
        if (checkedlist != 0) {
          result.push(objuser)
        }
      })
    }
    else {
      console.log('Invalid parameter or empty')
    }
    return result
  }
  private routBack() {
    this.router.navigate(['GroupManagmentList'])
  }
  routeReportList() {
    this.router.navigate(['GroupManagmentList/details/ReportUrl'])
  }
  routeUserList() {
    this.router.navigate(['GroupManagmentList/details/user'])
  }
  private Apiget(id: number) {
    this.loading = true
    this.reportmanagerGroupManagement.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          let checklist = data.data.filter((item: any) => item.id === id)
          if (checklist.lenght != 0) {
            this.loading = false
            this.update(checklist[0])
            this.ApigetRMPermission(id)
            this.ApigetReportUrl()
          }
          else {
            this.loading = false
            console.log('Not Data list Found')
          }
        }
        else if (data.apiStatus.message === 'Access is denied') {
          // this.loading = false
          this.tosterService.error('Session Token Is Expired You Have To Re-Login')
          // console.log(data.apiStatus.message)
          this.logout()
        }
        else {
          this.geterror()
          // this.loading = false
          console.log(data.apiStatus.message)
        }
      },
      err => {
        // this.loading = false
        console.log(err.erroe)
      }
    )
  }
  private Apiupdate(obj: any) {
    this.reportmanagerGroupManagement.update(obj).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.tosterService.success("Updated Successfully"),
            this.ngOnInit()
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterService.error('Session Token Is Expired You Have To Re-Login')
          // console.log(data.apiStatus.message)
          this.logout()
        }
        else {
          this.geterror()
          console.log(data.apiStatus.message)
        }
      },
      err => {
        console.log(err.erroe)
      }
    )
  }
  private update(obj: any) {
    this.formUpdateGroupManagement.id = obj.id
    this.formUpdateGroupManagement.groupName = obj.groupName
    this.formUpdateGroupManagement.groupDescription = obj.groupDescription
  }
  private ApigetReportUrl() {
    this.loading = true
    this.reportUrl.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.loading = false
          this.ReportManagerUrlList = data.data
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterService.error('Session Token Is Expired You Have To Re-Login')
          // console.log(data.apiStatus.message)
          this.logout()
          this.loading = false
        }
        else {
          this.geterror()
          console.log(data.apiStatus.message)
          this.loading = false
        }
      },
      err => {
        console.log(err.erroe)
        this.loading = false
      }
    )
  }
  private ApigetAccount(user: string, role: string) {
    this.loading = true
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
                  console.log('no Rm permiossion User List Found')
                  this.loading = false
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
  private ValidatorChecker(data: any) {
    if (typeof data === "undefined" || data === null || data === '' || data.length != 0) {
      return false
    }
    else {
      return true
    }
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
            this.ApigetAccount(this.tokenStorage.getUser().username, this.tokenStorage.getUser().roles[0])
            this.ApigetReportUrl1()
          }
          else {
            this.ApigetAccount(this.tokenStorage.getUser().username, this.tokenStorage.getUser().roles[0])
            this.ApigetReportUrl1()
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
  private getReportUrlList(objReportUrl: any, objpermission: any, groupid: number) {
    let result: Array<reportmanagerUrlModel> = []
    if (!this.ValidatorChecker(objReportUrl) && !this.ValidatorChecker(groupid)) {
      objReportUrl.map((objurl: reportmanagerUrlModel) => {
        let checkedlist = objpermission.filter((item: any) => item.permission === objurl.id.toString() && item.type === 'RMGroupUrlPermission')
        if (checkedlist != 0) {
          result.push(objurl)
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
  private ApigetReportUrl1() {
    this.loading = true
    this.reportUrl.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.loading = false
          this.ReportManagerReportUrlList = data.data
          if (this.ReportManagerReportUrlList.length != 0) {
            this.RMReportUrlList = this.getReportUrlList(this.ReportManagerReportUrlList, this.RMPermissionList, this.groupid)
          }
          else {
            console.log('Not Report Found')
          }
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterService.error('Session Token Is Expired You Have To Re-Login')
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
  private geterror() {
    this.tosterService.error('Check Your Network Connect Or Server Error')
    this.logout()
  }
  private logout() {
    window.location.href = environmentProduct.xilontechReportManager + '#/logout'
  }
}
