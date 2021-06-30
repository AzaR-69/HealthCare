import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import jsPDF from 'jspdf';
import { RequestModel } from 'models/request-model';
import { AuthService } from 'services/auth.service';
import { DoctorService } from 'services/doctor.service';
import { RequestService } from 'services/request.service';
import { TokenServiceService } from 'services/token-service.service';
const hasValues = 
    (obj:any) => Object.values(obj).some(v => v !== null && typeof v !== "undefined")
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})

export class PrescriptionComponent implements OnInit {
  isSuccess=false
  isUser=false;
  isDoctor=false
  request:RequestModel=new RequestModel
  emptyDesc=false;
  userId=""
  emptyObj:boolean=false
  constructor(private router:Router,private auth:AuthService,private token:TokenServiceService,private requestService:RequestService,private docService:DoctorService) { }
  
  ngOnInit(): void {
    if(!!this.token.getToken()){
      this.auth.getDetails(this.token.getToken()).subscribe(
        data=>{this.userId=data.userId,this.isDoctor=data.role==="ROLE_DOCTOR",this.isUser=data.role==="ROLE_USER",
        (this.isDoctor || this.isUser)?"":this.router.navigate(['/service']),
        this.getRequest(this.userId)
      },err=>console.log(err))
    }
    else{
      this.router.navigate(['/login'])
    }
  }
  
  getRequest(id:string){
    this.requestService.getRequest(id).subscribe(
      result=>{this.request=result,this.emptyObj=hasValues(this.request),this.emptyDesc=this.request.prescription==null,
        (this.request.visited)?this.isSuccess=!this.isSuccess:""
    },error=>console.log(error)
    )
  }

  generateReport(){
    this.request.visited=true
    this.requestService.update(this.request).subscribe(
      data=>{this.isSuccess=!this.isSuccess,this.router.navigate(['/service'])},error=>console.log(error)
    )
  }


  deleteReport(){
    this.requestService.deleteRequest(this.userId).subscribe(
      data=>{console.log("deleted"),this.router.navigate(['/service'])},error=>console.log(error)
    )
  }

  exportAsPDF(data:any) {
    html2canvas(data, { allowTaint: true }).then(canvas => {
     let HTML_Width = canvas.width;
     let HTML_Height = canvas.height;
     let top_left_margin = 15;
     let PDF_Width = HTML_Width + (top_left_margin * 2);
     let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
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
