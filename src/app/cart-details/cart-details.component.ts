import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.less', '../install//install.component.less']
})
export class CartDetailsComponent implements OnInit {
  constructor(private utils: AppUtilities) {

  }
  data;
  coachman;
  doorConfig;
  hingePlacement;
  selectedAdditionalOptions;
  ngOnInit() {
    this.data = this.utils.resFlowSession.resDetails;
    // if (this.data.isEPA) {
    //   this.data.additionalOptions.items[0].isSelected = true;
    //   // $.each(this.data.additionalOptions.items, function (index, value) {
    //   //   //  alert( key + ": " + value );
    //   //   if (value.id === 999) {
    //   //     value.isSelected = true;          
    //   //   }
    //   // });     

    // }
    // else
    // {
    //    this.data.additionalOptions.items[0].isSelected = false;
    // }

    this.selectedAdditionalOptions = this.data.additionalOptions.items.filter(function (s) { return s.isSelected === true && s.id !== 999; });
     for(var i=0; i<this.selectedAdditionalOptions.length; i++){

        if(this.selectedAdditionalOptions[i].id == 12 &&  this.selectedAdditionalOptions[i].name=="Bottom Weather Seal")
        {
        this.selectedAdditionalOptions[i].name="Bottom Weather Seal (Per Door)"
        }

      if(this.selectedAdditionalOptions[i].id == 12){
        if(Number(this.utils.utilities.wi) > 0)
          this.selectedAdditionalOptions[i].price = this.selectedAdditionalOptions[i].price * (Number(this.utils.utilities.wf) + 1)
        else
          this.selectedAdditionalOptions[i].price = this.selectedAdditionalOptions[i].price * (Number(this.utils.utilities.wf))
      }
    } 
    this.utils.utilities.promoSaving = this.utils.resFlowSession.calculatePromoSavings();
    this.coachman = this.utils.resFlowSession.resDoorObj.product.product['item_id'] === 11 ? true : false;
    // show doorConfig
    this.doorConfig = window.location.hash.indexOf('doorConfiguration') !== -1 ? true : false;
    let size = this.utils.resFlow;
    this.data.widthF = size.wf;
    this.data.widthI = size.wi;
    this.data.heightF = size.hf;
    this.data.heightI = size.hi;
    //it is not recommended place to write this code here
    let hardware = this.utils.resFlowSession.resDoorObj.hardware;
    try {
      if (hardware.hinge && hardware.hinge['placement'].indexOf(':') >= 0) {
        this.data.hardware.hinge.qty = parseInt(hardware.hinge['placement'].split(':')[0]);
        this.hingePlacement = hardware.hinge['placement'].split(':')[0];
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
    if (val && propName === 'opener' && data.opener.qty >= this.utils.resFlowSession.resDoorObj.QTY) {
      console.log('dont do');
    } else if (!val && propName === 'opener' && data.opener.qty == 1) {
      console.log('dont do');
    } else {
      if (val) {
        this.qty(data, val, propName, qtyName)
      } else {
        this.qty(data, null, propName, qtyName)
      }
      if (propName === 'construction' && data['construction'][qtyName] < data['opener'][qtyName]) {
        data['opener'][qtyName] = data['construction'][qtyName];
      }
      this.utils.resFlowSession.resCalculateCartItemPrice(data)
      this.callPrice.emit(this.utils.resFlowSession.resCalculateCartItemPrice(data));
      //Jyothi - Promo
      this.utils.utilities.promoSaving = this.utils.resFlowSession.calculatePromoSavings();
    }
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
