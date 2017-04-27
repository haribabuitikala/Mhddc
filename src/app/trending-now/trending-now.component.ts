import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-trending-now',
  templateUrl: './trending-now.component.html',
  styleUrls: ['./trending-now.component.less']
})
export class TrendingNowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.renderSlider();
  }
  sliderWidth = 0;
  slideWidth = 0;
  slideCount = 5;
  sliderLeft = 0;
  touchStart = false;
  touchX = 0;
  oldX = 0;
  renderSlider() {
    this.slideWidth = $('._slider-container').width() / 2;
    this.sliderWidth = this.slideCount * this.slideWidth;

    $('._slide').on('touchstart', (e) => {
      this.touchStart = true;
      this.touchX = e.touches[0].clientX;
      this.oldX = this.sliderLeft;
    });
    $(document).on('touchmove', (e) => {
      var dir = this.touchX - e.touches[0].clientX;
      if (dir > 0) {
        if (Math.abs(this.sliderLeft) <= (this.sliderWidth - (2 * this.slideWidth))) {
          this.sliderLeft = -(Math.abs(this.oldX) + dir);
        }
      } else {
        if (this.sliderLeft < 0) {
          this.sliderLeft = -(Math.abs(this.oldX) + dir);
        }
      }
    });
    $('._slide').on('touchend', (e) => {
      this.touchStart = false;
      this.touchX = 0;
      this.setSlide();
    });
  }
  setSlide() {
    console.log(this.sliderLeft, this.slideCount, this.slideWidth);
    var sliderIndex = Math.round(Math.abs(this.sliderLeft) / this.slideWidth);
    this.sliderLeft = - (sliderIndex * this.slideWidth);

  }
}
