import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Http, Response, Request, Headers, RequestOptions } from '@angular/http';
import { Icollection } from "../collection/iCollection";
import 'rxjs/add/operator/catch';
declare var $: any;

import 'rxjs/add/operator/map';
import { ApiConstants } from "./api-constants";
import { AppUtilities } from './appUtilities';


@Injectable()
export class CollectionService {

    //  example to get the local json file
    // 'http://' + window.location.host + '/app/additional-options/' + path + '.json'

    constructor(private http: Http,
        private api: ApiConstants,
        private utils: AppUtilities
        , private route: Router) {
    }

    url = this.api.constants.url;

    getCollection(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'product', obj)
            .map(res => res.json())
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getZipResults(zip) {
        this.utils.setLoader();
        return this.http.get(this.url + 'zip/' + zip)
            .map(res => res.json())
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    //    this is for gdo opener
    getGdoOpener(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'Opener', obj)
            .map(res => res.json())
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getResOpener(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'Opener', obj)
            .map(res => res.json())
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getModelInfo(id) {
        this.utils.setLoader();
        let data = {
            modelnumber: id
        }

        return this.http.post(this.url + 'ModelDescription', data)
            .map(res => {
                try {
                    return res.json();
                }
                catch (e) {
                    return {};
                }
            })
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getGdoAdditional(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'OpenerItem', obj)
            .map(res => res.json())
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getOpenerAdditional(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'OpenerItem', obj)
            .map(res => res.json())
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getGdoAdditionalDirect(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'Opener', obj)
            .map(res => res.json())
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getHomes() {
        this.utils.setLoader();
        return new Promise((res) => {
            res({
                "homes": {
                    "home": [
					
					
					
					{
    "dcoords": {

        // for portrait coordinates-PORTRAIT.doc				

        "point": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "47,89",
                "_UR": "102,91",
                "_LR": "102,133",
                "_LL": "47,139"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "161,87",
                "_UR": "193,84",
                "_LR": "193,135",
                "_LL": "161,133"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "203,81",
                "_UR": "255,77",
                "_LR": "255,143",
                "_LL": "203,136"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc
        "pointland": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "104,57",
                "_UR": "201,57",
                "_LR": "201,131",
                "_LL": "104,141"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "306,51",
                "_UR": "362,80",
                "_LR": "362,134",
                "_LL": "306,129"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "379,40",
                "_UR": "471,31",
                "_LR": "471,147",
                "_LL": "379,137"
            }
        ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl14.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl14por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl14.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl14land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
},
{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc				

        "point": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "69,92",
                "_UR": "109,89",
                "_LR": "110,149",
                "_LL": "70,146"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "125,89",
                "_UR": "179,85",
                "_LR": "179,153",
                "_LL": "125,150"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "198,85",
                "_UR": "273,79",
                "_LR": "273,158",
                "_LL": "198,154"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc
        "pointland": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "184,57  ",
                "_UR": "239,53",
                "_LR": "239,136 ",
                "_LL": "184,132"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "262,53  ",
                "_UR": "337,48  ",
                "_LR": "337,142  ",
                "_LL": "262,138"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "365,47",
                "_UR": "470,40",
                "_LR": "470,149",
                "_LL": "365,144"
            }
        ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl13.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl13por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl13.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl13land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
},
,


{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc				

        "point": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "68,50",
                "_UR": "154,57",
                "_LR": "154,139",
                "_LL": "68,149"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "174,57",
                "_UR": "230,62",
                "_LR": "230,130",
                "_LL": "174,137"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "246,62",
                "_UR": "285,65",
                "_LR": "285,124",
                "_LL": "246,129"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc
        "pointland": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "195,32  ",
                "_UR": "305,40  ",
                "_LR": "305,144  ",
                "_LL": "195,157"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "331,42",
                "_UR": "403,46",
                "_LR": "403,133",
                "_LL": "331,141"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "423,48",
                "_UR": "472,51",
                "_LR": "472,125",
                "_LL": "423,131"
            }
        ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl11.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl11por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl11.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl11land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
},

{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc				

        "point": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "",
                "_UR": "",
                "_LR": "",
                "_LL": ""
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "",
                "_UR": "",
                "_LR": "",
                "_LL": ""
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc
        "pointland": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "357,50    ",
                "_UR": "443,50    ",
                "_LR": "443,132    ",
                "_LL": "357,132"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "459,49  ",
                "_UR": "551,49  ",
                "_LR": "551,133  ",
                "_LL": "459,133"
            }
        ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl10.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl10por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl10.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl10land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
},

 {
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc				

        "point": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "32,80",
            "_UR": "194,80",
            "_LR": "194,149",
            "_LL": "32,154"
        }],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc
        "pointland": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "133,46",
            "_UR": "357,46",
            "_LR": "357,139",
            "_LL": "133,146"
        }]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl09.png", //  buttons 97x65
    "_imagelg": "DIShomeDbl09por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl09.png", //  buttons 207x115
    "_imagelgland": "DIShomeDbl09land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
},



{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc	



        "point": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "189,97",
            "_UR": "314,97",
            "_LR": "314,154",
            "_LL": "189,152"
        }],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc
        "pointland": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "355,51",
            "_UR": "572,51",
            "_LR": "572,150",
            "_LL": "355,146"
        }]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl07.png", //  buttons 97x65
    "_imagelg": "DIShomeDbl07por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl07.png", //  buttons 207x115
    "_imagelgland": "DIShomeDbl07land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
},

{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc								

        "point": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "139,97",
                "_UR": "200,97",
                "_LR": "200,154",
                "_LL": "139,152"
            },
            {

                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "211,94",
                "_UR": "286,94",
                "_LR": "286,157",
                "_LL": "211,155"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc
        "pointland": [{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "264,38",
                "_UR": "375,36",
                "_LR": "375,140",
                "_LL": "264,136"
            },
            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "396,33",
                "_UR": "532,28",
                "_LR": "532,146",
                "_LL": "396,142"
            }
        ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl06.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl06por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl06.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl06land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
},

{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc								

        "point": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "92,68",
            "_UR": "166,71",
            "_LR": "166,131",
            "_LL": "92,139"
        }],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc
        "pointland": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "190,29",
            "_UR": "314,34",
            "_LR": "314,133",
            "_LL": "190,148"
        }]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl03.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl03por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl03.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl03land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
},

{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc	

        "point": [

            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "168,94",
                "_UR": "240,94",
                "_LR": "240,153",
                "_LL": "168,153"
            }, {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "258,94",
                "_UR": "328,94",
                "_LR": "328,153",
                "_LL": "258,153"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc



        "pointland": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "319,46",
            "_UR": "434,456",
            "_LR": "434,138",
            "_LL": "319,138"
        }, {
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "462,46",
            "_UR": "574,46",
            "_LR": "574,138",
            "_LL": "462,138"
        }]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl05.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl05por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl05.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl05land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
},

 {
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc	

        "point": [

            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "172,109",
                "_UR": "246,106",
                "_LR": "246,153",
                "_LL": "172, 149"
            }, {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "273,106",
                "_UR": "328,104",
                "_LR": "328,154",
                "_LL": "273,153"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc

        "pointland": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "325,64",
            "_UR": "454,59",
            "_LR": "454,140",
            "_LL": "325,133"
        }, {
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "501,60",
            "_UR": "595,56",
            "_LR": "597,142",
            "_LL": "502,139"
        }]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDblSngl04.png", //  buttons 97x65
    "_imagelg": "DIShomeDblSngl04por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDblSngl04.png", //  buttons 207x115
    "_imagelgland": "DIShomeDblSngl04land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
}, 
{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc
        "point": [

            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "152,96  ",
                "_UR": "235,92   ",
                "_LR": "235,145  ",
                "_LL": "152,142  "
            },
			{
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "250,92",
                "_UR": "316,89",
                "_LR": "316,151",
                "_LL": "250,146"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc

        "pointland": [
		{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "294,57",
            "_UR": "428,51",
            "_LR": "428,137",
            "_LL": "296,131"
        },
		{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "455,50",
            "_UR": "561,45",
            "_LR": "561,145",
            "_LL": "455,139"
        }
		
		]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDblSngl03.png", //  buttons 97x65
    "_imagelg": "DIShomeDblSngl03por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDblSngl03.png", //  buttons 207x115
    "_imagelgland": "DIShomeDblSngl03land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
},


{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc
        "point": [

            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "42,87",
                "_UR": "167,89",
                "_LR": "167,149",
                "_LL": "42,154"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc

        "pointland": [
		{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "138,48",
            "_UR": "320,52",
            "_LR": "319,137",
            "_LL": "139,145"
        }
		
		]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl03.png", //  buttons 97x65
    "_imagelg": "DIShomeDbl03por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl03.png", //  buttons 207x115
    "_imagelgland": "DIShomeDbl03land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
},

 {
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc
        "point": [

            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "169,116",
                "_UR": "265,116",
                "_LR": "264,158",
                "_LL": "169,158"
            }, {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "288,116",
                "_UR": "339,116",
                "_LR": "339,158",
                "_LL": "288,158"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc

        "pointland": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "321,70",
            "_UR": "475,70",
            "_LR": "475,140",
            "_LL": "321,140"
        }, {
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "516,70",
            "_UR": "599,70",
            "_LR": "599,138",
            "_LL": "516,138"
        }]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDblSngl01.png", //  buttons 97x65
    "_imagelg": "DIShomeDblSngl01por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDblSngl01.png", //  buttons 207x115
    "_imagelgland": "DIShomeDblSngl01.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
},









{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc
        "point": [

            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "35,75",
                "_UR": "184,85",
                "_LR": "184,149",
                "_LL": "35,158"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc

        "pointland": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "117,32",
            "_UR": "344,47",
            "_LR": "344,145",
            "_LL": "117,158"
        }]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl08.png", //  buttons 97x65
    "_imagelg": "DIShomeDbl08por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl08.png", //  buttons 207x115
    "_imagelgland": "DIShomeDbl08land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
},


{
    "dcoords": {

        // for portrait			coordinates-PORTRAIT.doc
        "point": [

            {
                "_width": "8",
                "_height": "7",
                "_XY": "0,0",
                "_UL": "54,104",
                "_UR": "184,104",
                "_LR": "184,157",
                "_LL": "54,166"
            }
        ],

        // for landscape   HDDC-mobile-coordinates-LANDSCAPE.doc

        "pointland": [{
            "_width": "8",
            "_height": "7",
            "_XY": "0,0",
            "_UL": "111,41",
            "_UR": "346,37",
            "_LR": "346,133",
            "_LL": "111,150"
        }]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl11.png", //  buttons 97x65
    "_imagelg": "DIshomeDbl11por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl11.png", //  buttons 207x115
    "_imagelgland": "DIshomeDbl11land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
},{
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "145,69",
          "_UR": "224,69",
          "_LR": "224,133",
          "_LL": "145,133"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "237,69",
          "_UR": "317,69",
          "_LR": "317,133",
          "_LL": "237,133"
        }
      ],

      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "287,51",
          "_UR": "404,51",
          "_LR": "404,146",
          "_LL": "287,146"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "424,51",
          "_UR": "542,51",
          "_LR": "542,146",
          "_LL": "424,146"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl15.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl15por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl15.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl15land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  },
  
  {
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "96,90",
          "_UR": "163,90",
          "_LR": "163,151",
          "_LL": "96,151"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "157,90",
          "_UR": "242,90",
          "_LR": "242,151",
          "_LL": "175,151"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "257,90",
          "_UR": "316,90",
          "_LR": "316,151",
          "_LL": "257,151"
        }
      ],

      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "192,40",
          "_UR": "308,40",
          "_LR": "308,144",
          "_LL": "192,144"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "331,40",
          "_UR": "446,40",
          "_LR": "446,144",
          "_LL": "331,144"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "474,40",
          "_UR": "578,40",
          "_LR": "578,144",
          "_LL": "474,144"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl12.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl12por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl12.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl12land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  },
  {
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "48,57",
          "_UR": "117,57",
          "_LR": "117,134",
          "_LL": "48,129"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "134,57",
          "_UR": "218,56",
          "_LR": "218,137",
          "_LL": "134,134"
        }
      ],

      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "144,35",
          "_UR": "245,34",
          "_LR": "245,146",
          "_LL": "144,140"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "271,34",
          "_UR": "394,33",
          "_LR": "394,153",
          "_LL": "271,148"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl09.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl09por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl09.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl09land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  },
{
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "242,111",
          "_UR": "285,111",
          "_LR": "285,151",
          "_LL": "242,151"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "298,111",
          "_UR": "341,111",
          "_LR": "341,151",
          "_LL": "289,151"
        }
      ],

      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "436,76",
          "_UR": "501,76",
          "_LR": "501,137",
          "_LL": "436,137"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "522,76",
          "_UR": "588,76",
          "_LR": "588,137",
          "_LL": "522,137"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl08.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl08por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl08.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl08land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  },{
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "34,86",
          "_UR": "93,88",
          "_LR": "93,134",
          "_LL": "34,137"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "105,88",
          "_UR": "149,90",
          "_LR": "149,131",
          "_LL": "105,134"
        }
      ],

      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "93,68",
          "_UR": "191,73",
          "_LR": "191,151",
          "_LL": "93,156"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "212,75",
          "_UR": "285,77",
          "_LR": "285,145",
          "_LL": "212,149"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl07.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl07por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl07.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl07land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  },
  {
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "139,97",
          "_UR": "200,97",
          "_LR": "200,154",
          "_LL": "139,152"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "211,94",
          "_UR": "286,94",
          "_LR": "286,157",
          "_LL": "211,155"
        }
      ],

      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "264,38",
          "_UR": "375,36",
          "_LR": "375,140",
          "_LL": "264,136"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "396,33",
          "_UR": "532,28",
          "_LR": "532,146",
          "_LL": "396,142"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl06.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl06por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl06.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl06land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  },
  {
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "102,18",
          "_UR": "266,18",
          "_LR": "266,163",
          "_LL": "102,163"
        }
      ],
      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "257,13",
          "_UR": "428,13",
          "_LR": "428,165",
          "_LL": "257,165"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl04.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl04por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl04.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl04land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  },
 {
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "53,74",
          "_UR": "120,74",
          "_LR": "120,138",
          "_LL": "53,138"
        }
      ],
      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "136,43",
          "_UR": "241,43",
          "_LR": "241,144",
          "_LL": "136,144"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl02.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl02por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl02.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl02land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  },
{
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
         {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "77,50",
          "_UR": "183,50",
          "_LR": "183,145",
          "_LL": "77,145"
        }
      ],
      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "197,27",
          "_UR": "342,27",
          "_LR": "342,158",
          "_LL": "197,158"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl01.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl01por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl01.png", //  buttons 207x115
    "_imagelgland": "DIShomeSngl01land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  },{
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
	  
	  {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "50,69  ",
          "_UR": "168,78 ",
          "_LR": "168,134 ",
          "_LL": "50,149"
        }

      ],
      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "130,28",
          "_UR": "318,43",
          "_LR": "318,133",
          "_LL": "130,156"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl05.png", //  buttons 97x65
    "_imagelg": "DIShomeDbl05por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl05.png", //  buttons 207x115
    "_imagelgland": "DIShomeDbl05land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
  },
  {
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
	  
	  {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "53,74  ",
          "_UR": "120,74  ",
          "_LR": "120,138",
          "_LL": "53,138"
        }

      ],
      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "373,56",
          "_UR": "554,56",
          "_LR": "554,141",
          "_LL": "374,137"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl04.png", //  buttons 97x65
    "_imagelg": "DIShomeDbl04por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl04.png", //  buttons 207x115
    "_imagelgland": "DIShomeDbl04land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
  },{
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [

      ],
      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "350,56",
          "_UR": "541,56",
          "_LR": "541,140",
          "_LL": "350,140"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl01.png", //  buttons 97x65
    "_imagelg": "DIShomeDbl01por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl01.png", //  buttons 207x115
    "_imagelgland": "DIShomeDbl01land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
  },{
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [

      ],
      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "347,50",
          "_UR": "550,50",
          "_LR": "550,139",
          "_LL": "347,139"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl02.png", //  buttons 97x65
    "_imagelg": "DIShomeDbl02por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl02.png", //  buttons 207x115
    "_imagelgland": "DIShomeDbl02land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
  },
  {
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [

      ],
      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "140,35",
          "_UR": "378,40",
          "_LR": "378,139",
          "_LL": "140,143"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeDbl06.png", //  buttons 97x65
    "_imagelg": "DIShomeDbl06por.png", // Portrait 360x179
    "_btnimageland": "DIShomeDbl06.png", //  buttons 207x115
    "_imagelgland": "DIShomeDbl06land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "2"
  },{
    "dcoords": {
      // for portrait  coordinates-PORTRAIT.doc
      "point": [
      ],
      // for landscape HDDC-mobile-coordinates-LANDSCAPE.doc
      "pointland": [
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
          "_UL": "244,53",
          "_UR": "466,53",
          "_LR": "466,148",
          "_LL": "244,148"
        },
        {
          "_width": "8",
          "_height": "7",
          "_XY": "0,0",
           "_UL": "501,52",
          "_UR": "608,52",
          "_LR": "608,148",
          "_LL": "501,148"
        }
      ]
    },
    "_homeid": "10",
    "_btnimage": "DIShomeSngl02.png", //  buttons 97x65
    "_imagelg": "DIShomeSngl02por.png", // Portrait 360x179
    "_btnimageland": "DIShomeSngl02.png", //  buttons 207x115
    "_imagelgland": "DIShomeDblSngl02land.png", // Landscape 677x179
    "_window": "reflect",
    "_landimgwidth": "677",
    "_landimgheight": "179",
    "_imgwidth": "360",
    "_imgheight": "179",
    "_title": "Single1",
    "_upload": "false",
    "_size": "1"
  }
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
                        /* {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "155,221",
                                    "_UR": "355,221",
                                    "_LR": "356,399",
                                    "_LL": "155,400"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl06.png",
                            "_imagelg": "DIShomeSngl06.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        }, {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "178,264",
                                    "_UR": "322,259",
                                    "_LR": "320,368",
                                    "_LL": "181,395"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl09.png",
                            "_imagelg": "DIShomeSngl09.png",
                            "_window": "lights",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "201,137",
                                    "_UR": "515,137",
                                    "_LR": "512,419",
                                    "_LL": "203,419"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl08.png",
                            "_imagelg": "DIShomeSngl08.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "365,257",
                                    "_UR": "592,257",
                                    "_LR": "591,354",
                                    "_LL": "366,354"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl01.png",
                            "_imagelg": "DIShomeDbl01.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "362,270",
                                    "_UR": "603,270",
                                    "_LR": "603,372",
                                    "_LL": "362,372"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl02.png",
                            "_imagelg": "DIShomeDbl02.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "80,295",
                                    "_UR": "323,345",
                                    "_LR": "323,381",
                                    "_LL": "83,422"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl03.png",
                            "_imagelg": "DIShomeDbl03.png",
                            "_window": "lights",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "393,297",
                                    "_UR": "608,308",
                                    "_LR": "608,398",
                                    "_LL": "393,400"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl04.png",
                            "_imagelg": "DIShomeDbl04.png",
                            "_window": "lights",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "100,234",
                                    "_UR": "324,251",
                                    "_LR": "325,357",
                                    "_LL": "103,384"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl05.png",
                            "_imagelg": "DIShomeDbl05.png",
                            "_window": "lights",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "116,275",
                                    "_UR": "395,280",
                                    "_LR": "396,399",
                                    "_LL": "116,399"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl06.png",
                            "_imagelg": "DIShomeDbl06.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "40,0",
                                    "_UL": "371,308",
                                    "_UR": "609,314",
                                    "_LR": "608,415",
                                    "_LL": "347,415"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl07.png",
                            "_imagelg": "DIShomeDbl07.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "73,225",
                                    "_UR": "357,242",
                                    "_LR": "356,385",
                                    "_LL": "68,381"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl08.png",
                            "_imagelg": "DIShomeDbl08.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "67,259",
                                    "_UR": "374,261",
                                    "_LR": "374,296",
                                    "_LL": "65,396"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl09.png",
                            "_imagelg": "DIShomeDbl09.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "109,286",
                                    "_UR": "357,281",
                                    "_LR": "357,389",
                                    "_LL": "109,389"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDbl11.png",
                            "_imagelg": "DIShomeDbl11.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
                        },
                        {
                            "dcoords": {
                                "point": {
                                    "_width": "8",
                                    "_height": "7",
                                    "_XY": "0,0",
                                    "_UL": "105,244",
                                    "_UR": "233,244",
                                    "_LR": "233,365",
                                    "_LL": "106,365"
                                }
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl14.png",
                            "_imagelg": "DIShomeSngl14.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "272,289",
                                        "_UR": "389,274",
                                        "_LR": "388,417",
                                        "_LL": "272,402"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "411,284",
                                        "_UR": "556,265",
                                        "_LR": "555,425",
                                        "_LL": "412,405"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl07.png",
                            "_imagelg": "DIShomeSngl07.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "69,262",
                                        "_UR": "179,267",
                                        "_LR": "180,355",
                                        "_LL": "70,361"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "206,268",
                                        "_UR": "289,271",
                                        "_LR": "289,349",
                                        "_LL": "206,353"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl10.png",
                            "_imagelg": "DIShomeSngl10.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "473,292",
                                        "_UR": "554,294",
                                        "_LR": "554,368",
                                        "_LL": "473,367"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "583,293",
                                        "_UR": "664,294",
                                        "_LR": "663,370",
                                        "_LL": "582,370"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl11.png",
                            "_imagelg": "DIShomeSngl11.png",
                            "_window": "lights",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        },
                        // {
                        //     "dcoords": {
                        //         "point": [
                        //             {
                        //                 "_width": "8",
                        //                 "_height": "7",
                        //                 "_XY": "0,0",
                        //                 "_UL": "374,294",
                        //                 "_UR": "473,293",
                        //                 "_LR": "474,390",
                        //                 "_LL": "373,389"
                        //             },
                        //             {
                        //                 "_width": "8",
                        //                 "_height": "7",
                        //                 "_XY": "0,0",
                        //                 "_UL": "493,293",
                        //                 "_UR": "601,292",
                        //                 "_LR": "601,391",
                        //                 "_LL": "494,391"
                        //             }
                        //         ]
                        //     },
                        //     "_homeid": "10",
                        //     "_btnimage": "DIShomeSngl16.png",
                        //     "_imagelg": "DIShomeSngl16.png",
                        //     "_window": "reflect",
                        //     "_imgwidth": "700",
                        //     "_imgheight": "500",
                        //     "_title": "Single1",
                        //     "_upload": "false",
                        //     "_size": "2"
                        // },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "283,256",
                                        "_UR": "435,256",
                                        "_LR": "435,376",
                                        "_LL": "284,376"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "464,256",
                                        "_UR": "615,257",
                                        "_LR": "615,376",
                                        "_LL": "464,376"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl15.png",
                            "_imagelg": "DIShomeSngl15.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "562,305",
                                        "_UR": "657,305",
                                        "_LR": "657,380",
                                        "_LL": "563,381"
                                    },
                                    {
                                        "_width": "16",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "331,304",
                                        "_UR": "511,304",
                                        "_LR": "511,382",
                                        "_LL": "331,383"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDblSngl01.png",
                            "_imagelg": "DIShomeDblSngl01.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "3"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "539,311",
                                        "_UR": "661,311",
                                        "_LR": "661,419",
                                        "_LL": "540,420"
                                    },
                                    {
                                        "_width": "16",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "242,312",
                                        "_UR": "497,312",
                                        "_LR": "497,420",
                                        "_LL": "243,421"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDblSngl02.png",
                            "_imagelg": "DIShomeDblSngl02.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "3"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "489,204",
                                        "_UR": "613,199",
                                        "_LR": "613,315",
                                        "_LL": "490,308"
                                    },
                                    {
                                        "_width": "16",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "298,213",
                                        "_UR": "455,206",
                                        "_LR": "456,306",
                                        "_LL": "300,298"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDblSngl03.png",
                            "_imagelg": "DIShomeDblSngl03.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "3"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "336,307",
                                        "_UR": "476,301",
                                        "_LR": "478,389",
                                        "_LL": "337,381"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "533,302",
                                        "_UR": "635,289",
                                        "_LR": "638,392",
                                        "_LL": "535,388"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDblSngl04.png",
                            "_imagelg": "DIShomeDblSngl04.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "3"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "239,290",
                                        "_UR": "366,290",
                                        "_LR": "367,401",
                                        "_LL": "240,405"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "416,291",
                                        "_UR": "633,292",
                                        "_LR": "635,392",
                                        "_LL": "418,399"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeDblSngl05.png",
                            "_imagelg": "DIShomeDblSngl05.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "3"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "96,222",
                                        "_UR": "226,221",
                                        "_LR": "226,365",
                                        "_LL": "96,358"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "263,221",
                                        "_UR": "422,219",
                                        "_LR": "421,373",
                                        "_LL": "263,368"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl01.png",
                            "_imagelg": "DIShomeSngl01.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "133,178",
                                        "_UR": "298,189",
                                        "_LR": "297,346",
                                        "_LL": "133,365"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "340,192",
                                        "_UR": "447,198",
                                        "_LR": "445,329",
                                        "_LL": "339,341"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "480,201",
                                        "_UR": "552,205",
                                        "_LR": "551,317",
                                        "_LL": "479,325"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl04.png",
                            "_imagelg": "DIShomeSngl04.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        },
                        {
                            "dcoords": {
                                "point": [
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "188,272",
                                        "_UR": "315,273",
                                        "_LR": "315,385",
                                        "_LL": "188,385"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "343,274",
                                        "_UR": "468,273",
                                        "_LR": "469,384",
                                        "_LL": "344,384"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "501,273",
                                        "_UR": "613,273",
                                        "_LR": "615,384",
                                        "_LL": "502,384"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl05.png",
                            "_imagelg": "DIShomeSngl05.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "1"
                        } */
                    ]
                }
            });
        })
    }

    getDesign(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'DesignConstruction', obj)
            .map(res => {
                try {
                    return res.json();
                } catch (e) {
                    return {};
                }
            })
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getTopSection(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'Windows', obj)
            .map(res => {
                try {
                    return res.json();
                } catch (e) {
                    return {};
                }
            })
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getHardware(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'Hardware', obj)
            .map(res => {
                try {
                    return res.json();
                } catch (e) {
                    return {};
                }
            })
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getquickDoors(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'Stockdoors', obj)
            .map(res => {
                try {
                    return res.json();
                } catch (e) {
                    return {};
                }
            })
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    getStockGroup(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'Stockgroup', obj)
            .map(res => {
                try {
                    return res.json();
                } catch (e) {
                    return {};
                }
            })
            .finally(() => {
                this.utils.removeLoader();
            })
    }
    getInstallDiyq(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'DiyInstallq', obj)
            .map(res => {
                try {
                    return res.json();
                } catch (e) {
                    return {};
                }
            })
            .finally(() => {
                this.utils.removeLoader();
            })
    }
    getModelUpSell(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'ModelUpSell', obj)
            .map(res => {
                try {
                    return res.json();
                } catch (e) {
                    return {};
                }
            })
            .finally(() => {
                this.utils.removeLoader();
            })
    }

    sendMail(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'SendEmail', obj)
            .map(res => res.json())
            .finally(() => {
                this.utils.removeLoader();
            })
    }
    getUpsellData(obj) {
        this.utils.setLoader();
        return this.http.post(this.url + 'ModelUpSell', obj).map(
            res => {
                try {
                    return res.json();
                } catch (e) {
                    console.log(e);
                    return {};
                }
            }
        ).finally(() => {
            this.utils.removeLoader();
        });
    }



    getPromotionsByMarketId(marketId) {
        this.utils.setLoader();
        return this.http.get(this.url + `promotion/${marketId}`).map(res => {
            try {
                return res.json();
            } catch (e) {
                return {};
            }
        }).finally(() => {
            this.utils.removeLoader();
        });
    }


    getPromotionByProductId(reqData) {
        //
        this.utils.setLoader();
        return this.http.post(this.url + `promotion/${reqData.marketId}`, reqData).map(res => {
            try {
                return res.json();
            } catch (e) {
                return {};
            }
        }).finally(() => {
            this.utils.removeLoader();
        });
    }

    getImageUrl(reqData) {
        this.utils.setLoader();
        return this.http.post(this.url + 'EmailImages', reqData).map(res => {
            try {
                return res.json();
            } catch (e) {
                return res;
            }
        }).finally(() => {
            this.utils.removeLoader();
        });
    }

    getProductsByPromotionId(reqData) {
        this.utils.setLoader();
        return this.http.post(this.url + `ProductByPromotion`, reqData).map(res => {
            try {
                return res.json();
            } catch (e) {
                return {};
            }
        }).finally(() => {
            this.utils.removeLoader();
        });
    }

    handleError() {
        this.route.navigateByUrl('/**');
    }
}