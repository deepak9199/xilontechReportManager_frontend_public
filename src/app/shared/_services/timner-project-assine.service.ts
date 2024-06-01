import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersList, employeeProjectActivieAssign, projectsAssine } from 'src/app/model/timer';
import { BASE_URL } from '../BASE_URL/BASE_URL';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root'
})
export class TimnerProjectAssineService {

  baseURL = BASE_URL + 'api/permission/';
  permision: projectsAssine
  outputpermissiLIst: projectsAssine
  constructor(
    private http: HttpClient,
    private userList: AccountService
  ) { }

  getEmployeeList() {
    let result: Array<employeeProjectActivieAssign> = [];
    let emplist = new employeeProjectActivieAssign()
    this.userList.getAccounts().subscribe(
      data => {
        let userList: CustomersList[]
        userList = data.data
        //console.log(userList)
        var keys = Object.keys(userList);
        let lenghttimeObject = keys.length
        for (let i = 0; i < lenghttimeObject; i++) {
          let user = userList[i].user
          //console.log(user)
          this.gettimeprojectsAssine().subscribe(data => {
            let permissionList: Array<projectsAssine> = [];
            let datalist = data.data
            this.ArryPush(permissionList, datalist)
            emplist = this.SearchArrayemployeeProjectActivieAssign(permissionList, user, 'TimerProjectAssined')
            result.push(emplist)

          },
            err => {
              console.log(err.error)
            }
          )

        }
      }
    )
    //console.log(result)
    return result
  }

  gettimeprojectsAssine(): Observable<any> {
    return this.http.get(this.baseURL,
      {});
  }

  puttimeprojectsAssine(projectAssine: any, id: any): Observable<any> {
    //console.log(projectAssine)
    return this.http.put(this.baseURL + id,
      {

        user: projectAssine.user,
        type: projectAssine.type,
        permission: projectAssine.permission,

      });
  }

  posttimeprojectsAssine(projectAssine: any): Observable<any> {
    //console.log(projectAssine)
    return this.http.post(this.baseURL,
      {

        id: projectAssine.id,
        user: projectAssine.user,
        type: projectAssine.type,
        permission: projectAssine.permission,

      });
  }
  deleteprojectsAssine(id: number):Observable<any> {
    return this.http.delete(this.baseURL + id)
  }
  getUserAssineProject(user: string, permission: string): any {
    let result: Array<projectsAssine> = [];
    this.gettimeprojectsAssine().subscribe(data => {
      let permissionList: Array<projectsAssine> = [];
      let datalist = data.data
      this.ArryPush(permissionList, datalist)
      let projectlist: Array<projectsAssine> = []
      projectlist = this.SearchArray(permissionList, user, permission)
      //console.log(projectlist)
      this.ArryPush(result, projectlist)

    })
    //console.log(result)
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

  private SearchArray(array: any, user: any, type: any) {

    var keys = Object.keys(array);
    let lenghttimeObject = keys.length
    let project = []
    let activities = []
    let result: Array<projectsAssine> = []
    for (let i = 0; i < lenghttimeObject; i++) {

      if ((array[i].user === user || array[i].user === "all") && array[i].type === type) {
        //console.log(array[i])
        result.push(array[i])
        project.push(array[i].permission)
        var act = []
        for (let j = 0; j < lenghttimeObject; j++) {
          if (array[j].user === user && array[j].type === array[i].permission) {
            act.push(array[j].permission)
          }
        }
        activities.push(act)
      }
    }
    let emplist = new employeeProjectActivieAssign()
    emplist.user = user
    emplist.projects = project
    emplist.activities = activities
    //console.log(emplist)
    return result
  }
  private SearchArrayemployeeProjectActivieAssign(array: any, user: any, type: any) {

    var keys = Object.keys(array);
    let lenghttimeObject = keys.length
    let project = []
    let activities = []
    let result: Array<projectsAssine> = []
    let initpojcount = 0
    for (let i = 0; i < lenghttimeObject; i++) {

      if (array[i].user === user && array[i].type === type) {
        //result.push(array[i])
        initpojcount = initpojcount + 1
        //console.log('initpojcount :' + initpojcount + ' i :' + i)
        let pojcount = this.countProject(array, user, type)
        //console.log(pojcount)
        if (initpojcount === 1 && pojcount === 1) {
          project.push('[ ' + array[i].permission + ' ]')
        }
        else if (initpojcount === 1) {
          //console.log('[ ')
          project.push('[ ' + array[i].permission)
        }
        else if (initpojcount === pojcount) {
          // console.log(']')
          project.push(array[i].permission + ' ]')
        }
        else {
          //console.log('main poj')
          project.push(array[i].permission)
        }

        var act = []
        let initactiviCount = 0
        for (let j = 0; j < lenghttimeObject; j++) {
          if (array[j].user === user && array[j].type === array[i].permission) {
            //console.log(j)
            initactiviCount++
            let actCount = this.countActivitie(array, user, array[j].type)
            // console.log('actCount :'+actCount+' initactiviCount :'+initactiviCount+' j :'+j)
            if (initactiviCount === 1 && actCount === 1) {
              act.push('[ ' + array[j].permission + ' ]')
            }
            else if (initactiviCount === 1) {
              //console.log('[ ')
              act.push('[ ' + array[j].permission)
            }
            else if (initactiviCount === actCount) {
              //console.log(']')
              act.push(array[j].permission + ' ]')
            }
            else {
              //console.log('main poj')
              act.push(array[j].permission)
            }

          }
        }
        activities.push(act)
      }
    }
    let emplist = new employeeProjectActivieAssign()
    emplist.user = user
    emplist.projects = project
    emplist.activities = activities
    //console.log(emplist)
    return emplist
  }
  private countProject(array: any, user: any, type: any) {
    var keys = Object.keys(array);
    let lenghttimeObject = keys.length
    let result = 0
    for (let i = 0; i < lenghttimeObject; i++) {

      if (array[i].user === user && array[i].type === type) {
        result++
      }
    }
    return result
  }
  private countActivitie(array: any, user: any, type: any) {
    var keys = Object.keys(array);
    //console.log(type)
    let lenghttimeObject = keys.length
    let result = 0
    for (let i = 0; i < lenghttimeObject; i++) {

      if (array[i].user === user && array[i].type === type) {
        result++
        //console.log(array[i])
        // let proj = array[i]
        // var keys = Object.keys(proj);
        // let lenghttimeporjObject = keys.length
        // console.log(array[i])
        // for (let j = 0; j < lenghttimeporjObject; j++) {

        //   if (array[j].user === user && array[j].type === array[i].permission) {
        //     console.log('user : '+array[j].user+' type :'+array[j].type )
        //     console.log('user : '+user+' type :'+array[i].permission)
        //     //console.log(array[j])
        //     //result++
        //     console.log(result++)
        //   }

        // }
        // break;
      }
    }
    //console.log('act count :'+result)
    return result
  }

}
