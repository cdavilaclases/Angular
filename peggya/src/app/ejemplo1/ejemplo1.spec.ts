import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ejemplo1 } from './ejemplo1';

describe('Ejemplo1', () => {
  let component: Ejemplo1;
  let fixture: ComponentFixture<Ejemplo1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejemplo1],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejemplo1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
