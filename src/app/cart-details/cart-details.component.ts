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

  ngOnInit() {
    this.data = this.utils.resFlowSession.resDetails;

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
}
