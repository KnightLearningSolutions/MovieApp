import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared-module/shared.module';

import { LoginComponent } from './login/login.component';



const routes: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],

  exports: [],
})

export class LoginModule { }
