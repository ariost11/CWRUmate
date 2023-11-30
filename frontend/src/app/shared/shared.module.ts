import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { NbChatModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NbChatModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalComponent,
    NbChatModule,
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
  ]
})
export class SharedModule { }
