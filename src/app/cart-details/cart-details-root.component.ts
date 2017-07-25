import { Component, Input, OnInit } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";

@Component({
  selector: 'app-cart-root-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.less', '../install//install.component.less']
})
export class CartDetailsRootComponent implements OnInit {
  @Input() Item;
  data: any;
  coachman: any;
  additional: any;
  doorConfig: any;
  itemPrice = this.utils.resFlowSession.cart[0].totalPrice;

  constructor(public utils: AppUtilities) {

  }

  ngOnInit() {
    this.data = this.Item || this.utils.resFlowSession.resDoorObj;
  }
}
