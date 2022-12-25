import { TestBed } from '@angular/core/testing';

import { BetterttvEmoteService } from './betterttv-emote.service';

describe('BetterttvEmoteService', () => {
  let service: BetterttvEmoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetterttvEmoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
