import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/_guards/auth.guard';
import { DashboardComponent } from '../system/dashboard/dashboard.component';
import { GroupManagementListComponent } from '../system/groupmanagement/group-management-list/group-management-list.component';
import { GropuManagementDetailsComponent } from '../system/groupmanagement/groupManagementDetail/gropu-management-details/gropu-management-details.component';
import { GroupManagementDetailReportUrlComponent } from '../system/groupmanagement/groupManagementDetail/group-management-detail-report-url/group-management-detail-report-url.component';
import { GroupManagementDetailUserListComponent } from '../system/groupmanagement/groupManagementDetail/group-management-detail-user-list/group-management-detail-user-list.component';
import { LoginComponent } from '../system/login/login.component';
import { LogoutComponent } from '../system/logout/logout.component';
import { ReportUrlComponent } from '../system/report-url/report-url.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: DashboardComponent },
  {
    path: 'ReportUrl', component: ReportUrlComponent, canActivate: [AuthGuard], data:
    {
      role: 'ROLE_SUPER_ADMIN',
      role1: 'ROLE_ADMIN'
    }
  },
  {
    path: 'GroupManagmentList', component: GroupManagementListComponent, canActivate: [AuthGuard], data:
    {
      role: 'ROLE_SUPER_ADMIN',
      role1: 'ROLE_ADMIN'
    }
  },
  {
    path: 'GroupManagmentList/details', component: GropuManagementDetailsComponent, canActivate: [AuthGuard], data:
    {
      role: 'ROLE_SUPER_ADMIN',
      role1: 'ROLE_ADMIN'
    }
  },
  {
    path: 'GroupManagmentList/details/ReportUrl', component: GroupManagementDetailReportUrlComponent, canActivate: [AuthGuard], data:
    {
      role: 'ROLE_SUPER_ADMIN',
      role1: 'ROLE_ADMIN'
    }
  },
  {
    path: 'GroupManagmentList/details/user', component: GroupManagementDetailUserListComponent, canActivate: [AuthGuard], data:
    {
      role: 'ROLE_SUPER_ADMIN',
      role1: 'ROLE_ADMIN'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
