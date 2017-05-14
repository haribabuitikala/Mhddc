import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-gdo-config',
  templateUrl: './gdo-config.component.html',
  styleUrls: ['../config/config.component.less', '../details/details.component.less','./gdo-config.component.less']
})
export class GdoConfigComponent implements OnInit {

  constructor(private appComponent:AppComponent) { }

  ngOnInit() {
    this.appComponent.currScreen = 3;
  }

}
