import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredAuthorComponent } from './registered-author.component';

describe('RegisteredAuthorComponent', () => {
  let component: RegisteredAuthorComponent;
  let fixture: ComponentFixture<RegisteredAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
