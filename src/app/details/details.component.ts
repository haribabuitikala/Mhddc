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
      this.utils.resFlowSession.resCalculatePrice();
      this.itemPriceInstall = this.utils.utilities.itemPriceInstall;
      this.itemPriceDY = this.utils.utilities.itemPriceDY;
    } catch (g) {

    }
  }

  constructor(private appComponent: AppComponent, private utils: AppUtilities) {
    // appComponent.subscribeToPrice(() => {
    //   this.calculatePrice();
    // });
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
    this.details.widthF = this.utils.utilities.wf;
    this.details.widthI = this.utils.utilities.wi;
    this.details.heightF = this.utils.utilities.hf;
    this.details.heightI = this.utils.utilities.hi;
    // this.details.constructionName = this.resDoorObj.construction.construction[0].item_name;
    // this.whdata = this.utils.resFlowSession.resDoorObj.size.width;

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
