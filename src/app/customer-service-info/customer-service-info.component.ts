import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-service-info',
  templateUrl: './customer-service-info.component.html',
  styleUrls: ['./customer-service-info.component.less']
})
export class CustomerServiceInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
goToPaymentBilling(){
    alert('payment and billing page is an IFRAME---Need to Load once we get URL')
}
}
