import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestModel } from 'models/request-model';
import { AuthService } from 'services/auth.service';
import { DoctorService } from 'services/doctor.service';
import { RequestService } from 'services/request.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-doctor-appointment-panel',
  templateUrl: './doctor-appointment-panel.component.html',
  styleUrls: ['./doctor-appointment-panel.component.css']
})
export class DoctorAppointmentPanelComponent implements OnInit {
  auth_token=""
  respond=false;
  report=false;
  requests:RequestModel[]=[]
  docRequest:RequestModel=new RequestModel
  constructor(private router:Router,private auth:AuthService,private token:TokenServiceService,private requestService:RequestService,private docService:DoctorService) { }

  ngOnInit(): void {
    this.auth_token=this.token.getToken()
    if(!!this.auth_token){
      this.auth.getDetails(this.auth_token).subscribe(
        data=>{(data.role==="ROLE_DOCTOR")?"":this.gotoHome(),
        this.requestService.getRequests(data.userId).subscribe(
          result=> this.requests=result,error=>console.log(error)
        )
      },
        error=>console.log(error)
      )
    }
    else{
      this.gotoHome()
    }
  }

  respondForm(request:RequestModel,status:boolean){
    this.report=status
    this.docRequest=request
    this.respond=!this.respond
  }
  gotoHome(){
    this.router.navigate(['/login'])
  }

  updateRequest(check:boolean){
    this.docRequest.status=check
    this.docRequest.rejected=!check
    this.respond=!this.respond
    this.requestService.update(this.docRequest,this.docRequest.rejected).subscribe(
      data=>console.log("Success"),error=>console.log(error)
    )
  }
 
  generateReport(){
    this.docRequest.visited=true
    this.requestService.update(this.docRequest,this.docRequest.visited).subscribe(
      data=>console.log("Success"),error=>console.log(error)
    )
  }
}
