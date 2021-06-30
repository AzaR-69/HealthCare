import { Component, OnInit } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn=false;
  constructor(private token:TokenServiceService,private service:AuthService) { }

  ngOnInit(): void {
    setInterval(()=> this.isLoggedIn=!!this.token.getToken(),100)
    
  }

}
