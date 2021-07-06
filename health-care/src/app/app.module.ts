import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceComponent } from './service/service.component';
import { ProfileComponent } from './profile/profile.component';
import { DoctorsComponent } from './doctors/doctors.component'; 
import { AuthService } from 'services/auth.service';
import { HttpInterceptorService } from 'services/http-interceptor.service';
import { TokenServiceService } from 'services/token-service.service';
import { AppointmentComponent } from './appointment/appointment.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { DoctorAppointmentPanelComponent } from './doctor-appointment-panel/doctor-appointment-panel.component';
import { DoctorService } from 'services/doctor.service';
import { RequestService } from 'services/request.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ServiceComponent,
    ProfileComponent,
    DoctorsComponent,
    AppointmentComponent,
    PrescriptionComponent,
    ManageAccountComponent,
    DoctorAppointmentPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService,TokenServiceService,DoctorService,RequestService,HttpInterceptorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
