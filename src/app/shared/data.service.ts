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
}