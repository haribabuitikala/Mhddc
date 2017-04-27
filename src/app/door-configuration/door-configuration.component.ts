import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-door-configuration',
  templateUrl: './door-configuration.component.html',
  styleUrls: ['./door-configuration.component.less']
})
export class DoorConfigurationComponent implements OnInit {

  constructor(private appComponent:AppComponent) { }

  ngOnInit() {
    this.appComponent.next = 'Add To Cart';
  }

}
