import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit {
    zip:any;

    zipCode:any;

    constructor(private route:Router) {
    }

    save(form, event) {
        event.preventDefault();
        this.route.navigate(['/zipResults', form.value.zip])
    }

    ngOnInit() {
    }

}
