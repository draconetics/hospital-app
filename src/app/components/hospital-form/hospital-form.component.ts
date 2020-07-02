import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HospitalsService } from '../../services/hospitals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital';

import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[1], 10),
        month : parseInt(date[0], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : '';
  }
}


@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class HospitalFormComponent implements OnInit {



  form = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required), 
    birthday: new FormControl('', Validators.required), 
   });  
  
  hospitalToUpdate:Hospital = {};
  edit:boolean = false;

  constructor(private hospitalService: HospitalsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) 
  { 
      
  }
  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    
    if (params.id) {
      this.hospitalService.getHospital(params.id)
        .subscribe(
          res => {
            console.log("params id")
            console.log(res);
            this.hospitalToUpdate = res;
            let newDate = new Date(this.hospitalToUpdate.createdAt);
            let customDate = {
                year: newDate.getFullYear(),
                month: newDate.getMonth() + 1,
                day: newDate.getDate()
            }
            this.form.setValue({
                name: this.hospitalToUpdate.name,
                address: this.hospitalToUpdate.address,   
                birthday: customDate
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
      //console.log(this.form.value)
      if( this.edit == false){
          this.saveHospital()
      }else{
          this.updateHospital()
      } 
  }

  formToHospital() {
      
      let obj = this.form.get('birthday').value;
      console.log("final seee");
      console.log(obj);
      let tmp:Hospital = {
        id: 0,
        name:this.form.get('name').value,
        address: this.form.get('address').value,
        createdAt:`${obj.month}/${obj.day}/${obj.year}`
      }
      return tmp;
  }

  saveHospital() {
    //delete this.game.created_at;
    //delete this.game.id;
    let hospitalJson = JSON.stringify(this.form.value);

    let newHospital:Hospital = this.formToHospital(); 
    console.log(newHospital)
    this.hospitalService.saveHospital(newHospital)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/hospitals']);
        },
        err => console.error(err)
      ); 
  }

  updateHospital() {
    let h:Hospital = this.formToHospital()
    this.hospitalService.updateHospital(this.hospitalToUpdate.id, h)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/hospitals']);
        },
        err => console.error(err)
      )
  }

}
