import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeekInvigilationComponent } from './peek-invigilation.component';

describe('PeekInvigilationComponent', () => {
  let component: PeekInvigilationComponent;
  let fixture: ComponentFixture<PeekInvigilationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeekInvigilationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeekInvigilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
