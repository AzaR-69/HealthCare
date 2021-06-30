import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  isLoggedIn=false;
  username="";
  role="";
  constructor(private router:Router, private token:TokenServiceService,private service:AuthService) { }

  ngOnInit(): void {
    setInterval(()=>this.refresh(),100)
  }
  logout(){
    this.token.signOut()
    this.isLoggedIn=!this.isLoggedIn
    this.router.navigate(['/dashboard'])
  }
  refresh(){
    this.isLoggedIn=!!this.token.getToken()
    if(this.isLoggedIn){
    this.service.getDetails(this.token.getToken()).subscribe(
      data=>{this.username=data.username,this.role=data.role}
    )}
  }
}
