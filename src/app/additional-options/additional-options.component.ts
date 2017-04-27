import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-additional-options',
  templateUrl: './additional-options.component.html',
  styleUrls: ['./additional-options.component.less']
})
export class AdditionalOptionsComponent implements OnInit {

  constructor(private appComponent:AppComponent) { }

  ngOnInit() {
    this.appComponent.next = 'Next';
  }

}
