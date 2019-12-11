import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {Reset_passwordComponent} from '@app/auth/reset_password/reset_password.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [LoginComponent, Reset_passwordComponent],
  exports: [LoginComponent, Reset_passwordComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class AuthModule { }
