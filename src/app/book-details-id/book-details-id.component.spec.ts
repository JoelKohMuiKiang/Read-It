import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsIdComponent } from './book-details-id.component';

describe('BookDetailsIdComponent', () => {
  let component: BookDetailsIdComponent;
  let fixture: ComponentFixture<BookDetailsIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailsIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
