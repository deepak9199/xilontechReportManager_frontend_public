import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_REPORTMANAGER } from '../BASE_URL/BASE_URL';

@Injectable({
  providedIn: 'root'
})
export class ReportManagerPermissionService {
  private Url = BASE_URL_REPORTMANAGER + "api/ReportManagerPermission/"
  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<any> {
    return this.http.get(this.Url, {})
  }
  create(obj: any): Observable<any> {
    return this.http.post(this.Url, {
      user: obj.user,
      type: obj.type,
      permission: obj.permission
    })
  }
  update(obj: any): Observable<any> {
    return this.http.put(this.Url + obj.id, {
      user: obj.user,
      type: obj.type,
      permission: obj.permission
    })
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.Url + id)
  }
}
