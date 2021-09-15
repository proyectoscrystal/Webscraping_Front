import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDescuentoComponent } from './informe-descuento.component';

describe('InformeDescuentoComponent', () => {
  let component: InformeDescuentoComponent;
  let fixture: ComponentFixture<InformeDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeDescuentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
