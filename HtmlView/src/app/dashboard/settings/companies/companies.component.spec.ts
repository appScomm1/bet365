import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CompaniesSettingsComponent} from '@app/dashboard/settings/companies/companies.component';

describe('SidebarComponent', () => {
  let component: CompaniesSettingsComponent;
  let fixture: ComponentFixture<CompaniesSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesSettingsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
