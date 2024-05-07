import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalJuegosComponent } from './principal-juegos.component';

describe('PrincipalJuegosComponent', () => {
  let component: PrincipalJuegosComponent;
  let fixture: ComponentFixture<PrincipalJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalJuegosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
