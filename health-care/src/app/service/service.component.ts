import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  role=""
  isUser=false
  isDoctor=false
  isAdmin=false
  constructor(private router:Router,private token:TokenServiceService,private service:AuthService) { }

  ngOnInit(): void {
    if(!!this.token.getToken()){
      this.service.getDetails(this.token.getToken()).subscribe(
        data=>{this.role=data.role,this.isUser=this.role==="ROLE_USER",this.isDoctor=this.role==="ROLE_DOCTOR",this.isAdmin=this.role==="ROLE_ADMIN"},error=>console.log(error)
      )
     
    }
    else{
      this.router.navigate(['/login'])
    }
  }

}
