import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { productsList, projectsAssine } from 'src/app/model/timer';
import { environment } from 'src/environments/environment';
import { environmentProduct } from '../BASE_URL/environment-product';
import { AccountService } from '../_services/account-service';
import { AuthService } from '../_services/auth.service';
import { EncrDecrServiceService } from '../_services/encr-decr-service.service';
import { ProductService } from '../_services/product.service';
import { TimnerProjectAssineService } from '../_services/timner-project-assine.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css']
})
export class DefaultPageComponent implements OnInit {


  app_roles = '';
  isLoggedIn = false;
  showAdminBoard = true;
  showModeratorBoard = false;
  username: string;
  isLoginFailed = false;
  errorMessage = '';
  user: string
  pass: string
  private selectedProduct: String = 'Report Manager'
  private PermissionList: Array<projectsAssine> = []
  private products: Array<productsList> = []
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private permissionService: TimnerProjectAssineService,
    private toster: ToastrService,
    private ProductsService: ProductService,
  ) {

  }

  ngOnInit(): void {
    this.username = this.tokenStorage.getUser().username
    this.setUserLoginData()
  }
  setUserLoginData() {
    let userLoginData = this.tokenStorage.getUser().accessToken || ''
    //console.log(userLoginData)
    if (userLoginData != '') {
      // console.log(userLoginData)
      this.tokenStorage.saveToken(userLoginData)
      this.getPermissionList()
      //this.router.navigate(['/timeclock'])
    }
    else {
      this.isLoggedIn = false
      this.router.navigate(['login'])
    }
  }
  private getPermissionList() {
    this.permissionService.gettimeprojectsAssine().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.PermissionList = data.data
          if (this.PermissionList.length != 0) {
            this.getproductData()
            // console.log(this.products)
          }
          else {
            console.log('no product permission found')
          }
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
  ProductListByAccessLevelUser(Product: string): boolean {
    // console.log(this.username)
    let result = false
    if (this.username != '') {
      let PermissionObj = this.PermissionList
      // console.log(PermissionObj);
      if (PermissionObj.length != 0) {
        let checkListAssignTo = PermissionObj.filter((item: any) => item.type === 'AccessLevelAssignTo' && item.permission === this.username)
        if (checkListAssignTo.length != 0) {
          let LevelNameobj = checkListAssignTo[0].user
          let checklsitproduct = PermissionObj.filter((item: any) => item.user === LevelNameobj && item.type === 'AccessLevelProductName' && item.permission.toUpperCase() === Product.toUpperCase())
          // console.log(checklsitproduct)
          if (checklsitproduct.length != 0) {
            result = true
          }
        }
        else {
          console.log('No Access Level Assigned')
        }
      }
      else {
        console.log('no Permission list Found')
      }
    }
    else {
      console.log('User Name Empty')
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
  private getproductData() {
    this.ProductsService.getProductsList().subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          // console.log(data.data);
          this.products = data.data.filter((item: any) => this.ProductListByAccessLevelUser(item.productName));

          if (this.products.length != 0) {
            let checklist = this.products.filter((itemproduct: any) => itemproduct.productName.toUpperCase() === this.selectedProduct.toUpperCase())
            // console.log(checklist)
            if (checklist.length != 0) {
              this.isLoggedIn = true
            }
            else {
              this.isLoggedIn = false
              this.toster.error('Authorization Error')
              this.logout()
            }
          }
          else {
            this.isLoggedIn = false
            this.toster.error('Authorization Error')
            this.logout()
            console.log('no product found for this user')
          }
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
      })
  }
}
