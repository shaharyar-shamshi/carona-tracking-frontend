import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

  constructor(private http: HttpClient ) { }
  getIndiaData(): any {                                                                                             
    return this.http.get('https://mysterious-sands-32124.herokuapp.com/getData');
  }
  getHistoricalData(): any {                                                                                             
    return this.http.get('https://mysterious-sands-32124.herokuapp.com/getHistoricalData');
  }
  getNewsarticle(): any { 
    return this.http.get('https://mysterious-sands-32124.herokuapp.com/getNews')
  }
}