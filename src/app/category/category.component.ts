import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Router} from '@angular/router';
import {LangEnglishService} from "../shared/english";
import {AppUtilities} from "../shared/appUtilities";

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
    @ViewChild('modal') modal:ModalComponent;
    lang;
    isService:boolean;

    constructor(private language:LangEnglishService
        , private route:Router
        , private utilities:AppUtilities) {
    }

    ngOnInit() {
        this.lang = this.language.getCategory();
        this.isService = this.utilities.utilities.isService;
    }

    navigateTo(path, flow, count) {
        this.utilities.utilities.flow = flow;
        this.utilities.utilities.navCount = count;
        this.utilities.utilities.currPage = 1;
        this.route.navigateByUrl(path);
    }

    serviceRepair() {
        window.location.href = 'http://hdservices.homedepot.com/services/garage-door-opener-repair/';
    }

    showModal() {
        this.modal.open();
    }


}
