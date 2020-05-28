import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameComponent } from './frame.component';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  });

  it('should create', () => {
    let frame = { id: 1, name: 'Frame 1', score1: '', score2: '', score3: '', total: 0, isStrike: false, isSpare: false};
    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    component.frame = frame;
    fixture.detectChanges();
    expect(component).toBeDefined();
  });
});
