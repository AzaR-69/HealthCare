import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'models/user';
import { Observable } from 'rxjs';
const url="http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  authenticate(user:User):Observable<any>{
    return this.http.post<User>(url+"authenticate",user)
  }
  register(user:User){
    return this.http.post<User>(url+"signup",user)
  }
  getDetails(token:string):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/getDetails/${token}`)
  }

  findUser(username:string):Observable<User>{
    return this.http.get<User>(`http://localhost:8080/getUser/${username}`);
  }

  updateUser(user:User){
    return this.http.patch<any>(url+"update",user)
  }
}
