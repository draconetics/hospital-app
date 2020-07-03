import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctor'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

    API_URL = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    getDoctors() {
        return this.http.get(`${this.API_URL}/doctors`)
    }

    saveDoctor(doctor:Doctor){
        return this.http.post(`${this.API_URL}/doctors`,doctor);
    }


    getDoctor(id: number) {
      return this.http.get(`${this.API_URL}/doctors/${id}`);
    }

    deleteDoctor(id: string | number) {
        return this.http.delete(`${this.API_URL}/doctors/${id}`);
    }

    updateDoctor(id, doctorData:Doctor): Observable<Object>{
      return this.http.put(`${this.API_URL}/doctors/${id}`, doctorData)
    }
}
