import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPositionSliderComponent } from './top-position-slider.component';

describe('TopPositionSliderComponent', () => {
  let component: TopPositionSliderComponent;
  let fixture: ComponentFixture<TopPositionSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPositionSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPositionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
