import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TmdbApiService } from './../../services/tmdb-api.service';
import { MessageConfig } from './../../config/message-config.constant';
import Swal from 'sweetalert2';


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
	public errorMessage='';
	public msg:string;
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
  			this.errorMessage=MessageConfig.INTERNAL_ERROR_OCCURED;
  			Swal({
  				type: 'error',
  				title: 'Oops...',
  				text: this.errorMessage,
  			})
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
