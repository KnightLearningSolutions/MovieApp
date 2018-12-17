import { Component, OnInit, Input, Inject, Output, ViewContainerRef, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AppConfig } from './../../../config/config.constant';
import { MessageConfig } from './../../../config/message-config.constant';
import { JsonApiService } from './../../../services/json-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers:[ JsonApiService ]
})

export class MovieListComponent implements OnInit {
	@Input() movies: Array<any>=[];
	@Input() flag: string;

  @Output() favArray= new EventEmitter();
  public movieUrl=AppConfig.baseUrl;
  public favMovies=[];
  public fb:FormBuilder;
  public errorMessage="";
  public successMessage="";
  public currentMovie : any={};
  public movieForm: FormGroup;

  @ViewChild('close') close: ElementRef;
  @ViewChild('open') open: ElementRef;


  constructor(@Inject(FormBuilder)fb:FormBuilder,
  	private jsonApiService : JsonApiService,
  	private _vcr : ViewContainerRef) { 
  	this.fb=fb;
		this.initializeForm(fb);
  }

    // to initialize form builder
	initializeForm(fb:FormBuilder,data:any={}):void{
		this.movieForm=fb.group({
			title: [data.title || '',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
			overview: [data.overview || '',[Validators.required,Validators.minLength(5),Validators.maxLength(1000)]],
			vote_average: [data.vote_average || '',[Validators.required,Validators.minLength(1),Validators.maxLength(4),Validators.pattern(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/)]],
		});
	}

  ngOnInit() {
  }

//sent favourite movies data from output 
setFavMovieList(event){
  this.favMovies=event.favMovies;
  this.favArray.emit({
    'favMovies': this.favMovies
  });
}

 // set movie to update
setMovie(event){
  this.currentMovie=event.movie;
  this.movieForm.get('title').setValue(this.currentMovie.title);
  this.movieForm.get('overview').setValue(this.currentMovie.overview);
  this.movieForm.get('vote_average').setValue(this.currentMovie.vote_average);
  this.open.nativeElement.click();
  
}

 // update movie in database
 updateMovie(movie){
 this.jsonApiService.updateMovie(movie.id,this.movieForm.value).subscribe(res=>{
 	this.favMovies=this.currentMovie;
 	this.successMessage=MessageConfig.SUCCESS_UPDATE_MESSAGE;
 	 Swal({
  position: 'center',
  type: 'success',
  title: this.successMessage,
  showConfirmButton: false,
  timer: 2000
})
 this.close.nativeElement.click();
 },(error:any)=>{
			this.errorMessage=MessageConfig.INTERNAL_ERROR_OCCURED;
			Swal({
				type: 'error',
				title: 'Oops...',
				text: this.errorMessage,
			})
  })
}
}
