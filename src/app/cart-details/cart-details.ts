import {Injectable} from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";

@Injectable()
export class CartDetails {

    constructor(private utils: AppUtilites){

    }
    

    // installSize = this.utils.utilities.wf + "'0 \"(W) X " + this.utils.utilities.hf + "'0 \"(h)";;
    
    // wincode = this.utils.utilities.winCode;
    // itemName = this.utils.resFlowSession.resDoorObj.product.product['item_name'];
    // doorDesign = this.utils.resFlowSession.resDoorObj.design.dsgn['item_name']
    // doorModel = this.utils.resFlowSession.resDoorObj.construction.construction['ClopayModelNumber'];
    // doorModelPrice = this.utils.resFlowSession.resDoorObj.construction.construction['item_price'];
    // construction = this.utils.resFlowSession.resDoorObj.construction.construction['item_name'];
    // color = this.utils.resFlowSession.resDoorObj.color.base;
    // colorPrice = this.utils.resFlowSession.resDoorObj.color.base['item_price'];
    // topSection = this.utils.resFlowSession.resDoorObj.windows.topsection['item_name'];

    // data = this.utils.resFlowSession.resDoorObj;

    // if (this.data.opener.apiData.length > 1) {
    //     doorConfiguration = true;
    // }

        // if (this.utils.resFlowSession.resDoorObj.hardware.handle != "") {
        //   this.hardware.push('Handles: ' + this.utils.resFlowSession.resDoorObj.hardware.handle['item_name']);

        // }
        // if (this.utils.resFlowSession.resDoorObj.hardware.stepplate != "") {
        //   this.hardware.push('Step Plate: ' + this.utils.resFlowSession.resDoorObj.hardware.stepplate['item_name']);
        // }
        // if (this.utils.resFlowSession.resDoorObj.hardware.hinge != "") {
        //   this.hardware.push('Hinges: ' + this.utils.resFlowSession.resDoorObj.hardware.hinge['item_name']);
        // }

}