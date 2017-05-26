import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {

  constructor(private appComponent:AppComponent) { }
  itemPrice;

  ngOnInit() {
    // this.appComponent.currScreen = 0;
  }
  detailsModal() {
    
  }

}
