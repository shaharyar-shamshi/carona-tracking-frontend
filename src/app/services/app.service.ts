import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

  constructor(private http: HttpClient ) { }
  getIndiaData(): any {                                                                                             
    
    const url = `${environment.url}`;
    return this.http.get('https://mysterious-sands-32124.herokuapp.com/getData');
  }
  getHistoricalData(): any {                                                                                             
    
    const url = `${environment.url}`;
    return this.http.get('https://mysterious-sands-32124.herokuapp.com/getHistoricalData');
  }
}