import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
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
    ManageAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService,HttpInterceptorService,TokenServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
