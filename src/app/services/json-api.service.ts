
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { AppConfig }from '../config/config.constant';

@Injectable()
export class JsonApiService {

  constructor(private http: HttpClient) { 
  }

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

// Call rest api to save favourite movie into json database
addToFavourite(movie){ 
  return this.http.post(AppConfig.apiUrl+'/movies', movie)
}

// Call rest api to get favourite movies from json database
getFavourite(){ 
  return this.http.get(AppConfig.apiUrl+'/movies')
}

// Call rest api to delete favourite movies from json database
deleteMovie(movieId){ 
  return this.http.delete(AppConfig.apiUrl+'/movies/'+movieId)
}

// call rest api to update favourite movie details in json database
updateMovie(movieId,movie){
	return this.http.patch(AppConfig.apiUrl+'/movies/'+movieId,movie)
}

// Call rest api to login user into user database
loginUser(){ 
   return this.http.get(AppConfig.userUrl)
}

// Handle errors
// private handleError(error: HttpErrorResponse){
//   return Observable.throw(error.statusText);
// }
}
