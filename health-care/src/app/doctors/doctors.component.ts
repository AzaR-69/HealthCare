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
  isSuccess=false;
  existing=false;
  form=false;
  constructor(private router:Router,private auth:AuthService,private token:TokenServiceService,private service:DoctorService,private requestService:RequestService) { }

  ngOnInit(): void {
    if(!!this.token.getToken()){
      this.service.getDoctors().subscribe(
        data=>{this.doctors=data,
          this.auth.getDetails(this.token.getToken()).subscribe(
            data=>{this.request.patientId=data.userId,this.request.patientName=data.name,
              data.role==="ROLE_USER"?"":this.router.navigate(['/service']),
            this.requestService.getRequest(this.request.patientId).subscribe(
              result=>this.existing=!this.existing,error=>console.log(error)
            )
            },error=>console.log(error))
        }
        ,error=>console.log(error)
      )
    }
    else{
      this.router.navigate(['/login'])
    }
  }
  requestForm(doctorId:string){
    this.request.doctorId=doctorId
    this.form=!this.form
  }
  addRequest(){
    this.requestService.addRequest(this.request).subscribe(
      data=>this.isSuccess=!this.isSuccess,error=>console.log(error)
    )
  }
}
