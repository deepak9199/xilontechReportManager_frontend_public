import { Injectable } from '@angular/core';
import { EncrDecrServiceService } from './encr-decr-service.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_PASSKEY = 'auth-passuser';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private EncrDecr: EncrDecrServiceService
  ) { }
  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user:any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getPass(): string  {
    return this.EncrDecr.get('795130$#@$^@1ERF', localStorage.getItem(USER_PASSKEY) || '{}');
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
  }

}
