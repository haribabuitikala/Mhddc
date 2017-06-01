import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {LangEnglishService} from "../shared/english";
import {AppComponent} from "../app.component";
import {ToastrService} from 'toastr-ng2';
import {AppUtilities} from "../shared/appUtilities";
import {CollectionService} from "../shared/data.service";
import {CollectionData} from "../collection/collection-data";

@Component({
    selector: 'app-customer-info',
    templateUrl: './customer-info.component.html',
    styleUrls: ['./customer-info.component.less']
})
export class CustomerInfoComponent implements OnInit {

    constructor(private route: Router) {}

    ngOnInit() {
    }
    goToCustomerServiceInfo() {
        this.route.navigateByUrl('/customer-service-info');
    }
}
