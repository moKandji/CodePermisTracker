import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConduiteComponent } from './conduite.component';

describe('ConduiteComponent', () => {
  let component: ConduiteComponent;
  let fixture: ComponentFixture<ConduiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConduiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConduiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
