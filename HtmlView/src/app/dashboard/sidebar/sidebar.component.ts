import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Template } from '@app/template.service';
import {UtilityService} from '@app/shared/utility.service';
import {TemplateInitModule} from '@app/templateInit.module';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  constructor(private utilityService: UtilityService) { }

  user;

  ngOnInit() {
      this.user =  this.utilityService.user;
  }

  checkPermission(section) {
    const exist = this.user.permissions.find((element) => {
      return element === section;
    });
    if (exist) {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit() {
    TemplateInitModule.templateInit();
  }
}
