import {Component, OnInit, OnChanges,ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LangEnglishService} from "../shared/english";
import {AppComponent} from "../app.component";
import {ToastrService} from 'toastr-ng2';
import {AppUtilities} from "../shared/appUtilities";
import {CollectionService} from "../shared/data.service";
import {CollectionData} from "../collection/collection-data"; 
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
    selector: 'app-customer-service-info',
    templateUrl: './customer-service-info.component.html',
    styleUrls: ['./customer-service-info.component.less']
})
export class CustomerServiceInfoComponent implements OnInit {

    user; 
    @ViewChild('checkoutPopup') checkoutPopup: ModalComponent;
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
    goToPaymentBilling() {
        // alert('payment and billing page is an IFRAME---Need to Load once we get URL')
    }
    save(values, valid) {

        console.log(values, valid)
        if (valid) {
            this.checkoutPopup.open();
            // this.route.navigateByUrl('/customer-service-info');
        }
    }
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
