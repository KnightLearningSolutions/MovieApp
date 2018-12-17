
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// import { SearchComponent } from '../search-module/search/search.component';
// import { MoviesComponent } from './movies/movies.component';
// import { MovieListComponent } from './movies/movie-list/movie-list.component';
// import { MovieComponent } from './movies/movie-list/movie/movie.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    // { path: 'movies', component: MoviesComponent },
    // { path: 'movie-list', component: MovieListComponent },
    // { path: 'movie', component: MovieComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent },
];


@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [HeaderComponent,FooterComponent]
})

export class SharedModule { }
