import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Hospital } from '../models/hospital'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HospitalsService {
  API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getHospitals() {
      return this.http.get(`${this.API_URL}/hospitals`)
  }
  saveHospital(hospital:Hospital){
      return this.http.post(`${this.API_URL}/hospitals`,hospital);
  }


  getHospital(id: number) {
    return this.http.get(`${this.API_URL}/hospitals/${id}`);
  }

  deleteHospital(id: string) {
      return this.http.delete(`${this.API_URL}/hospitals/${id}`);
  }

  updateHospital(id, updatedHospital:Hospital): Observable<Hospital>{
    return this.http.put(`${this.API_URL}/hospitals/${id}`, updatedHospital)
  }

  searchHospitals(name:string,fundation:string){
    return this.http.get(`${this.API_URL}/hospitals/search?name=${name}&fundation=${fundation}`)
  }
}
