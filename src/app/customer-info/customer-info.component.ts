import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {LangEnglishService} from "../shared/english";
import {AppComponent} from "../app.component";
import {ToastrService} from 'toastr-ng2';
import {AppUtilities} from "../shared/appUtilities";
import {CollectionService} from "../shared/data.service";
import {CollectionData} from "../collection/collection-data";


@Component({
    moduleId: module.id,
    selector: 'app-customer-info',
    templateUrl: './customer-info.component.html',
    styleUrls: ['./customer-info.component.less']
})

export class CustomerInfoComponent implements OnInit {


    user;
    constructor(private route: Router) {}


    ngOnInit() {
        this.user = {
            txtFirstName_SoldTo: '',
            txtLastName_SoldTo: '',
            txtAddress1_SoldTo: '',
            txtAddress2_SoldTo: '',
            txtCity_SoldTo: '',
            txtState_SoldTo: '',
            txtZipCode_SoldTo: '',
            txtCounty_SoldTo: '',
            txtPhoneNumber_SoldTo: '',
            txtSecondaryNumber_SoldTo: '',
            txtCustomerEmail_SoldTo: ''
        };
    }

    save(values, valid) {

        console.log(values, valid)
        if (valid) {
            this.route.navigateByUrl('/customer-service-info');
        } else {

        }
    }

//    goToCustomerServiceInfo() {
//        this.route.navigateByUrl('/customer-service-info');
//    }
    onlyNumberKey(e) {
        var valid = (e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122);
        if (!valid) {
            e.preventDefault();
        }
    }
    disAllowNumbers(e) {
        var valid = (e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122);
        if (!valid) {
            e.preventDefault();
        }
    }

}