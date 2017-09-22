import { Component, Input, OnInit } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";

@Component({
  selector: 'app-cart-root-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.less', '../install//install.component.less']
})
export class CartDetailsRootComponent implements OnInit {
  constructor(private utils: AppUtilities) { }  
  @Input() Item;
  data;
  itemPrice = this.utils.resFlowSession.cart[0].totalPrice;
  hingePlacement;
  ngOnInit() {
    this.data = this.Item || this.utils.resFlowSession.resDoorObj;
    let placement = this.utils.resFlowSession.resDoorObj.hardware.hinge['placement'];
    if (placement) {
      this.hingePlacement = placement.split(':')[0];
    }
  }
}
