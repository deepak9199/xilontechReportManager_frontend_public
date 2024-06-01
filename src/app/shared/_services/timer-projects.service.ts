import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../BASE_URL/BASE_URL';

@Injectable({
  providedIn: 'root'
})
export class TimerProjectsService {
  baseURL = BASE_URL + 'api/project/';
  constructor(private http: HttpClient) { }

  gettimeprojects(): Observable<any> {
    return this.http.get(this.baseURL,
      {});
  }
  posttimeprojects(project: any): Observable<any> {
    return this.http.post(this.baseURL,
      {

        id: project.id,
        projectCode: project.projectCode,
        projectname: project.projectname,
        projectDescription: project.projectDescription,

      });
  }
  puttimerProject(project: any, id: number): Observable<any> {
    return this.http.put(this.baseURL + id, {
      projectCode: project.projectCode,
      projectname: project.projectname,
      projectDescription: project.projectDescription,
    })
  }
  deleteprojects(id: number) {
    return this.http.delete(this.baseURL + id)
  }
}
