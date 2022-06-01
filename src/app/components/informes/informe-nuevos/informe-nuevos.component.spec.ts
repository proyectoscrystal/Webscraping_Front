import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeNuevosComponent } from './informe-nuevos.component';

describe('InformeNuevosComponent', () => {
  let component: InformeNuevosComponent;
  let fixture: ComponentFixture<InformeNuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeNuevosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
