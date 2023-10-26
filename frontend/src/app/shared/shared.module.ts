import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalComponent,
  ]
})
export class SharedModule { }
