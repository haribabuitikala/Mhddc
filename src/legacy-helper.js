var imgSkewURL = 'http://hddchtml.clopay.com/ImageHandler3.aspx';

// var imgFolder = '/assets/images/pimages';
var imgFolder = 'http://localhost:3435/pimages';

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
function getTierPromoDiscnt(grandTotal) {
    try {
        var windwLoc = window.location.href;
        var _arr = ['resSummary', 'resSummaryQPB', 'commSummary', 'shoppingCart'];
        //var caluculateTierPromo = false;
        var flag = false;
        for (var b = 0; b < _arr.length; b++) {
            if (windwLoc.indexOf(_arr[b]) >= 0) {
                //caluculateTierPromo = true;  
                flag = true;
            }
        }

        if (caluculateTierPromo && flag) {
            var finalPrice = grandTotal;
            var crntCartObj = orderObj.cart;
            if (_isCanadaPromo) {
                var isShopgCartPage = false;
                console.log('enetered tier promo');
                var g = crntCartObj.length - 1;

                if (windwLoc.indexOf('shoppingCart') == -1) {
                    isShopgCartPage = false;
                    finalPrice = removeNonDisccntPrices(crntCartObj[g], finalPrice, 'minus', isShopgCartPage);
                }
                else {
                    isShopgCartPage = true;
                    finalPrice = removeNonDisccntPrices(crntCartObj, finalPrice, 'minus', isShopgCartPage);
                }

                var prcnt = 0;
                for (var c = 0; c < caTierDiscRanges.length; c++) {
                    if (Number(caTierDiscRanges[c].RangeTo) == 0)
                        caTierDiscRanges[c].RangeTo = Number(1000000);

                    if (Number(caTierDiscRanges[c].RangeFrom) <= Number(Math.round(finalPrice)) && Number(caTierDiscRanges[c].RangeTo) >= Number(Math.round(finalPrice))) {
                        var crntPercentage = caTierDiscRanges[c].DiscountPercentage / 100;
                        finalPrice = Number(finalPrice - (finalPrice * crntPercentage)).toFixed(2);
                        //csTierGrandTotal = finalPrice;
                        prcnt = caTierDiscRanges[c].DiscountPercentage;
                    }
                }

                if (windwLoc.indexOf('shoppingCart') == -1) {
                    isShopgCartPage = false;
                    finalPrice = removeNonDisccntPrices(crntCartObj[g], finalPrice, 'plus', isShopgCartPage);
                }
                else {
                    isShopgCartPage = true;
                    finalPrice = removeNonDisccntPrices(crntCartObj, finalPrice, 'plus', isShopgCartPage);
                }
                csTierGrandTotal = finalPrice;
                setPromoDiscValues(grandTotal, finalPrice, prcnt);
            }
        }
    } catch (e) { }
}

gdoOpenerImagePrice = false;

// Common Functions

//Get Config Desc - returns array
// [systemName][ItemTitle][ItemDesc][qty][[regular price][promo price]] <- prices as display objects
function getConfigDesc(obj, returnMoney) {

    //console.log(obj,"             obj")
    var descArray = [];
    if (typeof (returnMoney) === 'undefined') returnMoney = false;
    else
        returnMoney = true;

    if (typeof (retunMoney) === 'undefined') retunMoney = true;

    if (obj.TYPE == 'RES' || obj.TYPE == 'COM') {

        var pid = obj.product.product.item_id;
        // SIZE
        if (lng == 'en' || lng == 'ca') {
            descArray.push({
                systemName: 'size', subItem: false, title: 'Size', desc: obj.size.width.wf + "' " + obj.size.width.wi + '"(w) x ' + obj.size.height.hf + "' " +
                    obj.size.height.hi + '"(h)', qty: 0, insPrice: '', diyPrice: ''
            })
        }
        if (lng == 'fr') {
            var _wIn = (obj.size.width.wi == '0') ? 'x ' : obj.size.width.wi + '" x ';
            var _hIn = (obj.size.height.hi == '0') ? '' : obj.size.height.hi + '"';
            descArray.push({
                systemName: 'size', subItem: false, title: 'Dimension', desc: obj.size.width.wf + ' pi ' + _wIn + obj.size.height.hf +
                    ' po ' + _hIn, qty: 0, insPrice: '', diyPrice: ''
            })
        }

        /*var text = obj.opener.opener.item_name.toString();
        var output = $("<div />").html(text).text();
        obj.product.product.item_name = output;*/

        replaceJunkCharacters(obj.product.product);

        // WindCode
        if (lng == 'en')
            descArray.push({ systemName: 'zipWin', subItem: false, title: 'WindCode', desc: orderObj.windcode, qty: 0, insPrice: '', diyPrice: '' })
        else
            descArray.push({ systemName: 'zipWin', subItem: false, qty: 0, insPrice: '', diyPrice: '' })

        // DoorType
        if (obj.TYPE == 'RES') {
        	/*if(obj.product.product.item_name.indexOf('Classicâ„¢Â™')!=-1){
            obj.product.product.item_name = obj.product.product.item_name.replace('Classicâ„¢Â™','Classic™ ');
	        }
	        if(obj.product.product.item_name.indexOf('Avante™Â™')!=-1){
	            obj.product.product.item_name = obj.product.product.item_name.replace('Avante™Â™','Avante™ ');
	        }
	        if(obj.product.product.item_name.indexOf('Avante&trade;Â™')!=-1){
	            obj.product.product.item_name = obj.product.product.item_name.replace('Avante&trade;Â™','Avante™ ');
	        }*/

            if (obj.product.product.item_name.indexOf('Avante™Â™') != -1) {
                obj.product.product.item_name = obj.product.product.item_name.replace('Avante™Â™', 'Avante™ ');
            }
            if (obj.product.product.item_name.indexOf('Avante&trade;Â™') != -1) {
                obj.product.product.item_name = obj.product.product.item_name.replace('Avante&trade;Â™', 'Avante™ ');
            }

            if (lng == 'en') {
                descArray.push({ systemName: 'resDoorType', subItem: false, title: 'Collection', desc: obj.product.product.item_name, qty: 0, insPrice: '', diyPrice: '' })
            }

            if ((lng == 'fr' || lng == 'ca') && obj.product.product.item_name != "") {
                descArray.push({ systemName: 'resDoorType', subItem: false, title: 'Type', desc: obj.product.product.item_name, qty: 0, insPrice: '', diyPrice: '' })
            }

        } else if (obj.TYPE == 'COM') {
            if (lng == 'en') {
                descArray.push({ systemName: 'commDoorType', subItem: false, title: 'Collection', desc: obj.product.product.item_name, qty: 0, insPrice: '', diyPrice: '' })
            }
            if ((lng == 'fr' || lng == 'ca') && obj.product.product.item_name != "") {
                descArray.push({ systemName: 'commDoorType', subItem: false, title: 'Type', desc: obj.product.product.item_name, qty: 0, insPrice: '', diyPrice: '' })
            }
        }

        // Model // NEEDED IN HDDC?
        // Design
        replaceJunkCharacters(obj.design.dsgn);

        var canPass = true
        if (obj.TYPE == 'RES') {
            if ($.inArray(pid, hasCladding) == -1 || obj.construction.cladding == '' || canPass) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'resDesign', subItem: false, title: 'Door Design', desc: obj.design.dsgn.item_name, xmldesc: String(obj.construction.construction.XMLDSGN).replace('vvv', '').replace('VVV', ''), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'resDesign', subItem: false, title: 'Door Design', desc: obj.design.dsgn.item_name, xmldesc: String(obj.construction.construction.XMLDSGN).replace('vvv', '').replace('VVV', ''), qty: 0, insPrice: '', diyPrice: '' })
            } else {
                if (lng == 'fr')
                    descArray.push({ systemName: 'resDesign', subItem: false, title: 'Door Design', desc: obj.construction.cladding.CladdingOverlayconfig, xmldesc: String(obj.construction.cladding.CladdingOverlayconfig).replace('vvv', '').replace('VVV', ''), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'resDesign', subItem: false, title: 'Door Design', desc: obj.construction.cladding.CladdingOverlayconfig, xmldesc: String(obj.construction.cladding.CladdingOverlayconfig).replace('vvv', '').replace('VVV', ''), qty: 0, insPrice: '', diyPrice: '' })
            }
        } else if (obj.TYPE == 'COM') {
            if ($.inArray(pid, hasCladding) == -1 || obj.construction.cladding == '' || canPass) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commDesign', subItem: false, title: 'Door Design', desc: obj.design.dsgn.item_name, xmldesc: String(obj.construction.construction.XMLDSGN).replace('vvv', '').replace('VVV', ''), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'commDesign', subItem: false, title: 'Door Design', desc: obj.design.dsgn.item_name, xmldesc: String(obj.construction.construction.XMLDSGN).replace('vvv', '').replace('VVV', ''), qty: 0, insPrice: '', diyPrice: '' })
            } else {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commDesign', subItem: false, title: 'Door Design', desc: obj.construction.cladding.CladdingOverlayconfig, xmldesc: String(obj.construction.cladding.CladdingOverlayconfig).replace('vvv', '').replace('VVV', ''), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'commDesign', subItem: false, title: 'Door Design', desc: obj.construction.cladding.CladdingOverlayconfig, xmldesc: String(obj.construction.cladding.CladdingOverlayconfig).replace('vvv', '').replace('VVV', ''), qty: 0, insPrice: '', diyPrice: '' })
            }
        }
        replaceJunkCharacters(cObj.construction.construction);


        if (obj.TYPE == 'RES') {
            try { cObj.construction.construction.item_name = cObj.construction.construction.item_name.replace(/Â/g, ''); } catch (e) { }
            try {
                var mod = obj.construction.construction.DisplayModelNumber
                mod = mod.replace('zzz-', "")
                mod = mod.replace('ZZZ-', "")

            } catch (e) { }
            if (lng == 'en' || lng == 'ca') {
                descArray.push({
                    systemName: 'resModel', subItem: false, title: 'Door Model', desc: mod, obj:
                        obj.construction.construction, qty: 0, insPrice: '', diyPrice: ''
                })
            }
            if (lng == 'fr') {
                descArray.push({
                    systemName: 'resModel', subItem: false, title: 'Door Modéle', desc: mod, obj:
                        obj.construction.construction, qty: 0, insPrice: '', diyPrice: ''
                })
            }
        } else if (obj.TYPE == 'COM') {
            try { cObj.construction.construction.item_name = cObj.construction.construction.item_name.replace(/Â/g, ''); } catch (e) { }
            try {
                var mod = obj.construction.construction.DisplayModelNumber
                mod = mod.replace('zzz-', "")
                mod = mod.replace('ZZZ-', "")

            } catch (e) { }
            if (lng == 'fr') {
                descArray.push({
                    systemName: 'commModel', subItem: false, title: 'Door Modéle', desc: mod, obj:
                        obj.construction.construction, qty: 0, insPrice: '', diyPrice: ''
                })
            } else {
                descArray.push({
                    systemName: 'commModel', subItem: false, title: 'Door Model', desc: mod, obj:
                        obj.construction.construction, qty: 0, insPrice: '', diyPrice: ''
                })
            }

        }


        // Construction
        if (obj.TYPE == 'RES') {
            if (lng == 'fr') {
                descArray.push({
                    systemName: 'resConstruction', subItem: false, title: 'Door Construction', desc: String(obj.construction.construction.item_name).replace(/Â/g, ''), qty: 0, insPrice: '',
                    diyPrice: ''
                })
            } else {
                descArray.push({
                    systemName: 'resConstruction', subItem: false, title: 'Door Construction', desc: String(obj.construction.construction.item_name).replace(/Â/g, ''), qty: 0, insPrice: '',
                    diyPrice: ''
                })
            }

        } else if (obj.TYPE == 'COM') {
            if (lng == 'fr') {
                descArray.push({
                    systemName: 'commConstruction', subItem: false, title: 'Door Construction', desc: String(obj.construction.construction.item_name).replace(/Â/g, ''), qty: 0, insPrice: '',
                    diyPrice: ''
                })
            } else {
                descArray.push({
                    systemName: 'commConstruction', subItem: false, title: 'Door Construction', desc: String(obj.construction.construction.item_name).replace(/Â/g, ''), qty: 0, insPrice: '',
                    diyPrice: ''
                })
            }

        }
        if ($.inArray(pid, hasCladding) != -1) {
            try {
                replaceJunkCharacters(obj.construction.cladding);

                if (cObj.construction.construction.claddingoverlays.length == 9) {
                    descArray.push({ systemName: 'resConstruction', subItem: false, title: 'Cladding & Overlay', desc: obj.construction.cladding.item_name, qty: 0, insPrice: '', diyPrice: '' })
                }
            } catch (e) { }
        }

        // Color (Coachman has Overlay & Base Color)
        replaceJunkCharacters(obj.color.base);

        if (obj.TYPE == 'RES') {
            if (lng == 'en') {
                descArray.push({
                    systemName: 'resColor', subItem: false, title: 'Color', desc: obj.color.base.item_name, qty: 0, obj: obj.color.base, insPrice: '', diyPrice: ''
                })
            }
            if (lng == 'ca') {
                descArray.push({
                    systemName: 'resColor', subItem: false, title: 'Colour', desc: obj.color.base.item_name, qty: 0, obj: obj.color.base, insPrice: '', diyPrice: ''
                })
            }
            if (lng == 'fr') {
                descArray.push({
                    systemName: 'resColor', subItem: false, title: 'Couleur', desc: obj.color.base.item_name, qty: 0, obj: obj.color.base, insPrice: '', diyPrice: ''
                })
            }

        } else if (obj.TYPE == 'COM') {
            if (lng == 'en') {
                descArray.push({
                    systemName: 'commColor', subItem: false, title: 'Color', desc: obj.color.base.item_name, qty: 0, obj: obj.color.base, insPrice: '', diyPrice: ''
                })
            }
            if (lng == 'ca') {
                descArray.push({
                    systemName: 'commColor', subItem: false, title: 'Colour', desc: obj.color.base.item_name, qty: 0, obj: obj.color.base, insPrice: '', diyPrice: ''
                })
            }
            if (lng == 'fr') {
                descArray.push({
                    systemName: 'commColor', subItem: false, title: 'Couleur', desc: obj.color.base.item_name, qty: 0, obj: obj.color.base, insPrice: '', diyPrice: ''
                })
            }

        }

        if ($.inArray(pid, hasOverlay) != -1) {
            replaceJunkCharacters(obj.color.overlay);
            if (lng == 'en') {
                descArray.push({
                    systemName: 'resColor', title: 'OverlayColor', subItem: true, desc: obj.color.overlay.item_name, obj: obj.color.overlay, qty: 0, insPrice:
                        '', diyPrice: ''
                })
            }
            if (lng == 'ca') {
                descArray.push({
                    systemName: 'resColor', title: 'OverlayColour', subItem: true, desc: obj.color.overlay.item_name, obj: obj.color.overlay, qty: 0, insPrice:
                        '', diyPrice: ''
                })
            }
            if (lng == 'fr') {
                descArray.push({
                    systemName: 'resColor', title: 'La couleur de superposition', subItem: true, desc: obj.color.overlay.item_name, obj: obj.color.overlay, qty: 0, insPrice:
                        '', diyPrice: ''
                })
            }

        }

        if ($.inArray(pid, hasGroove) != -1) {


            if (obj.construction.vinyl.item_name != undefined) {
                replaceJunkCharacters(obj.construction.vinyl);
                if (lng == 'en') {
                    descArray.push({
                        systemName: 'resVinyl', title: 'Vinyl Color', subItem: true, desc: obj.construction.vinyl.item_name, obj: obj.construction.vinyl, qty: 0, insPrice:
                            '', diyPrice: ''
                    })
                } else if (lng == 'ca' || lng == 'fr') {
                    descArray.push({
                        systemName: 'resVinyl', title: 'Vinyl Colour', subItem: true, desc: obj.construction.vinyl.item_name, obj: obj.construction.vinyl, qty: 0, insPrice:
                            '', diyPrice: ''
                    })
                }


            }

            try {
                if (obj.construction.groove.item_name != undefined) {
                    replaceJunkCharacters(obj.construction.groove);
                    descArray.push({
                        systemName: 'resGroove', title: 'Center Groove', subItem: true, desc: obj.construction.groove.item_name, obj: obj.construction.groove, qty: 0, insPrice:
                            '', diyPrice: ''
                    })
                }
            } catch (e) { }

        }


        if (obj.TYPE == 'RES') {
            if ($.inArray(pid, noTop) == -1) {
                replaceJunkCharacters(obj.windows.topsection);
                if (lng == 'en' || lng == 'ca') {
                    descArray.push({
                        systemName: 'resTopSection', title: 'Top Section', subItem: false, desc: obj.windows.topsection.item_name, qty: 0, insPrice: '', diyPrice:
                            ''
                    })
                }
                if (lng == 'fr') {
                    descArray.push({
                        systemName: 'resTopSection', title: 'Section Supérirure', subItem: false, desc: obj.windows.topsection.item_name, qty: 0, insPrice: '', diyPrice:
                            ''
                    })
                }

                replaceJunkCharacters(obj.windows.glasstype);

                //if(!cObj.product.product.QPB){
                if (lng == 'fr') {
                    descArray.push({
                        systemName: 'resGlassType', title: 'De Verre', subItem: false, desc: obj.windows.glasstype.item_name, obj: obj.windows.glasstype, qty:
                            0, insPrice: '', diyPrice: ''
                    })
                } else {
                    descArray.push({
                        systemName: 'resGlassType', title: 'Glass Type', subItem: false, desc: obj.windows.glasstype.item_name, obj: obj.windows.glasstype, qty:
                            0, insPrice: '', diyPrice: ''
                    })
                }
                //}


                if ($.inArray(pid, hasLocks) != -1) {
                    replaceJunkCharacters(obj.windows.placement);
                    if (obj.windows.placement != '') {
                        try {
                            descArray.push({
                                systemName: 'resTopSection', title: 'Placement', subItem: true, desc: obj.windows.placement.item_name, qty: 0,
                                insPrice: '', diyPrice: ''
                            })
                        } catch (e) { }
                    }

                }

            }
        } else if (obj.TYPE == 'COM') {
            if ($.inArray(pid, noTop) == -1) {
                replaceJunkCharacters(obj.windows.topsection);
                if (lng == 'en' || lng == 'ca') {
                    descArray.push({
                        systemName: 'commTopSection', title: 'Top Section', subItem: false, desc: obj.windows.topsection.item_name, qty: 0, insPrice: '', diyPrice:
                            ''
                    })
                }
                if (lng == 'fr') {
                    descArray.push({
                        systemName: 'commTopSection', title: 'Section Supérirure', subItem: false, desc: obj.windows.topsection.item_name, qty: 0, insPrice: '', diyPrice:
                            ''
                    })
                }

                replaceJunkCharacters(obj.windows.glasstype);
                //if(!cObj.product.product.QPB){
                if (lng == 'fr') {
                    descArray.push({
                        systemName: 'commTopSection', title: 'De Verre', subItem: true, desc: obj.windows.glasstype.item_name, obj: obj.windows.glasstype, qty:
                            0, insPrice: '', diyPrice: ''
                    })
                } else {
                    descArray.push({
                        systemName: 'commTopSection', title: 'Glass Type', subItem: true, desc: obj.windows.glasstype.item_name, obj: obj.windows.glasstype, qty:
                            0, insPrice: '', diyPrice: ''
                    })
                }
                //}

				/*if (obj.windows.glasstypeSection != '' && obj.windows.glasstypeSection != undefined) {

					descArray.push({
						systemName: 'commTopSection', title: '', subItem: true, desc: obj.windows.glasstypeSection, qty:0, insPrice: '', diyPrice: ''
					})
				}*/
                if (obj.windows.glasstype.item_name != "Not applicable with solid top section." || obj.windows.glasstype.item_name != 'Sans-fen&ecirc;tre') {
                    if (obj.windows.glasstypePlacement != '' && obj.windows.glasstypePlacement != undefined) {
                        descArray.push({
                            systemName: 'commTopSection', title: '', subItem: true, desc: obj.windows.glasstypePlacement, qty: 0, insPrice: '', diyPrice: ''
                        })
                    }
                }
                if ($.inArray(pid, hasLocks) != -1) {
                    replaceJunkCharacters(obj.windows.placement);
                    if (obj.windows.placement != '')
                        descArray.push({
                            systemName: 'resTopSection', title: 'Placement', subItem: true, desc: obj.windows.placement.item_name, qty: 0,
                            insPrice: '', diyPrice: ''
                        })
                }

            }
        }



        // Cladding & Overlay (Canyon Ridge ONLY)
        // Top Section
        // Window Placement (Classic Line Doors ONLY)
        // Glass Type
        //Hardware (Lock FOr CLassic line ONLY)

        if (pid != 116) {
            if ($.inArray(pid, hasLocks) == -1) {
                try {
                    if (obj.hardware.handle.availablekits != undefined || obj.hardware.stepplate.availablekits != undefined || obj.hardware.hinge.availablekits !=
                        undefined) {
                        if (pid == 16 || obj.hardware.handle.Config != '0' || obj.hardware.stepplate.Config != '0' || obj.hardware.hinge.Config != '0') {
                            if (lng == 'en' || lng == 'ca') {
                                descArray.push({ systemName: 'resHardware', subItem: false, title: 'Hardware', desc: '', qty: 0, insPrice: '', diyPrice: '' })
                            }
                            if (lng == 'fr') {
                                descArray.push({ systemName: 'resHardware', subItem: false, title: 'Quincailleries', desc: '', qty: 0, insPrice: '', diyPrice: '' })
                            }
                        }
                    }
                }
                catch (e) {
                    // do nothing
                }
                replaceJunkCharacters(obj.hardware.handle);
                descArray.push({
                    systemName: 'resHardware', subItem: true, title: 'Handles', desc: obj.hardware.handle.item_name + ' (x' + obj.hardware.handle.numofKits +
                        ' Per Door)', obj: obj.hardware.handle, qty: 0, insPrice: '', diyPrice: ''
                })
                try {
                    replaceJunkCharacters(obj.hardware.stepplate);
                    descArray.push({
                        systemName: 'resHardware', subItem: true, title: 'Step Plate', desc: obj.hardware.stepplate.item_name + ' (x' +
                            obj.hardware.stepplate.numofKits + ' Per Door)', obj: obj.hardware.stepplate, qty: 0, insPrice: '', diyPrice: ''
                    })
                    replaceJunkCharacters(obj.hardware.hinge);
                    descArray.push({
                        systemName: 'resHardware', subItem: true, title: 'Hinges', desc: obj.hardware.hinge.item_name + ' (x' + obj.hardware.hinge.numofKits +
                            ' Per Door)',
                        obj: obj.hardware.hinge, qty: 0, insPrice: '', diyPrice: ''
                    })
                } catch (e) { }
            } else {
                try {
                    replaceJunkCharacters(obj.hardware.lock);
                    if (obj.TYPE == 'RES') {

                        if (obj.hardware.lock.item_name != undefined) {
                            if (lng == 'en' || lng == 'ca') {
                                descArray.push({ systemName: 'resHardware', subItem: false, title: 'Hardware', desc: '', qty: 0, insPrice: '', diyPrice: '' })
                            }
                            if (lng == 'fr') {
                                descArray.push({ systemName: 'resHardware', subItem: false, title: 'Quincailleries', desc: '', qty: 0, insPrice: '', diyPrice: '' })
                            }
                        }
                    } else if (obj.TYPE == 'COM') {

                        if (obj.hardware.lock.item_name != undefined) {
                            if (lng == 'en' || lng == 'ca') {
                                descArray.push({ systemName: 'commHardware', subItem: false, title: 'Hardware', desc: '', qty: 0, insPrice: '', diyPrice: '' })
                            }
                            if (lng == 'fr') {
                                descArray.push({ systemName: 'commHardware', subItem: false, title: 'Quincailleries', desc: '', qty: 0, insPrice: '', diyPrice: '' })
                            }
                        }
                    }

                    if (lng == 'fr') {
                        descArray.push({ systemName: 'resHardware', title: 'Serrure', subItem: true, desc: obj.hardware.lock.item_name, obj: obj.hardware.lock, qty: 0, insPrice: '', diyPrice: '' })
                    } else {
                        descArray.push({ systemName: 'resHardware', title: 'Lock', subItem: true, desc: obj.hardware.lock.item_name, obj: obj.hardware.lock, qty: 0, insPrice: '', diyPrice: '' })
                    }

                } catch (e) { }
            }

        }

        if (obj.TYPE == 'COM') {
            if (returnMoney) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commTrackSprings', subItem: false, title: 'Pistes et ressorts', desc: '', obj: obj.springs, qty: 0, insPrice: '', diyPrice: Number(obj.springs.price) })
                else
                    descArray.push({ systemName: 'commTrackSprings', subItem: false, title: 'Track & Springs', desc: '', obj: obj.springs, qty: 0, insPrice: '', diyPrice: Number(obj.springs.price) })
            }

            if (obj.springs.springtype != "" && obj.springs.springtype != undefined) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Type de Ressort', desc: String(obj.springs.springtype), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Spring Type', desc: String(obj.springs.springtype), qty: 0, insPrice: '', diyPrice: '' })
            }

            if (obj.springs.tracksize != "" && obj.springs.tracksize != undefined) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Taille de la piste', desc: String(obj.springs.tracksize), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Track Size', desc: String(obj.springs.tracksize), qty: 0, insPrice: '', diyPrice: '' })
            }

            if (obj.springs.trackmount != "" && obj.springs.trackmount != undefined) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Montage sur rail', desc: String(obj.springs.trackmount), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Track Mount', desc: String(obj.springs.trackmount), qty: 0, insPrice: '', diyPrice: '' })
            }

            if (obj.springs.lifttype != "" && obj.springs.lifttype != undefined) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Type d ascenseur', desc: String(obj.springs.lifttype), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Lift Type', desc: String(obj.springs.lifttype), qty: 0, insPrice: '', diyPrice: '' })
            }

            if (obj.springs.trackradius != "" && obj.springs.trackradius != undefined) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Rayon de piste', desc: String(obj.springs.trackradius), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Track Radius', desc: String(obj.springs.trackradius), qty: 0, insPrice: '', diyPrice: '' })
            }

            if (obj.springs.roofpitch != "" && obj.springs.roofpitch != undefined) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Emplacement du toit', desc: String(obj.springs.roofpitch), qty: 0, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'commTrackSprings', subItem: returnMoney, title: 'Roof Pitch', desc: String(obj.springs.roofpitch), qty: 0, insPrice: '', diyPrice: '' })

            }
        }
        if (obj.INSTALLTYPE == 'Installed' || obj.INSTALLTYPE == 'DIY') {

            if (obj.TYPE == 'COM' && orderObj.jambtype == 'Steel' && !isUserSizeSelected) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commJamb', subItem: false, obj: 'true', title: 'Type de jambage', desc: 'Steel Jamb Mounting Plates x 1', qty: 1, insPrice: '', diyPrice: 30 })
                else
                    descArray.push({ systemName: 'commJamb', subItem: false, obj: 'true', title: 'Jamb Type', desc: 'Steel Jamb Mounting Plates x 1', qty: 1, insPrice: '', diyPrice: 30 })
            }

            if (orderObj.extendedShaft == true) {
                if (lng == 'fr')
                    descArray.push({ systemName: 'commShaft', subItem: false, obj: 'true', title: 'Arbre', desc: 'Extended Solid Shaft', qty: 1, insPrice: '', diyPrice: '' })
                else
                    descArray.push({ systemName: 'commShaft', subItem: false, obj: 'true', title: 'Shaft', desc: 'Extended Solid Shaft', qty: 1, insPrice: '', diyPrice: '' })
            }

            if (obj.opener.opener != '') {

                obj.opener.opener.QTY = obj.opener.QTY

                replaceJunkCharacters(obj.opener.opener);

                if (lng == 'en' || lng == 'ca') {
                    descArray.push({
                        systemName: 'resOpener', title: 'Opener', subItem: false, desc: obj.opener.opener.item_name + '(' + obj.opener.QTY + ')', qty: 0, insPrice: '', diyPrice: '', obj:
                            obj.opener.opener
                    })
                }
                if (lng == 'fr') {

                    descArray.push({
                        systemName: 'resOpener', title: 'Ouvre-Porte', subItem: false, desc: obj.opener.opener.item_name + '(' + obj.opener.QTY + ')', qty: 0, insPrice: '', diyPrice: '', obj:
                            obj.opener.opener
                    })
                }



                if (obj.opener.opener.railextendertext != '') {
                    if (lng == 'en' || lng == 'ca') {
                        descArray.push({ systemName: 'resOpenerExt', title: 'Opener', subItem: true, desc: obj.opener.opener.railextendertext + ' (' + obj.opener.QTY + ')', qty: 0, insPrice: '0', diyPrice: '0', obj: { item_id: 999, unitprice: obj.opener.opener.railextenderprice, price: 0 } })
                    }
                    if (lng == 'fr') {
                        descArray.push({ systemName: 'resOpenerExt', title: 'Ouvre-Porte', subItem: true, desc: obj.opener.opener.railextendertext + ' (' + obj.opener.QTY + ')', qty: 0, insPrice: '0', diyPrice: '0', obj: { item_id: 999, unitprice: obj.opener.opener.railextenderprice, price: 0 } })
                    }

                }

                var accPush = false;
                for (var i = 0; i < obj.opener.items.length; i++) {
                    var it = obj.opener.items[i];

                    if (it.QTY > 0) {

                        if (!accPush) {
                            if (lng == 'en' || lng == 'ca') {
                                descArray.push({ systemName: 'resOpener', title: 'Opener Accessories', subItem: false, desc: '', qty: it.QTY, insPrice: '', diyPrice: '' })
                            }
                            if (lng == 'fr') {
                                descArray.push({ systemName: 'resOpener', title: 'Ouvre-Porte Accessories', subItem: false, desc: '', qty: it.QTY, insPrice: '', diyPrice: '' })
                            }
                            accPush = true;
                        }
                        replaceJunkCharacters(obj.opener.items[i]);
                        descArray.push({
                            systemName: 'resOpener', title: '', subItem: true, desc: obj.opener.items[i].item_name + ' (x' + it.QTY + ')', obj: it, qty:
                                it.QTY, insPrice: '', diyPrice: ''
                        })
                    }


                }

            }
        }
    }

    if (obj.TYPE == 'GDO') {
        replaceJunkCharacters(obj.opener.opener);
        descArray.push({
            systemName: 'resOpener', title: obj.opener.opener.item_name, subItem: false, desc: '', qty: 0, insPrice: '', diyPrice: '', obj: obj.opener.opener
        })


        if (obj.opener.opener.railextendertext != '') {
            descArray.push({ systemName: 'resOpenerExt', title: '', subItem: true, desc: obj.opener.opener.railextendertext + ' (' + obj.QTY + ')', qty: 0, insPrice: '0', diyPrice: '0', obj: { item_id: 999, unitprice: obj.opener.opener.railextenderprice, price: 0 } })

        }

        var accPush = false;
        for (var i = 0; i < obj.opener.items.length; i++) {
            var it = obj.opener.items[i];

            if (it.QTY > 0) {

                if (!accPush) {
                    descArray.push({ systemName: 'resOpener', title: 'Opener Accessories', subItem: false, desc: '', qty: it.QTY, insPrice: '', diyPrice: '' })
                    accPush = true;
                }
                if (it.item_id == 51) {
                    descArray.push({
                        systemName: 'resOpener', title: '', subItem: true, desc: obj.opener.items[i].item_name + ' ($' + it.item_price + ' each)', cartDesc: obj.opener.items[i].item_name + ' (x' + it.QTY + ' $' + it.item_price + ' each)', obj: it, qty: it.QTY,
                        insPrice: '', diyPrice: ''
                    })

                } else {
                    descArray.push({
                        systemName: 'resOpener', title: '', subItem: true, desc: it.QTY + ' - ' + obj.opener.items[i].item_name + ' ($' + it.item_price + ' each)', cartDesc: '<strong>' + obj.opener.items[i].item_name + '</strong> (x' + it.QTY + ' $' + it.item_price + ' each)', obj: it, qty: it.QTY,
                        insPrice: '', diyPrice: ''
                    })
                }
            }


        }


    }

    $.each(obj.additional.items, function (index, value) {
        ////console.log('11111111')
        if (value.useranswer != '') {
            if (Number(value.useranswer.config) != 0) {
                var mydesc = value.item_list_text;

                if (value.item_list_textModified != undefined) {
                    mydesc = value.item_list_textModified
                }

                try {
                    if (value.item_id != 10) {
                        if (value.item_id != 999) {
                            descArray.push({ systemName: 'resQ', title: '', subItem: false, desc: mydesc, obj: value.useranswer, qty: 0, insPrice: '', diyPrice: '' })
                        }
                        else if (value.isMiles && Number(value.qty) > 30) {
                            ////console.log('MILES')
                            descArray.push({ systemName: 'resQesution', title: '', subItem: false, desc: "Delivery " + value.item_list_textModified, obj: value, qty: 0, insPrice: '', diyPrice: '' })
                        }

                        else {
                            if (!value.isMiles) {
                                descArray.push({ systemName: 'resQ', title: 'Lead Paint Test', subItem: false, desc: 'Required', obj: value.useranswer, qty: 0, insPrice: '', diyPrice: '' })
                            }
                        }
                    }
                    if (value.item_id == 10) {
                        if (value.qty > 0)
                        { value.useranswer.QTY = value.qty; }

                        descArray.push({ systemName: 'resQ', title: '', subItem: false, desc: mydesc, obj: value.useranswer, qty: value.qty, insPrice: '', diyPrice: '' })
                    }
                } catch (e) {
                    descArray.push({ systemName: 'resQ', title: '', subItem: false, desc: mydesc, obj: value.useranswer, qty: 0, insPrice: '', diyPrice: '' })

                }
            }
        }
    });


    for (var i = 0; i < descArray.length; i++) {
        var desc = descArray[i].desc
        if (desc == undefined || desc.toLowerCase() == 'none' || desc.toLowerCase() == ' none' || desc.toLowerCase() == 'none (x0)' || desc.toLowerCase() == 'undefined (xundefined per door)' || desc.toLowerCase() == 'none (xundefined per door)' || desc.toLowerCase() == 'none (xundefined)' || desc.toLowerCase() ==
            'undefined (xundefined)' || desc.toLowerCase() == ' none (xundefined)' || desc.toLowerCase() == 'undefined') {
            descArray.splice(i, 1);
            i--;
        }
    }


    for (var ii = 0; ii < descArray.length; ii++) {
        if (descArray[ii].obj != undefined) {

            try {
                descArray[ii].desc = descArray[ii].replace(/Â/g, '');
            } catch (e) { }

            if (obj.TYPE == 'COM') {
                descArray[ii].insPrice = ""
                descArray[ii].unitinsPrice = ""
            }
            else {
                descArray[ii].insPrice = checkPrice(obj, descArray[ii].obj, true, returnMoney, descArray[ii].systemName)
                descArray[ii].unitinsPrice = descArray[ii].insPrice[2]
            }
            descArray[ii].diyPrice = checkPrice(obj, descArray[ii].obj, false, returnMoney, descArray[ii].systemName)
            descArray[ii].unitdiyPrice = descArray[ii].diyPrice[2]
        }
    }

    return descArray
}


function checkPrice(targ, obj, labor, returnMoney, nme) {

    if (typeof (targ) === 'undefined') targ = cObj;

    if (nme == 'resQ' && obj.item_name == 'oprinfb') {
        var orbPrice = 0;
        for (var orbCount = 0; orbCount < obj.orbData.length; orbCount++) {
            var orbQuantity = Number(obj.orbData[orbCount].quantity);
            orbPrice += (Number(obj.orbData[orbCount].item_price) * Number(orbQuantity));
        }

        if (orbPrice != 0) {
            obj.item_price = orbPrice;
        }
    }

    var ip = cP(targ, obj)
    //shankar added for medillion hardware promo
    if (lng != 'en' && $promoIsEnable == true && obj.config == "ADDL-HVHDW" && obj.item_price == 89)
        var ip = cP(targ, obj, 'hardware')

    if (nme == 'resOpenerExt') {
        ip = cP(targ, obj, 'resOpenerExt');
    }
    if (nme == 'resModel' || nme == 'commModel') {
        ip = cP(targ, obj, 'models');
    }

    if (nme == 'resHardware') {
        if (lng != 'fr') {
            ip = cP(targ, obj, 'Hardware');
        } else {
            ip = cP(targ, obj, 'Quincailleries');
        }


    }

    if (nme == 'resTopSection' || nme == 'commTopSection') {
        ip = cP(targ, obj, 'Windows');
    }
    if (nme == 'commTrackSprings') {
        ip = cP(targ, obj, 'Springs');
    }


    var iPrice = ip.diy
    if (labor) {
        iPrice = ip.install
        if (ip.install == "undefined") { iPrice = ip.diy }

        if (nme == 'resModel') {
            iPrice += cP(targ, obj, 'Labor').install
        }
    }

    if (nme == 'commJamb') {
        iPrice = 30;
    }

    iPrice = Number(iPrice).toFixed(2);

    var uPrice = iPrice

    if (obj.QTY != undefined) {
        iPrice = Number(iPrice * obj.QTY).toFixed(2);

    }
    //Gallery Decorative Hardware Change - Start
    var prodId = 0;
    var widthFt = 0;
    var widthIn = 0;
    var uWidth = 0;
    var kitQty = 0;
    if (targ.product != undefined) {
        prodId = targ.product.product.item_id;
        widthFt = Number(targ.size.width.wf) * 12;
        widthIn = Number(targ.size.width.wi);
        uWidth = widthFt + widthIn;
        kitQty = 0;
    }

    if (orderObj.extendedShaft == true && nme == 'commShaft') {
        var shaftCost = (((1 + Number(targ.size.width.wf)) * Number(8.21)) + Number(10.92));
        iPrice = shaftCost.toFixed(2);
    }
    if (nme == "resHardware" && prodId == 12 && (obj.item_id == 14 || obj.item_id == 17)) {
        if (obj.numofKits != undefined) {
            if (Number(obj.numofKits) > 0) {
                if (uWidth >= 178 && uWidth <= 228) {
                    kitQty = Number(obj.numofKits) - 1;
                }
                else if (uWidth < 178 || uWidth > 228) {
                    kitQty = 0;
                }
                iPrice = Number(iPrice * kitQty).toFixed(2);
            }

        }
    }
    else {
        var numofKits = obj.numofKits;
        if (String(obj.numofKits).indexOf('B') > -1) {
            numofKits = Number(String(obj.numofKits).substr(0, 1));
        }

        if (obj.numofKits != undefined) {
            iPrice = Number(iPrice * numofKits).toFixed(2);

        }
    }

    if (lng == 'en' || lng == 'ca') {
        return ['$' + iPrice, '$' + iPrice, '$' + uPrice];
    }
    if (lng == 'fr') {
        return [iPrice + ' $', iPrice + ' $', uPrice + ' $'];
    }


}
//Gallery Decorative Hardware Change - end
function getConfigPrice() {
    var prc = 0;
    return prc
}

function getVisUpdate(obj, targ, elemselector) {

    if (typeof (targ) === 'undefined') targ = 'doorVis';
    if (typeof (obj) === 'undefined') obj = cObj;

    var viewD = 'door'

    if (targ == 'doorVis') {
        targ = $('#doorVis');
    } else {
        viewD = 'home'
        targ = $('#homeVis');
    }

    if (elemselector) {
        targ = $(elemselector);
    }

    var buildObj = {
        centergrooves: 0,
        claddingswap: "",
        colorcode: "",
        colorswaprule: "",
        constructionmodel: "",
        constructionswaprule: "",
        designimage: "",
        doorcolumns: 0,
        doorrows: 0,
        glaz: 0,
        handleplacement: "",
        hardwarehandle: "",
        hardwarehinge: "",
        hardwarestepplate: "",
        hingeplacement: "",
        overlaycolor: "",
        productid: 0,
        stepplateplacement: "",
        topsectionimage: "",
        topsectionrow: "0"
    };

    var dor = obj

    if (dor.TYPE != "GDO") {
        if (dor.product.product != '') buildObj.productid = Number(dor.product.product.item_id);
        if (dor.design != '') {
            buildObj.designimage = dor.design.dsgn.visimage;
            buildObj.doorcolumns = Number(dor.design.columns);
            buildObj.doorrows = Number(dor.design.rows);
        }


        if (dor.construction.construction != '') {
            buildObj.constructionswaprule = dor.construction.construction.constructionswaprule;
        }

        if (dor.construction.cladding != '') {
            buildObj.constructionswaprule = dor.construction.cladding.imageswaprule;
        }
        try {
            if (dor.construction.groove != '') {
                buildObj.centergrooves = dor.construction.groove.nogrooves;
            }
        } catch (e) { }

        if (dor.color.base != '') {
            buildObj.colorcode = dor.color.base.colorcode;
            buildObj.overlaycolor = ".94,.94,.94,1,25,25,25,0";

        }
        if (dor.color.base != '') {
            buildObj.colorswaprule = dor.color.base.colorswaprule;
        }

        if (dor.product.product.item_id == 11) {
            buildObj.overlaycolor = dor.color.base.colorcode;
            buildObj.colorcode = ".94,.94,.94,1,25,25,25,0";
            if (dor.color.overlay != '') {
                buildObj.colorcode = dor.color.overlay.colorcode;
            }


        }


        if (dor.product.product.item_id == 9) {
            buildObj.overlaycolor = dor.color.base.colorcode;
            buildObj.colorcode = dor.color.base.colorcode;
            if (dor.color.overlay != '') {
                buildObj.colorcode = dor.color.base.colorcode;
            }
        }


        if (Number(dor.product.product.item_id) == 30) {
            buildObj.overlaycolor = '';
        }

        if (dor.windows.topsection && dor.windows.topsection != '') {
            buildObj.topsectionimage = dor.windows.topsection.visimage;
            try {
                if (dor.windows.glasstype.Config == undefined) {
                    if (dor.windows.topsection.glasstypes == undefined) {
                        buildObj.glaz = 'GLAZ-SOL'
                    }
                    else {
                        buildObj.glaz = dor.windows.topsection.glasstypes[0].Config;
                    }
                }
                else {
                    buildObj.glaz = dor.windows.glasstype.Config;
                }
            }
            catch (e) { }
        }
        buildObj.glassSection = dor.windows.selectedGlassSection;
        //shankar added this, for restopsection placement
        if (dor.windows.placement && dor.windows.placement != '') buildObj.topsectionrow = dor.windows.placement.item_id;
        //if (dor.windows.placement != '') buildObj.topsectionrow = dor.windows.placement;
        if (dor.TYPE == "COM") {
            // shankar added this, for comtopsection placement
            if (dor.windows.placement != '') buildObj.topsectionrow = dor.windows.placement;
            if (dor.windows.glasstypePlacement != "") {
                var separators = ['th', 'rd', 'nd'];
                var placement = dor.windows.glasstypePlacement;
                var res = placement.split("-");
                res = res[1].split(new RegExp('[' + separators.join('') + ']', 'g'));
                //buildObj.topsectionrow = res[0]; //added shankar for comtopsection placement
            }
        }


        try {
            if (dor.hardware.hinge != '') {
                buildObj.hardwarehinge = dor.hardware.hinge.visimage;
                buildObj.hingeplacement = dor.hardware.hinge.placement;
            }

        } catch (e) { }

        if (dor.hardware.stepplate != '') {
            buildObj.hardwarestepplate = dor.hardware.stepplate.visimage;
            buildObj.stepplateplacement = dor.hardware.stepplate.placement;
        }
        if (dor.hardware.handle != '') {
            buildObj.hardwarehandle = dor.hardware.handle.visimage;
            buildObj.handleplacement = dor.hardware.handle.placement;
        }


        if (buildObj.overlay != undefined) {
            buildObj.overlay = ''
        }
    }
    else {
        if (dor.opener.opener != '') {
            buildObj.productid = Number(dor.opener.opener.item_id);
            buildObj.designimage = dor.opener.opener.item_thumbnail;
        }
    }

    ////console.log(buildObj)

    //if (dor.TYPE == "COM") {
    //    if (cObj.windows.glasstypeSection != '') {
    //        var noOfGlases = Number(cObj.windows.glasstypeSection.charAt(0))
    //        for (var i = 0; i < noOfGlases; i++) {
    //            buildObj.topsectionrow = Number(buildObj.topsectionrow) - i;
    //            targ.DoorVisualization('view', viewD)
    //            targ.DoorVisualization('update', buildObj)
    //        }
    //    }
    //    else {
    //        targ.DoorVisualization('view', viewD)
    //        targ.DoorVisualization('update', buildObj)
    //    }
    //}
    //else
    {
        targ.DoorVisualization('view', viewD)
        targ.DoorVisualization('update', buildObj)
    }


}




function getDoorPrice(obj, useQty, retunMoney, DOORONLY) {
    var dp = 0;
    var labor = 0;
    var dpArray = [];
    var otArray = [];
    var qty = 1;
    if (typeof (DOORONLY) === 'undefined') DOORONLY = false;
    if (typeof (retunMoney) === 'undefined') retunMoney = true;
    if (typeof (useQty) === 'undefined') useQty = false;
    ////console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Door Price >>>>>>>>>>>>>>>>>')
    ////console.log(obj)

    if (useQty)
        qty = obj.QTY;

    var type = obj.TYPE
    //console.log(type)
    switch (type) {
        case 'COM':
        case 'RES':
            {
                if (obj.construction.construction == "") {
                    if (obj.design.dsgn != "") {
                        var dFound = false
                        $.each(obj.design.dsgn.constructions, function (index, value) {
                            if (value.isdefault) {
                                dp = cP(obj, value, 'models');
                                labor = cP(obj, value, 'Labor');
                                dpArray.push(dp)
                                dFound = true;
                            }
                        });
                        if (!dFound) {
                            dp = cP(obj, obj.design.dsgn.constructions[0], 'models');
                            labor = cP(obj, obj.design.dsgn.constructions[0], 'Labor');
                            dpArray.push(dp)
                        }
                    }
                }
                else {
                    dp = cP(obj, obj.construction.construction, 'models');
                    labor = cP(obj, obj.construction.construction, 'Labor');
                    dpArray.push(dp)
                }

                if (obj.construction.groove != "") {
                    dp = cP(obj, obj.construction.groove, 'models');
                    dpArray.push(dp)
                }

                if (obj.construction.vinyl != "") {
                    dp = cP(obj, obj.construction.vinyl);
                    dpArray.push(dp)
                }

                //TopSection Pricing (LOOK FORWARD)
                if (obj.windows.glasstype && obj.windows.glasstype == "") {
                    if (obj.windows.topsection && obj.windows.topsection != "") {
                        var dFound = false
                        $.each(obj.windows.topsection.glasstypes, function (index, value) {
                            if (value.isdefault && !dFound) {
                                dp = cP(obj, value, 'Windows');
                                dpArray.push(dp)
                                dFound = true;
                            }
                        });
                        if (!dFound) {
                            dp = cP(obj, obj.windows.topsection.glasstypes[0], 'Windows');
                            dpArray.push(dp)
                        };
                    }
                }
                else {
                    if (type == 'RES') {
                        dp = cP(obj, obj.windows.glasstype, 'Windows');
                        dpArray.push(dp)
                    }
                }
                if (obj.color.base != "") {
                    dp = cP(obj, obj.color.base);
                    dpArray.push(dp)
                }

                if (obj.windows.topsection && obj.windows.topsection != "") {
                    if (type == 'COM') {
                        if (obj.windows.selectedGlassSection != "") {

                            dp = cP(obj, obj.windows, 'glassType');
                            dpArray.push(dp)
                        }
                    }
                }

                if (type == 'COM') {
                    if (obj.springs.springtype != "") {

                        dp = cP(obj, obj.springs, 'Springs');
                        dpArray.push(dp)
                    }

                }

                var pid = obj.product.product.item_id;
                if (obj.color.overlay != "" && pid == 11) {
                    try {
                        dp = cP(obj, obj.color.overlay);
                        dpArray.push(dp)
                    }
                    catch (e) { }
                }
                if (!DOORONLY) {

                    if (obj.INSTALLTYPE == 'Installed' || obj.INSTALLTYPE == 'DIY') {

                        if (orderObj.jambtype == 'Steel') {
                            dp.diy = 15;
                            dp.nDiy = 15;
                            dp.install = '';
                            dp.nInstall = '';
                            dpArray.push(dp)
                        }

                        if (obj.opener.opener != '') {
                            for (var i = 0; i < obj.opener.QTY; i++) {
                                dp = cP(obj, obj.opener.opener);
                                if (obj.opener.opener.railextendertext != '' || obj.opener.opener.railextendertext != undefined) {
                                    dp.diy += Number(obj.opener.opener.railextenderprice);
                                    dp.nDiy += Number(obj.opener.opener.railextenderprice);
                                    dp.install += Number(obj.opener.opener.railextenderprice);
                                    dp.nInstall += Number(obj.opener.opener.railextenderprice);
                                }
                                otArray.push(dp)
                            }
                            for (var j = 0; j < obj.opener.items.length; j++) {
                                var it = obj.opener.items[j];
                                if (Number(it.QTY) > 0) {
                                    for (var i = 0; i < Number(it.QTY); i++) {
                                        dp = cP(obj, it);
                                        otArray.push(dp)
                                    }
                                }
                            }
                        }
                    }


                    //Gallery Decorative Hardware Change - Start
                    var handleQty = 0;
                    var prodId = obj.product.product.item_id;
                    var widthFt = (obj.size.width.wf) * 12;
                    var widthIn = obj.size.width.wi;
                    var uWidth = Number(widthFt) + Number(widthIn);


                    var shaftCost = (((1 + Number(obj.size.width.wf)) * Number(8.21)) + Number(10.92));

                    if (orderObj.extendedShaft == true && obj.TYPE == 'COM') {
                        dp.diy += shaftCost / 2;
                        dp.nDiy += shaftCost / 2;
                        dp.install = '';
                        dp.nInstall = '';
                        dpArray.push(dp)
                    }

                    if (obj.hardware.handle != "") {
                        handleQty = obj.hardware.handle.numofKits;
                        if (Number(obj.hardware.handle.item_id) == 14 && uWidth >= 178 && uWidth <= 228) {
                            if (handleQty > 0) {
                                handleQty = handleQty - 1;
                            }
                        }
                        else {
                            if (Number(obj.hardware.handle.item_id) == 14 && (uWidth < 178 || uWidth > 228)) {
                                handleQty = 0;
                            }
                        }
                        if (handleQty != 0) {
                            if (obj.hardware.handle.numofKits == undefined) {
                                if (lng != 'fr') {
                                    dp = cP(obj, obj.hardware.handle, 'Hardware', DOORONLY);
                                } else {
                                    dp = cP(obj, obj.hardware.handle, 'Quincailleries', DOORONLY);
                                }
                                dpArray.push(dp)
                            }
                            else {
                                for (var i = 0; i < Number(handleQty); i++) {
                                    if (lng != 'fr') {
                                        dp = cP(obj, obj.hardware.handle, 'Hardware', DOORONLY);
                                    } else {
                                        dp = cP(obj, obj.hardware.handle, 'Quincailleries', DOORONLY);
                                    }
                                    dpArray.push(dp)
                                }
                            }

                        }
                    }

                    var stepPlateQty = 0;
                    if (obj.hardware.stepplate != "") {
                        stepPlateQty = obj.hardware.stepplate.numofKits;
                        if (Number(obj.hardware.stepplate.item_id) == 17 && uWidth >= 178 && uWidth <= 228) {
                            if (stepPlateQty > 0) {
                                stepPlateQty = stepPlateQty - 1;
                            }
                        }
                        else {
                            if (Number(obj.hardware.stepplate.item_id) == 17 && (uWidth < 178 || uWidth > 228)) {
                                stepPlateQty = 0;
                            }
                        }


                        if (stepPlateQty != 0) {
                            if (obj.hardware.stepplate.numofKits == undefined) {
                                if (lng != 'fr') {
                                    dp = cP(obj, obj.hardware.stepplate, 'Hardware', DOORONLY);
                                } else {
                                    dp = cP(obj, obj.hardware.stepplate, 'Quincailleries', DOORONLY);
                                }


                                dpArray.push(dp)
                            }
                            else {
                                for (var i = 0; i < Number(stepPlateQty); i++) {
                                    //dp = cP(obj, obj.hardware.stepplate, 'Hardware', DOORONLY);
                                    if (lng != 'fr') {
                                        dp = cP(obj, obj.hardware.stepplate, 'Hardware', DOORONLY);
                                    } else {
                                        dp = cP(obj, obj.hardware.stepplate, 'Quincailleries', DOORONLY);
                                    }
                                    dpArray.push(dp)
                                }
                            }

                        }
                    }
                    //Gallery Decorative Hardware Change - End
                    try {
                        if (obj.hardware.hinge != "") {
                            if (obj.hardware.hinge.numofKits != 0) {
                                if (obj.hardware.hinge.numofKits == undefined) {
                                    if (lng != 'fr') {
                                        dp = cP(obj, obj.hardware.hinge, 'Hardware', DOORONLY);
                                    } else {
                                        dp = cP(obj, obj.hardware.hinge, 'Quincailleries', DOORONLY);
                                    }
                                    dpArray.push(dp)
                                }
                                else {

                                    var hingeKits = Number(obj.hardware.hinge.numofKits);
                                    if (String(obj.hardware.hinge.numofKits).indexOf('B') > -1) {
                                        hingeKits = Number(String(obj.hardware.hinge.numofKits).substr(0, 1));
                                    }
                                    for (var i = 0; i < hingeKits; i++) {
                                        //dp = cP(obj, obj.hardware.hinge, 'Hardware', DOORONLY);
                                        if (lng != 'fr') {
                                            dp = cP(obj, obj.hardware.hinge, 'Hardware', DOORONLY);
                                        } else {
                                            dp = cP(obj, obj.hardware.hinge, 'Quincailleries', DOORONLY);
                                        }
                                        dpArray.push(dp)
                                    }
                                }
                            }
                        }

                    } catch (e) { }

                    try {
                        if (obj.hardware.lock != "") {
                            if (lng != 'fr') {
                                dp = cP(obj, obj.hardware.lock, 'Hardware');
                            } else {
                                dp = cP(obj, obj.hardware.lock, 'Quincailleries');
                            }

                            if (dp.install == "undefined") {
                                dp.install = dp.diy;
                                dp.nInstall = dp.nDiy;
                            }
                            dpArray.push(dp)
                        }
                    }
                    catch (e) { }


                    var oneTimeArr = [5, 999, 8]

                    $.each(obj.additional.items, function (index, value) {
                        if (value.useranswer != '') {
                            if (Number(value.useranswer.config) != 0) {
                                dp = cP(obj, value.useranswer);
                                if (lng != 'en' && $promoIsEnable == true && value.item_id == 7)
                                    dp = cP(obj, value.useranswer, 'hardware');
                                //These 4 lines added for punched angle by shankar
                                //dp.install = dp.install * Number(value.qty);
                                //dp.nInstall = dp.nInstall * Number(value.qty);     
                                //dp.diy = dp.diy * Number(value.qty);
                                //dp.nDiy =  dp.nDiy* Number(value.qty);  

                                if ($.inArray(value.item_id, oneTimeArr) == -1) {
                                    dpArray.push(dp)
                                } else {
                                    otArray.push(dp)
                                }
                            }
                        }
                    });
                }


                break;
            }

    }


    var ip = 0
    var dip = 0
    var nip = 0
    var ndp = 0

    //    $.each(dpArray, function (index, value) {
    //        ip += value.install
    //        dip += value.diy
    //        nip += value.nInstall
    //        ndp += value.nDiy
    //    });

    //    ip = Number((ip + labor.install) * qty)
    //    nip = Number((nip + labor.install) * qty)
    //    dip = Number((dip) * qty)
    //    ndp = Number((ndp) * qty)

    //WO-688398 - Start
    $.each(dpArray, function (index, value) {
        if (type == "GDO") {
            if (value.isAdditional != true) {
                ip += Number((value.install) * qty);
                dip += Number((value.diy) * qty);
                nip += Number((value.nInstall) * qty);
                ndp += Number((value.nDiy) * qty);
            }
            else {
                ip += value.install
                dip += value.diy
                nip += value.nInstall
                ndp += value.nDiy
            }
        }
        else {
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
    //WO-688398 - End
    $.each(otArray, function (index, value) {
        ip += value.install
        dip += value.diy
        nip += value.nInstall
        ndp += value.nDiy
    });

    
    if (retunMoney) {
        if (lng == 'ca' || lng == 'en') {
            var ins = " $" + Number(ip).toFixed(2).toString() + " "
            var nIns = " $" + Number(nip).toFixed(2).toString() + " "
            var diy = " $" + Number(dip).toFixed(2).toString() + " "
            var nDiy = " $" + Number(ndp).toFixed(2).toString() + " "
        }
        if (lng == 'fr') {
            var ins = " " + Number(ip).toFixed(2).toString() + " $"
            var nIns = " " + Number(nip).toFixed(2).toString() + " $"
            var diy = " " + Number(dip).toFixed(2).toString() + " $"
            var nDiy = " " + Number(ndp).toFixed(2).toString() + " $"
        }

        if (cObj.INSTALLTYPE == 'Installed') {
            var val = Number(ins.replace('$', ''));
            getTierPromoDiscnt(val);
        } else {
            var val = Number(diy.replace('$', ''));
            getTierPromoDiscnt(val);
        }

        return [ins, diy, nIns, nDiy]
    }
    else {
        var ins = Number(ip).toFixed(2)
        var nIns = Number(nip).toFixed(2)
        var diy = Number(dip).toFixed(2)
        var nDiy = Number(ndp).toFixed(2)


        if (cObj.INSTALLTYPE == 'Installed') {
            var val = Number(ins.replace('$', ''));
            getTierPromoDiscnt(val);
        } else {
            var val = Number(diy.replace('$', ''));
            getTierPromoDiscnt(val);
        }

        return [ins, diy, nIns, nDiy]
    }
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
    try{
		if (orderObj.cart.length > 1 && orderObj.promotionData.length > 1) {
			uqPromo = orderObj.promotionData[selectCartValue];
		}
	}catch(e){}
    if (typeof (isUpsell) == 'undefined') isUpsell = false;


    if (isUpsell == true) {
        if (orderObj.promotion[1] != uqPromo) { useCObj = false }
    }


    try {
        var prc = Number(pX.item_price);
        var p = Number(pX.item_price);
    } catch (e) { }

    if (gdoOpenerImagePrice == true) {
        if (pX.railextenderprice != "" && typeof (pX.railextenderprice) != "undefined" && pX.railextenderprice != 0) {
            //alert("rail22");
            //prc += pX.railextenderprice;
            //p += pX.railextenderprice;
        }
    }

    if (node == 'resOpenerExt') {
        israil = true;
        p = Number(pX.unitprice);
        prc = Number(pX.unitprice);
        node = 'Openers';
    }

    if (obj.TYPE != 'GDO') {

        if (node == 'Springs') {
            p = Number(pX.price);
            prc = Number(pX.price)

        }

        if (node == 'glassType') {
            p = Number(pX.glasstype.item_price) * Number(pX.selectedGlassSection);
            prc = Number(pX.glasstype.item_price) * Number(pX.selectedGlassSection);
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


        if (node == 'Hardware' || node == 'Quincailleries') {
            useAddres = true;
        }


        if (QPB == true) {
            useAddres = false;
        }

        if (orderObj.promotion[0].promotionid != 0 && node != undefined) {

            //nuphani


            if (freeWindowsPromo == true && (node == 'Windows' || node == 'models') && obj.product.product.QPB == true) {
                $.ajax({
                    url: getAPILink("windowsQPB", cObj),
                    dataType: 'json',
                    success: function (data) {
                        orderObj.cart[0].windows.apiData = data;
                    },
                    error: function (err) {
                        console.log('Error');
                    }
                });
            }

            var glassPrice = 0;
            var fwPromoPrice = 0;
            var isFWPromo = false;
            if (freeWindowsPromo == true && (node == 'Windows' || node == 'models')) {
                var addOnce = false;
                glassPrice = 0;
                var pid = obj.product.product.item_id;
                if (pid == "") {
                    if (obj.product.product.QPB == true) {
                        isFWPromo = true;
                    }
                }
                if (pid == "13" || pid == "14" || pid == "24" || isFWPromo == true) {
                    var topSectionsCart = orderObj.cart[0].windows;
                    for (var i = 0; i < topSectionsCart.apiData.length; i++) {
                        if (topSectionsCart.apiData[i].item_id == '302' || topSectionsCart.apiData[i].item_id == '303') {
                            for (var j = 0; j < topSectionsCart.apiData[i].glasstypes.length; j++) {
                                if (topSectionsCart.apiData[i].glasstypes[j].item_id == '6' || topSectionsCart.apiData[i].glasstypes[j].item_id == '2') {
                                    if (pX.Config != "GLAZ-SOL") {
                                        glassPrice = Number(topSectionsCart.apiData[i].glasstypes[j].item_price);
                                    }

                                    if (addOnce == false) {
                                        fwPromoPrice = glassPrice;
                                    }
                                }
                            }
                        }
                    }

                }
            }

            //nuphani
            try {
                var $promoData;
                $.each(uqPromo, function (index, value) {



                    promoDta = value;
                    ogPromo = value;
                    promoData = promoDta;
                    if (israil == false) {
                        prc = Number(pX.item_price);
                        p = Number(pX.item_price);
                    }


                    if ((obj.product.product.item_id == 30 || obj.product.product.item_id == 16) && (node == 'Hardware' || node == 'Quincailleries')) {
                        p = Number(pX.item_installed_price);
                        prc = Number(pX.item_installed_price);
                    }

                    if (useAddres) {

                        if (ogPromo.InstallType != 'DIY') {
                            //alert( pX.item_installed_price)
                            prc = pX.item_installed_price;
                            p = pX.item_installed_price;
                        } else {

                            prc = pX.item_price;
                            p = pX.item_price;
                        }

                    } else {
                        if (israil == false) {
                            prc = Number(pX.item_price);
                            p = Number(pX.item_price);
                        }


                        if ((obj.product.product.item_id == 30 || obj.product.product.item_id == 16 || obj.product.product.item_id == 9) && (node == 'Hardware' || node == 'Quincailleries')) {
                            p = Number(pX.item_installed_price);
                            prc = Number(pX.item_installed_price);
                        }

                    }

                    if (node == 'Windows') {
                        //prc = prc - fwPromoPrice;
                        p = p - fwPromoPrice;
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

                    if (node == 'glassType') {

                        p = Number(pX.glasstype.item_price) * Number(pX.selectedGlassSection);
                        prc = Number(pX.glasstype.item_price) * Number(pX.selectedGlassSection);

                    }

                    if (node == 'Springs') {
                        p = Number(pX.price);
                        prc = Number(pX.price)

                    }


                    if (String(promoDta.promotiontype).toLowerCase() == 'm') {
                        var model = ''
                        // console.log(promoDta)
                        if (obj.construction.construction == "") {
                            if (obj.design.dsgn != "") {
                                var dFound = false
                                if (obj.design.dsgn.construction != undefined) {
                                    $.each(obj.design.dsgn.constructions, function (index, value) {
                                        if (value.isdefault) {
                                            model = value
                                            dFound = true;
                                        }
                                    });
                                    if (!dFound) {
                                        model = obj.design.dsgn.constructions[0]
                                    }
                                }
                                else if (obj.design.dsgn.stockdoorconstructions != undefined) {
                                    model = obj.design.dsgn.stockdoorconstructions[0];
                                }
                            }
                        }
                        else {
                            model = obj.construction.construction
                        }

                        if (isUpsell == true) {
                            if (!useCObj) {
                                model = pX
                            }
                        }
                        //console.log(model)


                        var modList = promoDta.models
                        //console.log(modList)
                        mPromoType = 'm'
                        $.each(modList, function (idx, val) {

                            if (model.ClopayModelNumber == val.valuestr) {
                                promoDta = val;
                                modMatch = true;
                            }
                        });
                    }





                    var passPromo = true;

                    if (node == 'models') {
                        if (modMatch)
                            passPromo = false;
                    }

                    if (passPromo) {
                        var cc = pX.config;
                        ////console.log(node)
                        var vs = ''

                        try {
                            if (ogPromo[node])
                                vs = ogPromo[node][0].valuestr;
                        }
                        catch (e) { }

                        //Test Bit until Phil FIxes REMOVE AFTER
                        if (node == 'models') {
                            vs = "All"
                        }

                        if (obj.TYPE == 'COM') {
                            if (node == 'Hardware' || node == 'Quincailleries' || node == 'glassType' || node == 'Springs') { vs = "All" }
                        }

                        // console.log(vs +' - '+node)
                        if (vs != "" && vs != undefined) {

                            if (vs == "All") {
                                applyPromo = true;
                            }
                            else {
                                // not all, so check cc's
                                var cc_array = vs.split(",");
                                for (var i = 0; i < cc_array.length; i++) {
                                    if (cc_array[i] == cc) {
                                        //alert('match')
                                        applyPromo = true;
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        applyPromo = modMatch;
                    }


                    var userWidth = (12 * Number(obj.size.width.wf)) + Number(obj.size.width.wi);
                    switch (promoDta.promotiontype) {
                        case "D": { }
                        case "d":
                            {
                                var discountAmount = 0;
                                if (userWidth <= doubleInch) {
                                    discountAmount = Number(promoDta.singledoorvalue);
                                }
                                else {
                                    discountAmount = Number(promoDta.doubledoorvalue);
                                }

                                if (useNonPromoModelTags && nonPromoModelTags[String(pX.XMLCOI)] != undefined) {
                                    discountAmount = 0;
                                }

                                if (applyPromo)

                                    p = p - discountAmount;
                                break;
                            }
                        case "p": { }
                        case "N": { }
                        case "n": { }
                        case "P":
                            {
                                // percent amount
                                var percent = Number(promoDta.percentamount) / 100;
                                ////console.log(percent)
                                ////console.log(promoDta.percentamount)

                                if (modMatch) {
                                    if (userWidth <= doubleInch) {
                                        percent = Number(promoDta.singledoorvalue) / 100;
                                    }
                                    else {
                                        percent = Number(promoDta.doubledoorvalue) / 100;
                                    }
                                }
                                if (useNonPromoModelTags && nonPromoModelTags[String(pX.XMLCOI)] != undefined) {
                                    percent = 0;
                                }
                                //shankar added
                                if (lng != 'en' && $promoIsEnable == true && pX.item_price == 89) { applyPromo = true }
                                if (lng != 'en' && $promoIsEnable == true && node == "Labor") { applyPromo = true }
                                if (applyPromo) {
                                    ////console.log(percent)
                                    ////console.log(p * percent)
                                    ////console.log(p)
                                    p = p - (p * percent);
                                    ////console.log(p * percent)
                                }
                                break;
                            }
                    }
                    //   console.log(p + ' -!!!!!!!!!!- ' + prc + ' == ' + node)
                    //console.log(pX)



                    if ((isNaN(p)) || (typeof (p) == undefined)) {
                        p = 0;
                    }
                    if ((isNaN(prc)) || (typeof (prc) == undefined)) {
                        prc = 0;
                    }

                    if (ogPromo.InstallType != 'DIY') {
                        rt.install = p;
                        rt.nInstall = prc;
                        if (lng != 'en' && pX.item_price == 89) { rt.nInstall = p; }
                    } else if (ogPromo.InstallType == 'DIY') {
                        rt.diy = p;
                        rt.nDiy = prc;
                        if (lng != 'en' && pX.item_price == 89) { rt.nDiy = p; }
                    }

                    if (rt.install == 0 && rt.diy != 0) {
                        rt.install = rt.diy;
                    }

                    if (rt.nInstall == 0 && rt.nDiy != 0) {
                        rt.nInstall = rt.nDiy;
                    }

                    if (ogPromo.InstallType == null || ogPromo.InstallType == 'null') {
                        rt.install = p;
                        rt.nInstall = prc;
                        rt.diy = p;
                        rt.nDiy = prc;
                        //if (node == "Hardware")
                        //{
                        // rt.install = Number(pX.item_installed_price);
                        //rt.nInstall = Number(pX.item_installed_price);
                        //}
                    }

                })
            } catch (e) { }
        } else {


            rt.install = p;
            rt.nInstall = prc;
            rt.diy = p;
            rt.nDiy = prc;

			/*if(pX.item_id == 26){
            	rt.install = p*Number(pX.QTY);
				rt.nInstall = prc*Number(pX.QTY);
				rt.diy = p*Number(pX.QTY);
				rt.nDiy = prc*Number(pX.QTY);
            }*/


            if (useAddres) {

                if (!isNaN(pX.item_installed_price) && (typeof (pX.item_installed_price) != undefined)) {
                    rt.install = pX.item_installed_price;
                    rt.nInstall = pX.item_installed_price;
                }
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



function getOrderTotal() {
    var cart = orderObj.cart
    var total = 0;
    var dI = 0;

    if (orderObj.cart.length > 1)
        selectedAnotherDoor = true;

    if (orderObj.orderInstallType == 'DIY' || orderObj.orderInstallType == 'GDO') {
        dI = 1;
    }


    ////console.log(orderObj.orderInstallType)
    ////console.log(dI)

    for (var i = 0; i < cart.length; i++) {

        var it = cart[i];
        var type = it.TYPE
        var isValid = it.isValid
        var itTotal = [0, 0];

        switch (type) {
            case 'RES':
                {

                    if (it.isPurchase) {
                        if (selectedAnotherDoor == true) { selectCartValue = i }
                        itTotal = getDoorPrice(it, true, false)
                    }
                    break;
                }
            case 'GDO':
                {
                    if (it.isPurchase) {
                        itTotal = getDoorPrice(it, true, false)
                    }
                    break;
                }
            case 'COM':
                {
                    if (it.isPurchase) {
                        itTotal = getDoorPrice(it, true, false)
                    }
                    break;
                }
            case 'ENTRY':
                {
                    alert('NO ENTRY')
                    break;
                }
            default:
                {
                    alert('NO TYPE PASSED Helper')
                }
        }

        ////console.log(it)
        ////console.log(type)
        ////console.log(itTotal)

        total = Number(total) + Number(itTotal[dI])
        ////console.log(total)

    }

    getTierPromoDiscnt(total);
    if (lng == 'fr') {
        var display = " " + Number(total).toFixed(2).toString() + " $ ";
    } else {
        var display = " $" + Number(total).toFixed(2).toString();
    }
    total = Number(total).toFixed(2)
    return [display, total]


}


function getTax() {
    var _taxRate
    var ucityTax = orderObj.locale.citytax;
    var ustateTax = orderObj.locale.statetax;
    var ucountyTax = orderObj.locale.countytax;
    var ustoreTax = orderObj.store.storetax;


    if (orderObj.orderInstallType == "Installed" || orderObj.orderInstallType == "GDO") {


        switch (String(orderObj.locale.state)) {

            case "MS":
            case "NM":
                {
                    _taxRate = ustoreTax;
                    break;

                };

            case "AK":
            case "AZ":
            case "CO":
            case "GA":
            case "HI":
            case "IA":
            case "MA":
            case "NE":
            case "RI":
            case "WA":
                {
                    _taxRate = ucityTax + ustateTax + ucountyTax;
                    break;
                };


            default:
                {
                    _taxRate = 0;
                }

        };

    } else {
        _taxRate = ustoreTax;
    }
    _taxRate = _taxRate * .01;

    if (_taxRate == NaN) {
        _taxRate = 0;
    }
    ////console.log(_taxRate)
    return _taxRate
}
function setStoreServices() {
    storeServiceCenterAvaliable = orderObj.store.isService;
    garageDoorOpenerAvaliable = true;
    if ((orderObj.store.gdo == "" || orderObj.store.gdo == null) && (orderObj.store.storegdo == "" || orderObj.store.storegdo == null)) {
        garageDoorOpenerAvaliable = false;
    }
    //console.log(storeServiceCenterAvaliable+" "+garageDoorOpenerAvaliable);
}

//Function to validate existing configuration based on given size.
function validateConfiguration(widthFt, widthIn, heightFt, heightIn) {

    var objValidation = jQuery.extend(new Object(), cObj);
    var objValidOrderObj = jQuery.extend(new Object(), orderObj);

    var cartLength = Number(orderObj.cart.length - 1);

    objValidation.size.width.wf = widthFt;
    objValidation.size.width.wi = widthIn;
    objValidation.size.width.hf = heightFt;
    objValidation.size.width.hi = heightIn;

    var curProduct = cObj.product.product.item_id;
    var curDesign = cObj.design.dsgn.item_id;
    var curModel = cObj.construction.construction.ClopayModelNumber;
    var curBaseColor = cObj.color.base.item_id;
    var curOverlayColor = cObj.color.overlay.item_id;
    var curWindow = cObj.windows.topsection.item_id;
    var curGlassType = cObj.windows.glasstype.item_id;
    var curHandle = cObj.hardware.handle.item_id;
    var curStepPlate = cObj.hardware.stepplate.item_id;
    var curHinge = cObj.hardware.hinge.item_id;
    var curLock = cObj.hardware.lock.item_id;

    //alert(curBaseColor+"    XXXXXXXX     "+curOverlayColor)

    var validProduct = false;
    var validDesign = false;
    var validModel = false;
    var validBaseColor = false;
    var validOverlayColor = false;
    var validWindow = false;
    var validGlassType = false;
    var validHandle = false;
    var validStepPlate = false;
    var validHinge = false;
    var validLock = false;
    var isQPBFlow = false;

    var isQPBFlow = false;

    isQPBFlow = cObj.product.product.QPB

    if (isQPBFlow) {
        cObj.design.dsgn.item_id = cObj.design.dsgn.item_id.toString();
        if (cObj.design.dsgn.item_id.indexOf('_') != -1) {
            curDesign = cObj.design.dsgn.item_id.substr(0, 3);
        } else {
            curDesign = cObj.design.dsgn.item_id.toString();
        }

        //curDesign = (cObj.design.dsgn.item_id.split('_').length>1)? cObj.design.dsgn.item_id.split('_')[0]:0;
        var collect = new apiData();
        $.ajax({
            url: dataURL + 'apiStockgroup.aspx?storeid=' + orderObj.store.storenumber,
            dataType: 'json',
            async: false,
            success: function (dta) {

                //console.log(dta[0])
                objValidOrderObj.stockid = dta[0].stockgroupid
            },
            error: function (err) {
                //console.log('Error');
            }
        });

        $.ajax({
            url: getAPILink("designQPB", objValidation),
            dataType: 'json',
            async: false,
            success: function (dta) {

                //console.log(dta[0])
                objValidOrderObj.cart[cartLength].design.apiData = dta
            },
            error: function (err) {
                //console.log('Error');
            }
        });

        for (var i = 0; i < objValidOrderObj.cart[cartLength].design.apiData.length; i++) {
            if (objValidOrderObj.cart[cartLength].design.apiData[i].item_id == curDesign) {
                validDesign = true;
                objValidOrderObj.cart[cartLength].design.dsgn = objValidOrderObj.cart[cartLength].design.apiData[i];
                objValidation.design.dsgn = objValidOrderObj.cart[cartLength].design.apiData[i];

                objValidation.design.rows = objValidOrderObj.cart[cartLength].design.apiData[i].Rows;
                objValidation.design.columns = objValidOrderObj.cart[cartLength].design.apiData[i].Columns;

                objValidOrderObj.cart[cartLength].design.rows = objValidOrderObj.cart[cartLength].design.apiData[i].Rows;
                objValidOrderObj.cart[cartLength].design.columns = objValidOrderObj.cart[cartLength].design.apiData[i].Columns;



                objValidOrderObj.cart[cartLength].construction.apiData = objValidOrderObj.cart[cartLength].design.apiData[i].stockdoorconstructions;
                break;
            }
        }

        if (validDesign) {
            for (var i = 0; i < objValidOrderObj.cart[cartLength].construction.apiData.length; i++) {
                if (objValidOrderObj.cart[cartLength].construction.apiData[i].ClopayModelNumber == curModel) {
                    validModel = true;
                    objValidOrderObj.cart[cartLength].construction.construction = objValidOrderObj.cart[cartLength].construction.apiData[i];
                    objValidation.construction.construction = objValidOrderObj.cart[cartLength].construction.apiData[i];
                    objValidOrderObj.cart[cartLength].color.apiData = objValidOrderObj.cart[cartLength].construction.apiData[i].colors;
                    objValidOrderObj.cart[cartLength].windows = objValidOrderObj.cart[cartLength].construction.apiData[i].TopSection;
                    objValidation.windows.topsection = objValidOrderObj.cart[cartLength].construction.apiData[i].TopSection;
                    break;
                }
            }
        }
        else {
            return false
        }

        if (validModel) {
            for (var i = 0; i < objValidOrderObj.cart[cartLength].color.apiData.length; i++) {
                if (objValidOrderObj.cart[cartLength].color.apiData[i].item_id == curBaseColor) {
                    validBaseColor = true;
                    objValidOrderObj.cart[cartLength].color.base = objValidOrderObj.cart[cartLength].color.apiData[i];
                    objValidation.color.base = objValidOrderObj.cart[cartLength].color.apiData[i];
                    break;
                }
            }
        }
        else {
            return false
        }

        if (validBaseColor) {
            if (objValidOrderObj.cart[cartLength].windows.item_id == curWindow) {
                validWindow = true;
                objValidOrderObj.cart[cartLength].windows.topsection = objValidOrderObj.cart[cartLength].windows;
                objValidation.windows.topsection = objValidOrderObj.cart[cartLength].windows;
                objValidOrderObj.cart[cartLength].windows.glasstype = objValidOrderObj.cart[cartLength].windows.topsection.glasstypes[0];


                var _split = objValidOrderObj.cart[cartLength].windows.topsection.visimage.split('.')[0].split('-')[2];
                if (_split.length == 2) {
                    var splt = objValidOrderObj.cart[cartLength].windows.topsection.visimage.replace('0', objValidation.design.rows);
                    objValidOrderObj.cart[cartLength].windows.topsection.visimage = splt;
                }



                objValidation.windows.glasstype = objValidOrderObj.cart[cartLength].windows.topsection.glasstypes[0];
            }
        }
        else {
            return false
        }

        if (validWindow) {
            validLock = true;
        }
        else {
            return false
        }
    }	//QPB complete
    else {


        $.ajax({
            url: getAPILink("product", objValidation),
            dataType: 'json',
            async: false,
            success: function (data) {
                objValidOrderObj.cart[cartLength].product = data;
            },
            error: function (err) {
                //console.log('Error');
            }
        });

        for (var i = 0; i < objValidOrderObj.cart[cartLength].product.length; i++) {
            if (objValidOrderObj.cart[cartLength].product[i].item_id == curProduct) {
                validProduct = true;
                objValidOrderObj.cart[cartLength].product.product = objValidOrderObj.cart[cartLength].product[i]
                objValidation.product.product = objValidOrderObj.cart[cartLength].product[i]
                break;
            }
        }

        if (validProduct) {
            $.ajax({
                url: getAPILink("design", objValidation),
                dataType: 'json',
                async: false,
                success: function (data) {
                    objValidOrderObj.cart[cartLength].design = data;
                },
                error: function (err) {
                    //console.log('Error');
                }
            });

            for (var i = 0; i < objValidOrderObj.cart[cartLength].design.length; i++) {
                if (objValidOrderObj.cart[cartLength].design[i].item_id == curDesign) {
                    validDesign = true;
                    objValidOrderObj.cart[cartLength].design.dsgn = objValidOrderObj.cart[cartLength].design[i];
                    objValidation.design.dsgn = objValidOrderObj.cart[cartLength].design[i];

                    objValidation.design.rows = objValidOrderObj.cart[cartLength].design[i].Rows;
                    objValidation.design.columns = objValidOrderObj.cart[cartLength].design[i].Columns;

                    objValidOrderObj.cart[cartLength].design.rows = objValidOrderObj.cart[cartLength].design[i].Rows;
                    objValidOrderObj.cart[cartLength].design.columns = objValidOrderObj.cart[cartLength].design[i].Columns;

                    objValidOrderObj.cart[cartLength].construction.apiData = objValidOrderObj.cart[cartLength].design[i].constructions;
                    break;
                }
            }
        }
        else {
            return false
        }

        if (validDesign) {
            for (var i = 0; i < objValidOrderObj.cart[cartLength].construction.apiData.length; i++) {
                if (objValidOrderObj.cart[cartLength].construction.apiData[i].ClopayModelNumber == curModel) {
                    validModel = true;
                    objValidOrderObj.cart[cartLength].construction.construction = objValidOrderObj.cart[cartLength].construction.apiData[i];
                    objValidation.construction.construction = objValidOrderObj.cart[cartLength].construction.apiData[i];
                    objValidOrderObj.cart[cartLength].color.apiData = objValidOrderObj.cart[cartLength].construction.apiData[i].colors;
                    break;
                }
            }
        }
        else {
            return false
        }

        if (validModel) {
            for (var i = 0; i < objValidOrderObj.cart[cartLength].color.apiData.length; i++) {
                if (objValidOrderObj.cart[cartLength].color.apiData[i].item_id == curBaseColor) {
                    validBaseColor = true;
                    objValidOrderObj.cart[cartLength].color.base = objValidOrderObj.cart[cartLength].color.apiData[i];
                    objValidation.color.base = objValidOrderObj.cart[cartLength].color.apiData[i];
                    break;
                }
            }

            for (var i = 0; i < objValidOrderObj.cart[cartLength].color.apiData.length; i++) {
                if (objValidOrderObj.cart[cartLength].color.apiData[i].item_id == curOverlayColor) {
                    validOverlayColor = true;
                    objValidOrderObj.cart[cartLength].color.overlay = objValidOrderObj.cart[cartLength].color.apiData[i];
                    objValidation.color.overlay = objValidOrderObj.cart[cartLength].color.apiData[i];
                    break;
                }
            }
        }
        else {
            return false
        }

        if (validBaseColor && validOverlayColor) {
            $.ajax({
                url: getAPILink("windows", objValidation),
                dataType: 'json',
                async: false,
                success: function (data) {
                    objValidOrderObj.cart[cartLength].windows = data;
                },
                error: function (err) {
                    console.log('Error');
                }
            });

            for (var i = 0; i < objValidOrderObj.cart[cartLength].windows.length; i++) {
                if (objValidOrderObj.cart[cartLength].windows[i].item_id == curWindow) {
                    validWindow = true;
                    objValidOrderObj.cart[cartLength].windows.topsection = objValidOrderObj.cart[cartLength].windows[i];
                    objValidation.windows.topsection = objValidOrderObj.cart[cartLength].windows[i];

                    for (var j = 0; j < objValidOrderObj.cart[cartLength].windows.topsection.glasstypes.length; j++) {
                        if (objValidOrderObj.cart[cartLength].windows.topsection.glasstypes[j].item_id == curGlassType) {
                            validGlassType = true;
                            objValidOrderObj.cart[cartLength].windows.glasstype = objValidOrderObj.cart[cartLength].windows.topsection.glasstypes[j];
                            objValidation.windows.glasstype = objValidOrderObj.cart[cartLength].windows.topsection.glasstypes[j]
                        }
                    }

                    try {
                        //
                        objValidOrderObj.cart[cartLength].windows.glasstypePlacement = objValidation.windows.glasstypePlacement;
                        objValidOrderObj.cart[cartLength].windows.glasstypeSection = objValidation.windows.glasstypeSection;
                        objValidOrderObj.cart[cartLength].windows.placement = objValidation.windows.placement;
                        objValidOrderObj.cart[cartLength].windows.selectedGlassSection = objValidation.windows.selectedGlassSection;
                    }
                    catch (e) { }
                    break;
                }
            }
        }
        else {
            return false
        }

        if (validWindow) {
            $.ajax({
                url: getAPILink("hardware", objValidation),
                dataType: 'json',
                async: false,
                success: function (data) {
                    objValidOrderObj.cart[cartLength].hardware = data;
                },
                error: function (err) {
                    console.log('Error');
                }
            });

            for (var i = 0; i < objValidOrderObj.cart[cartLength].hardware[0].LHDKs.length; i++) {
                if (objValidOrderObj.cart[cartLength].hardware[0].LHDKs[i].item_id == curHandle) {
                    validHandle = true;
                    objValidOrderObj.cart[cartLength].hardware.handle = objValidOrderObj.cart[cartLength].hardware[0].LHDKs[i];
                    objValidOrderObj.cart[cartLength].hardware.handle.numofKits = objValidation.hardware.handle.numofKits
                    objValidation.hardware.handle = objValidOrderObj.cart[cartLength].hardware[0].LHDKs[i];
                    //objValidOrderObj.cart[cartLength].hardware.handle.placement=objValidation.hardware.handle.placementlist.split(";")[0];
                    for (var i = 0; i < objValidation.hardware.handle.placementlist.split(';').length; i++) {
                        objValidOrderObj.cart[cartLength].hardware.handle.placement = objValidation.hardware.handle.placementlist.split(';')[i]
                    }
                    break;
                }
            }

            for (var i = 0; i < objValidOrderObj.cart[cartLength].hardware[0].StepPlates.length; i++) {
                if (objValidOrderObj.cart[cartLength].hardware[0].StepPlates[i].item_id == curStepPlate) {
                    validStepPlate = true;
                    objValidOrderObj.cart[cartLength].hardware.stepplate = objValidOrderObj.cart[cartLength].hardware[0].StepPlates[i];
                    objValidOrderObj.cart[cartLength].hardware.stepplate.numofKits = objValidation.hardware.stepplate.numofKits
                    objValidation.hardware.stepplate = objValidOrderObj.cart[cartLength].hardware[0].StepPlates[i];
                    //objValidOrderObj.cart[cartLength].hardware.stepplate.placement=objValidation.hardware.stepplate.placementlist.split(";")[0];
                    for (var i = 0; i < objValidation.hardware.stepplate.placementlist.split(";").length; i++) {
                        objValidOrderObj.cart[cartLength].hardware.stepplate.placement = objValidation.hardware.stepplate.placementlist.split(";")[i]
                    }
                    break;
                }
            }

            for (var i = 0; i < objValidOrderObj.cart[cartLength].hardware[0].StrapHinges.length; i++) {
                if (objValidOrderObj.cart[cartLength].hardware[0].StrapHinges[i].item_id == curHinge) {
                    validHinge = true;
                    objValidOrderObj.cart[cartLength].hardware.hinge = objValidOrderObj.cart[cartLength].hardware[0].StrapHinges[i];
                    objValidOrderObj.cart[cartLength].hardware.hinge.numofKits = objValidation.hardware.hinge.numofKits
                    objValidation.hardware.hinge = objValidOrderObj.cart[cartLength].hardware[0].StrapHinges[i];
                    objValidOrderObj.cart[cartLength].hardware.hinge.placement = objValidation.hardware.hinge.placementlist.split(";")[0];
                    break;
                }
            }

            for (var i = 0; i < objValidOrderObj.cart[cartLength].hardware[0].Locks.length; i++) {
                if (objValidOrderObj.cart[cartLength].hardware[0].Locks[i].item_id == curLock) {
                    validLock = true;
                    objValidOrderObj.cart[cartLength].hardware.lock = objValidOrderObj.cart[cartLength].hardware[0].Locks[i];
                    objValidation.hardware.lock = objValidOrderObj.cart[cartLength].hardware[0].Locks[i];

                    objValidOrderObj.cart[cartLength].hardware.handle = "";
                    objValidOrderObj.cart[cartLength].hardware.hinge = "";
                    objValidOrderObj.cart[cartLength].hardware.lockoptions = "";
                    objValidOrderObj.cart[cartLength].hardware.stepplate = "";
                    objValidOrderObj.cart[cartLength].hardware.strut = "";

                    objValidation.hardware.handle = "";
                    objValidation.hardware.hinge = "";
                    objValidation.hardware.lockoptions = "";
                    objValidation.hardware.stepplate = "";
                    objValidation.hardware.strut = "";

                    break;
                }
            }
        }
        else {
            return false
        }
    }

    if ((validHandle && validHinge && validStepPlate) || (validLock)) {
        cObj = objValidation;
        orderObj = objValidOrderObj;
        //cObj[0].isValid=true;
        //cObj[0].isPurchase=true;
        //orderObj[0].isValid=true;
        //orderObj[0].isPurchase=true;
        getVisUpdate();



        //$(document).trigger('closeDialg')
        $(document).trigger('updateDesc');
        $(document).trigger('updatePrice');
    }
    else {
        return false
    }

    return true
}



function replaceJunkCharacters(curntJunkTxt) {
    try {
        if (curntJunkTxt.item_name != undefined) {
            var _text = curntJunkTxt.item_name.toString();
            var _newcharc = $("<div />").html(_text).text();
            //console.log(curntJunkTxt.item_name,"   <   junk    >  " ,_newcharc)
            curntJunkTxt.item_name = _newcharc;
        }
    } catch (e) { }
}

