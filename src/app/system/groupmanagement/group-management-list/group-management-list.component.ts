import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { reportmanagerGroupmanagementModel } from 'src/app/model/reportmanager';
import { environmentProduct } from 'src/app/shared/BASE_URL/environment-product';
import { AccountService } from 'src/app/shared/_services/account-service';
import { MessageService } from 'src/app/shared/_services/message.service';
import { ReportManagerManageGroupService } from 'src/app/shared/_services/report-manager-manage-group.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-group-management-list',
  templateUrl: './group-management-list.component.html',
  styleUrls: ['./group-management-list.component.css']
})
export class GroupManagementListComponent implements OnInit {
  loading = false
  formEdit: any = {}
  formCreate: any = {}
  reportmanagerGroupmanagmentList: Array<reportmanagerGroupmanagementModel> = []
  private deletereportmanagerGroupmanagment: reportmanagerGroupmanagementModel
  private OrgCode: string
  constructor(
    private toster: ToastrService,
    private tosterService: ToastrService,
    private reportmanagerGroupManagement: ReportManagerManageGroupService,
    private router: Router,
    private messageService: MessageService,
    private accountservice: AccountService,
    private tokenstorge: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.Apigetaccount()
  }
  add() {
    this.formCreate.orgCode = this.OrgCode
    this.Apicreate(this.formCreate)
  }
  edit() {
    this.Apiupdate(this.formEdit)
  }
  update(obj: any) {
    // this.formEdit.id = obj.id
    // this.formEdit.groupName = obj.groupName
    // this.formEdit.groupDescription = obj.groupDescription
    this.rout(obj)
  }
  deteleYesNo(obj: any) {
    this.deletereportmanagerGroupmanagment = obj
  }
  deleteYes() {
    let ref = document.getElementById('cancelDelete')
    ref.click(),
      this.ngOnInit(),
      this.Apidelete(this.deletereportmanagerGroupmanagment.id)
  }
  deleteNo() {
    let ref = document.getElementById('cancelDelete')
    ref.click(),
      // this.toastr.success('Customer Updated Successfully')
      this.ngOnInit()
  }
  private Apiget(orgCode: string) {
    this.OrgCode = orgCode
    this.reportmanagerGroupManagement.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.reportmanagerGroupmanagmentList = data.data.filter((item: any) => item.orgCode === orgCode)
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
  private Apicreate(obj: any) {
    this.reportmanagerGroupManagement.create(obj).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          let ref = document.getElementById('cancelCreate')
          if (ref === null) {
            console.log("null")
          }
          else {
            ref.click(),
              this.tosterService.success("Created Successfully"),
              this.ngOnInit()
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
  private Apiupdate(obj: any) {
    this.reportmanagerGroupManagement.update(obj).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          let ref = document.getElementById('cancelEdit')
          if (ref === null) {
            console.log("null")
          }
          else {
            ref.click(),
              this.tosterService.success("Updated Successfully"),
              this.ngOnInit()
          }
        }
        else if (data.apiStatus.message === 'Access is denied') {
          this.toster.error('Session Token Is Expired You Have To Re-Login')
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
  private Apidelete(id: number) {
    this.reportmanagerGroupManagement.delete(id).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.tosterService.success("Deleted Successfully")
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
  setempty() {
    this.formCreate = {}
  }
  private rout(obj: any) {
    this.messageService.setmessage(JSON.stringify(obj))
    this.router.navigate(['GroupManagmentList/details'])
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
  private geterror() {
    this.toster.error('Check Your Network Connect Or Server Error')
    this.logout()
  }
  private logout() {
    window.location.href = environmentProduct.xilontechReportManager + '#/logout'
  }
}
