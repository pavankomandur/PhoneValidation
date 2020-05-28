import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class PhoneSuggestService {
  phoneObj: any;
  constructor(private http: HttpClient) { }

  showMessage() {
  console.log('I am inside phone suggest Service');
  }

  getTelephoneSuggestions(phoneno, pageno): Observable<any> {
    this.phoneObj = {phoneNumber: phoneno , pageNo: pageno};
    return this.http.post<any>('http://localhost:8081/phonebook/getSuggestions', this.phoneObj);
  }
}
