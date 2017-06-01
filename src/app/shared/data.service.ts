import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Request, Headers, RequestOptions } from '@angular/http';
import { Icollection } from "../collection/iCollection";
import 'rxjs/add/operator/catch';
declare var $: any;

import 'rxjs/add/operator/map';
import { ApiConstants } from "./api-constants";


@Injectable()
export class CollectionService {

    //  example to get the local json file
    // 'http://' + window.location.host + '/app/additional-options/' + path + '.json'

    constructor(private http: Http,
        private api: ApiConstants) {
    }

    url = this.api.constants.url;

    getCollection(obj) {
        return this.http.post(this.url + 'product', obj)
            .map(res => res.json())
    }

    getZipResults(zip) {
        return this.http.get(this.url + 'zip/' + zip)
            .map(res => res.json())
    }

    //    this is for gdo opener
    getGdoOpener(obj) {
        return this.http.post(this.url + 'Opener', obj)
            .map(res => res.json())
    }

    getResOpener(obj) {
        return this.http.post(this.url + 'Opener', obj)
            .map(res => res.json())
    }

    getModelInfo(id){
        let data = {
          modelnumber: id.ClopayModelNumber
        }

        return this.http.post(this.url + 'ModelDescription', data)
            .map(res => res.json())
    }

    getGdoAdditional(obj) {
        return this.http.post(this.url + 'OpenerItem', obj)
            .map(res => res.json())
    }

    getOpenerAdditional(obj) {
        return this.http.post(this.url + 'OpenerItem', obj)
            .map(res => res.json())
    }

    getGdoAdditionalDirect(obj) {
        return this.http.post(this.url + 'Opener', obj)
            .map(res => res.json())
    }

    getHomes() {
        return new Promise((res) => {
            res({
                "homes": {
                    "home": [
                        {
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
                                        "_UL": "474,294",
                                        "_UR": "553,294",
                                        "_LR": "552,366",
                                        "_LL": "474,366"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "582,294",
                                        "_UR": "662,295",
                                        "_LR": "662,368",
                                        "_LL": "582,368"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl11.png",
                            "_imagelg": "DIShomeSngl11.png",
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
                                        "_UL": "374,294",
                                        "_UR": "473,293",
                                        "_LR": "474,390",
                                        "_LL": "373,389"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "493,293",
                                        "_UR": "601,292",
                                        "_LR": "601,391",
                                        "_LL": "494,391"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl16.png",
                            "_imagelg": "DIShomeSngl16.png",
                            "_window": "reflect",
                            "_imgwidth": "700",
                            "_imgheight": "500",
                            "_title": "Single1",
                            "_upload": "false",
                            "_size": "2"
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
                                        "_UL": "329,263",
                                        "_UR": "465,264",
                                        "_LR": "465,372",
                                        "_LL": "330,372"
                                    },
                                    {
                                        "_width": "8",
                                        "_height": "7",
                                        "_XY": "0,0",
                                        "_UL": "504,263",
                                        "_UR": "636,263",
                                        "_LR": "636,372",
                                        "_LL": "504,373"
                                    }
                                ]
                            },
                            "_homeid": "10",
                            "_btnimage": "DIShomeSngl02.png",
                            "_imagelg": "DIShomeSngl02.png",
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
                        }
                    ]
                }
            });
        });
    }

    getDesign(obj) {
        return this.http.post(this.url + 'DesignConstruction', obj)
            .map(res => res.json())
    }

    getTopSection(obj) {
        return this.http.post(this.url + 'Windows', obj)
            .map(res => res.json())
    }

    getHardware(obj) {
        return this.http.post(this.url + 'Hardware', obj).map(
            res => res.json()
        );
    }

    getquickDoors(obj) {
        return this.http.post(this.url + 'Stockdoors', obj).map(
            res => res.json()
        );
    }

    getStockGroup(obj) {
         return this.http.post(this.url + 'Stockgroup', obj).map(
            res => res.json()
        );
    }
}