import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrattativaComponent } from './trattativa.component';

describe('TrattativaComponent', () => {
  let component: TrattativaComponent;
  let fixture: ComponentFixture<TrattativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrattativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrattativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
