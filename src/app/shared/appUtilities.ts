import { Injectable } from '@angular/core';
declare var _: any;
declare var $: any;

@Injectable()
export class AppUtilities {

    setLoader() {
        $('body').addClass('loader');
    }

    removeLoader(){
        $('body').removeClass('loader');
    }

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
        doubleDoorHeight: 7,
        doubleDoorWidth: 16,
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
        homeSize: "",
        lockPrice: 0,
        hardwarePrice: 0,
        itemPriceInstall: 0,
        itemPriceDY: 0,
        handlePrice: 0,
        stepPlatePrice: 0,
        hingePrice: 0
        // flow of GDO: Home, Size , Openers, Order Details, Shopping Cart
    };

    quickStockInfo = {
        productids: null,
        stockgroupid: null,
        storenumber: null
    };

    resFlow = {
        selectedHome: '',
        selectedImg: null,
        colorconfig: '',
        isUpsellSet: false
    };

    setUtils(curr, clicked) {
        this.utilities.currPage = curr;
        this.utilities.clicked = clicked;
    }

    //3703,2217,2207,6559
    //gdoCheck = ['66502', '2217', '77840', '6559', '66604', '2207', '3703'];
    gdoCheck = ['2217', '6559', '2207', '3703'];

    calculateTotalPrice(basep) {

        // let basep = this.utilities.item_price;
        let qty = this.resFlowSession.resDoorObj.QTY;
        let singlep = this.utilities.singlep;
        let doublep = this.utilities.doublep;
        let milesp = this.utilities.milesp;
        let kPrice = this.utilities.kPrice;
        let distancePrice = this.utilities.distancePrice;
        let lockPrice = this.utilities.lockPrice;
        let hardwarePrice = this.utilities.hardwarePrice;

        return (basep * qty) + singlep + doublep + milesp + kPrice + distancePrice + lockPrice + hardwarePrice;
    }

    resetCalc() {
        this.utilities.singlep = 0;
        this.utilities.doublep = 0;
        this.utilities.milesp = 0;
        this.utilities.kPrice = 0;
        this.utilities.distancePrice = 0;
        this.utilities.lockPrice = 0;
        this.utilities.hardwarePrice = 0;
    }



    updateQty(flow, qty) {
        if (flow === 1 && qty < 6) {
            qty++
        }
        else if (flow === 0 && qty > 1) {
            qty--;
        }
        this.utilities.gdoOpenerQty = qty;

        return this.calculateTotalPrice(this.utilities.itemPriceInstall)
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


    resFlowSession: ResidentialFlowSession = new ResidentialFlowSession();


    resDiyData: ResidentialFlowSession = new ResidentialFlowSession();

    resQuickSession = {
        designs: []
    };

    clearResFlow() {

    }


}

export class ResidentialFlowSession {
    doorSize = {
        door: null,
        doorDimensions: {}
    };
    collections: any = null;

    collection = {
        selectedCollection: null
    };

    home = {

    };

    resDetails = {
        zip: 0,
        storeNumber: 0,
        gdoStore: 0,
        storeName: '',
        windcode: '',
        county: '',
        widthF: 0,
        widthI: 0,
        heightF: 0,
        heightI: 0,
        collectionName: '',
        designName: '',
        constructionName: ''

    }

    resDoorObj = {
        "QTY": 1,
        "TYPE": 'RES',
        "INSTALLTYPE": 'GDO',
        "VISIMG": null,
        "LEADTEST": false,
        "JAMBTYPE": 'Wood',
        "size": {
            "width": {
                "wf": " - ",
                "wi": "0"
            },
            "height": {
                "hf": " - ",
                "hi": "0"
            },
            "apiData": {}
        },
        "product": {
            "product": "",
            "sourcing": "clopay",
            "apiData": ""
        },
        "design": {
            "columns": "",
            "rows": "",
            "dsgn": "",
            "apiData": ""
        },
        "construction": {
            "construction": "",
            "cladding": "",
            "groove": "",
            "vinyl": "",
            "apiData": ""
        },
        "isPurchase":true,
        "color": {
            "base": {},
            "overlay": {},
            "apiData": {}
        },
        "windows": {
            "topsection": "",
            "placement": null,
            "glasstype": "",
            "apiData": ""
        },
        "hardware": {
            "handle": "",
            "stepplate": "",
            "hinge": "",
            "lock": "",
            "lockoptions": "",
            "other": [],
            "strut": "",
            "apiData": "",
            "items": []
        },
        "springs": {
            "springtype": "",
            "tracksize": "",
            "trackmount": "",
            "trackradius": "",
            "lifttype": "",
            "roofpitch": "",
            "apiData": ""
        },
        "opener": {
            "QTY": 1,
            "opener": "",
            "items": [],
            "apiData": ""
        },
        "additional": {
            "items": []
        },
        "stopMold": {
            "items": []
        },
        "resetorder": ['size', 'product', 'design', 'construction', 'color', 'windows', 'hardware', 'opener', 'additional'],
        "resetsize": () => {
            this.resDoorObj['size'] = {
                "width": {
                    "wf": " - ",
                    "wi": "0"
                },
                "height": {
                    "hf": " - ",
                    "hi": "0"
                },
                "apiData": {}
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][1]]();
        },
        "resetproduct": () => {
            this.resDoorObj['product'] = {
                "product": "",
                "sourcing": "clopay",
                "apiData": ""
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][2]]();
        },
        "resetdesign": () => {
            this.resDoorObj['design'] = {
                "columns": "",
                "rows": "",
                "dsgn": "",
                "apiData": ""
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][3]]();
        },
        "resetconstruction": () => {
            this.resDoorObj['construction'] = {
                "construction": "",
                "cladding": "",
                "groove": "",
                "vinyl": "",
                "apiData": ""
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][4]]();
        },
        "resetcolor": () => {
            this.resDoorObj['color'] = {
                "base": {},
                "overlay": {},
                "apiData": {}
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][5]]();
        },
        "resetwindows": () => {
            this.resDoorObj['this.windows'] = {
                "topsection": "",
                "placement": null,
                "glasstype": "",
                "apiData": ""
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][6]]();
        },
        "resethardware": () => {
            this.resDoorObj['hardware'] = {
                "handle": "",
                "stepplate": "",
                "hinge": "",
                "lock": "",
                "lockoptions": "",
                "other": [],
                "strut": "",
                "apiData": "",
                "items": []
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][7]]();
        },
        "resetsprings": () => {
            this.resDoorObj['springs'] = {
                "springtype": "",
                "tracksize": "",
                "trackmount": "",
                "trackradius": "",
                "lifttype": "",
                "roofpitch": "",
                "apiData": ""
            }
        },
        "resetopener": () => {
            this.resDoorObj['opener'] = {
                "QTY": 1,
                "opener": "",
                "items": [],
                "apiData": ""
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][8]]();
        },
        "resetadditional": () => {
            this.resDoorObj['additional'] = {
                "items": []
            };
        },
        "resetFromStep": (step) => {
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][step]]();
        }
    }

    orderObj =
    {
        "zipcode": "",
        "storeNumber": "",
        "associateId": "",
        "locale": "",
        "homedata": "",
        "store": "",
        "windcode": "W0",
        "diyInstall": "",
        "hasMiles": false,
        "cart": [],
        "items": 0,
        "orderInstallType": "",
        "promotion": [{ "bullet0": "", "bullet1": "", "moreinfo": "", "promotionid": 0 }, false],
        "promotionData": [{ "bullet0": "", "bullet1": "", "moreinfo": "", "promotionid": 0 }, false],
        "jambtype": "Wood", "extendedShaft": false
    }


    constructor() {

    }
}