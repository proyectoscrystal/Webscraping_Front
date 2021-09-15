import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeSKUComponent } from './informe-sku.component';

describe('InformeSKUComponent', () => {
  let component: InformeSKUComponent;
  let fixture: ComponentFixture<InformeSKUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeSKUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeSKUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
