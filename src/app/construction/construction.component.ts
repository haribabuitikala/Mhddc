import {Component, OnInit} from '@angular/core';
declare var _:any;
@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.less']
})
export class ConstructionComponent implements OnInit {

  slideWidth;
  sliderLeft;
  sliderWidth;

  constructor() {
  }

  data:any;
  sliderCount:any;

  ngOnInit() {
    this.data = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13"];
    this.data = _.chunk(this.data, 3);
    this.sliderCount = _.times(this.data.length, _.constant(null));
  }

}
