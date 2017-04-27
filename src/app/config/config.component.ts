import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {Location} from '@angular/common';
declare var $:any;
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.less']
})
export class ConfigComponent implements OnInit {

  constructor(private appComponent:AppComponent,
              private location:Location) {

  }

  ngOnInit() {
    // set the curr screen
    let path = this.location.path();
    path === "/config/design" ? path = "/config" : path = this.location.path();
    this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
    console.log(this.appComponent.currScreen);

    $('.switcher-box').on('click tap', function () {
      $(this).hide();
      $('.switcher-box-home').show().removeClass('hide').animate({right: 93});
      $('.switcher-image-sec img').attr('src', '../../assets/images/home-1/white-short.png');
      $('.switcher-image').addClass('homeImage');
    });

    $('.switcher-box-home').on('click tap', function () {
      $(this).hide();
      $('.switcher-box').show().removeClass('hide').animate({right: 64});
      $('.switcher-image-sec img').attr('src', '../../assets/images/white-short.png');
      $('.switcher-image').removeClass('homeImage');
    });
  }

}
