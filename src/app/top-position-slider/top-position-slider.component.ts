import { Component, OnInit, OnChanges, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";
import { ConfigComponent } from "../config/config.component";

declare var $: any;
declare var _: any;

@Component({
  selector: 'app-top-position-slider',
  templateUrl: './top-position-slider.component.html',
  styleUrls: ['./top-position-slider.component.less']
})
export class TopPositionSliderComponent implements OnInit {

  @Input() data;

  slideIndex = 0;
  slideCount = 0;
  sliderWidth = 0;
  sliderLeft = 0;
  slideWidth = $('._slider-container').width();
  slideData = [];
  constructor(private utils: AppUtilities
    , private config: ConfigComponent) { }

  ngOnInit() {
    this.slideCount = this.data.length;
    this.slideWidth = $('._slider-container').width();
    this.sliderWidth = this.slideWidth * this.slideCount;

    if (this.data.length > 0 && this.data[0].length > 0) {
      this.utils.resFlowSession.resDoorObj.windows.placement = this.data[0][0];
    }
    this.slideData = this.data;
  }

  moveSlider(isNext) {
    if (isNext) {
      this.slideIndex = this.slideIndex + 1;
    } else {
      this.slideIndex = this.slideIndex - 1;
    }
    this.sliderLeft = -(this.slideIndex * this.slideWidth);
  }

  isSelected(positionItem) {
    let placement = this.utils.resFlowSession.resDoorObj.windows.placement;
    if (placement && placement['item_id']) {
      return placement['item_id'] == positionItem['item_id'];
    }
    return false;
  }

  setWindowPlacement(positionItem) {
    this.utils.resFlowSession.resDoorObj.windows.placement = positionItem;
    this.config.renderCanvas();
  }

}
