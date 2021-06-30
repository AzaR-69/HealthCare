import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'models/user';
import { AuthService } from 'services/auth.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editable=false;
  user:User=new User
  constructor(private router:Router,private token:TokenServiceService,private service:AuthService) { }

  ngOnInit(): void {
    if(!!this.token.getToken()){
      this.service.getDetails(this.token.getToken()).subscribe(
      data=>{this.getUser(data.username)},error=>console.log("error"))
    }
     else{
      this.router.navigate(['/login'])
    }
  }

  getUser(uname:string){
    this.service.findUser(uname).subscribe(
      result=>this.user=result,err=>console.log(err)
    )
  }

  updateUser(){
    this.service.updateUser(this.user).subscribe(
      data=>this.editable=!this.editable,error=>console.log(error)
    )
  }
}
