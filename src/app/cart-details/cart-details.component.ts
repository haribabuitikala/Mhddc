import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.less', '../install//install.component.less']
})
export class CartDetailsComponent implements OnInit {
  data: any;
  coachman: any;
  doorConfig: any;
  itemPrice: any;
  additional: any;

  constructor(public utils: AppUtilities) {

  }


  ngOnInit() {
    this.data = this.utils.resFlowSession.resDetails;
    this.utils.utilities.promoSaving = this.utils.resFlowSession.calculatePromoSavings(); 
    this.coachman = this.utils.resFlowSession.resDoorObj.product.product['item_id'] === 11 ? true : false;
    // show doorConfig
    this.doorConfig = window.location.hash.indexOf('doorConfiguration') !== -1 ? true : false;
    const size = this.utils.resFlow;
    this.data.widthF = size.wf;
    this.data.widthI = size.wi;
    this.data.heightF = size.hf;
    this.data.heightI = size.hi;
    // it is not recommended place to write this code here
    const hardware = this.utils.resFlowSession.resDoorObj.hardware;
    try {
      if (hardware.hinge && hardware.hinge['placement'].indexOf(':') >= 0) {
        this.data.hardware.hinge.qty = parseInt(hardware.hinge['placement'].split(':')[0]);
      }

      if (hardware.handle && hardware.handle['placement'].indexOf(':') >= 0) {
        this.data.hardware.handle.qty = parseInt(hardware.handle['placement'].split(':')[0]);
      }

      if (hardware.stepplate && hardware.stepplate['placement'].indexOf(':') >= 0) {
        this.data.hardware.stepPlate.qty = parseInt(hardware.stepplate['placement'].split(':')[0]);
      }
    } catch (e) {
      //swallow
    }
  }
  @Output() callPrice = new EventEmitter();

  calcdoors(data, val?, propName?, qtyName?) {
    if (val) {
      this.qty(data, val, propName, qtyName)
    } else {
      this.qty(data, null, propName, qtyName)
    }
    this.utils.resFlowSession.resCalculateCartItemPrice(data)
    this.callPrice.emit(this.utils.resFlowSession.resCalculateCartItemPrice(data));
     //Jyothi - Promo
    this.utils.utilities.promoSaving = this.utils.resFlowSession.calculatePromoSavings();  
  }

  qty(item, increment?, itm?, qtyName?) {

    // if (increment) {
    //   if (item.construction.qty !== 6)
    //     item.construction.qty = item.construction.qty + 1;
    // } else {
    //   if (item.construction.qty !== 1)
    //     item.construction.qty = item.construction.qty - 1;
    // }

    if (increment) {
      if (item[itm][qtyName] !== 6)
        item[itm][qtyName] = item[itm][qtyName] + 1;
    } else {
      if (item[itm][qtyName] !== 1)
        item[itm][qtyName] = item[itm][qtyName] - 1;
    }
  }

}
