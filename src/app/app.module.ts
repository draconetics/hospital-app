import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HospitalListComponent } from './components/hospital-list/hospital-list.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DoctorItemComponent } from './components/doctor-item/doctor-item.component';
import { HospitalItemComponent } from './components/hospital-item/hospital-item.component';

import { HospitalsService } from './services/hospitals.service';
import { HospitalFormComponent } from './components/hospital-form/hospital-form.component';
import { DoctorMainComponent } from './components/doctor-main/doctor-main.component';
import { HospitalMainComponent } from './components/hospital-main/hospital-main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InteractionService } from './services/interaction.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HospitalListComponent,
    DoctorListComponent,
    MenuComponent,
    NotFoundComponent,
    DoctorItemComponent,
    HospitalItemComponent,
    HospitalFormComponent,
    DoctorMainComponent,
    HospitalMainComponent,

  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //adding react formuler
    ReactiveFormsModule,
    FormsModule,
    
  ],
  providers: [ HospitalsService, InteractionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
