import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LangEnglishService} from "../shared/english";

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit {
    zip:any;

    zipCode:any;
    lang:any;

    constructor(private route:Router
        , private localize:LangEnglishService) {
    }

    save(form, event) {
        event.preventDefault();
        this.route.navigate(['/zipResults', form.value.zip])
    }

    ngOnInit() {
        this.lang = this.localize.getBanner();
    }

}
