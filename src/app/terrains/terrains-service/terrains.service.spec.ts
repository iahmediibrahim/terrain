import { TestBed } from '@angular/core/testing';

import { terrainsService } from './terrains.service';

describe('terrainsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: terrainsService = TestBed.get(terrainsService);
    expect(service).toBeTruthy();
  });
});
