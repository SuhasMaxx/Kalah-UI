import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitBlockComponent } from './pit-block.component';

describe('PitBlockComponent', () => {
  let component: PitBlockComponent;
  let fixture: ComponentFixture<PitBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
