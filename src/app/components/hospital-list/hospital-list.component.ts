import { Component, OnInit } from '@angular/core';

import { HospitalsService } from '../../services/hospitals.service'
import { InteractionService } from '../../services/interaction.service'

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss']
})
export class HospitalListComponent implements OnInit {


  search: object = null;

  hospitals: any = [];

  constructor(  private  hospitalService: HospitalsService,
                private _interactionService: InteractionService) { 

                }

  ngOnInit(): void {
      this.interactionServiceSuscription();
      this.getHospitals(); 
  }

  interactionServiceSuscription(){
      this._interactionService.teacherMessage$
          .subscribe(
              msg => {
                console.log("search")
                  if(msg.id && msg.id == "searchHospitals"){
                      console.log(msg)
                      this.searchHospitals(msg.data);
                  }
                    
              }
          );
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

  searchHospitals(data){
    this.hospitalService.searchHospitals(data.name,data.fundation)
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
