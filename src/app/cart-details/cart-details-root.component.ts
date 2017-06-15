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
  ngOnInit() {
    this.data = this.Item || this.utils.resFlowSession.resDoorObj;
  }
}
