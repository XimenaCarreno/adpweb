import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCategoryPageComponent } from './one-category-page.component';

describe('OneCategoryPageComponent', () => {
  let component: OneCategoryPageComponent;
  let fixture: ComponentFixture<OneCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
