import {Component, OnInit, Input} from '@angular/core';
declare var $:any;
declare var _:any;

@Component({
  selector: 'app-slider-component',
  templateUrl: './slider-component.component.html',
  styleUrls: ['./slider-component.component.less']
})
export class SliderComponentComponent implements OnInit {

  constructor() {
  }

  @Input() data:any;
  @Input() count:any;
  @Input() number:any;
  sliderRows;



  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.sliderRows = _.times(this.data.length, _.constant(null));
      this.slideCount = this.data ? this.data.length: 0;
    }
    this.renderSlider();
  }

  sliderWidth = 0;
  slideWidth = 0;
  slideCount = this.data ? this.data.length: 0;
  sliderLeft = 0;
  touchStart = false;
  touchX = 0;
  oldX = 0;

  renderSlider() {
    this.slideWidth = $('._slider-container').width();
    this.sliderWidth = this.data.length * this.slideWidth;

    $('._slider').on('touchstart', (e) => {
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
    $('._slider').on('touchend', (e) => {
      this.touchStart = false;
      this.touchX = 0;
      this.setSlide();
    });
  }

  setSlide() {
    var sliderIndex = Math.round(Math.abs(this.sliderLeft) / this.slideWidth);
    this.sliderLeft = -(sliderIndex * this.slideWidth);

  }
}
