import { Injectable } from '@angular/core';
import { MOCK_MAIN_DATA } from '../shared/utils/constants';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor() { }

  getMainData(): Observable<any> {
    return of(MOCK_MAIN_DATA);
  }
}
