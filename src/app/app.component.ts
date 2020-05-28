import { Component } from '@angular/core';
import {PhoneSuggestService} from './app.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhoneValidation';
  phoneno: string;
  tableCreated = false;
  phonedetails: any = [];
  totalpages: number[];
  pagesToShow = 5;
  pagesShown = 0;
  showerror = false;

   constructor(private phoneSuggestService: PhoneSuggestService) {
 }

 validateInput(phoneno) {
   // tslint:disable-next-line:triple-equals
   if ((phoneno.length == 7) || (phoneno.length == 10))  {
      if (Number(phoneno) > 0) {
        return true;
      } else {
          return false;
      }
   } else {
     return false;
   }
 }

  getPhoneSuggestions(phoneno, pageno) {
     if (this.validateInput(phoneno)) {
       this.showerror=false;
       this.tableCreated = true;
       this.phoneSuggestService.getTelephoneSuggestions(phoneno, pageno).subscribe(response => {
         console.log('inside app component' + response);
         this.phonedetails = response;
         console.log('pageno --' + pageno);
         if (pageno > Number(this.pagesToShow)) {
           this.getNextSetOfPages((pageno - 1), response.totalPages, response.totalRecords);
         } else {
           this.getNextSetOfPages(0, response.totalPages, response.totalRecords);
         }
         // this.pagesShown = this.pagesToShow;
       });
     }
     else {
       this.showerror = true;
     }
    // console.log('from component : ' + this.employdetail
  }

  getNextSetOfPages(fromPage, tpages, trecords) {
     // or condition is added to incorporate any extra records which are not in multiples of no of records per page(which is 5)
    this.totalpages = [];
    for (let pageCounter: number = (Number(fromPage) + 1); pageCounter <= Number(fromPage + this.pagesToShow); pageCounter++) {
      // tslint:disable-next-line:max-line-length
      if ((Number(trecords) >= Number(pageCounter * this.pagesToShow)) || (Number(pageCounter * this.pagesToShow) - Number(trecords) < Number(this.pagesToShow))) {
      this.totalpages.push(pageCounter);
      }
    }
    this.pagesShown = (Number(fromPage + 1) + Number(this.pagesToShow - 1));
    console.log('pages shown is ' + this.pagesShown);
  }
  getPreviousSetOfPages(fromPage, tpages, trecords) {
    console.log('from Page is  ' + fromPage);
    // or condition is added to incorporate any extra records which are not in multiples of no of records per page(which is 5)
    this.totalpages = [];
    for (let pageCounter: number = (Number(fromPage) + 1); pageCounter <= Number(fromPage + this.pagesToShow); pageCounter++) {
      // tslint:disable-next-line:max-line-length
      if ((Number(trecords) >= Number(pageCounter * this.pagesToShow)) || (Number(pageCounter * this.pagesToShow) - Number(trecords) < Number(this.pagesToShow))) {
        this.totalpages.push(pageCounter);
        console.log('total Pages is ' + this.totalpages);
      }
    }
    this.pagesShown = (fromPage - Number(this.pagesToShow));
    console.log('pages shown is ' + this.pagesShown);
  }


}
