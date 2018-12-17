import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppConfig } from './../config/config.constant';
import 'rxjs/add/operator/map';

@Injectable()
export class TmdbApiService {
  data:any={};
  constructor(private http: HttpClient) {
  }

// search movie data entered by user in search bar
searchMovie(movieName: any){
  return this.http.get(AppConfig.search_api+movieName)
}

//handling error
// private handleError(error: HttpErrorResponse){
//   return Observable.throw(error.statusText);
// }
}