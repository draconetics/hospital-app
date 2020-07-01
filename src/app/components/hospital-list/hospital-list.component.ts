import { Component, OnInit } from '@angular/core';

import { Hospital } from '../../models/hospital'
import { HospitalsService } from '../../services/hospitals.service'

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss']
})
export class HospitalListComponent implements OnInit {

  hospitals: any = [];
  constructor(private  hospitalService: HospitalsService) { }

  ngOnInit(): void {
     this.getHospitals(); 
  }

  getHospitals(){
    this.hospitalService.getHospitals()
      .subscribe(
        res => {
          this.hospitals = res;
        },
        err => console.error(err)
      );
  }

  deleteHospital(id: string) {
    let confirmDelete = confirm("Do you want to delete this item?")
    if(confirmDelete == true){
         console.log(id);
         this.hospitalService.deleteHospital(id)
            .subscribe(
              res => {
                console.log(res);
                this.getHospitals();
              },
              err => console.error(err)
            ) 
    }
  }

}
