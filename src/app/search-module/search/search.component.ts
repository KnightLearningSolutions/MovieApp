import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TmdbApiService } from './../../services/tmdb-api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TmdbApiService]
})
export class SearchComponent implements OnInit {
	@Output() success = new EventEmitter<any>();
  public moviesList=[];
  public movieSearch: string; 
  public errorMsg ='';
  public msg:string;
  public showError : boolean = false;
  public searchResult : boolean = false;

  constructor(private tmdbApiService : TmdbApiService) { }

  ngOnInit() {
  }

  // Function to get search text and make service call to get movies from TMDB
  searchMovie(){
    if(this.movieSearch.length<2){
      this.msg=' Movie Title must be at least 2 characters long';
      this.moviesList=[];
      this.onEventEmit(this.moviesList);
      return;
    }else{
    	this.msg="";
    this.tmdbApiService.searchMovie(this.movieSearch).subscribe((res: any) =>{
    	console.log("HIII" + JSON.stringify(res.results));
      this.moviesList = res.results;
       if(this.moviesList.length==0){
         this.searchResult=true;
       }
       else{
        this.searchResult=false; 
       } 
      this.msg='';
     this.onEventEmit(this.moviesList);
    }, (error) =>{
      this.errorMsg = error._body;
      this.showError = true;
    })
    }
  }

  //send movielist to the movies component
  onEventEmit(moviesList: any) {
     this.success.emit({
        'moviesList': moviesList
      });
  }

}
