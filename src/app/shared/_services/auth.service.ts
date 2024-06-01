import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { BASE_URL } from '../BASE_URL/BASE_URL';

const AUTH_API = BASE_URL+'api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
 
  login(user:string,pass:string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'signin', {
      // username: credentials.username,
      // password: credentials.password
      username :user,
      password :pass
    }).pipe(map(data => {
      
      // login successful if there's a jwt token in the response
      if (data && data.accessToken) {
        //store user details and jwt token in local storage to keep user logged in between page refreshes
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
      }
      return data;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.tokenStorage.signOut();
}

  register(user:any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.user,
      email : user.email,
      password : user.password,
      role : [user.role]
    }, httpOptions);
  }
  
  
}
