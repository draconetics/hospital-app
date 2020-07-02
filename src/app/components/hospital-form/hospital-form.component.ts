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


  years:number[];
  months:number[];
  monthsByName:string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  days:number[];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required), 
    fundationYear:  new FormControl(1901), 
    fundationMonth: new FormControl(1), 
    fundationDay: new FormControl(1), 
   });  
  
  hospitalToUpdate:Hospital = {};
  edit:boolean = false;

  constructor(private hospitalService: HospitalsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) 
  { 
      this.datesInit();
  }

  datesInit(){
      let yearsRange = new Date().getFullYear() - 1900;
      this.years = Array(yearsRange).fill(1901).map((x,i)=>x+i);
      console.log(this.years);
      this.months = Array(12).fill(1).map((x,i)=>x+i);
      console.log(this.months)
      this.days = Array(31).fill(1).map((x,i)=>x+i);
      console.log(this.days)
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    
    if (params.id) {
      this.hospitalService.getHospital(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.hospitalToUpdate = res;
            let created_at = new Date(this.hospitalToUpdate.created_at); 
            console.log(created_at.getFullYear + "-" + created_at.getMonth + "- " + created_at.getDate() )
            this.form.setValue({
                name: this.hospitalToUpdate.name,
                address: this.hospitalToUpdate.address,
                fundationYear: created_at.getFullYear(),
                fundationMonth: created_at.getMonth()+1,
                fundationDay: created_at.getDate()
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
    let formatedDate = this.form.get('fundationMonth').value + "/";
    formatedDate = formatedDate + this.form.get('fundationDay').value + "/";
    formatedDate = formatedDate + this.form.get('fundationYear').value;
    let newHospital:Hospital = {
        id: 0,
        name:this.form.get('name').value,
        address: this.form.get('address').value,
        created_at: formatedDate
    }
    console.log(hospitalJson);
    console.log(newHospital)
    /* this.hospitalService.saveHospital(newHospital)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/hospitals']);
        },
        err => console.error(err)
      ); */
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
