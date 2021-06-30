import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'models/doctor';
import { RequestModel } from 'models/request-model';
import { AuthService } from 'services/auth.service';
import { DoctorService } from 'services/doctor.service';
import { RequestService } from 'services/request.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  request:RequestModel=new RequestModel
  constructor(private router:Router,private auth:AuthService,private token:TokenServiceService,private requestService:RequestService,private docService:DoctorService) { }
  role=""
  userId="";
  isEmpty=false
  isDoctor=false
  isUser=false
  ngOnInit(): void {
    if(!!this.token.getToken()){
      this.auth.getDetails(this.token.getToken()).subscribe(
        data=>{ this.role=data.role,this.isDoctor=this.role==="ROLE_DOCTOR",this.isUser=this.role==="ROLE_USER",this.userId=data.userId,
        (this.isDoctor || this.isUser)?"":this.router.navigate(['/service']),
        this.getRequest(this.userId)
      },err=>console.log(err))
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  getRequest(id:string){
    this.requestService.getRequest(id).subscribe(
      result=>{this.request=result,console.log("Success")},error=>this.isEmpty=!this.isEmpty
    )
  }

  updateRequest(check:boolean){
    this.request.status=check
    this.request.rejected=!check
    this.requestService.update(this.request).subscribe(
      data=>console.log("Success"),error=>console.log(error)
    )
  }

  deleteRequest(){
    this.requestService.deleteRequest(this.userId).subscribe(
      data=>{console.log("Success"),this.isEmpty=!this.isEmpty,this.router.navigate(['/service'])},error=>console.log("error")
    )
  }
}
