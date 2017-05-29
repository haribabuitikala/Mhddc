import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {

  constructor(private appComponent: AppComponent) {
    appComponent.subscribeToPrice(() => {
      try {
        let price = window['getDoorPrice'](window['cObj']);
        this.itemPrice = price[0];
      } catch (g) {

      }
    });
  }
  itemPrice;

  ngOnInit() {
    // this.appComponent.currScreen = 0;

  }
  detailsModal() {

  }

}
