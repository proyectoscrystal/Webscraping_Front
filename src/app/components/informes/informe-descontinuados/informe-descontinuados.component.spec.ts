import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDescontinuadosComponent } from './informe-descontinuados.component';

describe('InformeDescontinuadosComponent', () => {
  let component: InformeDescontinuadosComponent;
  let fixture: ComponentFixture<InformeDescontinuadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeDescontinuadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeDescontinuadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
