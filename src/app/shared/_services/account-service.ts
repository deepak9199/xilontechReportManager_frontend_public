import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL, BASE_URL_PORTAL } from "../BASE_URL/BASE_URL";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURL = BASE_URL_PORTAL+'api/account/';
  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {
    return this.http.get(this.baseURL,
      {});
  }

  getExcelfile() {
    return this.http.get(this.baseURL + "file",
      {});
  }

  getAccountsbyuser(id: String): Observable<any> {
    return this.http.get(this.baseURL + id,
      {});
  }
  postAccounts(Subscriptions:any): Observable<any> {
    // console.log(Subscriptions)
    return this.http.post(this.baseURL, {
      email: Subscriptions.email,
      firstName: Subscriptions.firstName,
      middleName: Subscriptions.middleName,
      lastName: Subscriptions.lastName,
      orgCode: Subscriptions.orgCode,
      user: Subscriptions.user,
      accountAuthority: Subscriptions.accountAuthority,
      about: Subscriptions.about,
      address: Subscriptions.address,
      city: Subscriptions.city,
      companyname: Subscriptions.companyname,
      contactnumber: Subscriptions.contactnumber,
      country: Subscriptions.country,
      postalcode: Subscriptions.postalcode,
      employeetype: Subscriptions.employeetype
    });
  }

  deleteAccounts(id: number): Observable<any> {
    return this.http.delete(this.baseURL + id)
  }
  getAccountsbyid(id: number): Observable<any> {
    return this.http.get(this.baseURL + id)
  }

  updateAccounts(id: number, Subscriptions: any): Observable<any> {
    return this.http.put(this.baseURL + id, {
      email: Subscriptions.email,
      firstName: Subscriptions.firstName,
      middleName: Subscriptions.middleName,
      lastName: Subscriptions.lastName,
      orgCode: Subscriptions.orgCode,
      user: Subscriptions.user,
      accountAuthority: Subscriptions.accountAuthority,
      about: Subscriptions.about,
      address: Subscriptions.address,
      city: Subscriptions.city,
      companyname: Subscriptions.companyname,
      contactnumber: Subscriptions.contactnumber,
      country: Subscriptions.country,
      postalcode: Subscriptions.postalcode,
      employeetype: Subscriptions.employeetype
    })
  }
}
