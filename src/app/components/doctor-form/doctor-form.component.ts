import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { HospitalsService } from '../../services/hospitals.service'
import { DoctorsService } from '../../services/doctors.service'
import { Doctor } from 'src/app/models/doctor';




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
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class DoctorFormComponent implements OnInit {

  name: string;
  lastName: string;
  bornDate: string;
  address: string;
  hospital?: any;

  HOSPITAL_LIST: any = []
  edit: any = false;
  doctorId:any;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required), 
    bornDate: new FormControl('', Validators.required), 
    hospital: new FormControl('', Validators.required), 
   });  

  constructor(  private hospitalService: HospitalsService,
                private doctorService: DoctorsService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHospitalList();
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      
      this.doctorService.getDoctor(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.doctorId = params.id
            this.defaultValuesToForm(res);
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }


    
      

  defaultValuesToForm(res){
    let doctorToUpdate = res;
    let dateArray = doctorToUpdate['bornDate'].split('/');
    let customDate = {}
    customDate['year'] = parseInt(dateArray[2]),
    customDate['month'] = parseInt(dateArray[0]),
    customDate['day'] = parseInt(dateArray[1])
    
    this.form.setValue({
        name: doctorToUpdate['name'],
        lastName: doctorToUpdate['lastName'],   
        address: doctorToUpdate['address'],
        bornDate: customDate,
        hospital: doctorToUpdate['hospital']
    });
  }



  getHospitalList(){
      this.hospitalService.getHospitals()
        .subscribe(
            res =>{
              this.HOSPITAL_LIST = res;
            },
            err=>console.log(err)
        );
  }

  onSubmit(){
    if(this.edit == true)
      this.updateDoctor();
    else
      this.saveDoctor();
  }

  updateDoctor() {
    let d:Doctor = this.setDoctorObject()
    this.doctorService.updateDoctor(this.doctorId, d)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/doctors']);
        },
        err => console.error(err)
      )
  }

  setDoctorObject(){
    let newDoctor = this.form.value;
    let bd = this.form.value['bornDate'];
    newDoctor['bornDate'] = `${bd.month}/${bd.day}/${bd.year}`
    newDoctor['hospital'] = this.form.value['hospital']
    console.log(newDoctor);
    return newDoctor;
  }

  saveDoctor() {
    
    let newDoctor = this.setDoctorObject()

    this.doctorService.saveDoctor(newDoctor)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/doctors']);
        },
        err => console.error(err)
      );  
  }

}
