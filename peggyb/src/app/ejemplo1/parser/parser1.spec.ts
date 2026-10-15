import { TestBed } from '@angular/core/testing';
import { Parser1 } from './parser1';

describe('Parser1', () => {
  let service: Parser1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Parser1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
