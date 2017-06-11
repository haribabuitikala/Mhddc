import { Component, OnInit } from '@angular/core';
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

  ngOnInit(){
    this.data = this.utils.resFlowSession.resDetails;
  }
}
