import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'models/doctor';
import { AuthService } from 'services/auth.service';
import { DoctorService } from 'services/doctor.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  authToken=""
  doctors:Doctor[]=[]
  doctor:Doctor=new Doctor
  editable=false
  constructor(private docService:DoctorService,private router:Router,private token:TokenServiceService,private auth:AuthService) { 
   
  }

  ngOnInit(): void {
    this.authToken=this.token.getToken()
    if(!!this.authToken){
      this.auth.getDetails(this.authToken).subscribe(
        data=>{(data.role==="ROLE_ADMIN")?"": this.router.navigate(['/login']),this.getDoctors()},
        error=>console.log(error)
      )
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  getDoctors(){
    this.docService.getDoctors().subscribe(
      data=>this.doctors=data,error=>console.log(error)
    )
  }

  editDoctor(id:string){
    this.editable=!this.editable
    this.docService.getDoctorById(id).subscribe(
      data=>this.doctor=data,error=>("Error")
    )
  }

  updateDoctor(){
    this.docService.updateDoctor(this.doctor).subscribe(
      data=>{this.editable=!this.editable,this.ngOnInit()},error=>console.log(error)
    )
  }

  deleteDoctor(id:string){
    this.docService.deleteByDoctorId(id).subscribe(
      data=>this.ngOnInit(),error=>(error)
    )
  }
}
