import { NgModule } from '@angular/core';

import { SignUpComponent } from './sign-up.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    SharedModule,
  ],
})
export class SignUpModule {}
