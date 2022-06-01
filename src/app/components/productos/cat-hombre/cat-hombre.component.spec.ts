import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatHombreComponent } from './cat-hombre.component';

describe('CatHombreComponent', () => {
  let component: CatHombreComponent;
  let fixture: ComponentFixture<CatHombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatHombreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatHombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
