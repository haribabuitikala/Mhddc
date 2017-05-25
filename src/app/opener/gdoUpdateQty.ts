import {Component, OnInit, Input} from '@angular/core';
import {AppUtilities} from "../shared/appUtilities";
import {CollectionData} from "../collection/collection-data";
import {GdoConfigComponent} from "../gdo-config/gdo-config.component";
declare var _:any;

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

    constructor(private utils:AppUtilities
        , private dataStrorage:CollectionData
        , private gdoConfig:GdoConfigComponent) {
    }

    @Input() data;
    @Input() index;
    quantity = 0;

    ngOnInit() {
        this.dataStrorage.gdoOpenerAccessories = [];
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
            totalPrice: obj.item_price * this.quantity
        };
        //this.dataStrorage.gdoOpenerAccessories.splice(id, 1);
        this.dataStrorage.gdoOpenerAccessories.push(k);

        let kPrice = _.sumBy(this.dataStrorage.gdoOpenerAccessories, function (o) {
            return o.price;
        });

        this.utils.utilities.kPrice = kPrice;

        this.gdoConfig.itemPrice = this.utils.calculateTotalPrice();
    }
}