import { TestBed } from '@angular/core/testing';

import { BadgesCollectionService } from './badges-collection.service';

describe('BadgesCollectionService', () => {
  let service: BadgesCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BadgesCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
