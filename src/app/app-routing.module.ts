import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalListComponent } from './components/hospital-list/hospital-list.component'
import { DoctorListComponent } from './components/doctor-list/doctor-list.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { DoctorItemComponent } from './components/doctor-item/doctor-item.component'
import { HospitalItemComponent } from './components/hospital-item/hospital-item.component'
import { DoctorMainComponent } from './components/doctor-main/doctor-main.component'
import { HospitalMainComponent } from './components/hospital-main/hospital-main.component'
import { HospitalFormComponent } from './components/hospital-form/hospital-form.component'

const routes: Routes = [
  { path:'', redirectTo: '/hospitals', pathMatch: 'full'},
  { 
    path: 'hospitals', 
    component: HospitalMainComponent,
    children: [
        { path: '', redirectTo:'list', pathMatch: 'full' },
        { path: 'list', component: HospitalListComponent },
        { path: 'search', component: HospitalListComponent },
      ]  
  },

  { path: 'hospitals/item/:id', component: HospitalItemComponent},
  { path: 'hospitals/add', component: HospitalFormComponent },
  { path: 'hospitals/edit/:id', component: HospitalFormComponent },
  {
    path: 'doctors', 
    component: DoctorMainComponent,
    children: [
      { path: '', redirectTo:'list', pathMatch: 'full' },
      { path: 'list', component: DoctorListComponent },
      { path: 'item', component: DoctorItemComponent},
      { path: '**', redirectTo:'list', pathMatch: 'full' },
    ]
  },
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
