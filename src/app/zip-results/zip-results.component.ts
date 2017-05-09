import {Component, OnInit} from '@angular/core';
import {ZipResults} from "../shared/zipresults";
import {ActivatedRoute, Router} from '@angular/router';
import {Izip} from "./Izip";
import {LangEnglishService} from "../shared/english";
import {AppUtilities} from "../shared/appUtilities";

@Component({
    selector: 'app-zip-results',
    templateUrl: './zip-results.component.html',
    styleUrls: ['./zip-results.component.less']
})
export class ZipResultsComponent implements OnInit {

    lang;
    results:Izip;

    constructor(private route:ActivatedRoute
        , private language:LangEnglishService
        , private router:Router
        , private utils:AppUtilities) {
    }

    navigateTo(item, path) {
        this.utils.utilities.isService = item.isService;
        this.router.navigateByUrl(path);
    }

    ngOnInit() {
        this.results = this.route.snapshot.data['results'];
        this.lang = this.language.getzipResults();
    }


}
