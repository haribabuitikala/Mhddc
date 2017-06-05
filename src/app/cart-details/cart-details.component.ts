import { Component, OnInit } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.less', '../install//install.component.less']
})
export class CartDetailsComponent implements OnInit {

  constructor(private utils: AppUtilities) { }
  data = this.utils.resFlowSession.resDoorObj;;
  hardware = false;
  opener= false;
  openerAccessories= false;
  additional= false;
  ngOnInit() {
    if (this.data.hardware.apiData.length > 0) {
      this.hardware = true
    }
    if (this.data.opener.apiData.length > 0) {
      this.opener = true
    }
    if (this.data.opener.items.length > 0) {
      this.openerAccessories = true
    }
    if (this.data.additional.items.length > 0) {
      this.additional = true
    }

  }

}
