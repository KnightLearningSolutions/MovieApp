import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared-module/shared.module';

import { SearchComponent } from '../search-module/search/search.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieComponent } from './movies/movie-list/movie/movie.component';
import { HeaderComponent } from '../shared-module/header/header.component';
import { FooterComponent } from '../shared-module/footer/footer.component';

const routes: Routes = [
    { path: 'movies', component: MoviesComponent },
    { path: 'movie-list', component: MovieListComponent },
    { path: 'movie', component: MovieComponent },
];

@NgModule({
  declarations: [MoviesComponent,MovieListComponent,MovieComponent,
  SearchComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [MovieListComponent,MovieComponent]
})
export class MovieModule { }
