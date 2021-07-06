import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'models/doctor';
import { RequestModel } from 'models/request-model';
import { AuthService } from 'services/auth.service';
import { DoctorService } from 'services/doctor.service';
import { RequestService } from 'services/request.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors:Doctor[]=[];
  request:RequestModel=new RequestModel
  username:string=""
  isSuccess=false;
  availability=false;
  form=false;
  constructor(private router:Router,private auth:AuthService,private token:TokenServiceService,private service:DoctorService,private requestService:RequestService) { }

  ngOnInit(): void {
    if(!!this.token.getToken()){
      this.service.getDoctors().subscribe(
        data=>{this.doctors=data,this.getDetails()
        }
        ,error=>console.log(error)
      )
    }
    else{
      this.router.navigate(['/login'])
    }
  }
  requestForm(doctorId:string,doctorName:string){
    this.request.doctorId=doctorId
    this.request.doctorName=doctorName
    this.form=!this.form
  }
  addRequest(){
    this.requestService.addRequest(this.request).subscribe(
      data=>{this.isSuccess=!this.isSuccess,this.auth.updateAfterRequest(this.username,false).subscribe(
        data=>{console.log("Success"),this.ngOnInit()},error=>console.log(error)
      )},error=>console.log(error)
    )
  }

  getDetails(){
    this.auth.getDetails(this.token.getToken()).subscribe(
      data=>{this.request.patientId=data.userId,this.request.patientName=data.name,this.username=data.username,
        data.role==="ROLE_USER"?"":this.router.navigate(['/service']),this.getUserByUsername(data.username)},error=>console.log(error))
  }
  getUserByUsername(uname:string){
    this.auth.findUser(uname).subscribe(
      data=>{this.availability=data.availability},error=>console.log(error)
    )
  }
}
