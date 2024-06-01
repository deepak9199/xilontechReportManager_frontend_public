import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { reportmanagerGroupmanagementModel, reportmanagerPermissionModel, reportmanagerUrlModel } from 'src/app/model/reportmanager';
import { environmentProduct } from 'src/app/shared/BASE_URL/environment-product';
import { AccountService } from 'src/app/shared/_services/account-service';
import { ReportManagerManageGroupService } from 'src/app/shared/_services/report-manager-manage-group.service';
import { ReportManagerPermissionService } from 'src/app/shared/_services/report-manager-permission.service';
import { ReportManagerUrlService } from 'src/app/shared/_services/report-manager-url.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-report-url',
  templateUrl: './report-url.component.html',
  styleUrls: ['./report-url.component.css']
})
export class ReportUrlComponent implements OnInit {

  loading = true
  formEdit: any = {}
  formCreate: any = {}
  ReportManagerUrlList: Array<reportmanagerUrlModel> = []
  reportmanagerGroupmanagmentList: Array<reportmanagerGroupmanagementModel> = []
  private DeleteReprotManagerUrl: reportmanagerUrlModel
  private RMPermissionList: Array<reportmanagerPermissionModel> = []
  private OrgCode: string
  constructor(
    private reportUrl: ReportManagerUrlService,
    private tosterservice: ToastrService,
    private reportmanagerGroupManagement: ReportManagerManageGroupService,
    private rmpermissionService: ReportManagerPermissionService,
    private accountservice: AccountService,
    private tokenstorge: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.Apigetaccount()
  }
  add() {
    this.Apicreate()
  }
  edit() {
    this.Apiupdate(this.formEdit)
  }
  update(obj: any) {
    this.formEdit.id = obj.id
    this.formEdit.reportName = obj.reportName
    this.formEdit.reportDescription = obj.reportDescription
    this.formEdit.reportUrl = obj.reportUrl
  }
  deteleYesNo(obj: any) {
    this.DeleteReprotManagerUrl = obj
  }
  deleteYes() {
    let ref = document.getElementById('cancelDelete')
    ref.click(),
      this.ngOnInit(),
      this.Apidelete(this.DeleteReprotManagerUrl.id)
  }
  deleteNo() {
    let ref = document.getElementById('cancelDelete')
    ref.click(),
      // this.toastr.success('Customer Updated Successfully')
      this.ngOnInit()
  }
  private Apiget(orgCode: string) {
    this.loading = true
    this.OrgCode = orgCode
    this.reportUrl.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.loading = false
          console.log(data.data)
          this.ReportManagerUrlList = data.data.filter((item: any) => item.orgCode === orgCode)
          this.ApigetRmManagerGroup()
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterservice.error('Session Token Is Expired You Have To Re-Login')
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
  private Apidelete(id: number) {
    this.reportUrl.delete(id).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.ngOnInit()
          this.tosterservice.success("Deleted Successfully")
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterservice.error('Session Token Is Expired You Have To Re-Login')
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
  private Apiupdate(obj: any) {
    this.reportUrl.update(obj).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          let ref = document.getElementById('cancelEdit')
          if (ref === null) {
            console.log("null")
          }
          else {
            ref.click(),
              this.tosterservice.success("Updated Successfully"),
              this.ngOnInit()
          }
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterservice.error('Session Token Is Expired You Have To Re-Login')
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
  private Apicreate() {
    this.formCreate.orgCode = this.OrgCode
    this.reportUrl.create(this.formCreate).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          // console.log(data.data)
          if (!this.ValidatorChecker(this.formCreate.assigntogroup)) {
            this.Assigned(data.data.id, this.formCreate.assigntogroup)
            let ref = document.getElementById('cancelCreate')
            if (ref === null) {
              console.log("null")
            }
            else {
              ref.click(),
                this.tosterservice.success("Created Successfully"),
                this.ngOnInit()
            }
          }
          else {
            let ref = document.getElementById('cancelCreate')
            if (ref === null) {
              console.log("null")
            }
            else {
              ref.click(),
                this.tosterservice.success("Created Successfully"),
                this.ngOnInit()
            }
          }
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterservice.error('Session Token Is Expired You Have To Re-Login')
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
  setEmpty() {
    this.formCreate = {}
  }
  private ApigetRmManagerGroup() {
    this.reportmanagerGroupManagement.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.reportmanagerGroupmanagmentList = data.data
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterservice.error('Session Token Is Expired You Have To Re-Login')
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
  Assigned(urlid: any, groupid: number) {
    this.loading = true
    let RmPermission = new reportmanagerPermissionModel()
    RmPermission.user = groupid
    RmPermission.type = 'RMGroupUrlPermission'
    RmPermission.permission = urlid
    let checklist = this.RMPermissionList.filter((item: any) => item.user === RmPermission.user.toString() && item.permission === RmPermission.permission.toString() && item.type === RmPermission.type)
    if (checklist.length === 0) {
      console.log('assigned')
      this.ApicreateRmpermission(RmPermission)
    }
    else {
      console.log('permission Allreay exist')
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
          this.tosterservice.error('Session Token Is Expired You Have To Re-Login')
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
  private Apigetaccount() {
    this.accountservice.getAccounts().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          let checklist = data.data.filter((item: any) => item.user === this.tokenstorge.getUser().username)
          if (checklist.length != 0) {
            this.Apiget(checklist[0].orgCode)
          }
          else {
            console.log('user not found')
          }
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.tosterservice.error('Session Token Is Expired You Have To Re-Login')
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
    this.tosterservice.error('Check Your Network Connect Or Server Error')
    this.logout()
  }
  private logout() {
    window.location.href = environmentProduct.xilontechReportManager + '#/logout'
  }
}
