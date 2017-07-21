import {Component, OnInit} from '@angular/core';
import {NavigateService} from "../shared/navigate.service";
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';

@Component({
    selector: 'app-install-question',
    templateUrl: './install-question.component.html',
    styleUrls: ['./install-question.component.less']
})
export class InstallQuestionComponent implements OnInit {

    constructor(private appComponent:AppComponent
        , private route:Router) {
    }
    goTo(path){
        // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
        this.route.navigateByUrl(path);
    }
    ngOnInit() {
    }

}
