import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NewTestModule } from './new-test/new-test.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewTestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
