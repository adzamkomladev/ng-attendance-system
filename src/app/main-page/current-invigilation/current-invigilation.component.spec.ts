import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentInvigilationComponent } from './current-invigilation.component';

describe('CurrentInvigilationComponent', () => {
  let component: CurrentInvigilationComponent;
  let fixture: ComponentFixture<CurrentInvigilationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentInvigilationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentInvigilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
