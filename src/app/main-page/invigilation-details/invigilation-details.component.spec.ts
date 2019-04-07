import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilationDetailsComponent } from './invigilation-details.component';

describe('InvigilationDetailsComponent', () => {
  let component: InvigilationDetailsComponent;
  let fixture: ComponentFixture<InvigilationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvigilationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvigilationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
