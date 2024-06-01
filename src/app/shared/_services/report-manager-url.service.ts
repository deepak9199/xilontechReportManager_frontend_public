import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_REPORTMANAGER } from '../BASE_URL/BASE_URL';

@Injectable({
  providedIn: 'root'
})
export class ReportManagerUrlService {
  private Url = BASE_URL_REPORTMANAGER + "api/ReportManagerUrl/"
  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<any> {
    return this.http.get(this.Url, {})
  }
  create(obj: any): Observable<any> {
    // console.log(obj)
    return this.http.post(this.Url, {
      reportName: obj.reportName,
      reportDescription: obj.reportDescription,
      reportUrl: obj.reportUrl,
      orgCode: obj.orgCode
    })
  }
  update(obj: any): Observable<any> {
    return this.http.put(this.Url + obj.id, {
      reportName: obj.reportName,
      reportDescription: obj.reportDescription,
      reportUrl: obj.reportUrl
    })
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.Url + id)
  }

}
