import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MovieModule } from '../movie-module/movie.module';
import { SharedModule } from '../shared-module/shared.module';

import { Routes, RouterModule } from '@angular/router';
import { FavouriteComponent } from './favourite/favourite.component';

const routes: Routes = [
    { path: 'movielist', component: FavouriteComponent }
];

@NgModule({
  declarations: [FavouriteComponent],
  imports: [
    CommonModule,
    FormsModule,
    MovieModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [FavouriteComponent]
})

export class FavouriteModule { }
