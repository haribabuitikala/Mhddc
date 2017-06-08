import { Component } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.less', '../install//install.component.less']
})
export class CartDetailsComponent {
  constructor(private utils: AppUtilities) { }
  data = this.utils.resFlowSession.resDetails;
}
