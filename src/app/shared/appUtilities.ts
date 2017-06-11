import { Injectable } from '@angular/core';
declare var _: any;
declare var $: any;

@Injectable()
export class AppUtilities {

    setLoader() {
        $('body').addClass('loader');
    }

    removeLoader() {
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

    gdoFlowSession = {

        windcode: this.utilities.winCode,
        zipcode: "",
        cart: [{
            "INSTALLTYPE": "GDO",
            "QTY": 1,
            "TYPE": "GDO",
            "idex": 0,
            "isPurchase": true,
            "opener": {
                apiData: [],
                items: [],
                opener: {}
            },
            "size": {
                "height": {
                    "hf": "7",
                    "hi": "0"
                },
                "apiData": {}
            },
            "additional": {
                "items": []
            }
        }],
        locale: "",
        orderInstallType: "GDO",
        items: 1,
        store: ""
    }

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
        let lockPrice = this.utilities.lockPrice;
        let hardwarePrice = this.utilities.hardwarePrice;
        let upsellPrice = this.resFlowSession.resDetails.upsellPrice;

        return (basep * qty)
            + singlep
            + doublep
            + milesp
            + kPrice
            + distancePrice
            + lockPrice
            + hardwarePrice
            + upsellPrice
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


    resFlowSession: ResidentialFlowSession = new ResidentialFlowSession(this);

    resDiyData: ResidentialFlowSession = new ResidentialFlowSession(this);

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

    home = {};

    cart = [];

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
        isDIY: false,
        isEPA: false,
        INSTALLTYPE: 'Installed',
        totalPrice: 0,
        construction: {
            name: '',
            price: 0,
            qty: 0,
            laborcost: 0,
            modelNumber: ''
        },
        color: {
            overlay: {
                name: '',
                price: 0
            },
            base: {
                name: '',
                price: 0
            }
        },
        topSection: {
            name: '',
            glassType: {
                name: '',
                price: 0
            }
        },
        hardware: {
            handle: {
                name: '',
                price: 0,
                qty: 0
            },
            stepPlate: {
                name: '',
                price: 0,
                qty: 0
            },
            hinge: {
                name: '',
                price: 0,
                qty: 0
            },
            lock: {
                name: '',
                price: 0,
                qty: 0
            }
        },
        opener: {
            name: '',
            price: 0,
            items: []
        },
        additionalOptions: {
            items: []
        },
        upsellPrice: 0
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
            "construction": {},
            "cladding": "",
            "groove": "",
            "vinyl": "",
            "apiData": ""
        },
        "isPurchase": true,
        "isDIY": false,
        "isEPA": false,
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
            this.resDoorObj.QTY = 1;
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][1]]();
        },
        "resetproduct": () => {
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][2]]();
        },
        "resetdesign": () => {
            // this.resDoorObj['design'] = {
            //     "columns": "",
            //     "rows": "",
            //     "dsgn": "",
            //     "apiData": ""
            // };
            this.resDoorObj.design.dsgn = '';
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
            this.resDetails.construction = {
                name: '',
                price: 0,
                qty: 0,
                laborcost: 0,
                modelNumber: ''
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][4]]();
        },
        "resetcolor": () => {
            this.resDoorObj['color'] = {
                "base": {},
                "overlay": {},
                "apiData": {}
            };
            this.resDetails.color = {
                overlay: {
                    name: '',
                    price: 0
                },
                base: {
                    name: '',
                    price: 0
                }
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
            this.resDetails.topSection = {
                name: '',
                glassType: {
                    name: '',
                    price: 0
                }
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
            this.resDoorObj['isEPA'] = false;
            this.resDetails.hardware = {
                handle: {
                    name: '',
                    price: 0,
                    qty: 0
                },
                stepPlate: {
                    name: '',
                    price: 0,
                    qty: 0
                },
                hinge: {
                    name: '',
                    price: 0,
                    qty: 0
                },
                lock: {
                    name: '',
                    price: 0,
                    qty: 0
                }
            };
            this.resDetails.isEPA = false;
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
                "QTY": 0,
                "opener": "",
                "items": [],
                "apiData": ""
            };
            this.resDetails.opener = {
                name: '',
                price: 0,
                items: []
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][8]]();
        },
        "resetadditional": () => {
            this.resDoorObj['additional'] = {
                "items": []
            };
            this.resDetails.additionalOptions = {
                items: []
            };
        },
        "resetFromStep": (step) => {
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][step]]();
        }
    }

    orderObj = {
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
    noDIYs = [30, 16, 9];

    resCalculatePrice(obj?) {
        obj = obj || this.resDoorObj;
        let itemId = obj.product.product['item_id'] || 0;
        let count = obj.QTY;
        let cObj = obj;
        let itemPriceDY = 0.00;
        let itemPriceInstall = 0.00;
        let price = [0, 0]; //[installed, diy]
        this.resDetails.additionalOptions.items = [];
        this.resDetails.opener.items = [];

        try {
            if (itemId != null) {
                //let price = window['getDoorPrice'](cObj);

                // Calculate price for Door Design and Construction
                if (obj.construction.construction === "") {
                    let dc = _.filter(obj.design.dsgn['constructions'], function (o) {
                        return o.isdefault == true;
                    });
                    if (!dc) {
                        dc = obj.design.dsgn['constructions'][0];
                    }
                    price[0] = price[0] + (dc['item_price'] + dc['laborcodeprice']) * count;
                    price[1] = price[1] + dc['item_price'] * count;

                    this.resDetails.construction.name = dc['item_name'];
                    this.resDetails.construction.price = dc['item_price'];
                    this.resDetails.construction.qty = count;
                    this.resDetails.construction.laborcost = dc['laborcodeprice'];
                    this.resDetails.construction.modelNumber = dc['ClopayModelNumber'];
                } else {
                    let dc = obj.construction['construction'];
                    price[0] = price[0] + (dc['item_price'] + dc['laborcodeprice']) * count;
                    price[1] = price[1] + dc['item_price'] * count;

                    this.resDetails.construction.name = dc['item_name'];
                    this.resDetails.construction.price = dc['item_price'];
                    this.resDetails.construction.qty = count;
                    this.resDetails.construction.laborcost = dc['laborcodeprice'];
                    this.resDetails.construction.modelNumber = dc['ClopayModelNumber'];
                }

                // Calculate price for Overlay Color
                let oc = obj.color.overlay;
                if (oc && oc.hasOwnProperty('item_price') && obj.product.product['item_id'] !== 16) {
                    price[0] = price[0] + oc['item_price'];
                    price[1] = price[1] + oc['item_price'];

                    this.resDetails.color.overlay.name = oc['item_name'];
                    this.resDetails.color.overlay.price = oc['item_price'];
                }

                // Calculate price for Base Color
                let bc = obj.color.base;
                if (bc && bc.hasOwnProperty('item_price')) {
                    price[0] = price[0] + bc['item_price'];
                    price[1] = price[1] + bc['item_price'];

                    this.resDetails.color.base.name = bc['item_name'];
                    this.resDetails.color.base.price = bc['item_price'];
                }

                // Calculate price for Top Section and Glasstype
                let tsgt = obj.windows.glasstype;
                if (tsgt && tsgt.hasOwnProperty('item_price')) {
                    price[0] = price[0] + tsgt['item_price'];
                    price[1] = price[1] + tsgt['item_price'];

                    this.resDetails.topSection.name = obj.windows.topsection['item_name'];
                    this.resDetails.topSection.glassType.name = tsgt['item_name'];
                    this.resDetails.topSection.glassType.price = tsgt['item_price'];
                }

                // Calculate price for Hardware
                // a.Calculate price for Handles
                let hh = obj.hardware.handle;
                if (hh && hh.hasOwnProperty('item_installed_price')) {
                    price[0] = price[0] + hh['item_installed_price'] * hh['count'];
                    price[1] = price[1] + hh['item_installed_price'] * hh['count'];

                    this.utils.resFlowSession.resDetails.hardware.handle.name = hh['item_name'];
                    this.utils.resFlowSession.resDetails.hardware.handle.price = hh['item_installed_price'];
                    this.utils.resFlowSession.resDetails.hardware.handle.qty = hh['count'];
                }
                // b.Calculate price for Stepplate
                let hs = obj.hardware.stepplate;
                if (hs && hs.hasOwnProperty('item_installed_price')) {
                    price[0] = price[0] + hs['item_installed_price'] * hs['count'];
                    price[1] = price[1] + hs['item_installed_price'] * hs['count'];

                    this.utils.resFlowSession.resDetails.hardware.stepPlate.name = hs['item_name'];
                    this.utils.resFlowSession.resDetails.hardware.stepPlate.price = hs['item_installed_price'];
                    this.utils.resFlowSession.resDetails.hardware.stepPlate.qty = hs['count'];
                }
                // c.Calculate price for Hinges
                let hhi = obj.hardware.hinge;
                if (hhi && hhi.hasOwnProperty('item_installed_price')) {
                    price[0] = price[0] + hhi['item_installed_price'] * hhi['count'];
                    price[1] = price[1] + hhi['item_installed_price'] * hhi['count'];

                    this.utils.resFlowSession.resDetails.hardware.hinge.name = hhi['item_name'];
                    this.utils.resFlowSession.resDetails.hardware.hinge.price = hhi['item_installed_price'];
                    this.utils.resFlowSession.resDetails.hardware.hinge.qty = hhi['count'];
                }

                let locksItem = obj.hardware.lock;
                if (locksItem && locksItem.hasOwnProperty('item_installed_price')) {
                    price[0] = price[0] + locksItem['item_installed_price'] * 1;
                    price[1] = price[1] + locksItem['item_installed_price'] * 1;

                    this.resDetails.hardware.lock.name = locksItem['item_name'];
                    this.resDetails.hardware.lock.price = locksItem['item_installed_price'];
                }

                // Calculate price if EPA
                if (this.resDoorObj.isEPA) {
                    price[0] = price[0] + 20;
                }

                // Calculate price for Openers
                let op = obj.opener.opener;
                if (op && op.hasOwnProperty('item_price')) {
                    price[0] = price[0] + op['item_price'] + op['laborprice'];
                    price[1] = price[1] + op['item_price'];

                    this.resDetails.opener.name = op['item_name'];
                    this.resDetails.opener.price = op['item_price'];
                }

                // Calculate price for Optional Openers
                if (obj.opener.items.length > 0) {
                    _.forEach(obj.opener.items, (item) => {
                        if (item.hasOwnProperty('item_price') && item['count'] > 0) {
                            price[0] = price[0] + item['item_price'] * item['count'];
                            price[1] = price[1] + item['item_price'] * item['count'];
                            this.resDetails.opener.items.push({
                                name: item['item_name'],
                                price: item['item_price'],
                                qty: item['count']
                            });
                        }
                    })
                }

                // Calculate price for Additional Options    
                if (obj.additional.items.length > 0) {
                    _.forEach(obj.additional.items, (item) => {
                        if (item.hasOwnProperty('price')) {
                            price[0] = price[0] + item['price'];
                            price[1] = price[1] + item['price'];
                            this.resDetails.additionalOptions.items.push({
                                name: item['name'],
                                price: item['price']
                            });
                        }
                    })
                }


                if (obj.product.product['item_id'] == 9) {
                    if (obj.construction.groove['item_price']) {
                        price[0] = price[0] + obj.construction.groove['item_price']
                        price[1] = price[1] + obj.construction.groove['item_price']
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            itemPriceInstall = price[0];
            if (this.noDIYs.indexOf(itemId) < 0) {
                itemPriceDY = price[1];
            }
            this.utils.utilities.itemPriceInstall = itemPriceInstall;
            this.utils.utilities.itemPriceDY = itemPriceDY;
            return obj;
        }
    }

    addToCart() {
        let k = _.cloneDeep(this.resDetails);
        this.cart.push(k);
    }

    constructor(private utils: AppUtilities) {

    }
}