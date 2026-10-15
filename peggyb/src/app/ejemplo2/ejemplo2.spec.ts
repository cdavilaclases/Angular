import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ejemplo2 } from './ejemplo2';

describe('Ejemplo2', () => {
  let component: Ejemplo2;
  let fixture: ComponentFixture<Ejemplo2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejemplo2],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejemplo2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
