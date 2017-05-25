import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Request, Headers, RequestOptions} from '@angular/http';
import {Icollection} from "../collection/iCollection";
import 'rxjs/add/operator/catch';
declare var $:any;

import 'rxjs/add/operator/map';
import {ApiConstants} from "./api-constants";


@Injectable()
export class CollectionService {

    //  example to get the local json file
    // 'http://' + window.location.host + '/app/additional-options/' + path + '.json'

    constructor(private http:Http,
                private api:ApiConstants) {
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

    getGdoAdditional(obj) {
        return this.http.post(this.url + 'OpenerItem', obj)
            .map(res => res.json())
    }

    getGdoAdditionalDirect(obj) {
        return this.http.post(this.url + 'Opener', obj)
            .map(res => res.json())
    }

    getHomes() {
        return this.http.get('http://' + window.location.host + '/app/shared/homes.json')
            .map(res =>
                res.json()
            )
    }

    getDesign(obj) {
        return this.http.post(this.url + 'DesignConstruction', obj)
            .map(res => res.json())
    }
}