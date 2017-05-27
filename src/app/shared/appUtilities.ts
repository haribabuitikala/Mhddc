import {Injectable} from '@angular/core';
declare var _:any;

@Injectable()
export class AppUtilities {

    utilities = {
        currPage: 1,
        clicked: 1,
        currScreen: 1,
        navCount: 13,
        isService: false,
        isGDO: false,
        wf: 0, // width feet
        wi: 0, // width inches
        hf: 0, // height feet
        hi: 0, // height inches
        winCode: "W0",
        doubleDoorHeight: "",
        doubleDoorWidth: "",
        singleDoorHeight: 0,
        singleDoorWidth: 0,
        doubleDoor: false,
        singleDoor: false,
        natmarketid: null,
        localmarketid: null,
        productlayout: true,
        lang: 'en',
        dtype: null,
        flow: 'residentialNavElems',
        residentialNavElems: [
            "/banner",
            "/zipResults",
            "/category",
            "/doorSize",
            "/collection",
            "/home",
            "/config",
            "/config/construction",
            "/config/color",
            "/config/topSection",
            "/config/glassType",
            "/config/lock",
            "/config/install",
            "/installQuestion",
            "/installAnswer",
            "/config/diy",
            "/config/opener",
            "/config/openerSelected",
            "/config/additionalOptions",
            "/config/doorConfiguration",
            "/shoppingCart",
            "/thankyou"
        ],
        gdoNavElems: [
            "/banner",
            "/doorSize",
            "/config/opener",
            "/config/doorConfiguration",
            "/shoppingCart"
        ],
        showNav: false,
        productid: null,
        dealerid: null,
        doorsize: null,
        stockgroupid: null,
        laborcode: null,
        ProductType: '',
        item_price: null,
        openerid: null,
        openerType: null,
        distance: null,
        gdoBanner: null,
        gdoOpenerSelectedItm: null,
        zipCode: null,
        storenumber: null,
        gdoOpenerText: null,
        gdoOpenerQty: null,
        itmPrice: null,
        distancePrice: 0,
        itemsCount: 0,
        visualizeHeader: true,
        directFlow: null,
        gdoSingleDoor: 0,
        gdoDoubleDoor: 0,
        gdoStore: '',
        totalPrice: 0,
        kPrice: 0,
        singlep: 0,
        doublep: 0,
        milesp: 0,
        item_name: '',
        homeSize: ""
        // flow of GDO: Home, Size , Openers, Order Details, Shopping Cart
    };
    
    resFlow = {
        selectedHome : '',
        selectedImg : null,
        colorconfig: '',
        quickShip:0
    };

    setUtils(curr, clicked) {
        this.utilities.currPage = curr;
        this.utilities.clicked = clicked;
    }

//3703,2217,2207,6559
//gdoCheck = ['66502', '2217', '77840', '6559', '66604', '2207', '3703'];
    gdoCheck = ['2217', '6559', '2207', '3703'];

    calculateTotalPrice() {

        let basep = this.utilities.item_price;
        let qty = this.utilities.gdoOpenerQty;
        let singlep = this.utilities.singlep;
        let doublep = this.utilities.doublep;
        let milesp = this.utilities.milesp;
        let kPrice = this.utilities.kPrice;
        let distancePrice = this.utilities.distancePrice;

        return (basep * qty) + singlep + doublep + milesp + kPrice + distancePrice;
    }

    updateQty(flow, qty) {
        if (flow === 1 && qty < 6) {
            qty++
        }
        else if (flow === 0 && qty > 1) {
            qty--;
        }
        this.utilities.gdoOpenerQty = qty;

        return this.calculateTotalPrice()
    }

    sumBy(obj) {
        let t = _.sumBy(obj, function (o) {
            return o.price * o.count;
        });
        return t;
    }

    checkDoor() {
        let utils = this.utilities;
        if (utils.singleDoor) {
            utils.wf = +utils.singleDoorWidth;
            utils.hf = +utils.singleDoorHeight;
        }
    }

}