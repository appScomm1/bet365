import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Template } from '@app/template.service';
import {TranslateService} from '@ngx-translate/core';
import { BaseService } from '@app/base.service';
import {UtilityService} from "@app/shared/utility.service";
import {AuthenticationService} from '@app/auth/login/login.service';
import {Router} from '@angular/router';
import {TemplateInitModule} from '@app/templateInit.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

 title = null;
 user;

  constructor(
    private translate: TranslateService,
    private utilityService: UtilityService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.utilityService.user;
    console.log(this.user);
    console.log('header', this.utilityService.title);
    $('.generic-ddl').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true,
      hover: false,
      gutter: 0,
      // coverTrigger: false,
      alignment: 'left'
    });
    // Template.initDDL();
  }

  ngAfterViewInit() {
    TemplateInitModule.templateInit();
  }

  useLang(lang: string) {
    this.translate.use(lang);
  }

  logOut() {
    this.authenticationService.LogOut().subscribe((res: any) => {
          this.router.navigate(['/login']);
    });
  }
}
