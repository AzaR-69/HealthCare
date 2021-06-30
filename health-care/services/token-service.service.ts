import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
const TOKEN_KEY='auth_token'
@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor() { }
  signOut():void{
    window.sessionStorage.clear()
  }

  public saveToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY,token)
  }

  public getToken():string{
    return sessionStorage.getItem(TOKEN_KEY)||'';
  }

  // public saveUser(user: any):void{
  //   window.sessionStorage.removeItem(USER_KEY)
  //   window.sessionStorage.setItem(USER_KEY,JSON.stringify(user))

  // }
  // public getUser():any{
  //   return JSON.parse(sessionStorage.getItem(USER_KEY)||'{}');
  // }
}
