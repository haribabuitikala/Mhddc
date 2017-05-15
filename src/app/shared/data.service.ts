import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Request, Headers, RequestOptions} from '@angular/http';
import {Icollection} from "../collection/iCollection";
import 'rxjs/add/operator/catch';
declare var $:any;

import 'rxjs/add/operator/map';


@Injectable()
export class CollectionService {

    constructor(private http:Http) {
    }

    url = 'http://dev-mhddcapi.clopay.com/api/';

    getCollection(obj) {
        return this.http.post('http://dev-mhddcapi.clopay.com/api/product', obj)
            .map(res => res.json())
    }

    getZipResults(zip){
        return this.http.get(this.url+ 'zip/' + zip)
            .map(res => res.json())
    }

}