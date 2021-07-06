
import { NgModule } from '@angular/core';
import { RouterModule,Route} from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorAppointmentPanelComponent } from './doctor-appointment-panel/doctor-appointment-panel.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { LoginComponent } from './login/login.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ProfileComponent } from './profile/profile.component';
import { ServiceComponent } from './service/service.component';
import { SignupComponent } from './signup/signup.component';

const routes: Route[] = [
{path:'',redirectTo:'dashboard',pathMatch:'full'},
 {path:'login',component:LoginComponent},
 {path:'dashboard',component:DashboardComponent},
 {path:'register',component:SignupComponent},
 {path:'service',component:ServiceComponent},
 {path:'profile',component:ProfileComponent},
 {path:'doctors',component:DoctorsComponent},
 {path:'appointment',component:AppointmentComponent},
 {path:'prescription',component:PrescriptionComponent},
 {path:'manage',component:ManageAccountComponent},
 {path:'doctorpanel',component:DoctorAppointmentPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 