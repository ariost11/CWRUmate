import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTestComponent } from './new-test.component';



@NgModule({
  declarations: [NewTestComponent],
  imports: [
    CommonModule
  ],
  exports: [NewTestComponent],
})
export class NewTestModule { }
