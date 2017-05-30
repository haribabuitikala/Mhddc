import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {


  calculatePrice() {
    try {
      var itemId = this.utils.resFlowSession.resDoorObj.product.product['item_id'];
      var count = this.utils.resFlowSession.resDoorObj.QTY;
      if (itemId) {
        let cObj = this.utils.resFlowSession.resDoorObj;
        let price = window['getDoorPrice'](cObj);
        this.itemPriceInstall = parseFloat(price[0].replace(/ /g, '').replace('$', '')) * count;
        this.isDIY = false;
        if (this.appComponent.noDIYs.indexOf(itemId) < 0) {
          this.isDIY = true;
          this.itemPriceDY = parseFloat(price[1].replace(/ /g, '').replace('$', '')) * count;
        }
      }

    } catch (g) {

    }
  }

  constructor(private appComponent: AppComponent, private utils: AppUtilities) {
    appComponent.subscribeToPrice(() => {
      this.calculatePrice();
    });
  }
  itemPriceInstall;
  itemPriceDY;
  isDIY = false;
  quantity = 1;
  details;
  whdata;

  ngOnInit() {
    // this.appComponent.currScreen = 0;
    this.detailsModal();

  }
  detailsModal() {
    this.details = this.utils.resFlowSession.resDetails;
    this.whdata = this.utils.resFlowSession.resDoorObj.size.width;

  }

  openDetailsModal(detailsModal){
    this.details['designName'] = this.utils.resFlowSession.resDoorObj.design.dsgn['item_name'];
    detailsModal.open();
  }

  updateQuantity(isIncrement?) {
    let count = this.utils.resFlowSession.resDoorObj.QTY;
    if (!isIncrement && count > 1) {
      this.utils.resFlowSession.resDoorObj.QTY = count - 1;
    } else {
      this.utils.resFlowSession.resDoorObj.QTY = count + 1;
    }
    this.quantity = this.utils.resFlowSession.resDoorObj.QTY;
    this.calculatePrice();
  }

}
