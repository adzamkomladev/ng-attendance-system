import { TestBed } from '@angular/core/testing';

import { InvigilationService } from './invigilation.service';

describe('InvigilationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvigilationService = TestBed.get(InvigilationService);
    expect(service).toBeTruthy();
  });
});
