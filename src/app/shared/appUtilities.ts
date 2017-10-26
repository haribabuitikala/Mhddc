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
    appUrl = 'http://test-mhddc.clopay.com';
    promoCalcluatedObject =
    {
        modelprice: 0,
        colorprice: 0,
        windowsprice: 0,
        hardwareprice: 0,
        stepplates_ins: 0,
        stepplates_diy: 0,
        handles_ins: 0,
        handles_diy: 0,
        hinge_ins: 0,
        hinge_diy: 0,
        lockprice: 0

    };

    //Promo response params
    PromoPrice = {
        promotype: null,
        promoid: 0,
        productid: 0,
        isinstalled: true,
        lang: null,
        modelnumber: null,
        itemid: 0,
        //glass type Item_id
        item_id: 0,
        itemtype: null,
        promoitemtype: null,
        m_promoitemtype: null,
        itemprice: 0.00,
        issingledoor: true,
        isfirstwindow: true,
        firstwitemprice: 0.00
    };

    utilities = {
        isCustomSize: false,
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
        storegdo: '', //WO # 1147296
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
        hingePrice: 0,
        showGDoEmail: false,
        isPromoEnabled: false,
        promoSaving: 0
        // flow of GDO: Home, Size , Openers, Order Details, Shopping Cart
    };

    cartItems = [];
    quickStockInfo = {
        productids: null,
        stockgroupid: null,
        storenumber: null
    };

    resFlow = {
        selectedHome: '',
        selectedImg: null,
        colorconfig: '',
        isUpsellSet: false,
        wf: 0,
        wi: 0,
        hf: 0,
        hi: 0,
        imgSrc: ''
    };

    gdoFlowSession = {
        windcode: this.utilities.winCode,
        zipcode: "",
        cart: [],
        locale: "",
        orderInstallType: "GDO",
        items: 1,
        store: "",
        added: false
    };

    //For direct install
    gdoOpenerAccessories = [
        {
            "Answers": [
                {
                    "SubAnswers": [
                        {
                            "answerid": null,
                            "config": "0",
                            "isdefault": false,
                            "item_id": 1,
                            "item_name": "1",
                            "item_price": 0.00,
                            "partofdoor": false
                        },
                        {
                            "answerid": null,
                            "config": "0",
                            "isdefault": false,
                            "item_id": 2,
                            "item_name": "2",
                            "item_price": 0.00,
                            "partofdoor": false
                        },
                        {
                            "answerid": null,
                            "config": "0",
                            "isdefault": false,
                            "item_id": 3,
                            "item_name": "3",
                            "item_price": 0.00,
                            "partofdoor": false
                        }
                    ],
                    "answerid": null,
                    "config": "GDOI17",
                    "isdefault": false,
                    "item_id": 1,
                    "item_name": "no",
                    "item_price": 50,
                    "partofdoor": false
                },
                {
                    "SubAnswers": [],
                    "answerid": null,
                    "config": "0",
                    "isdefault": false,
                    "item_id": 2,
                    "item_name": "yes",
                    "item_price": 0,
                    "partofdoor": false
                }
            ],
            "item_id": 17,
            "item_list_text": "Single Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
            "item_name": "Single Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
            "item_type": "GDO",
            "QTY": 0,
            "qty": 0,
            "useranswer": ""
        },
        {
            "Answers": [
                {
                    "SubAnswers": [
                        {
                            "answerid": null,
                            "config": "0",
                            "isdefault": false,
                            "item_id": 1,
                            "item_name": "1",
                            "item_price": 0.00,
                            "partofdoor": false
                        },
                        {
                            "answerid": null,
                            "config": "0",
                            "isdefault": false,
                            "item_id": 2,
                            "item_name": "2",
                            "item_price": 0.00,
                            "partofdoor": false
                        },
                        {
                            "answerid": null,
                            "config": "0",
                            "isdefault": false,
                            "item_id": 3,
                            "item_name": "3",
                            "item_price": 0.00,
                            "partofdoor": false
                        }
                    ],
                    "answerid": null,
                    "config": "GDOI18",
                    "isdefault": false,
                    "item_id": 1,
                    "item_name": "no",
                    "item_price": 65,
                    "partofdoor": false
                },
                {
                    "SubAnswers": [],
                    "answerid": null,
                    "config": "0",
                    "isdefault": false,
                    "item_id": 2,
                    "item_name": "yes",
                    "item_price": 0,
                    "partofdoor": false
                }
            ],
            "item_id": 18,
            "item_list_text": "Double Door New Opener Installation Kit. This is required when no Opener is currently installed on door over 10' wide.",
            "item_name": "Double Door New Opener Installation Kit. This is required when no Opener is currently installed on door over 10' wide.",
            "item_type": "GDO",
            "QTY": 0,
            "qty": 0,
            "useranswer": ""
        },
        {
            "Answers": [
                {
                    "SubAnswers": [
                        {
                            "answerid": null,
                            "config": "xxxmil",
                            "isdefault": false,
                            "item_id": 1,
                            "item_name": "Mileage 30+",
                            "item_price": 2.5,
                            "partofdoor": false
                        },
                        {
                            "answerid": null,
                            "config": "NOTPASSED",
                            "isdefault": false,
                            "item_id": 1,
                            "item_name": "51PLUS",
                            "item_price": 3,
                            "partofdoor": false
                        }
                    ],
                    "answerid": null,
                    "config": "NOTPASSED",
                    "isdefault": false,
                    "item_id": 1,
                    "item_name": "no",
                    "item_price": 3,
                    "partofdoor": false
                },
                {
                    "SubAnswers": [],
                    "answerid": null,
                    "config": "0",
                    "isdefault": false,
                    "item_id": 2,
                    "item_name": "yes",
                    "item_price": 0,
                    "partofdoor": false
                }
            ],
            "item_id": 56,
            "item_list_text": "yyyy miles from store (xxxx)",
            "item_name": "Mileage Charges",
            "item_type": "GDO",
            "QTY": 0,
            "qty": 0,
            "useranswer": []
        },
        {
            "Answers": [
                {
                    "SubAnswers": [
                        {
                            "answerid": null,
                            "config": "FIR330",
                            "isdefault": false,
                            "item_id": 1,
                            "item_name": "31TO50",
                            "item_price": 51,
                            "partofdoor": false
                        },
                        {
                            "answerid": null,
                            "config": "FIR340G",
                            "isdefault": false,
                            "item_id": 1,
                            "item_name": "51PLUS",
                            "item_price": 3,
                            "partofdoor": false
                        }
                    ],
                    "answerid": null,
                    "config": "FIR340",
                    "isdefault": false,
                    "item_id": 1,
                    "item_name": "no",
                    "item_price": 3,
                    "partofdoor": false
                },
                {
                    "SubAnswers": [],
                    "answerid": null,
                    "config": "0",
                    "isdefault": false,
                    "item_id": 2,
                    "item_name": "yes",
                    "item_price": 0,
                    "partofdoor": false
                }
            ],
            "item_id": 56,
            "item_list_text": "yyyy miles from store (xxxx)",
            "item_name": "Mileage Charges",
            "item_type": "GDO",
            "QTY": 0,
            "qty": 0,
            "useranswer": []
        }
    ]
    gdoUserAnswers = [
        { "SubAnswers": [{ "answerid": null, "config": "0", "isdefault": false, "item_id": 1, "item_name": "1", "item_price": 0, "partofdoor": false }, { "answerid": null, "config": "0", "isdefault": false, "item_id": 2, "item_name": "2", "item_price": 0, "partofdoor": false }, { "answerid": null, "config": "0", "isdefault": false, "item_id": 3, "item_name": "3", "item_price": 0, "partofdoor": false }], "answerid": null, "config": "GDOI17", "isdefault": false, "item_id": 1, "item_name": "no", "item_price": 50, "partofdoor": false, "tag": "no", "QTY": 1, "qty": 1 },
        { "SubAnswers": [{ "answerid": null, "config": "0", "isdefault": false, "item_id": 1, "item_name": "1", "item_price": 0, "partofdoor": false }, { "answerid": null, "config": "0", "isdefault": false, "item_id": 2, "item_name": "2", "item_price": 0, "partofdoor": false }, { "answerid": null, "config": "0", "isdefault": false, "item_id": 3, "item_name": "3", "item_price": 0, "partofdoor": false }], "answerid": null, "config": "GDOI18", "isdefault": false, "item_id": 1, "item_name": "no", "item_price": 65, "partofdoor": false, "tag": "no", "QTY": 1, "qty": 1 },
        { "qty": 1, "QTY": 1, "item_price": 2.5, "fir": [{ "answerid": null, "config": "xxxmil", "isdefault": false, "item_id": 1, "item_name": "Mileage 30+", "item_price": 2.5, "partofdoor": false, "QTY": 1 }], "item_id": 5 },
        { "qty": 1, "QTY": 1, "item_price": 51, "fir": [{ "answerid": null, "config": "FIR330", "isdefault": false, "item_id": 1, "item_name": "31TO50", "item_price": 51, "partofdoor": false, "QTY": 1 }, { "answerid": null, "config": "FIR340", "isdefault": false, "item_id": 1, "item_name": "51PLUS", "item_price": 3, "partofdoor": false, "QTY": 1 }], "item_id": 5 }
    ]





    setUtils(curr, clicked) {
        this.utilities.currPage = curr;
        this.utilities.clicked = clicked;
    }

    //3703,2217,2207,6559
    //gdoCheck = ['66502', '2217', '77840', '6559', '66604', '2207', '3703'];
    gdoCheck = ['2217', '6559', '2207', '3703'];
    //bug id: 5781
    allowMods = ['GR4SV', 'GR4LV', 'GR4S', 'GR4L', 'GR5SV', 'GR5S', 'HDB', 'HDB4', 'HDBF', 'HDGS', 'HDSF', 'HDBL', 'HDSL'];

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

    // resetGdoTot() {
    //     return this.utilities.item_price * 1;
    // }

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
    //promotions
    promoObject = {
        promotionid: 0,
        promotiontype: '',
        startdate: '',
        enddate: '',
        bullet0: '',
        bullet1: '',
        moreinfo: '',
        oobullet: '',
        oomoreinfo: '',
        storeHeroImage: '',
        consumerHeroImage: '',
        dogEarsImageDouble: '',
        dogEarsImageSingle: '',
        typeOfPromo: '',
        isDogEars: false,
        isHeroGraphic: false,
        isFreeWindows: false

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
        itemNumber: 0,
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
            modelNumber: '',
            displayModelNumber: '',
            discountPrice: 0,
            vinyl: {},
            groove: {}
        },
        color: {
            overlay: {
                name: '',
                price: 0,
                qty: 0
            },
            base: {
                name: '',
                price: 0,
                discountPrice: 0,
                qty: 0
            },
            claddingName: ''
        },
        topSection: {
            name: '',
            glassType: {
                name: '',
                price: 0,
                discountPrice: 0,
                qty: 0
            }
        },
        hardware: {
            handle: {
                name: '',
                install_price: 0,
                discountPrice_install: 0,
                diy_price: 0,
                discountPrice_diy: 0,
                qty: 0
            },
            stepPlate: {
                name: '',
                install_price: 0,
                discountPrice_install: 0,
                diy_price: 0,
                discountPrice_diy: 0,
                qty: 0
            },
            hinge: {
                name: '',
                install_price: 0,
                discountPrice_install: 0,
                diy_price: 0,
                discountPrice_diy: 0,
                qty: 0,
                xmlqty: 0
            },
            lock: {
                name: '',
                price: 0,
                discountPrice: 0,
                qty: 0
            }
        },
        opener: {
            name: '',
            price: 0,
            items: [],
            qty: 0
        },
        additionalOptions: {
            items: []
        },
        upsellPrice: 0
    }


    resDoorObj = {
        "QPB": false,
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
            "qty": 1,
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
                modelNumber: '',
                displayModelNumber: '',
                discountPrice: 0,
                vinyl: {},
                groove: {}
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
                    price: 0,
                    qty: 0
                },
                base: {
                    name: '',
                    price: 0,
                    discountPrice: 0,
                    qty: 0
                },
                claddingName: ''
            };
            this.resDoorObj['reset' + this.resDoorObj['resetorder'][5]]();
        },
        "resetwindows": () => {
            this.resDoorObj['windows'] = {
                "topsection": "",
                "placement": null,
                "glasstype": "",
                "apiData": ""
            };
            this.resDetails.topSection = {
                name: '',
                glassType: {
                    name: '',
                    price: 0,
                    discountPrice: 0,
                    qty: 0
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
                    install_price: 0,
                    discountPrice_install: 0,
                    diy_price: 0,
                    discountPrice_diy: 0,
                    qty: 0
                },
                stepPlate: {
                    name: '',
                    install_price: 0,
                    discountPrice_install: 0,
                    diy_price: 0,
                    discountPrice_diy: 0,
                    qty: 0
                },
                hinge: {
                    name: '',
                    install_price: 0,
                    discountPrice_install: 0,
                    diy_price: 0,
                    discountPrice_diy: 0,
                    qty: 0,
                    xmlqty: 0
                },
                lock: {
                    name: '',
                    price: 0,
                    discountPrice: 0,
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
                "qty": 0,
                "opener": "",
                "items": [],
                "apiData": ""
            };
            this.resDetails.opener = {
                name: '',
                price: 0,
                items: [],
                qty: 0
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
        "QPB": false,
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
                    //promo
                    let itemPromoPrice = 0;
                    if (dc['item_price'] && dc['item_price'] > 0) {
                        itemPromoPrice = this.GetPromoPricePerItem("models", dc['item_price']);
                    }
                    price[0] = price[0] + ((itemPromoPrice > 0 ? itemPromoPrice : dc['item_price']) + dc['laborcodeprice']) * count;
                    price[1] = price[1] + ((itemPromoPrice > 0 ? itemPromoPrice : dc['item_price'])) * count;

                    this.resDetails.construction.name = dc['item_name'];
                    this.resDetails.construction.price = (itemPromoPrice > 0 ? itemPromoPrice : dc['item_price']);;
                    this.resDetails.construction.discountPrice = dc['item_price'];
                    this.resDetails.construction.qty = count;
                    this.resDetails.construction.laborcost = dc['laborcodeprice'];
                    this.resDetails.construction.modelNumber = dc['ClopayModelNumber'];
                    this.resDetails.construction.displayModelNumber = dc['DisplayModelNumber'];                 

                } else {
                    let dc = obj.construction['construction'];
                    //promo
                    let itemPromoPrice = 0;
                    if (dc['item_price'] && dc['item_price'] > 0) {
                        itemPromoPrice = this.GetPromoPricePerItem("models", dc['item_price']);
                    }
                    price[0] = price[0] + ((itemPromoPrice > 0 ? itemPromoPrice : dc['item_price']) + dc['laborcodeprice']) * count;
                    price[1] = price[1] + ((itemPromoPrice > 0 ? itemPromoPrice : dc['item_price'])) * count;

                    this.resDetails.construction.name = dc['item_name'];
                    this.resDetails.construction.price = (itemPromoPrice > 0 ? itemPromoPrice : dc['item_price']);;
                    this.resDetails.construction.discountPrice = dc['item_price'];
                    this.resDetails.construction.qty = count;
                    this.resDetails.construction.laborcost = dc['laborcodeprice'];
                    this.resDetails.construction.modelNumber = dc['ClopayModelNumber'];
                    this.resDetails.construction.displayModelNumber = dc['DisplayModelNumber'];
                }
                
                // Calculate price for Overlay Color
                let oc = obj.color.overlay;
                if (oc && oc.hasOwnProperty('item_price') && obj.product.product['item_id'] !== 16) {
                    price[0] = price[0] + oc['item_price'] * count;
                    price[1] = price[1] + oc['item_price'] * count;

                    this.resDetails.color.overlay.name = oc['item_name'];
                    this.resDetails.color.overlay.price = oc['item_price'];
                    this.resDetails.color.overlay.qty = count;
                }

                // Calculate price for Base Color
                let bc = obj.color.base;
                if (bc && bc.hasOwnProperty('item_price')) {
                    //promo
                    let itemPromoPrice = 0;
                    if (bc['item_price'] && bc['item_price'] > 0) {

                        itemPromoPrice = this.GetPromoPricePerItem("coloradders", bc['item_price']);
                    }
                    price[0] = price[0] + ((itemPromoPrice > 0 ? itemPromoPrice : bc['item_price'])) * count;
                    price[1] = price[1] + ((itemPromoPrice > 0 ? itemPromoPrice : bc['item_price'])) * count;


                    this.resDetails.color.base.name = bc['item_name'];
                    this.resDetails.color.base.price = ((itemPromoPrice > 0 ? itemPromoPrice : bc['item_price']));
                    this.resDetails.color.base.discountPrice = bc['item_price'];
                    this.resDetails.color.base.qty = count;
                }

                //Setting topsetion name if topsection is already asigned
                if (obj.windows && obj.windows.topsection) {
                    this.resDetails.topSection.name = obj.windows.topsection['item_name'];
                }
                // Calculate price for Top Section and Glasstype
                let tsgt = obj.windows.glasstype;
                if (tsgt && tsgt.hasOwnProperty('item_price')) {
                    let itemPromoPrice = 0;
                    if (tsgt['item_price'] && tsgt['item_price'] > 0) {
                        itemPromoPrice = this.GetPromoPricePerItem("windows", tsgt['item_price']);
                    }

                    price[0] = price[0] + ((itemPromoPrice > 0 ? itemPromoPrice : tsgt['item_price'])) * count;
                    price[1] = price[1] + ((itemPromoPrice > 0 ? itemPromoPrice : tsgt['item_price'])) * count;

                    this.resDetails.topSection.name = obj.windows.topsection['item_name'];
                    this.resDetails.topSection.glassType.name = tsgt['item_name'];
                    this.resDetails.topSection.glassType.price = ((itemPromoPrice > 0 ? itemPromoPrice : tsgt['item_price']));
                    this.resDetails.topSection.glassType.discountPrice = tsgt['item_price'];
                    this.resDetails.topSection.glassType.qty = count;
                } else {
                    let ts = obj.windows.topsection;
                    if (obj.design && obj.design.dsgn && obj.design.dsgn.stockdoorconstructions && ts && ts['glasstypes']) {
                        if (ts['glasstypes'][0].GlazingConfig !== 'GLAZ-SOL') {
                            let itemPromoPrice = 0;
                            let tsgt = ts['glasstypes'][0];
                            if (tsgt['item_price'] && tsgt['item_price'] > 0) {
                                itemPromoPrice = this.GetPromoPricePerItem("windows", tsgt['item_price']);
                            }

                            price[0] = price[0] + ((itemPromoPrice > 0 ? itemPromoPrice : tsgt['item_price'])) * count;
                            price[1] = price[1] + ((itemPromoPrice > 0 ? itemPromoPrice : tsgt['item_price'])) * count;

                            this.resDetails.topSection.name = obj.windows.topsection['item_name'];
                            this.resDetails.topSection.glassType.name = tsgt['item_name'];
                            this.resDetails.topSection.glassType.price = ((itemPromoPrice > 0 ? itemPromoPrice : tsgt['item_price']));
                            this.resDetails.topSection.glassType.discountPrice = tsgt['item_price'];
                            this.resDetails.topSection.glassType.qty = count;
                        }

                    }
                }

                // Calculate price for Hardware
                // a.Calculate price for Handles
                let hh = obj.hardware.handle;
                if (hh && hh.hasOwnProperty('item_installed_price')) {
                    let itemInsPromoPrice = 0, itemDiyPromoPrice = 0;
                    if (hh['item_installed_price'] && hh['item_installed_price'] > 0) {
                        itemInsPromoPrice = this.GetPromoPricePerItem("handles_ins", hh['item_installed_price']);
                    }

                    if (hh['item_price'] && hh['item_price'] > 0) {
                        itemDiyPromoPrice = this.GetPromoPricePerItem("handles_diy", hh['item_price']);
                    }
                    price[0] = price[0] + ((itemInsPromoPrice > 0 ? itemInsPromoPrice : hh['item_installed_price'])) * hh['count'] * count;
                    price[1] = price[1] + ((itemDiyPromoPrice > 0 ? itemDiyPromoPrice : hh['item_price'])) * hh['count'] * count;

                    this.utils.resFlowSession.resDetails.hardware.handle.name = hh['item_name'];
                    this.utils.resFlowSession.resDetails.hardware.handle.install_price = hh['item_installed_price'];
                    this.utils.resFlowSession.resDetails.hardware.handle.discountPrice_install = itemInsPromoPrice;
                    this.utils.resFlowSession.resDetails.hardware.handle.diy_price = hh['item_price'];
                    this.utils.resFlowSession.resDetails.hardware.handle.discountPrice_diy = itemDiyPromoPrice;
                    this.utils.resFlowSession.resDetails.hardware.handle.qty = hh['count'];
                }
                // b.Calculate price for Stepplate
                let hs = obj.hardware.stepplate;
                if (hs && hs.hasOwnProperty('item_installed_price')) {
                    price[0] = price[0] + hs['item_installed_price'] * hs['count'] * count;
                    price[1] = price[1] + hs['item_price'] * hs['count'] * count;
                    // Updated to calculate handle price with quantity
                    this.utils.resFlowSession.resDetails.hardware.stepPlate.name = hs['item_name'];
                    this.utils.resFlowSession.resDetails.hardware.stepPlate.install_price = hs['item_installed_price'] * hs['count'];
                    this.utils.resFlowSession.resDetails.hardware.stepPlate.diy_price = hs['item_price'] * hs['count'];
                    this.utils.resFlowSession.resDetails.hardware.stepPlate.qty = hs['count'];
                }
                // c.Calculate price for Hinges
                let hhi = obj.hardware.hinge;
                if (hhi && hhi.hasOwnProperty('item_installed_price')) {
                    let itemInsPromoPrice = 0, itemDiyPromoPrice = 0;
                    if (hhi['item_installed_price'] && hhi['item_installed_price'] > 0) {
                        itemInsPromoPrice = this.GetPromoPricePerItem("hinge_ins", hhi['item_installed_price']);
                    }

                    if (hhi['item_price'] && hhi['item_price'] > 0) {
                        itemDiyPromoPrice = this.GetPromoPricePerItem("hinge_diy", hhi['item_price']);
                    }
                    var hingeQty = 0;
                    hingeQty = this.checkForDoubleHinge(hhi);
                    var hingeDIY = 0;
                    var hingeIns = 0;
                    hingeDIY = ((itemInsPromoPrice > 0 ? itemInsPromoPrice : hhi['item_price'])) * hingeQty;
                    hingeIns = ((itemInsPromoPrice > 0 ? itemInsPromoPrice : hhi['item_installed_price'])) * hingeQty;
                    price[0] = price[0] + hingeIns * count;
                    price[1] = price[1] + hingeDIY * count;

                    this.utils.resFlowSession.resDetails.hardware.hinge.name = hhi['item_name'];
                    this.utils.resFlowSession.resDetails.hardware.hinge.install_price = hhi['item_installed_price'] * hingeQty;
                    this.utils.resFlowSession.resDetails.hardware.hinge.diy_price = hhi['item_price'] * hingeQty;
                    this.utils.resFlowSession.resDetails.hardware.hinge.discountPrice_install = itemInsPromoPrice;
                    this.utils.resFlowSession.resDetails.hardware.hinge.discountPrice_diy = itemDiyPromoPrice;
                    this.utils.resFlowSession.resDetails.hardware.hinge.qty = hhi['count'];
                }
                // d.Calculate price for Locks
                let locksItem = obj.hardware.lock;
                if (locksItem && locksItem.hasOwnProperty('item_installed_price')) {
                    let itemPromoPrice = 0;
                    if (locksItem['item_installed_price'] && locksItem['item_installed_price'] > 0) {

                        itemPromoPrice = this.GetPromoPricePerItem("lock", locksItem['item_installed_price']);
                    }
                    price[0] = price[0] + ((itemPromoPrice > 0 ? itemPromoPrice : locksItem['item_installed_price'])) * count;
                    let itemPrice = locksItem['item_price'] ? locksItem['item_price'] : locksItem['item_installed_price'];
                    price[1] = price[1] + ((itemPromoPrice > 0 ? itemPromoPrice : locksItem['item_installed_price'])) * count;

                    this.resDetails.hardware.lock.name = locksItem['item_name'];
                    this.resDetails.hardware.lock.price = ((itemPromoPrice > 0 ? itemPromoPrice : locksItem['item_installed_price']));
                    this.resDetails.hardware.lock.discountPrice = itemPromoPrice;
                    this.resDetails.hardware.lock.qty = count;
                }

                // Calculate price if EPA
                if (this.resDoorObj.isEPA) {
                    price[0] = price[0] + 20;
                    this.resDetails.isEPA = true;
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
                        if (item.isSelected) {
                            if (item.id !== 5) {
                                price[0] = price[0] + item['price'] * count;
                                price[1] = price[1] + item['price'] * count;
                                this.resDetails.additionalOptions.items.push({
                                    id: item['id'],
                                    name: item['name'],
                                    price: item['price'],
                                    qty: count,
                                    objVal: item,
                                    selectedMiles: item['selectedMiles'],
                                    isSelected: item['isSelected']
                                });
                            } else {
                                price[0] = price[0] + item['price'];
                                price[1] = price[1] + item['price'];
                                this.resDetails.additionalOptions.items.push({
                                    id: item['id'],
                                    name: item['name'],
                                    price: item['price'],
                                    qty: 1,
                                    objVal: item,
                                    selectedMiles: item['selectedMiles'],
                                    isSelected: item['isSelected']
                                });
                            }
                        }
                        else
                        {
                            this.resDetails.additionalOptions.items.push({
                                    id: item['id'],
                                    name: item['name'],
                                    price: item['price'],
                                    qty: 1,
                                    objVal: item,
                                    selectedMiles: item['selectedMiles'],
                                    isSelected: item['isSelected']
                                });
                        }
                    })
                }

                this.resDetails.construction.vinyl = {};
                this.resDetails.construction.groove = {};
                if (obj.product.product['item_id'] == 9) {
                    if (obj.construction.groove['item_price']) {
                        price[0] = price[0] + obj.construction.groove['item_price']
                        price[1] = price[1] + obj.construction.groove['item_price']
                    }
             
                    if (obj.construction.vinyl) {
                        this.resDetails.construction.vinyl = obj.construction.vinyl;
                    }
                    if (obj.construction.groove) {
                        this.resDetails.construction.groove = obj.construction.groove;
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            itemPriceInstall = price[0];
            // if (this.noDIYs.indexOf(itemId) < 0) {
            //     itemPriceDY = price[1];
            // }
            this.utils.utilities.itemPriceInstall = price[0];
            this.utils.utilities.itemPriceDY = price[1];
            return obj;
        }
    }

    checkForDoubleHinge(selHinge) {
        var hingeQty = selHinge['count'];
        var makeHingeDouble = false;
        let DoubleQtyHinge = ['0123191', '0123202', '0123104'];
        let arrDonotShowORB = JSON.stringify(DoubleQtyHinge);
        makeHingeDouble = arrDonotShowORB.indexOf(selHinge['Config']) !== -1 ? true : false;

        if (makeHingeDouble) {
            hingeQty = hingeQty * 2;
        }
        return hingeQty;
    };

    resCalculateCartItemPrice(item) {
        let price;
        let count = item.construction.qty;
        this.utils.resFlowSession.resDoorObj.QTY = count;
        item.totalPrice = 0;
        try {
            // Calculate Door price
            if (!item.isDIY) {
                item.totalPrice = item.totalPrice + count * (item.construction.price + item.construction.laborcost);
            } else {
                item.totalPrice = item.totalPrice + count * item.construction.price;
            }

            if (item.construction.vinyl && item.construction.vinyl.item_price) {
                item.totalPrice = item.totalPrice + item.construction.vinyl.item_price * count;
            }

            if (item.construction.groove && item.construction.groove.item_price) {
                item.totalPrice = item.totalPrice + item.construction.groove.item_price * count;
            }

            // Calculate color price 
            // a. Calculate Overlay price
            item.totalPrice = item.totalPrice + item.color.overlay.price * count;
            item.color.overlay.qty = count;
            // b. Calculate Base price
            item.totalPrice = item.totalPrice + item.color.base.price * count;
            item.color.base.qty = count;

            // Calculate Top Section price
            item.totalPrice = item.totalPrice + item.topSection.glassType.price * count;
            item.topSection.glassType.qty = count;

            // Calculate Hardware price
            // For Installed
            if (!item.isDIY) {
                // a. Calculate Handle price
                item.totalPrice = item.totalPrice + item.hardware.handle.install_price * count;
                // b. Calculate Handle price
                item.totalPrice = item.totalPrice + item.hardware.stepPlate.install_price * count;
                // c. Calculate Handle price
                item.totalPrice = item.totalPrice + item.hardware.hinge.install_price * count;
            } else {
                // a. Calculate Handle price
                item.totalPrice = item.totalPrice + item.hardware.handle.diy_price * count;
                // b. Calculate Handle price
                item.totalPrice = item.totalPrice + item.hardware.stepPlate.diy_price * count;
                // c. Calculate Handle price
                item.totalPrice = item.totalPrice + item.hardware.hinge.diy_price * count;
            }

            //Calculate price for locks
            if (item.hardware.lock && item.hardware.lock.price) {
                item.totalPrice = item.totalPrice + item.hardware.lock.price * count;
                item.hardware.lock.qty = count;
            }

            // Calculate EPA price
            if (item.isEPA) {
                item.totalPrice = item.totalPrice + 20;
            }

            // Calculate Additional Options price
            item.additionalOptions.items.forEach(function (itm) {
                if (itm.isSelected) {
                    if (itm.id !== 5) {
                        item.totalPrice = item.totalPrice + itm.price * count;
                        itm.qty = count;
                    } else {
                        item.totalPrice = item.totalPrice + itm.price;
                    }
                }
            });

            // Calculate price for Openers
            let op = item.opener;
            if (op && op.price) {
                item.totalPrice = item.totalPrice + (op.price * op.qty);
            }

            // Calculate price for Optional Openers
            if (item.opener.items.length > 0) {
                _.forEach(item.opener.items, (openeritem) => {
                    item.totalPrice = item.totalPrice + openeritem['price'] * openeritem['qty'];
                });
            }

        }
        catch (e) {
            console.log(e);
        }
        return item;
    };

    resCalculateCartItemPrice_Base(item) {

        let count = item.construction.qty;
        let basePrice = 0;
        try {
            // Calculate Door price
            if (!item.isDIY) {
                basePrice = basePrice + count * (item.construction.discountPrice + item.construction.laborcost);
            } else {
                basePrice = basePrice + count * item.construction.discountPrice;
            }

            // Calculate color price 
            // a. Calculate Overlay price
            basePrice = basePrice + item.color.overlay.price * count;
            item.color.overlay.qty = count;
            // b. Calculate Base price
            basePrice = basePrice + item.color.base.price * count;
            item.color.base.qty = count;

            // Calculate Top Section price
            basePrice = basePrice + item.topSection.glassType.discountPrice * count;
            item.topSection.glassType.qty = count;

            // Calculate Hardware price
            // For Installed
            if (!item.isDIY) {
                // a. Calculate Handle price
                basePrice = basePrice + item.hardware.handle.discountPrice_install * count;
                // b. Calculate Handle price
                basePrice = basePrice + item.hardware.stepPlate.discountPrice_install * count;
                // c. Calculate Handle price
                basePrice = basePrice + item.hardware.hinge.discountPrice_install * count;
            } else {
                // a. Calculate Handle price
                basePrice = basePrice + item.hardware.handle.discountPrice_diy * count;
                // b. Calculate Handle price
                basePrice = basePrice + item.hardware.stepPlate.discountPrice_diy * count;
                // c. Calculate Handle price
                basePrice = basePrice + item.hardware.hinge.discountPrice_diy * count;
            }

            //Calculate price for locks
            if (item.hardware.lock && item.hardware.lock.price) {
                basePrice = basePrice + item.hardware.lock.discountPrice * count;
                item.hardware.lock.qty = count;
            }

            // Calculate EPA price
            if (item.isEPA) {
                basePrice = basePrice + 20;
            }

            // Calculate Additional Options price
            item.additionalOptions.items.forEach(function (itm) {
                if (itm.id !== 5) {
                    basePrice = basePrice + itm.price * count;
                    itm.qty = count;
                } else {
                    basePrice = basePrice + itm.price;
                }
            });

            // Calculate price for Openers
            let op = item.opener;
            if (op && op.price) {
                basePrice = basePrice + (op.price * op.qty);
            }

            // Calculate price for Optional Openers
            if (item.opener.items.length > 0) {
                _.forEach(item.opener.items, (openeritem) => {
                    basePrice = basePrice + openeritem['price'] * openeritem['qty'];
                });
            }

        }
        catch (e) {
            console.log(e);
        }
        return basePrice;
    }

    addToCart() {
        let k = _.cloneDeep(this.resDetails);
        k.itemNumber = this.cart.length;
        this.cart.push(k);
    }

    GetPromoPricePerItem(promoritemtype, itemprice) {

        let itemPromoPrice = 0;
        switch (promoritemtype) {
            case "models":
                itemPromoPrice = this.utils.promoCalcluatedObject.modelprice;
                break;
            case "coloradders":
                itemPromoPrice = this.utils.promoCalcluatedObject.colorprice;
                break;
            case "windows":
                itemPromoPrice = this.utils.promoCalcluatedObject.windowsprice;
                break;
            case "handles_ins":
                itemPromoPrice = this.utils.promoCalcluatedObject.handles_ins;
                break;
            case "handles_diy":
                itemPromoPrice = this.utils.promoCalcluatedObject.handles_diy;
                break;
            case "stepplates_ins":
                itemPromoPrice = this.utils.promoCalcluatedObject.stepplates_ins;
                break;
            case "stepplates_diy":
                itemPromoPrice = this.utils.promoCalcluatedObject.stepplates_diy;
                break;
            case "hinge_ins":
                itemPromoPrice = this.utils.promoCalcluatedObject.hinge_ins;
                break;
            case "hinge_diy":
                itemPromoPrice = this.utils.promoCalcluatedObject.hinge_diy;
                break;
            case "lock":
                itemPromoPrice = this.utils.promoCalcluatedObject.lockprice;
                break;
        }
        return itemPromoPrice;
    };

    calculatePromoSavings() {
        let doorObj = this.utils.resFlowSession.resDetails;
        let orgPrice = 0;
        let cartDiscountPrice = 0;
        orgPrice = this.utils.resFlowSession.resCalculateCartItemPrice_Base(doorObj);
        cartDiscountPrice = this.utils.resFlowSession.resCalculateCartItemPrice(doorObj).totalPrice;
        return (orgPrice - cartDiscountPrice);
    };

    constructor(private utils: AppUtilities) {

    }
}
