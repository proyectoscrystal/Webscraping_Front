import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatKidsComponent } from './cat-kids.component';

describe('CatKidsComponent', () => {
  let component: CatKidsComponent;
  let fixture: ComponentFixture<CatKidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatKidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatKidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
