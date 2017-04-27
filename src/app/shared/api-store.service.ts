import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'

@Injectable()
export class ApiStoreService {

  url = 'http://hddchtml.clopay.com/apistores.aspx';

  getZipList(zip) {
    return this._http.get(this.url + '/' + zip)
      .map((response:Response) => response)
  }

  constructor(private _http:Http) {
  }

}
