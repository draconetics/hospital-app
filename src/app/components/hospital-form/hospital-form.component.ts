import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HospitalsService } from '../../services/hospitals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital';

@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.scss']
})
export class HospitalFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),   
   });  
  
  hospitalToUpdate:Hospital = {};
  edit:boolean = false;

  constructor(private hospitalService: HospitalsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  
  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    
    if (params.id) {
      this.hospitalService.getHospital(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.hospitalToUpdate = res;
            this.form.setValue({
                name: this.hospitalToUpdate.name,
                address: this.hospitalToUpdate.address
            });
            this.edit = true;
          },
          err => console.log(err)
        )
    }
      
  }
  
/*   onSubmit(){
    alert(JSON.stringify(this.form.value));
  } */

  onSubmit(){
      console.log("onsubmit");
      if( this.edit == false){
          this.saveHospital()
      }else{
          this.updateHospital()
      }
  }
  saveHospital() {
    //delete this.game.created_at;
    //delete this.game.id;
    let hospitalJson = JSON.stringify(this.form.value);
    console.log(hospitalJson);
    this.hospitalService.saveHospital(this.form.value)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/hospitals']);
        },
        err => console.error(err)
      )
  }

  updateHospital() {
    let h = this.hospitalToUpdate
    this.hospitalService.updateHospital(h.id, this.form.value)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/hospitals']);
        },
        err => console.error(err)
      )
  }

}
