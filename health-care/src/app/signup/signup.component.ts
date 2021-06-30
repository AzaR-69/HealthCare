import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'models/user';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:User=new User;
  password2="";
  isSuccess=false;
  msg="";
  constructor(private router:Router, private service:AuthService) { }

  ngOnInit(): void {
  }
  register(){
    if(this.password2===this.user.password){
      this.service.register(this.user).subscribe(
        data=>{
          this.isSuccess=!this.isSuccess;
          this.router.navigate(['/register'])
        }, 
        error=>{this.msg=error}
      )
    }
    else{
      this.msg="Both passwords must match!"
    }
  }
}

