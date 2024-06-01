import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DefaultPageComponent } from './shared/default-page/default-page.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { FooterComponent } from './shared/footer/footer.component';
import { authInterceptorProviders } from './shared/_helpers/auth.interceptor';
import { AuthGuard } from './shared/_guards/auth.guard';
import { AuthService } from './shared/_services/auth.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EncrDecrServiceService } from './shared/_services/encr-decr-service.service';
import { LoginComponent } from './system/login/login.component';
import { LogoutComponent } from './system/logout/logout.component';
import { DashboardComponent } from './system/dashboard/dashboard.component';
import { GroupManagementListComponent } from './system/groupmanagement/group-management-list/group-management-list.component';
import { GroupManagementDetailUserListComponent } from './system/groupmanagement/groupManagementDetail/group-management-detail-user-list/group-management-detail-user-list.component';
import { GroupManagementDetailReportUrlComponent } from './system/groupmanagement/groupManagementDetail/group-management-detail-report-url/group-management-detail-report-url.component';
import { ReportUrlComponent } from './system/report-url/report-url.component';
import { GropuManagementDetailsComponent } from './system/groupmanagement/groupManagementDetail/gropu-management-details/gropu-management-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DefaultPageComponent,
    LoadingComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    GroupManagementListComponent,
    GroupManagementDetailUserListComponent,
    GroupManagementDetailReportUrlComponent,
    ReportUrlComponent,
    GropuManagementDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [
    authInterceptorProviders,
    AuthGuard,
    AuthService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    EncrDecrServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
