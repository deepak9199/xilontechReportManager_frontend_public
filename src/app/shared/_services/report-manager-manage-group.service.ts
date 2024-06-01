import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_REPORTMANAGER } from '../BASE_URL/BASE_URL';

@Injectable({
  providedIn: 'root'
})
export class ReportManagerManageGroupService {
  private Url = BASE_URL_REPORTMANAGER + "api/ReportManagerManageGroup/"
  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<any> {
    return this.http.get(this.Url, {})
  }
  create(obj: any): Observable<any> {
    return this.http.post(this.Url, {
      groupName: obj.groupName,
      groupDescription: obj.groupDescription,
      orgCode: obj.orgCode
    })
  }
  update(obj: any): Observable<any> {
    return this.http.put(this.Url + obj.id, {
      groupName: obj.groupName,
      groupDescription: obj.groupDescription
    })
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.Url + id)
  }
}
