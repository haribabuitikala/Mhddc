import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ZipResults} from "../shared/zipresults";
import {Izip} from "./Izip";
import {ToastrService} from 'toastr-ng2';
declare var $:any;

import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {CollectionService} from "../shared/data.service";

@Injectable()
export class ZipResolver implements Resolve<Izip> {

    results;

    constructor(private zip:ZipResults
        , private route:Router
        , private toastr:ToastrService
        , private dataService:CollectionService) {
    }

    resolve(route:ActivatedRouteSnapshot, stateRoute:RouterStateSnapshot):Observable<Izip> {
        let zipCode = route.params['zip'];
        this.dataService.getZipResults(zipCode)
            .subscribe(
                res => {
                    this.results = res;
                },
            err => {
                this.dataService.handleError();
            }
            );
        // if (this.results === undefined) {
        //     $('.zip-code').val('');
        //     this.toastr.error(`${zipCode} is not correct, try with another one`);
        //     this.route.navigateByUrl('/banner');
        // }
        return this.results;

    }
}