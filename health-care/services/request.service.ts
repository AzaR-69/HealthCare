import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestModel } from 'models/request-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) {}

  addRequest(request:RequestModel){
    return this.http.post<RequestModel>("http://localhost:8080/requests/add",request);
  }

  getRequest(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/requests/getRequest/${id}`)
  }

  getRequests(id:string):Observable<any>{
    return this.http.get<RequestModel[]>(`http://localhost:8080/requests/getRequests/${id}`)
  }
  update(request:RequestModel,status:boolean){
    return this.http.patch<RequestModel>(`http://localhost:8080/requests/updateRequest/${status}`,request)
  }

  deleteRequest(id:string,date:string){
    return this.http.delete<any>(`http://localhost:8080/requests/deleteRequest/${id}/${date}`)
  }
}
