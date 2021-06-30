import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'models/user';
import { AuthService } from 'services/auth.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User=new User;
  isLoggedIn=false;
  error="";
  constructor(private router:Router,private storage:TokenServiceService,private service:AuthService) { }

  ngOnInit(): void { 
  }
  validate(){
    this.service.authenticate(this.user).subscribe(
      data=>{
        this.isLoggedIn=true;
        this.storage.saveToken(data.token);
        console.log("Login Succesfull")
        this.router.navigate(['/service'])
      },
      error=>{
        console.log(error)
        this.error="Bad Credentials";
      }
    )
  }
}
