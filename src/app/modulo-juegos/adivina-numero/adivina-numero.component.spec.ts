import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaNumeroComponent } from './adivina-numero.component';

describe('AdivinaNumeroComponent', () => {
  let component: AdivinaNumeroComponent;
  let fixture: ComponentFixture<AdivinaNumeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdivinaNumeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdivinaNumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
