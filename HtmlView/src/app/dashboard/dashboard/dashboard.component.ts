import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@app/auth/login/login.service';
import {UtilityService} from '@app/shared/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private utilityService: UtilityService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    console.log('ciao mamma');
  }

}
