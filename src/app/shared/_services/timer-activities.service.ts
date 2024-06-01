import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { activities, activityModel } from 'src/app/model/timer';
import { BASE_URL } from '../BASE_URL/BASE_URL';

@Injectable({
  providedIn: 'root'
})
export class TimerActivitiesService {
  baseURL = BASE_URL + 'api/activities/';
  constructor(private http: HttpClient) { }

  gettimeactivities(): Observable<any> {
    return this.http.get(this.baseURL,
      {});
  }
  posttimeactivities(activities: any): Observable<any> {
    // console.log(activities)
    return this.http.post(this.baseURL,
      {

        id: activities.id,
        activitiesCode: activities.activitiesCode,
        activitiesname: activities.activitiesname,
        activitiesDescription: activities.activitiesDescription,
        projectCode: activities.projectCode,
        billingType: activities.billingType,
      });
  }
  puttimeactivities(activities: any, id: number): Observable<any> {
    return this.http.put(this.baseURL + id, {
      activitiesCode: activities.activitiesCode,
      activitiesname: activities.activitiesname,
      activitiesDescription: activities.activitiesDescription,
      projectCode: activities.projectCode,
      billingType: activities.billingType,
    })
  }
  deleteActivities(id: number): Observable<any> {
    return this.http.delete(this.baseURL + id)
  }

  SearchActivities(array: any, proj: any) {
    //console.log(array)
    let lenghttimeObject: any
    let result = []
    var keys = Object.keys(array);
    lenghttimeObject = keys.length
    for (let i = 0; i < lenghttimeObject; i++) {
      if (array[i].projectCode === proj) {
        result.push(array[i].activitiesCode)
      }
    }
    return result
  }
  private ArryPush(result: any, data: any) {

    let lenghttimeObject: any
    var keys = Object.keys(data);
    lenghttimeObject = keys.length
    for (let i = 0; i < lenghttimeObject; i++) {
      result.push(data[i])
      // console.log(data[i])
    }

  }
}
