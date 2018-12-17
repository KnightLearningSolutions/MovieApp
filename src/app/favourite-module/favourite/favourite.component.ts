import { Component, OnInit } from '@angular/core';
import { JsonApiService } from './../../services/json-api.service';
import { MessageConfig } from '../../config/message-config.constant';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
  providers: [JsonApiService]
})

export class FavouriteComponent implements OnInit {
public favMovies : any =[];
	public errorMessage ='';
	public flag = 'list';

	constructor(private jsonApiService: JsonApiService) { 
	}

	ngOnInit() {
    this.getFavourite();
	}

	//get data of favourite movies from database
	getFavourite() {
		this.jsonApiService.getFavourite().subscribe((res: any) =>{
			this.favMovies = res;

		},(error:any)=>{
			this.errorMessage=MessageConfig.INTERNAL_ERROR_OCCURED;
			Swal({
				type: 'error',
				title: 'Oops...',
				text: this.errorMessage,
			})
		})
	}
	
// update movie data from movies 
setFavMovieList(event){
 this.favMovies=event.favMovies;
 this.getFavourite();
}

}
