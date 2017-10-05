import {Component, OnInit, Input} from '@angular/core';
import {AppUtilities} from "../shared/appUtilities";
import {CollectionData} from "../collection/collection-data";
import {GdoConfigComponent} from "../gdo-config/gdo-config.component";
declare var _: any;

@Component({
    selector: 'gdo-update-qty',
    template: `
            <span class="pull-right" data-id="">
                <img class="minus-quantity" src="../../assets/images/substract.png" (click)="updateQuantity(data,0,data.item_id)" alt="">
                <span class="accessory-quantity text-orange">{{quantity}}</span>
                <img class="add-quantity" src="../../assets/images/add.png" (click)="updateQuantity(data,1,data.item_id)" alt="">
            </span>
    `,
    styleUrls: ['./opener.component.less']
})
export class GdoUpdateComponent implements OnInit {

    constructor(private utils: AppUtilities
        , private dataStrorage: CollectionData
        , private gdoConfig: GdoConfigComponent) {
    }

    @Input() data;
    @Input() index;
    quantity = 0;

    ngOnInit() {
        this.dataStrorage.gdoOpenerAccessories.length = 0;
    }


    updateQuantity(obj, flow, id) {

        if (flow === 1 && this.quantity < 6) {
            this.quantity++
        }
        else if (flow === 0 && this.quantity >= 1) {
            this.quantity--;
        }

        let k = id;
        let t = [];
        k = {
            name: obj.item_name,
            price: obj.item_price,
            count: this.quantity,
            config: obj.Config,
            totalPrice: obj.item_price * this.quantity,
            id: id
        };
        this.removeItm(this.dataStrorage.gdoOpenerAccessories, id);
        this.dataStrorage.gdoOpenerAccessories.push(k);

        let kPrice = _.sumBy(this.dataStrorage.gdoOpenerAccessories, function (o) {
            return o.price * o.count;
        });
        // set the selected itm count
        let openrItm = this.utils.gdoFlowSession.cart[0].opener.items;
        for (var i = 0; i < openrItm.length; i++) {
            if (obj.item_id === openrItm[i].item_id) {
                openrItm[i].QTY = k.count;
            }
        }
        this.utils.utilities.kPrice = kPrice;
        this.gdoConfig.itemPrice = this.utils.calculateTotalPrice();
    }
    removeItm(arr, id) {
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];

            if (obj.id === id) {
                arr.splice(i, 1);
                i--;
            }
        }
    }
}
