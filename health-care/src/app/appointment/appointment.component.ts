import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RequestModel } from 'models/request-model';
import { AuthService } from 'services/auth.service';
import { DoctorService } from 'services/doctor.service';
import { RequestService } from 'services/request.service';
import { TokenServiceService } from 'services/token-service.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  requests:RequestModel[]=[]
  request:RequestModel=new RequestModel
  constructor(private router:Router,private auth:AuthService,private token:TokenServiceService,private requestService:RequestService,private docService:DoctorService) { }
  userId="";
  showReport=false
  isEmpty=false
  ngOnInit(): void {
    if(!!this.token.getToken()){
      this.auth.getDetails(this.token.getToken()).subscribe(
        data=>{ this.userId=data.userId,
        (data.role==="ROLE_USER")?"":this.router.navigate(['/service']),
        this.getRequest(this.userId)
      },err=>console.log(err))
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  report(req:RequestModel){
    this.showReport=!this.showReport
    this.request=req
  }

  getRequest(id:string){
    this.requestService.getRequests(id).subscribe(
      result=>{this.requests=result,console.log("Success")},error=>this.isEmpty=!this.isEmpty
    )
  }
  deleteRequest(id:string,date:string){
    this.requestService.deleteRequest(id,date).subscribe(
      data=>this.ngOnInit(),error=>console.log(error)
    )
  }
  exportAsPDF(data:any) {
    html2canvas(data, { allowTaint: true, useCORS:true }).then(canvas => {
     let HTML_Width = canvas.width;
     let HTML_Height = canvas.height;
     let top_left_margin = 15;
     let PDF_Width = HTML_Width + (top_left_margin * 2);
     let PDF_Height = (PDF_Width * 1) + (top_left_margin * 2);
     let canvas_image_width = HTML_Width;
     let canvas_image_height = HTML_Height;
     let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
     canvas.getContext('2d');
     let imgData = canvas.toDataURL("image/jpeg", 1.0);
     let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
     pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
     for (let i = 1; i <= totalPDFPages; i++) {
       pdf.addPage([PDF_Width, PDF_Height], 'p');
       pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
     }
      pdf.save("User Report.pdf");
   });
 }


}
