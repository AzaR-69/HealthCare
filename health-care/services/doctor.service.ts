import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from 'models/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  getDoctors():Observable<any>{
    return this.http.get<Doctor[]>("http://localhost:8080/doctors")
  }

  getDoctorById(doctorId:string):Observable<any>{
    return this.http.get<Doctor>(`http://localhost:8080/doctors/getByDID/${doctorId }`)
  }

  updateDoctor(doc:Doctor){
    return this.http.patch<Doctor>("http://localhost:8080/doctors/updateDoctor",doc);
  }

  deleteByDoctorId(doctorId:string){
    return this.http.delete(`http://localhost:8080/doctors/deleteDoctor/${doctorId}`)
  }
}
