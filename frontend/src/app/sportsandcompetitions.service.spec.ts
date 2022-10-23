import { TestBed } from '@angular/core/testing';

import { SportsandcompetitionsService } from './sportsandcompetitions.service';

describe('SportsandcompetitionsService', () => {
  let service: SportsandcompetitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsandcompetitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
