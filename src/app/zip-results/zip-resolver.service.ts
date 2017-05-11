import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ZipResults} from "../shared/zipresults";
import {Izip} from "./Izip";
import {ToastrService} from 'toastr-ng2';
declare var $:any;

import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ZipResolver implements Resolve<Izip> {

    constructor(private zip:ZipResults
        , private route:Router
        , public toastr:ToastrService) {
    }

    resolve(route:ActivatedRouteSnapshot, stateRoute:RouterStateSnapshot):Observable<Izip> {
        let zipCode = route.params['zip'];
        let results = this.zip.getZip(zipCode);
        if (results.Stores.length != 0) {
            return results;
        }
        $('.zip-code').val('');
        this.toastr.error(`${zipCode} is not correct, try with another one`);
        this.route.navigateByUrl('/banner');
    }
}