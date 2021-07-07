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
  addDoc=false
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

  form(status1:boolean,status2:boolean){
    this.addDoc=status1
    this.editable=status2
    if(!status2){
      this.doctor=new Doctor
    }
  }

  getDoctors(){
    this.docService.getDoctors().subscribe(
      data=>this.doctors=data,error=>console.log(error)
    )
  }
  addDoctor(){
    this.docService.addDoctor(this.doctor).subscribe(
      data=>{console.log("Success"),this.ngOnInit(),this.form(false,false)},error=>console.log(error)
    )
  }
  editDoctor(id:string){
    this.docService.getDoctorById(id).subscribe(
      data=>{this.doctor=data, this.form(true,true)},error=>("Error")
    )
  }

  updateDoctor(){
    this.docService.updateDoctor(this.doctor).subscribe(
      data=>{this.ngOnInit(),this.form(false,false)},error=>console.log(error)
    )
  }

  deleteDoctor(id:string){
    this.docService.deleteByDoctorId(id).subscribe(
      data=>this.ngOnInit(),error=>(error)
    )
  }
}
