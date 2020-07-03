import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DoctorsService } from '../../services/doctors.service'

import { Doctor } from '../../models/doctor'

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  doctorList: any = [];

  constructor(  private doctorsService:DoctorsService,
                private router: Router) { }

  ngOnInit(): void {
    this.getDoctors();
  }


  getDoctors(){
    console.log("get doctors")
    this.doctorsService.getDoctors()
      .subscribe(
        res => {
          console.log(res);
          this.doctorList = res;
        },
        err => console.error(err)
      );
  }

  deleteDoctor(id: string) {
    let confirmDelete = confirm("Do you want to delete this item?")
    if(confirmDelete == true){
         console.log(id);
         this.doctorsService.deleteDoctor(id)
            .subscribe(
              res => {
                console.log(res);
                this.getDoctors();
              },
              err => console.error(err)
            ) 
    }
  }
}
