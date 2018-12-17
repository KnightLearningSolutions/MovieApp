import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {SearchComponent } from './search/search.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'search', component: SearchComponent }
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [SearchComponent],
})

export class SearchModule { }
