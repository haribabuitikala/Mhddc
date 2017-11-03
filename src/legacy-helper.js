var imgSkewURL = 'http://hddchtml.clopay.com/ImageHandler3.aspx';

var imgFolder = '/assets/images/pimages';
// var imgFolder = 'http://localhost:3435/pimages';

var uploadFolder = 'http://hddchtml.clopay.com/uploads';
var selectedAnotherDoor;
var orderObj = {
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
    "promotion": [{ bullet0: '', bullet1: '', moreinfo: '', promotionid: 0 }, false],
    "promotionData": [{ bullet0: '', bullet1: '', moreinfo: '', promotionid: 0 }, false],
    "jambtype": "Wood",
    "extendedShaft": false
}
var lng = 'en';
gdoOpenerImagePrice = false;
function getDoorPrice(obj, useQty, retunMoney, DOORONLY) {
    var dp = 0;
    var labor = 0;
    var dpArray = [];
    var qty = 1;
    if (typeof (DOORONLY) === 'undefined') DOORONLY = false;
    if (typeof (retunMoney) === 'undefined') retunMoney = true;
    if (typeof (useQty) === 'undefined') useQty = false;
    if (useQty)
        qty = obj.QTY;

    var type = obj.TYPE
    //console.log(type)
    switch (type) {
        case 'RES':
            {

                dp = cP(obj, obj.construction.construction, 'models');
                labor = cP(obj, obj.construction.construction, 'Labor');
                dpArray.push(dp)

                if (obj.construction.groove != "") {
                    dp = cP(obj, obj.construction.groove, 'groove');
                    dpArray.push(dp)
                }

                if (obj.construction.vinyl != "") {
                    dp = cP(obj, obj.construction.vinyl, 'vinyl');
                    dpArray.push(dp)
                }

                //TopSection Pricing (LOOK FORWARD)
                if (obj.windows.glasstype && obj.windows.glasstype == "") {
                    if (obj.windows.topsection && obj.windows.topsection != "") {
                        var dFound = false
                        $.each(obj.windows.topsection.glasstypes, function (index, value) {
                            if (value.isdefault && !dFound) {
                                dp = cP(obj, value, 'glasstype');
                                dpArray.push(dp)
                                dFound = true;
                            }
                        });
                        if (!dFound) {
                            dp = cP(obj, obj.windows.topsection.glasstypes[0], 'glasstype');
                            dpArray.push(dp)
                        };
                    }
                }
                else {
                    if (type == 'RES') {
                        dp = cP(obj, obj.windows.glasstype, 'glasstype');
                        dpArray.push(dp)
                    }
                }
                if (obj.color.base != "") {
                    dp = cP(obj, obj.color.base, 'colorbase');
                    dpArray.push(dp)
                }


                var pid = obj.product.product.item_id;
                if (obj.color.overlay != "" && pid == 11) {
                    try {
                        dp = cP(obj, obj.color.overlay, 'coloroverlay');
                        dpArray.push(dp)
                    }
                    catch (e) { }
                }

                break;
            }

    }


    var ip = 0
    var dip = 0
    var nip = 0
    var ndp = 0
    //WO-688398 - Start
    $.each(dpArray, function (index, value) {
        if (!isNaN(value.install)) {
            ip += value.install
        }
        if (!isNaN(value.diy)) {
            dip += value.diy
        }
        if (!isNaN(value.nInstall)) {
            nip += value.nInstall
        }

        if (!isNaN(value.nDiy)) {
            ndp += value.nDiy
        }


    });

    if (type != "GDO") {
        ip = Number((ip + labor.install) * qty)
        nip = Number((nip + labor.install) * qty)
        dip = Number((dip) * qty)
        ndp = Number((ndp) * qty)
        if (lng != 'en')
            nip = Number((ndp + labor.nInstall) * qty)
    }

    var ins = Number(ip).toFixed(2)
    var nIns = Number(nip).toFixed(2)
    var diy = Number(dip).toFixed(2)
    var nDiy = Number(ndp).toFixed(2)


    if (cObj.INSTALLTYPE == 'Installed') {
        var val = Number(ins.replace('$', ''));
    } else {
        var val = Number(diy.replace('$', ''));
    }

    return [ins, diy, nIns, nDiy]

}


function cP(obj, pX, node, forceDiy, uqPromo, isUpsell) {

    var rt = { install: 0, diy: 0, nInstall: 0, nDiy: 0 };

    var promoType = 'd';
    var applyPromo = false;
    var modMatch = false;
    var useAddres = false;
    var useCObj = true;
    var promoDta, mPromoType, ogPromo;
    var QPB = false;
    var israil = false;
    var item = obj.resDetails;

    try {
        if (obj.additional.items[0].isQPB == true) {
            QPB = true;
        }
    }
    catch (e) { }

    if (typeof (forceDiy) === 'undefined') forceDiy = false;
    if (typeof (node) === 'undefined') node = pX.pxNode;
    if (typeof (uqPromo) === 'undefined') useCObj = false;
    if (typeof (uqPromo) === 'undefined') uqPromo = orderObj.promotion[1];
    //shankar added for apply promo, when select 2nd door at shoping cart page
    try {
        if (orderObj.cart.length > 1 && orderObj.promotionData.length > 1) {
            uqPromo = orderObj.promotionData[selectCartValue];
        }
    } catch (e) { }
    if (typeof (isUpsell) == 'undefined') isUpsell = false;


    if (isUpsell == true) {
        if (orderObj.promotion[1] != uqPromo) { useCObj = false }
    }


    try {
        var prc = Number(pX.item_price);
        var p = Number(pX.item_price);
    } catch (e) { }

    if (node == 'resOpenerExt') {
        israil = true;
        p = Number(pX.unitprice);
        prc = Number(pX.unitprice);
        node = 'Openers';
    }

    if (obj.TYPE != 'GDO') {

        if (node == 'models') {
            p = Number(item.construction.price);
            prc = Number(item.construction.price);

        }

        if (node == 'vinyl') {
            p = Number(item.construction.vinyl.item_price);
            prc = Number(item.construction.vinyl.item_price);

        }

        if (node == 'groove') {
            p = Number(item.construction.groove.item_price);
            prc = Number(item.construction.groove.item_price);

        }

        if (node == 'colorbase') {
            p = Number(item.color.base.price);
            prc = Number(item.color.base.price);

        }

        if (node == 'coloroverlay') {
            p = Number(item.color.overlay.price);
            prc = Number(item.color.overlay.price);

        }

        if (node == 'Springs') {
            p = Number(pX.price);
            prc = Number(pX.price)

        }

        if (node == 'glasstype') {
            // p = Number(pX.glasstype.item_price) * Number(pX.selectedGlassSection);
            // prc = Number(pX.glasstype.item_price) * Number(pX.selectedGlassSection);
            p = Number(item.topSection.glassType.price);
            prc = Number(item.topSection.glassType.price)

        }

        if (node == 'Labor') {

            if (pX.Exlaborcodeprice > 0 && pX.Exlaborcodeprice != '') {
                p = pX.Exlaborcodeprice;
                prc = pX.Exlaborcodeprice;

            } else {
                p = pX.laborcodeprice;
                prc = pX.laborcodeprice;

            }
        }

        if (node == 'handle') {
            if (item.isDIY) {
                p = Number(item.hardware.handle.diy_price);
                prc = Number(item.hardware.handle.diy_price);
            }
            else {
                p = Number(item.hardware.handle.install_price);
                prc = Number(item.hardware.handle.install_price);
            }
        }

        if (node == 'stepplate') {
            if (item.isDIY) {
                p = Number(item.hardware.stepPlate.diy_price);
                prc = Number(item.hardware.stepPlate.diy_price);
            }
            else {
                p = Number(item.hardware.stepPlate.install_price);
                prc = Number(item.hardware.stepPlate.install_price);
            }
        }

        if (node == 'hinge') {
            if (item.isDIY) {
                p = Number(item.hardware.hinge.diy_price);
                prc = Number(item.hardware.hinge.diy_price);
            }
            else {
                p = Number(item.hardware.hinge.install_price);
                prc = Number(item.hardware.hinge.install_price);
            }
        }
        if (node == 'lock') {
            if (item.hardware.lock && item.hardware.lock.price) {
                p = Number(item.hardware.lock.price);
                prc = Number(item.hardware.lock.price);
            }
        }

        if (node == 'Hardware' || node == 'Quincailleries') {
            useAddres = true;
        }


        if (QPB == true) {
            useAddres = false;
        }
        rt.install = p;
        rt.nInstall = prc;
        rt.diy = p;
        rt.nDiy = prc;

        if (useAddres) {

            if (!isNaN(pX.item_installed_price) && (typeof (pX.item_installed_price) != undefined)) {
                rt.install = pX.item_installed_price;
                rt.nInstall = pX.item_installed_price;
            }
        }



    } else {

        rt.install = p;
        rt.nInstall = prc;
        rt.diy = p;
        rt.nDiy = prc;

    }

    //console.log(rt)
    return rt
}

