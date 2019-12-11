import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import { MzDropdownModule, MzButtonModule } from 'ngx-materialize';
import {TranslateModule} from '@ngx-translate/core';
import {AuthenticationService} from '@app/auth/login/login.service';
import {UtilityService} from '@app/shared/utility.service';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, DashboardComponent],
  exports: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MzDropdownModule,
    MzButtonModule,
    TranslateModule
  ]
})
export class DashboardModule {
  constructor() {
  }
}
