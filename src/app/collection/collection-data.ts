import {Injectable} from '@angular/core';

@Injectable()
export class CollectionData {
    // the data object is filled in door-size component
    data = {};
    img = {
        'dtavante.jpg': 'btnCollectionAvante.png', // Avante
        'dtcypress.jpg': 'btnCollectionModernSteel.png', // Modern steel
        'dtgallery.jpg': 'btnCollectionGallery.png',
        'dtcoachman.jpg': 'btnCollectionCoachman.png',
        "dtreserve.jpg": 'btnCollectionReserveSC.png',
        "dtCanyonRidge.jpg": 'btnCollectionCanyonRidgeUG.png',
        "dtpremium.jpg": 'btnCollectionClassic.png'
        // "dtCanyonRidge.jpg": 'btnCollectionCanyonRidgeLE.png'
    };
    gdoOpener = {};
    zip = {};
    gdoAdditional = {}
    zipResults = {} 
    gdoAdditional = {};
    gdoAdditionalDirect = {};
    gdoOpenerAccessories = []; // this is for the popup
    store={};// this is for stroing the store data
    gdoDirectQuestions = [];
}