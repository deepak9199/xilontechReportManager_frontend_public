import { Component, OnInit } from '@angular/core';
import { environmentProduct } from 'src/app/shared/BASE_URL/environment-product';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { UserSharingService } from 'src/app/shared/_services/user-sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userSharingService: UserSharingService,
  ) { }

  ngOnInit(): void {
    this.logout()
  }
  private postAdminData(linkURL: any, portal: any) {
    this.userSharingService.postCrossDomainMessage(linkURL, portal);
  }
  logout() {
    this.authService.logout()
    window.location.href = environmentProduct.xilontechPortal + '#/logout'
  }
}
