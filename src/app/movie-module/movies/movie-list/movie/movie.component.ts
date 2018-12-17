import { Component, OnInit, Input, Inject, Output, ViewContainerRef, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { JsonApiService } from './../../../../services/json-api.service';
import { AppConfig } from './../../../../config/config.constant';
import { MessageConfig } from './../../../../config/message-config.constant';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.css'],
	providers: [JsonApiService]

})

export class MovieComponent implements OnInit {
	@Input() movie: any;
	@Input() flag: any;
	@Input() updateMovies: any;
	@Output() favArray = new EventEmitter();
	@Output() update =new EventEmitter();
	public movieUrl=AppConfig.baseUrl;	public favMovies : any =[];
	public errorMessage ='';
	public successMessage='';
	public updatedMovie:any={};
	public selectedMovie : any;
	public togglebutton:boolean=false;

	constructor(private jsonApiService : JsonApiService) {
	}

	ngOnInit() {
	}


	// Add favourite movie to  database
	addToFavourite(movie) {
		this.jsonApiService.addToFavourite(movie).subscribe((res) =>{
			this.successMessage=MessageConfig.SUCCESS_ADD_MESSAGE;
			this.getFavourite();
			Swal({
				position: 'center',
				type: 'success',
				title: this.successMessage,
				showConfirmButton: false,
				timer: 2000
			})
		},(error:any)=>{
			console.log(error.status + error + "df");
			this.errorMessage=MessageConfig.MOVIE_ALREADY_ADDED;
			Swal({
				type: 'error',
				title: 'Oops...',
				text: this.errorMessage,
			})

		})

	}


	// get data of favourite movies from database
	getFavourite() {
		this.jsonApiService.getFavourite().subscribe((res) =>{
			this.favMovies = res;
			this.favArray.emit({
				'favMovies': this.favMovies
			});
		},(error:any)=>{
			this.errorMessage=MessageConfig.INTERNAL_ERROR_OCCURED;
			Swal({
				type: 'error',
				title: 'Oops...',
				text: this.errorMessage,
			})
		})
	}

	//Delete movie from database
	deleteMovie(movieId){
		this.errorMessage=MessageConfig.DELETE_MOVIE;
		Swal({
			title: 'Alert!',
			text: this.errorMessage,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ok'
		}).then((result) => {
			if (result.value) {

				this.jsonApiService.deleteMovie(movieId).subscribe(data=>{
					this.getFavourite();
					this.successMessage=MessageConfig.SUCCESS_DELETE_MESSAGE;
					Swal({
						position: 'center',
						type: 'success',
						title: this.successMessage,
						showConfirmButton: false,
						timer: 2000
					})
				},(error:any)=>{
					// this.errorMsg = error.statusText;
					this.errorMessage=MessageConfig.INTERNAL_ERROR_OCCURED;
					Swal({
						type: 'error',
						title: 'Oops...',
						text: this.errorMessage,
					})

				})
			}
		})

	}

	// Set Movie details to update
	setMovie(movie) {
		this.update.emit({
			'movie': movie
		})
	}


}
