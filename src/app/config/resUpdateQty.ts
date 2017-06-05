import {Component, OnInit, Input} from '@angular/core';
import {AppUtilities} from "../shared/appUtilities";
import {CollectionData} from "../collection/collection-data";
import {ConfigComponent} from "./config.component";
declare var _: any;

@Component({
    selector: 'res-update-qty',
    template: `
            <span class="pull-right" data-id="">
                <img class="minus-quantity" src="../../assets/images/substract.png" (click)="updateQuantity(data,0,data.item_id)" alt="">
                <span class="accessory-quantity text-orange">{{quantity}}</span>
                <img class="add-quantity" src="../../assets/images/add.png" (click)="updateQuantity(data,1,data.item_id)" alt="">
            </span>
    `,
    styleUrls: ['../opener/opener.component.less']
})
export class ResUpdateComponent implements OnInit {

    constructor(private utils: AppUtilities
        , private dataStrorage: CollectionData
        , private config: ConfigComponent) {
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
            totalPrice: obj.item_price * this.quantity,
            id: id
        };
        let items = this.utils.resFlowSession.resDoorObj.opener.items;

        var filterItems = items.filter(g => { return g.id == id })
        if (filterItems && filterItems.length > 0) {
            filterItems[0].count = this.quantity;
        } else {
            items.push(k);
        }
        let kPrice = _.sumBy(this.dataStrorage.gdoOpenerAccessories, function (o) {
            return o.price;
        });

        this.utils.utilities.kPrice = kPrice;

        // this.config.itemPrice = this.utils.calculateTotalPrice(this.utils.utilities.itemPriceInstall);
    }
}
