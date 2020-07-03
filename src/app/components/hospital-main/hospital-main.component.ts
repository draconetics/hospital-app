import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { InteractionService } from '../../services/interaction.service'

@Component({
  selector: 'app-hospital-main',
  templateUrl: './hospital-main.component.html',
  styleUrls: ['./hospital-main.component.scss']
})
export class HospitalMainComponent implements OnInit {

  years:number[];
  months:number[];
  monthsByName:string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  days:number[];


  public search = {
      day: 1,
      month:1,
      year: 1901,
      name:""
  }

  constructor(  private router: Router,
                private _interactionService: InteractionService ) { }

  ngOnInit(): void {

    this.datesInit();
  }

  sendToChild(data:any){
      this._interactionService.sendMessage(data);
  }

  datesInit(){
      let yearsRange = new Date().getFullYear() - 1900;
      this.years = Array(yearsRange).fill(1901).map((x,i)=>x+i);

      this.months = Array(12).fill(1).map((x,i)=>x+i);

      this.days = Array(31).fill(1).map((x,i)=>x+i);

  }

  onSearch(){
      console.log("onSearch",this.search);
      this.sendToChild(this.createSearch());
  }

  createSearch(){
      let obj = this.search;
      let formatedDate = `${obj.month}/${obj.day}/${obj.year}`
      return { id:"searchHospitals", data: {name: obj.name, fundation: formatedDate}}
  }
}
