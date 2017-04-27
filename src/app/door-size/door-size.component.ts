import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
// import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-door-size',
  templateUrl: './door-size.component.html',
  styleUrls: ['./door-size.component.less']
})
export class DoorSizeComponent implements OnInit {

  constructor(
    private appComponent:AppComponent
    // private navComponent:NavComponent
  ) {
  }

  ngOnInit() {
    this.appComponent.currScreen = 3;
    // this.navComponent.screen = 3;
  }

}
