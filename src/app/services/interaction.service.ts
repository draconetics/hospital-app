import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SubjectData } from '../models/subject'

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _teacherMessageSource = new Subject<SubjectData>();
  teacherMessage$ = this._teacherMessageSource.asObservable();

  constructor() { }

  sendMessage(message: SubjectData) {
      this._teacherMessageSource.next(message);
  }
}
