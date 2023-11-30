import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { MessagesModule } from './messages/messages.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbChatModule, NbChatOptions, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    SignUpModule,
    LoginModule,
    HomeModule,
    ProfileModule,
    MessagesModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbChatModule,
  ],
  providers: [NbChatOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
