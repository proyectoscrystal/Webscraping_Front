import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeCategoriaComponent } from './informe-categoria.component';

describe('InformeCategoriaComponent', () => {
  let component: InformeCategoriaComponent;
  let fixture: ComponentFixture<InformeCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
