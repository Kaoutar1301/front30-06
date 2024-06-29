import { TestBed } from '@angular/core/testing';

import { GetProjectsService } from './get-projects.service';

describe('GetProjectsService', () => {
  let service: GetProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
