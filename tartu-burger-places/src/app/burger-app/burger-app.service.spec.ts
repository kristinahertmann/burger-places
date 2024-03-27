import { TestBed } from '@angular/core/testing';

import { BurgerAppService } from './burger-app.service';

describe('BurgerAppService', () => {
  let service: BurgerAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurgerAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
