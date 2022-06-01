import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatMujerComponent } from './cat-mujer.component';

describe('CatMujerComponent', () => {
  let component: CatMujerComponent;
  let fixture: ComponentFixture<CatMujerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatMujerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatMujerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
