import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePrecioComponent } from './informe-precio.component';

describe('InformePrecioComponent', () => {
  let component: InformePrecioComponent;
  let fixture: ComponentFixture<InformePrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformePrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformePrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
